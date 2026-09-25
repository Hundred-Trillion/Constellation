# 🛠️ Constellation Intelligence Platform — Developer Guide
### Architecture, Engineering Pipeline & Operational Runbook

> **Project:** Constellation — AI-Powered Criminal Network Analysis System  
> **Hackathon Reference:** Smart India Hackathon (SIH26189) — Ministry of Home Affairs (MHA) / NCRB  
> **Team:** RevengerZ (Team 166233) · Vidya Jyothi Institute of Technology  
> **Author & Lead Architect:** Nanduri Eknadha Adithya Srivatsa ([adithyasrivatsa.in](http://adithyasrivatsa.in) · [hello@adithyasrivatsa.in](mailto:hello@adithyasrivatsa.in))

---

## 📑 Table of Contents

1. [Architectural Blueprint](#1-architectural-blueprint)
2. [Quickstart in 60 Seconds](#2-quickstart-in-60-seconds)
3. [Deep Pipeline Walkthrough](#3-deep-pipeline-walkthrough)
   - [3.1 Ingestion & Entity Extraction (NER)](#31-ingestion--entity-extraction-ner)
   - [3.2 The Entity Resolution (ER) Engine](#32-the-entity-resolution-er-engine)
   - [3.3 Dual-Engine Knowledge Graph (Neo4j + SQLite BFS)](#33-dual-engine-knowledge-graph-neo4j--sqlite-bfs)
   - [3.4 Graph Centrality & Influence Analytics](#34-graph-centrality--influence-analytics)
   - [3.5 Temporal Graph Traversal](#35-temporal-graph-traversal)
   - [3.6 Hidden Link Discovery Engine](#36-hidden-link-discovery-engine)
   - [3.7 Byomkesh Neural Reasoning Agent (LangGraph)](#37-byomkesh-neural-reasoning-agent-langgraph)
   - [3.8 Cryptographic HMAC-SHA256 Ledger (BNSS Sec 63)](#38-cryptographic-hmac-sha256-ledger-bnss-sec-63)
4. [Image Strategy: Zero-Supabase Permanent Mode vs Cloud Buckets](#4-image-strategy-zero-supabase-permanent-mode-vs-cloud-buckets)
5. [Security & Zero-Secrets Enforcement](#5-security--zero-secrets-enforcement)
6. [Testing & Verification Suite](#6-testing--verification-suite)
7. [API Reference & Route Table](#7-api-reference--route-table)

---

## 1. Architectural Blueprint

Constellation translates unstructured and structured investigative records into an **evidence-aware, temporal knowledge graph** accessible through a desktop-class interactive canvas:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA INGESTION LAYER                            │
│   FIRs, CDRs, Hawala Ledgers, Surveillance Notes, Vehicle Registries  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 ENTITY EXTRACTION & NORMALIZATION (NER)                 │
│      Extracts: PERSON, PHONE, VEHICLE, LOCATION, ORG, ACCOUNT, EVENT   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│             ENTITY RESOLUTION & DEDUPLICATION ENGINE                   │
│   Jaro-Winkler + IMEI/IMSI Shared Anchor + Contradiction Detection     │
│   → Flagged to Investigator Review Queue (87% Match)                   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                TEMPORAL KNOWLEDGE GRAPH DUAL-ENGINE                    │
│   Primary: Neo4j Bolt Driver (AsyncCypher)                             │
│   Resilient Fallback: Embedded SQLite Graph Engine (Multi-Hop BFS)    │
└───────────┬───────────────────────┬─────────────────────────┬──────────┘
            │                       │                         │
            ▼                       ▼                         ▼
┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐
│  GRAPH ANALYTICS     │ │ HIDDEN LINK DISCOVERY│ │  TEMPORAL EVOLUTION  │
│  Degree, Betweenness,│ │ Indirect paths       │ │ T1 (Pre-Incident)    │
│  Eigenvector, Bridges│ │ Cross-case bridges   │ │ T2 (Incident Pivot)  │
│  Community Detection │ │ (Operation Nexus)    │ │ T3 (Post-Reorganize) │
└───────────┬──────────┘ └──────────┬───────────┘ └───────────┬──────────┘
            │                       │                         │
            └───────────────────────┼─────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│              BYOMKESH AI REASONING AGENT (LangGraph)                   │
│   Deterministic Cypher Execution + Multi-Hop Graph Proof               │
│   Zero Hallucinations: Strict Citation Enforcement ([cit_1], [cit_2]) │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│             TAMPER-EVIDENT HMAC-SHA256 AUDIT CHAIN                     │
│   Cryptographic Hash Chain Ledger (Court Admissible: BNSS Sec 63)      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│             DESKTOP-GRADE INVESTIGATOR WORKSPACE                       │
│   3D Perspective Stage · Free-Form SVG Bezier Roping · Tile/Focus     │
│   Interactive File Explorer Drag-and-Drop · One-Click Demo Access     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Quickstart in 60 Seconds

### Prerequisites
- **Node.js**: v18+ (Node 20+ recommended)
- **Python**: 3.10+ (tested up to 3.14)
- **Git**

### Automated Launch (Single Command)
```bash
# Clone the repository
git clone https://github.com/Hundred-Trillion/Constellation.git
cd Constellation

# Run unified launcher
chmod +x start.sh
./start.sh
```

### Manual Individual Commands

#### Backend:
```bash
cd backend
python -m venv .venv
# Linux/macOS:
source .venv/bin/activate
# Windows PowerShell:
# .venv\Scripts\Activate.ps1

pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

#### Frontend:
```bash
cd frontend
npm install
npm run dev
```

- **Frontend App:** [http://localhost:5173](http://localhost:5173)
- **Backend API Docs:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Health Endpoint:** [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)

---

## 3. Deep Pipeline Walkthrough

### 3.1 Ingestion & Entity Extraction (NER)
- Located in: `backend/app/services/ingestion_service.py`
- Handles structured CSV/JSON and unstructured `.txt` / `.pdf` crime dossiers.
- Extracts entities with typed labels:
  - `PERSON`: Name aliases, suspect flags, nationality.
  - `PHONE`: MSISDN, IMEI, IMSI, telecom provider.
  - `VEHICLE`: License registration plate, chassis number, vehicle class.
  - `LOCATION`: Coordinates, port berths, safe houses.
  - `ORGANIZATION`: Front companies, logistics firms, registered shell entities.
  - `ACCOUNT`: Bank account IBAN/IFSC, Hawala token references.

### 3.2 The Entity Resolution (ER) Engine
- Located in: `backend/app/services/graph_service.py` & `frontend/src/pages/EntityResolutionPage.jsx`
- **The Core Problem:** Real-world FIRs have variations: *"Rajesh Kumar"*, *"R. Kumar"*, *"Raju"*.
- **The Heuristic Scoring:**
  1. Phonetic / String distance (Jaro-Winkler threshold > 0.82)
  2. Co-occurrence in Call Detail Records (+25 points)
  3. Shared vehicle ownership or travel manifests (+30 points)
  4. Contradiction penalty (Discrepant Date of Birth or Blood Group flags an immediate warning)
- **Review Queue Philosophy:** The system calculates an aggregate score (e.g., **87% match**) and presents the supporting vs contradictory evidence to the officer. **No automatic merging of identities** occurs without human authorization.

### 3.3 Dual-Engine Knowledge Graph (Neo4j + SQLite BFS)
- Located in: `backend/app/db/neo4j_client.py` and `backend/app/db/sqlite_client.py`
- **Neo4j Production Driver:** Connects to Neo4j via Bolt (`bolt://localhost:7687`), applying index constraints on node IDs.
- **Embedded SQLite Fallback:** When Neo4j is offline or unavailable, Constellation automatically falls back to an embedded SQLite graph engine without downtime.
  - Supports multi-hop Breadth-First-Search (BFS) traversals up to depth 4.
  - Allows full Cypher-like queries, node filtering, and relationship expansion offline.

### 3.4 Graph Centrality & Influence Analytics
- Located in: `backend/app/routers/graph.py`
- **Degree Centrality:** Measures direct transaction/call volume (identifies dispatchers or active callers).
- **Betweenness Centrality:** Detects information bridges and intermediaries connecting otherwise disconnected criminal cells.
- **Eigenvector Centrality:** Measures connections to well-connected players (identifies syndicate benefactors).
- **Crucial Investigative Guardrail:** High centrality $\ne$ guilt. An Uber driver or harbor master will have high degree centrality; the system contextualizes position against evidentiary weights.

### 3.5 Temporal Graph Traversal
- Located in: `backend/app/routers/graph.py` (`/api/cases/{case_id}/subgraph?t_start=...&t_end=...`)
- Allows investigators to replay network evolution:
  - **T1 (Pre-Incident):** Normal baseline telecommunications.
  - **T2 (Incident Phase):** Sudden burst of burner calls, Hawala transfers, and vessel AIS blackouts.
  - **T3 (Post-Incident):** Network fragmentation and evasive shell company creation.

### 3.6 Hidden Link Discovery Engine
- Correlates separate case subgraphs (e.g. Case 102 vs Case 044).
- Finds 3-hop and 4-hop indirect bridges:
  $$\text{Suspect A} \xrightarrow{\text{CALLED}} \text{Burner B} \xrightarrow{\text{ASSOCIATED}} \text{Shell Company C} \xleftarrow{\text{TRANSFERRED}} \text{Suspect D}$$
- Generates transparent hypothesis cards explaining *why* the link is surfaced.

### 3.7 Byomkesh Neural Reasoning Agent (LangGraph)
- Located in: `backend/app/services/byomkesh_service.py`
- Implements a deterministic LangGraph state machine:
  1. `parse_question`: Extracts entities, case parameters, and intent.
  2. `plan_graph_query`: Formulates Cypher traversal.
  3. `execute_cypher`: Traverses the graph and pulls candidate subgraphs.
  4. `retrieve_evidence`: Corroborates nodes with authentic cryptographic file digests.
  5. `construct_explanation`: Synthesizes findings using neural LLMs (Google Gemini, NVIDIA NIM, OpenAI) or deterministic rule synthesis.
- **Zero Hallucination Guarantee:** Every sentence links to verified graph citations `[cit_1]`, `[cit_2]`.

### 3.8 Cryptographic HMAC-SHA256 Ledger (BNSS Sec 63)
- Located in: `backend/app/services/audit_service.py`
- Every investigative operation is logged into an immutable hash chain:
  $$\text{Hash}_n = \text{HMAC-SHA256}_{K}(\text{index} \parallel \text{Hash}_{n-1} \parallel \text{timestamp} \parallel \text{action} \parallel \text{payload})$$
- Verified continuously via `/api/audit/verify`.

---

## 4. Image Strategy: Zero-Supabase Permanent Mode vs Cloud Buckets

### Why Constellation Operates Without Supabase by Default
Free-tier database storage (like Supabase free tier) goes into hibernation after 7 days of inactivity. If a hackathon project links all evidence images to ephemeral Supabase bucket URLs, the entire user interface breaks as soon as the project pauses!

Constellation guarantees **100% permanent image persistence** using two local-first zero-cost methods:

### Method 1: Frontend Static Assets (Zero Network Overhead, Permanent)
Images placed in `frontend/public/` are served natively by Vite in dev and baked into the edge CDN in production:
```
frontend/public/
└── evidence/
    ├── suspects/
    │   ├── tariq_merchant.jpg
    │   └── rajesh_sharma.jpg
    ├── vehicles/
    │   └── mv_sagar_ratna.jpg
    └── documents/
        └── bol_kandla_9921.jpg
```
In any component or dossier:
```jsx
<img 
  src="/evidence/suspects/tariq_merchant.jpg" 
  alt="Tariq Merchant" 
  className="nb-dossier-mugshot" 
/>
```
- **Uptime:** 100% permanent. Never pauses, never sleeps, works completely offline.
- **Cost:** ₹0.

### Method 2: Backend Evidence Store (`evidence_store/`)
The FastAPI backend serves authentic evidence files directly from disk via SHA-256 addresses:
```python
# GET /api/evidence/file/{evidence_id}
# Streams file directly from evidence_store directory with Content-Type header
```

### Method 3: Supabase Storage Cloud Buckets (Optional Extension)
If an enterprise client requires remote Supabase object storage, execute this SQL script in the **Supabase SQL Editor**:

```sql
-- 1. Create the public evidence bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'evidence_images',
  'evidence_images',
  true,
  10485760, -- 10 MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Open read access to all users & evaluators
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'evidence_images');

-- 3. Permit authenticated uploads
CREATE POLICY "Permit Uploads"
ON storage.objects FOR INSERT
TO authenticated, anon
WITH CHECK (bucket_id = 'evidence_images');
```

Then configure the credentials in your local `.env`:
```env
SUPABASE_URL=https://wgfzsrpmmdmbmojakjns.supabase.co
NEXT_PUBLIC_SUPABASE_URL=https://wgfzsrpmmdmbmojakjns.supabase.co
SUPABASE_ANON_KEY=sb_publishable_3roS27XlbPwLZJKcwO8eiA_UxdEXxyx
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_3roS27XlbPwLZJKcwO8eiA_UxdEXxyx
SUPABASE_PROJECT_ID=wgfzsrpmmdmbmojakjns
```

---

## 5. Security & Zero-Secrets Enforcement

Constellation enforces strict security hygiene:
1. **No Committed Secrets:** `.env` is strictly gitignored. Only `.env.example` with safe placeholder strings is committed.
2. **Deterministic JWT Tokens:** Role-based claims (`admin`, `investigator`, `read_only`) with expiration limits.
3. **Cypher Injection Mitigation:** Node labels, relationship types, and properties are sanitized against a whitelist pattern (`^[A-Za-z0-9_]+$`) via `validate_graph_identifier()`.
4. **Path Traversal Defense:** Uploaded evidence filenames are sanitized with `os.path.basename()` and constrained strictly within `EVIDENCE_STORE_DIR`.

---

## 6. Testing & Verification Suite

### Automated Pytest Suite
The backend contains 31 automated tests covering authentication, graph queries, Byomkesh reasoning, entity resolution, and HMAC ledger verification:

```bash
cd backend
source .venv/bin/activate
pytest tests/ -v
```

Expected result:
```
tests/test_auth.py::test_login_success PASSED
tests/test_auth.py::test_invalid_credentials PASSED
tests/test_graph.py::test_case_subgraph PASSED
tests/test_graph.py::test_betweenness_centrality PASSED
tests/test_byomkesh.py::test_query_deductions PASSED
tests/test_audit.py::test_hmac_chain_integrity PASSED
===================== 31 passed in 4.12s =====================
```

### Frontend Production Build Verification
```bash
cd frontend
npm run build
```
Compiled bundle generates in under 1 second without errors.

---

## 7. API Reference & Route Table

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health & active graph engine status | No |
| `POST` | `/api/auth/token` | Authenticate user & issue JWT | No |
| `GET` | `/api/cases` | List active investigative cases | Yes (`read_only`+) |
| `GET` | `/api/cases/{case_id}/subgraph` | Fetch graph nodes, edges & temporal filters | Yes (`read_only`+) |
| `POST` | `/api/graph/relationships` | Create new rope relationship between nodes | Yes (`investigator`+) |
| `DELETE` | `/api/graph/relationships/{id}` | Sever relationship between nodes | Yes (`investigator`+) |
| `POST` | `/api/byomkesh/query` | Interrogate Byomkesh multi-hop reasoning agent | Yes (`investigator`+) |
| `GET` | `/api/entity-resolution/review` | Retrieve candidate duplicate identities for review | Yes (`investigator`+) |
| `POST` | `/api/entity-resolution/merge` | Accept identity merge into single canonical node | Yes (`investigator`+) |
| `GET` | `/api/audit/verify` | Verify cryptographic HMAC-SHA256 audit ledger | Yes (`admin`+) |
| `POST` | `/api/ingestion/upload` | Ingest FIR or CDR evidence file with SHA-256 hash | Yes (`investigator`+) |

---

## ⚖️ Author & Legal Notice

- **Project Lead:** Nanduri Eknadha Adithya Srivatsa
- **Website:** [adithyasrivatsa.in](http://adithyasrivatsa.in)
- **Direct Inquiries:** [hello@adithyasrivatsa.in](mailto:hello@adithyasrivatsa.in)
- **GitHub:** [@adithyasrivatsa](https://github.com/adithyasrivatsa) / [@Hundred-Trillion](https://github.com/Hundred-Trillion)
- **License:** Business Source License 1.1 (OpenBUSL / BSL-1.1)
