# 🇮🇳 Smart India Hackathon — Problem Statement SIH26189
# Constellation: AI-Powered Criminal Network Analysis System

> **Official Problem ID:** SIH26189  
> **Title:** AI-Powered Criminal Network Analysis System  
> **Organization:** Ministry of Home Affairs (MHA)  
> **Department:** National Crime Records Bureau (NCRB), Women Safety Division  
> **Category:** Software | **Theme:** Blockchain & Cybersecurity  
> **Team Name:** RevengerZ (Team ID: 166233)  
> **Institute:** Vidya Jyothi Institute of Technology (VJIT), Hyderabad  
> **Lead Author / Contact:** Nanduri Eknadha Adithya Srivatsa ([adithyasrivatsa.in](http://adithyasrivatsa.in) · [hello@adithyasrivatsa.in](mailto:hello@adithyasrivatsa.in))

---

## 👥 Team RevengerZ — Identity & Roster

| Role | Name | Email | Phone | Gender | Key Responsibilities |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Team Leader** | **Gunji Chaithra** | gunjichaithra@gmail.com | +91 99499 90586 | Female | Project coordination, NCRB requirement validation, investigative UX |
| **Core Architect & Member** | **Nanduri Eknadha Adithya Srivatsa** | hello@adithyasrivatsa.in | +91 81212 00722 | Male | System architecture, Knowledge Graph, Byomkesh LangGraph AI, Cryptographic Ledger |
| **Team Member** | **Kathmandi Akhil** | kathmandiakhil7@gmail.com | +91 99498 67775 | Male | Graph analytics, centrality algorithms, SQLite/Neo4j dual engine |
| **Team Member** | **Kashapaka Nandhini** | nandhinikashapaka@gmail.com | +91 95810 87433 | Female | Entity extraction (NER), data ingestion pipelines, FIR parsing |
| **Team Member** | **Daya Sai Charan** | dayasaicharan79@gmail.com | +91 79812 38621 | Male | Temporal timeline engine, event reconstruction, frontend components |
| **Team Member** | **Manigila Rohan Kumar Reddy** | rohanbabu2007@gmail.com | +91 76719 48934 | Male | Hidden-link prediction, anomaly detection heuristics, QA & testing |

---

## 🎯 Executive Summary for Evaluators & Judges

Modern organized crime operates through decentralized, cross-jurisdictional networks spanning **associates, intermediaries, financial channels (Hawala / shell entities), maritime shipping, and encrypted communications**. 

Law enforcement agencies—including state police, NCRB, and central intelligence directorates—possess vast repositories of evidence. However, this intelligence is **siloed, fragmented, and predominantly unstructured** across FIRs, Call Detail Records (CDRs), surveillance notes, bank records, and seized devices.

### The Core Problem
Manual crime network collation is slow, labor-intensive, and fundamentally vulnerable to cognitive blind spots. Simple graph visualization tools ("upload CSV → draw spiderweb") fail because they lack:
1. **Dirty Data Entity Resolution** (e.g., distinguishing whether *"Rajesh Kumar"*, *"R. Kumar"*, and *"Raju"* are 1 person or 3 distinct suspects).
2. **Evidence Provenance & Explainability** (Every AI assertion must tie directly back to an authentic seized artifact or CDR record).
3. **Temporal Dynamics** (Tracking how syndicates reorganise *before, during, and after* an incident).
4. **Legal Evidentiary Admissibility** (Preserving chain of custody under **BNSS Sec 63 / statutory electronic evidence standards**).

**Constellation** solves SIH26189 not as a black-box "prediction" gimmick, but as an **AI-Assisted Investigative Graph Intelligence Platform** designed specifically for the field investigator.

### 🌟 What Makes Us Unique & Our Flagship Idea
What sets Constellation apart is our **Flagship Idea: The Collaborative AI-Human Workspace**. We believe in synergy rather than replacement. The workspace allows human intelligence to direct the investigation while the AI (Byomkesh) handles heavy data retrieval, multi-hop reasoning, and contradiction checks. 

### 🎨 Creative Freedom & Seamless Navigation
We exercised special creative freedom to build a platform that doesn't feel like archaic enterprise software. Our focus on **Seamless Navigation** ensures that investigators can fluidly move between the spatial graph canvas, evidence dossiers, and AI chat without losing context. 

### 🚀 Future Vision: Digital Infrastructure & OSINT
Our future vision for Constellation is to harness the massive digital infrastructure being built across India. We plan to integrate deep **OSINT (Open Source Intelligence)** pipelines and **non-invasive surveillance** techniques to proactively find hidden networks. By leveraging public information and growing digital footprints, Constellation will provide unprecedented visibility into emerging syndicates.

---

## 🏛️ Direct Mapping: The 6 MHA / NCRB Requirements

| # | MHA / NCRB Requirement | Constellation Implementation |
| :-: | :--- | :--- |
| **1** | **Multi-Source Data Processing** | Ingestion pipeline supporting structured (CDRs, bank transactions, vehicle databases) and unstructured records (FIR text, surveillance memos, witness testimonies). |
| **2** | **Investigative Entity Extraction** | Rule-based and neural Named Entity Recognition (NER) isolating People, Locations, Vehicles, Phone Numbers, Organizations, and Hawala Accounts. |
| **3** | **Relationship Mapping** | Heterogeneous temporal knowledge graph (`PERSON` ── `CALLED` ── `PHONE` ── `OWNS` ── `VEHICLE` ── `TRANSFERS_FUNDS` ── `ACCOUNT`). |
| **4** | **Influence & Key Player Identification** | Graph centrality analytics: Degree (volume), Betweenness (intermediaries & bridge detection), Eigenvector (influence), and Community Detection. Distinguishes *operational influence* from *presumption of guilt*. |
| **5** | **Suspicious Patterns & Hidden Link Discovery** | Multi-hop indirect path detection connecting disparate cases (e.g., Case 001 Rajesh Kumar ⟷ Case 002 Meera Fernandes linked via shared burner IMEI and proxy shell entity). |
| **6** | **Investigator-Facing Actionable Intelligence** | Desktop-class investigation canvas with live SVG bezier roping, Byomkesh multi-hop AI co-pilot citing exact cryptographic record hashes, and complete audit trail. |

---

## 💎 The Killer Feature: Human-In-The-Loop Entity Resolution

In real-world police databases, names and identities are messy:
- *"Rajesh Kumar"*, *"R. Kumar"*, *"Raju"*, *"Rajesh s/o Mohan"*, *"Rajesh Kumar (Hyderabad)"*.

### Why Automated Merging is Dangerous
If an AI system automatically merges two individuals based on a 70% fuzzy match, an innocent citizen's passport or bank account could be wrongly pinned to an international narcotics syndicate.

### Constellation's Defensible Approach
Constellation calculates an ensemble similarity score combining:
- **String Distance (Levenshtein / Jaro-Winkler)**
- **Shared Telecommunications (CDR IMEI / SIM IMSI)**
- **Shared Geolocation & Vehicle Registrations**
- **Discrepancy Checks (Conflicting Date of Birth / Aadhaar)**

When a potential match occurs (e.g., **87% confidence**):
```
AI Alert: Potential Identity Match (87% Confidence)
--------------------------------------------------
Candidate A: Rajesh Kumar (Case #102)
Candidate B: Raju / R. Kumar (Case #044)

Supporting Evidence:
  ✓ Identical Phone IMEI (+91 98490 XXXXX)
  ✓ Same Vehicle Registration (KA-04-E-8821)
  ✓ Corroborated Offload Location (Kandla Port Berth 4)

Contradictory Attributes:
  ✗ Discrepancy in recorded Date of Birth (1984 vs 1988)

Status: ROUTED TO INVESTIGATOR REVIEW QUEUE
Actions: [ ACCEPT MERGE ]  [ DISMISS LEAD ]  [ FLAG FOR FURTHER INQUIRY ]
```
The decision remains strictly with the human investigator, accompanied by a complete audit log entry.

---

## 🔗 The "Blockchain & Cybersecurity" Theme: Tamper-Evident HMAC Ledger

SIH26189 is listed under the **Blockchain & Cybersecurity** theme. Rather than introducing speculative tokens or slow public blockchains, Constellation fulfills the statutory intent through **Cybersecurity Forensics & Cryptographic Hash Chains**:

1. **HMAC-SHA256 Immutable Audit Chain:**
   - Every node created, bezier rope connection drawn, evidence artifact deposited, and Byomkesh AI inference generated produces a cryptographically sealed block:
     $$\text{Block Hash} = \text{HMAC-SHA256}(\text{Index} \parallel \text{PrevHash} \parallel \text{Timestamp} \parallel \text{Action} \parallel \text{Payload})$$
2. **Chain Integrity Verification:**
   - The system performs real-time backward link verification (`verify_chain()`). If any database row or evidence payload is tampered with by a rogue actor, the chain immediately breaks and flags the exact record index.
3. **Courtroom Admissibility (BNSS Sec 63):**
   - Produces verifiable certificates of electronic evidence hash compliance suitable for judicial scrutiny under India's Bharatiya Nagarik Suraksha Sanhita (BNSS Sec 63 / Indian Evidence Act Sec 65B).

---

## 🖼️ Image Architecture & Zero-Supabase Permanent Strategy

### The Free Cloud Problem
Free-tier cloud storage services (such as Supabase free tier) automatically pause, sleep, or delete files after 7 days of inactivity. If an investigative platform relies on ephemeral cloud URLs, evidence photos, CCTV captures, and suspect mugshots **break and return HTTP 404 during hackathon evaluation or live trials**.

### Constellation's Resilient Local-First Strategy (Zero External Dependencies)
To ensure **100% permanent uptime**, Constellation provides native local static storage:

1. **Frontend Static Image Vault (`frontend/public/evidence/`):**
   - Images placed in `frontend/public/evidence/` are compiled directly into the production bundle.
   - When hosted on Netlify, Vercel, or an on-premise police intranet server, images load instantly at the edge (`/evidence/suspects/tariq.jpg`) with **zero database lookups, zero cost, and 0% risk of expiring**.
2. **Backend Forensic Vault (`evidence_store/` & `evidence_vault/`):**
   - The FastAPI backend stores ingested evidentiary files on disk, computes their SHA-256 digest on upload, and serves them via static route `/api/evidence/file/{evidence_id}`.
   - Files remain persistent on the local machine or Docker volume forever.

> **Note:** For Supabase storage setup and cloud configuration, please refer to [docs/SUPABASE_SETUP.md](SUPABASE_SETUP.md).

---

## 📸 Screenshots & Demonstration Guide

UI captures and demonstration stills are located in the [screenshots/](file:///c:/Users/ME/Downloads/C/Constellation/screenshots) directory:

- `01_login_gateway.png` — Neobrutalist access screen with animated demo pointer arrow.
- `02_investigation_canvas.png` — Free-form 3D canvas with live SVG bezier rope linkages.
- `03_byomkesh_neural_copilot.png` — Multi-hop LangGraph query reasoning engine with evidence citations.
- `04_entity_resolution_review.png` — 87% confidence identity match review queue.
- `05_temporal_timeline_dossier.png` — Chronological event reconstruction and suspect dossiers.
- `06_file_explorer_drag_drop.png` — Forensic explorer drag-and-drop pinning workflow.
- `07_tamper_evident_audit_ledger.png` — Cryptographic HMAC-SHA256 chain verification.
- `08_autonomous_sweep_dashboard.png` — 12-hour cross-case Hawala and syndicate anomaly alerts.

---

## ⚡ Instant One-Click Demo Access for Judges

To test the application immediately without entering credentials:

1. Open the [Live Web Application](https://constellation-platform.netlify.app) (or `http://localhost:5173` locally).
2. On the login gateway, notice the **animated pink callout and bouncing arrow** pointing directly to **`DEMO ACCESS`**.
3. Click either the **arrow** or the **`DEMO ACCESS`** button.
4. You will be authenticated immediately with Chief Intelligence Director privileges (`admin`), loaded into the live **Case 102 (Operation Silver Dune)** workspace with pre-seeded investigative intelligence.

---

## ⚖️ Intellectual Property & Team Contact

- **Team Name:** RevengerZ (Team ID: 166233)
- **Institution:** Vidya Jyothi Institute of Technology (VJIT), Hyderabad
- **Lead Author:** Nanduri Eknadha Adithya Srivatsa
- **Website:** [adithyasrivatsa.in](http://adithyasrivatsa.in)
- **Direct Inquiries:** [hello@adithyasrivatsa.in](mailto:hello@adithyasrivatsa.in)
- **License:** Business Source License 1.1 (OpenBUSL / BSL-1.1)
