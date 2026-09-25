# 🌐 Constellation Intelligence Platform — Startup & Operations Guide

> **Project:** Constellation — AI-Powered Criminal Network Analysis System  
> **Problem Statement:** SIH26189 (Ministry of Home Affairs / NCRB)  
> **Team:** RevengerZ (Team ID: 166233) · Vidya Jyothi Institute of Technology  
> **Lead Architect & Author:** Nanduri Eknadha Adithya Srivatsa ([adithyasrivatsa.in](http://adithyasrivatsa.in) · [hello@adithyasrivatsa.in](mailto:hello@adithyasrivatsa.in))

Welcome to the **Constellation Intelligence Platform**, an enterprise-grade forensic investigation, knowledge graph, and neural AI intelligence operations system.

This guide provides end-to-end setup and operating instructions for running Constellation locally or in production.

## 🌐 Live Edge Deployments

The frontend interface is deployed and active globally on edge networks:
- **Netlify Edge Production:** [https://constellation-platform.netlify.app](https://constellation-platform.netlify.app)
- **Vercel Global Production:** [https://frontend-rho-ivory-12.vercel.app](https://frontend-rho-ivory-12.vercel.app)

---

## ⚡ Quick Start (One-Command Launcher)

Constellation includes an automated launcher script that configures environments, installs dependencies, and boots both backend and frontend servers simultaneously:

```bash
chmod +x start.sh
./start.sh
```

- **Frontend Application:** [http://localhost:5173](http://localhost:5173)
- **Backend API & Swagger Docs:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **API Health Check:** [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)

Press `Ctrl+C` in your terminal to cleanly shut down both backend and frontend services.

---

## 📋 System Prerequisites

Ensure you have the following installed on your host system:
- **Python**: Version 3.10 to 3.14
- **Node.js**: Version 18+ (Node 20+ recommended)
- **npm** or **yarn** / **pnpm**
- *(Optional)* **Docker**: If you wish to run a dedicated Neo4j instance (Constellation includes a built-in persistent multi-hop SQLite graph engine fallback if Neo4j is offline).

---

## 🔑 Environment Configuration (`.env`)

Copy `.env.example` to `.env` in the root repository folder:

```bash
cp .env.example .env
```

### 1. Byomkesh AI Inference Keys (Neural LLM Engine)

Constellation's Byomkesh reasoning agent and Autonomous Research Engine perform genuine neural inference. You can configure **Google Gemini**, **NVIDIA NIM**, or **OpenAI**:

#### Option A: Google Gemini (Recommended)
Get an API key from [Google AI Studio](https://aistudio.google.com/):
```env
GEMINI_API_KEY=AIzaSy...your_gemini_key_here
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
GEMINI_MODEL=gemini-2.5-flash
```

#### Option B: NVIDIA NIM
Get an API key from [NVIDIA Build](https://build.nvidia.com):
```env
NVIDIA_API_KEY=nvapi-...your_nvidia_key_here
NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1
NVIDIA_MODEL=nvidia/nemotron-3.5-lightning-30b-a3b
```

#### Option C: OpenAI
```env
OPENAI_API_KEY=sk-...your_openai_key_here
OPENAI_MODEL=gpt-4o
```

> **Note:** If no API key is set, Byomkesh operates in deterministic factual verification mode, citing verified graph records and evidence hashes without hallucinations.

### 2. Graph Database Engine (Neo4j & Resilient SQLite)

Constellation implements a **dual-engine graph architecture**:
- **Primary:** Neo4j Bolt Driver with Cypher validation.
- **Embedded Engine:** Built-in SQLite graph store supporting multi-hop BFS graph traversal, property filtering, and edge operations.

To run a local Neo4j database using Docker:
```bash
docker run -d \
  --name constellation-neo4j \
  -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/constellation_secure_2026 \
  neo4j:5-community
```
Configure `.env`:
```env
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=constellation_secure_2026
```
*(If Neo4j is not running, Constellation automatically falls back to its embedded SQLite graph engine without downtime).*

### 3. Cryptographic Security & Audit Keys

```env
JWT_SECRET_KEY=constellation_production_jwt_secret_key_adithya_2026_secured
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
HMAC_SECRET_KEY=constellation_tamper_evident_hmac_secret_chain_key_2026
```

---

## 🛠️ Manual Step-by-Step Installation

If you prefer to run services manually across separate terminal windows:

### Terminal 1: Backend Setup & Execution

```bash
# 1. Create and activate virtual environment
python3 -m venv backend/.venv
source backend/.venv/bin/activate

# 2. Upgrade pip and install dependencies
pip install --upgrade pip
pip install -r backend/requirements.txt

# 3. Seed initial database and cryptographic audit chain
PYTHONPATH=backend python3 backend/app/db/seed_data.py

# 4. Start FastAPI server with live reload
PYTHONPATH=backend uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Terminal 2: Frontend Setup & Execution

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

---

## 👤 Default Credentials & User Roles

The database initializes with the following default accounts (password: `password`):

| Username | Password | Role | Description |
| :--- | :--- | :--- | :--- |
| `admin` | `password` | **admin** | Full platform administration, user management, audit verification |
| `investigator` | `password` | **investigator** | Lead Intelligence Officer: Canvas roping, Byomkesh queries, evidence intake |
| `analyst` | `password` | **read_only** | Intelligence Analyst: Read-only access to intelligence dossiers |

> In production, change default passwords immediately via the Admin panel or API (`POST /api/auth/users`).

---

## 🧪 Running Verification Tests

Run the complete backend automated test suite (31 tests covering audit chain integrity, graph persistence, Cypher injection prevention, path traversal defense, and Byomkesh reasoning):

```bash
source backend/.venv/bin/activate
pytest backend/tests -v
```

To verify frontend compilation for production:
```bash
cd frontend
npm run build
```

---

## 📁 Evidence Vault & Cryptographic Hashes

Raw forensic evidence files are stored in `evidence_vault/` and synced into `evidence_store/`. Each file is anchored by an authentic, verifiable SHA-256 digest:

| File Name | SHA-256 Digest |
| :--- | :--- |
| `Bill_Of_Lading_BOL-9921-A_MV_Sagar_Ratna.txt` | `63737bdaee9ae09c6eb0949d214697f26194b6ceb61947b744d0360814f3b143` |
| `CFSL_Chemical_Precursor_Spectrometry_CH-9921.txt` | `fdb854212ec95ee5d57b29a27e366b537d928238ba4cf0ea6dfa8fcda6ff7741` |
| `NCB_Intercepted_VoIP_Audio_Transcript_VOIP-441.txt`| `7859c2ee52d689650e68d1ea4cb48239385ef66439e6a9dc574b6db2f0b784a0` |
| `FIU_Hawala_Mirror_Ledger_Account_88219.csv` | `a935a9630c72e2aa5a8d9a24ce5ba87807759b48695f2a1b7a2da38e89e7c541` |
| `Thuraya_Satellite_RF_Burst_1544MHz_Logs.csv` | `69542a2ef40d42ae2a59a7a139a03e63969be8480436d4dfb94ec1d4f828a2a0` |
| `AIS_Transponder_Telemetry_Arabian_Sea_0922.csv` | `d3606fbf4148c3b7a7ea73d9e4a316df080f4f9f25713437198bb1cb7d55d7f1` |
| `Dock4_9mm_Glock_Forensic_Striation_Report.txt` | `f63238ca7f1680d9be69ce535805e55e2d63eaef15b828db50efb942a7862f92` |
| `Al_Barakah_Logistics_FZE_Corporate_Registry_Dubai.txt` | `d05e2ea61b47df4ec9502ab65a39cbfa0e7ae9a90962b9f36f88d227b9c9dfdc` |

You can verify any file hash in Linux/macOS via:
```bash
sha256sum evidence_store/Bill_Of_Lading_BOL-9921-A_MV_Sagar_Ratna.txt
```
