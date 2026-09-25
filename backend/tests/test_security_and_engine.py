import pytest
import os
import tempfile
from fastapi import HTTPException
from app.db.neo4j_client import validate_graph_identifier, graph_client
from app.services.ingestion_service import ingestion_service
from app.dependencies import get_current_user
from fastapi.security import HTTPAuthorizationCredentials

def test_validate_graph_identifier_valid():
    assert validate_graph_identifier("Person") == "Person"
    assert validate_graph_identifier("COMMUNICATES_WITH") == "COMMUNICATES_WITH"
    assert validate_graph_identifier("Entity_123") == "Entity_123"

def test_validate_graph_identifier_injection_prevention():
    malicious_inputs = [
        "Person}) DETACH DELETE n //",
        "Entity; DROP TABLE graph_nodes;",
        "Rel Type With Spaces",
        "Label' OR 1=1 --",
        "Node-Dash",
        "",
    ]
    for mal in malicious_inputs:
        with pytest.raises(ValueError) as exc:
            validate_graph_identifier(mal)
        assert "Security restriction" in str(exc.value)

@pytest.mark.asyncio
async def test_path_traversal_prevention():
    # Attempting to upload with path traversal sequences
    traversal_filename = "../../../../etc/passwd"
    dummy_bytes = b"sample test content for file ingestion"
    
    result = await ingestion_service.ingest_file_as_evidence(
        case_id="case-102",
        filename=traversal_filename,
        file_bytes=dummy_bytes,
        evidence_type="document",
        actor_id="test_officer"
    )
    # The file should be saved safely inside EVIDENCE_STORE_DIR with basename sanitized
    assert result["id"] is not None
    assert result["properties"]["filename"] == traversal_filename

@pytest.mark.asyncio
async def test_subgraph_multihop_bfs():
    # Create test nodes
    n1 = await graph_client.create_node("Person", "test_hop_node_1", {"name": "Hop 1"}, case_id="case-bfs")
    n2 = await graph_client.create_node("Person", "test_hop_node_2", {"name": "Hop 2"}, case_id="case-bfs")
    n3 = await graph_client.create_node("Person", "test_hop_node_3", {"name": "Hop 3"}, case_id="case-bfs")
    
    # Connect 1 -> 2 -> 3
    e1 = await graph_client.create_relationship("test_edge_1_2", "test_hop_node_1", "test_hop_node_2", "CONNECTS_TO", 0.9, [], "test", "")
    e2 = await graph_client.create_relationship("test_edge_2_3", "test_hop_node_2", "test_hop_node_3", "CONNECTS_TO", 0.9, [], "test", "")

    # Depth 1 from node 1 should only reach node 2
    subgraph_d1 = await graph_client.get_subgraph(center_id="test_hop_node_1", depth=1)
    node_ids_d1 = {n["id"] for n in subgraph_d1["nodes"]}
    assert "test_hop_node_1" in node_ids_d1
    assert "test_hop_node_2" in node_ids_d1
    assert "test_hop_node_3" not in node_ids_d1

    # Depth 2 from node 1 should reach node 2 and node 3
    subgraph_d2 = await graph_client.get_subgraph(center_id="test_hop_node_1", depth=2)
    node_ids_d2 = {n["id"] for n in subgraph_d2["nodes"]}
    assert "test_hop_node_1" in node_ids_d2
    assert "test_hop_node_2" in node_ids_d2
    assert "test_hop_node_3" in node_ids_d2

    # Clean up test nodes
    await graph_client.delete_node("test_hop_node_1")
    await graph_client.delete_node("test_hop_node_2")
    await graph_client.delete_node("test_hop_node_3")

@pytest.mark.asyncio
async def test_auth_requires_valid_credentials():
    # Calling get_current_user with None credentials must raise 401
    with pytest.raises(HTTPException) as exc:
        await get_current_user(None)
    assert exc.value.status_code == 401

    # Calling with unverified demo token must raise 401
    dummy_creds = HTTPAuthorizationCredentials(scheme="Bearer", credentials="demo_token_admin")
    with pytest.raises(HTTPException) as exc:
        await get_current_user(dummy_creds)
    assert exc.value.status_code == 401
