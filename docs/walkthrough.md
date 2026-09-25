# 🧭 Constellation — System & Interface Walkthrough
### Interactive Investigation Workspace, 3D Canvas, Byomkesh AI & Entity Resolution

> **Problem Statement:** SIH26189 — AI-Powered Criminal Network Analysis System  
> **Team:** RevengerZ (Team ID: 166233) · Vidya Jyothi Institute of Technology  
> **Lead Architect:** Nanduri Eknadha Adithya Srivatsa ([adithyasrivatsa.in](http://adithyasrivatsa.in) · [hello@adithyasrivatsa.in](mailto:hello@adithyasrivatsa.in))

---

## 1. Stage-by-Stage User Journey

### Phase 1: Gateway & Instant Demo Access
1. **Neobrutalist Login Terminal:**
   - Navigating to the application root presents the investigator gateway with active badge identifiers, statutory compliance tags (BNS Sec 111 & PMLA Sec 5), and port status.
2. **Evaluator / Judge Demo Pointer:**
   - Positioned in the header of the sign-in form is an animated, high-visibility callout badge: `CLICK HERE FOR DEMO` accompanied by a pulsing live dot and an animated bouncing arrow (`↓`).
   - Clicking either the arrow pointer or the **`DEMO ACCESS`** button bypasses manual credential entry and logs in immediately as **Chief Intelligence Director (`admin`)**.
3. **Cinematic Welcome Interstitial:**
   - An intentional, typewriter-style welcome animation (`Welcome Back Investigator`) confirms session initialization and opens the central workspace.

---

### Phase 2: The Investigation Workspace (The Central Soul)
1. **3D Perspective Stage:**
   - Pitch black (`#000000`) canvas with a subtle dot-matrix blueprint grid and perspective depth (`perspective(1400px)`).
2. **Top Command Strip:**
   - **`[ ☰ EXPLORER ]`**: Toggles the forensic case evidence tree.
   - **Case Pill**: Displays active investigation metadata (`CASE 102 — SILVER DUNE` · `CRITICAL PRIORITY`).
   - **Window Controls**: Toggle individual floating panels (`1. Canvas & Ropes`, `2. Byomkesh AI`, `3. Dossier & Timeline`).
   - **Arrangement Utilities**: `Tile Windows` and `Focus Canvas` for instant layout reconfiguration.
   - **Backend Monitor**: Real-time status indicator (`● FASTAPI BACKEND LIVE (127.0.0.1:8000)`).

---

### Phase 3: The 3 Floating 3D Bending Windows
Each window is encased in an interactive `Panel3D` container featuring dynamic cursor perspective tilt (`rotateX`, `rotateY`), silver specular glare, and tactile neobrutalist borders:

#### 1. Window 1: Investigation Board & Canvas (Canvas & Ropes)
- **Interactive Node Pinboard:** Draggable entity cards representing suspects (Tariq "The Anchor" Merchant, Rajesh Sharma), front entities (Al-Barakah Logistics FZE), maritime vessels (MV Sagar Ratna), and financial nodes (Hawala Node #88219).
- **Dynamic SVG Bezier Ropes:** Real-time curved rope connections rendered across nodes (`M x1 y1 C ... x2 y2`).
- **Interactive Roping:** Click "Rope / Link" on any node, select a target entity, and choose the verified relationship (`COORDINATES_WITH`, `BENEFICIAL_OWNER`, `TRANSFERS_FUNDS`, `COMMUNICATES_WITH`).
- **Live Severance:** Click the `×` button on any rope's midpoint pill to sever the link in real-time.
- **Dynamic Recalculation:** Dragging cards across the board smoothly stretches and recalculates attached bezier ropes with zero latency.

#### 2. Window 2: Byomkesh AI Intelligence Engine
- **Live Graph Interrogation:** Queries hit `POST /api/byomkesh/query` on the live FastAPI backend server.
- **Deterministic Deductions:** Generates multi-hop network deductions, displays Cypher statements executed, and attributes findings to exact graph citations (`[cit_1]`, `[cit_2]`).
- **Autonomous Research & Hypotheses:** Mode switcher for `ASSIST`, `RESEARCH`, and `REVIEW` with an interactive hypothesis challenge workflow.

#### 3. Window 3: Dossier & Evidence Inspector
- **Entity Dossier:** Real-time deep dive into the selected canvas entity with phone/wiretap records, passport IDs, risk indices, and statutory legal basis.
- **Timeline Reconstruction:** Chronological sequence of intelligence events (AIS transponder blackout, Hawala ledger settlements, unmanifested Kandla port cargo offloads).
- **Evidence Vault:** Cryptographic SHA-256 hashes, file classifications, and forensics summaries.

---

### Phase 4: Forensic File Explorer Drag-and-Drop
- The left-hand sidebar exposes the forensic directory tree under **Case 102 -> INFORMATION**:
  - **People:** Tariq Merchant, Rajesh Sharma, Captain Al-Sayed, Nadia Chen
  - **Organizations:** Al-Barakah Logistics FZE, Vikramaditya Shipping Lines
  - **Vehicles:** MV Sagar Ratna (IMO 921882)
  - **Financial:** Hawala Node #88219 (₹14.8 Cr Settlement Mirror)
  - **Evidence:** Bill of Lading #BOL-9921, CCTV Night Offload Still, Wire Transfer Ledger
- Dragging any item from the explorer directly over the investigation canvas highlights the drop zone and pins the entity at the exact mouse cursor coordinates.

---

### Phase 5: Entity Resolution Review Queue (The 87% Match)
- Navigate to the **Entity Resolution** view (`/entity-resolution` or top nav).
- Examines real-world fuzzy duplicates:
  - **Candidate A:** Rajesh Kumar (Case #102)
  - **Candidate B:** Raju / R. Kumar (Case #044)
- Displays matching attributes (shared phone IMEI, shared vehicle KA-04-E-8821, shared location) alongside contradictory attributes (different recorded Date of Birth).
- Gives the investigator explicit **`ACCEPT MERGE`** or **`REJECT LEAD`** controls, ensuring no erroneous automated merges compromise innocent individuals.

---

### Phase 6: Tamper-Evident HMAC-SHA256 Audit Chain
- Accessible under the **Audit Ledger** view.
- Displays the chronological cryptographic ledger where every action (entity created, bezier connection drawn, Byomkesh query executed) is sealed into an HMAC-SHA256 block.
- Clicking **`VERIFY AUDIT CHAIN`** runs backward link validation across the entire history, verifying judicial admissibility under **BNSS Sec 63**.

---

## 2. Verification Checklist

| Test Item | Command / Procedure | Expected Result | Status |
| :--- | :--- | :--- | :--- |
| **Frontend Production Build** | `npm --prefix frontend run build` | Compiles cleanly in < 1s with 0 errors | **PASSED** |
| **Backend Test Suite** | `pytest backend/tests -v` | 31 of 31 automated tests passed | **PASSED** |
| **Demo Pointer Arrow** | Open login gateway | Animated callout badge & bouncing arrow point to `DEMO ACCESS` | **VERIFIED** |
| **Instant Demo Login** | Click pointer arrow or demo button | Instantly logs in as `admin`, transitions to workspace | **VERIFIED** |
| **3D Window Tilt** | Hover over any window card | Perspective rotation responds smoothly to cursor position | **VERIFIED** |
| **Bezier Roping** | Click "Rope / Link", select target | SVG curve renders dynamically between nodes | **VERIFIED** |
| **Explorer Drag-and-Drop** | Drag suspect from sidebar to canvas | Entity dropped and pinned at cursor location | **VERIFIED** |
| **Zero Secrets Policy** | Check git status & committed files | No API keys or tokens tracked in repository | **VERIFIED** |

---

## 3. Contact & Submission Details

- **Author Website:** [adithyasrivatsa.in](http://adithyasrivatsa.in)
- **Author Email:** [hello@adithyasrivatsa.in](mailto:hello@adithyasrivatsa.in)
- **Team Name:** RevengerZ (Team ID: 166233, VJIT)
- **Problem Statement:** SIH26189 — AI-Powered Criminal Network Analysis System
