import { useState, useEffect, useMemo, useRef } from 'react';
import { useWorkspace } from '../../contexts/WorkspaceContext';
import {
  Folder, FolderPlus, FileText, Users, Building2, Car, DollarSign,
  Search, X, ShieldAlert, ArrowRight, CheckCircle2, ChevronRight,
  ChevronDown, ChevronLeft, ExternalLink, Filter, Layers, Database, Lock, Eye, Plus,
  LayoutGrid, List, ArrowLeft, ArrowUp, HardDrive, ShieldCheck, Check,
  Clock, Hash, FileCode, Archive, Sparkles, AlertTriangle, Monitor,
  Laptop, RefreshCw, Scissors, Copy, Trash2, Edit3, Share2, Info, Star,
  Image as ImageIcon, ZoomIn, Download, FileCheck, Shield, Tag, Compass
} from 'lucide-react';
import './TotalFileExplorer.css';

// ══════════════════════════════════════════════════════════════════════════════
// RESOLVE PREVIEW IMAGE FOR ANY FILE
// ══════════════════════════════════════════════════════════════════════════════

export const getFilePreviewImage = (item) => {
  if (item && item.previewImg) return item.previewImg;
  const name = (item?.name || '').toLowerCase();
  const type = (item?.fileType || item?.type || '').toLowerCase();

  if (name.includes('cctv') || name.endsWith('.mp4') || type.includes('video') || type.includes('cctv')) {
    return '/evidence_previews/cctv_gate3.jpg';
  }
  if (name.includes('dossier') || name.includes('suspect') || type.includes('dossier') || name.includes('facial') || name.includes('shooter') || name.includes('merchant') || name.includes('qureshi')) {
    return '/evidence_previews/suspect_tariq.jpg';
  }
  if (name.includes('satellite') || name.includes('sar') || name.includes('tanker') || name.endsWith('.tiff') || name.includes('telemetry') || name.includes('decklog') || name.includes('imo')) {
    return '/evidence_previews/satellite_radar.jpg';
  }
  if (name.includes('ballistics') || name.includes('glock') || name.includes('striation') || name.includes('spectrometry') || name.includes('cfsl')) {
    return '/evidence_previews/ballistics_glock.jpg';
  }
  if (name.includes('hawala') || name.includes('ledger') || name.includes('swift') || name.includes('account') || name.endsWith('.csv') || name.endsWith('.xlsx')) {
    return '/evidence_previews/fin_ledger.jpg';
  }
  if (name.includes('voip') || name.includes('audio') || name.includes('call') || name.endsWith('.wav') || name.includes('intercept') || name.includes('hydrophone')) {
    return '/evidence_previews/audio_wiretap.jpg';
  }
  if (name.endsWith('.pdf') || name.endsWith('.docx') || name.includes('panchnama') || name.includes('bol') || name.includes('warrant') || name.includes('certificate') || name.includes('sop') || name.includes('roc')) {
    return '/evidence_previews/doc_panchnama.jpg';
  }
  return '/evidence_previews/doc_panchnama.jpg';
};

// ══════════════════════════════════════════════════════════════════════════════
// BUREAU REPOSITORY DIRECTORY TREE WITH AUTHENTIC FORENSIC METADATA
// ══════════════════════════════════════════════════════════════════════════════

const INITIAL_DIRECTORY_TREE = {
  id: 'root',
  name: 'Repository Root',
  type: 'root',
  children: [
    {
      id: 'drive-c',
      name: 'Bureau Vault (C:)',
      type: 'drive',
      children: [
        {
          id: 'dir-active',
          name: 'Active Investigations',
          type: 'folder',
          isSystem: true,
          status: 'ACTIVE',
          children: [
            {
              id: 'case-102',
              name: 'Case 102 — Silver Dune',
              type: 'case_folder',
              caseId: 'case-102',
              status: 'ACTIVE',
              genre: 'Narcotics & Trafficking',
              lead: 'Officer A. Sharma',
              children: [
                {
                  id: 'c102-evd',
                  name: '01_EVIDENCE_VAULT',
                  type: 'folder',
                  children: [
                    { id: 'f-102-1', name: 'Bill_of_Lading_BOL-9921-A.pdf', type: 'file', fileType: 'PDF Document', size: '2.4 MB', date: '2026-09-21', hash: '63737bdaee9ae09c6eb0949d214697f26194b6ceb61947b744d0360814f3b143', tier: 'RAW_DATA', admissibility: 'Admissible under BNSS Sec 63', previewImg: '/evidence_previews/doc_panchnama.jpg' },
                    { id: 'f-102-2', name: 'CCTV_Gate3_Nocturnal_Drop.mp4', type: 'file', fileType: 'CCTV Video', size: '48.2 MB', date: '2026-09-22', hash: 'cf23df2207d99a74fbe169e3eba035e633b65d94bb51f838e0f672a819fb43f1', tier: 'RAW_DATA', admissibility: 'Tamper Evident Timestamp', previewImg: '/evidence_previews/cctv_gate3.jpg' },
                    { id: 'f-102-3', name: 'Al_Barakah_Seized_Ledger.enc.csv', type: 'file', fileType: 'Encrypted Ledger', size: '614 KB', date: '2026-09-23', hash: 'd05e2ea61b47df4ec9502ab65a39cbfa0e7ae9a90962b9f36f88d227b9c9dfdc', tier: 'EVIDENCE', admissibility: 'Forensic Duplicate Verified', previewImg: '/evidence_previews/fin_ledger.jpg' },
                    { id: 'f-102-4', name: 'Terminal_Panchnama_Spot4.docx', type: 'file', fileType: 'Word Document', size: '1.2 MB', date: '2026-09-20', hash: 'f63238ca7f1680d9be69ce535805e55e2d63eaef15b828db50efb942a7862f92', tier: 'EVIDENCE', admissibility: 'Signed by Panchas', previewImg: '/evidence_previews/doc_panchnama.jpg' }
                  ]
                },
                {
                  id: 'c102-ppl',
                  name: '02_PERSONS_OF_INTEREST',
                  type: 'folder',
                  children: [
                    { id: 'p-1', name: 'Tariq "The Anchor" Merchant.dossier', type: 'file', fileType: 'Suspect Dossier', size: '3.8 MB', date: '2026-09-23', hash: '0x44fa1290e210cb99', tier: 'ANALYTICAL_INFERENCE', role: 'Syndicate Coordinator', threat: 'CRITICAL', previewImg: '/evidence_previews/suspect_tariq.jpg' },
                    { id: 'p-2', name: 'Rajesh Sharma.dossier', type: 'file', fileType: 'Suspect Dossier', size: '1.9 MB', date: '2026-09-22', hash: '0x33bc110098ab33ef', tier: 'OBSERVED_EVENT', role: 'Charter Broker', threat: 'HIGH', previewImg: '/evidence_previews/suspect_tariq.jpg' },
                    { id: 'p-3', name: 'Captain Al-Sayed.dossier', type: 'file', fileType: 'Subject Dossier', size: '1.1 MB', date: '2026-09-20', hash: '0x1299df0012ba88fa', tier: 'RAW_DATA', role: 'Vessel Master', threat: 'MEDIUM', previewImg: '/evidence_previews/suspect_tariq.jpg' }
                  ]
                },
                {
                  id: 'c102-shells',
                  name: '03_CORPORATE_SHELLS',
                  type: 'folder',
                  children: [
                    { id: 'org-1', name: 'Al-Barakah Logistics FZE_ROC.pdf', type: 'file', fileType: 'PDF Document', size: '4.2 MB', date: '2026-09-22', hash: '0xbb110992384aae12', tier: 'ANALYTICAL_INFERENCE', role: 'Shell Charterer (Dubai)', previewImg: '/evidence_previews/doc_panchnama.jpg' },
                    { id: 'org-2', name: 'Vikramaditya Shipping Lines_Articles.pdf', type: 'file', fileType: 'PDF Document', size: '2.8 MB', date: '2026-09-18', hash: '0xaa99823120cfda98', tier: 'EXTRACTED_ENTITY', role: 'Nominee Freight', previewImg: '/evidence_previews/doc_panchnama.jpg' }
                  ]
                },
                {
                  id: 'c102-veh',
                  name: '04_VEHICLES_VESSELS',
                  type: 'folder',
                  children: [
                    { id: 'veh-1', name: 'MV_Sagar_Ratna_IMO921882_DeckLog.pdf', type: 'file', fileType: 'PDF Document', size: '14.2 MB', date: '2026-09-21', hash: '0x55aa882910bc8765', tier: 'RAW_DATA', role: 'Bulk Cargo Carrier', previewImg: '/evidence_previews/satellite_radar.jpg' }
                  ]
                },
                {
                  id: 'c102-fin',
                  name: '05_FINANCIAL_LEDGERS',
                  type: 'folder',
                  children: [
                    { id: 'fin-1', name: 'Hawala_Node_Account_88219_Mirror.xlsx', type: 'file', fileType: 'Excel Spreadsheet', size: '890 KB', date: '2026-09-23', hash: '0x11ee882098bcda44', tier: 'VERIFIED_RELATIONSHIP', role: '₹14.8 Cr Settlement', previewImg: '/evidence_previews/fin_ledger.jpg' }
                  ]
                },
                {
                  id: 'c102-sig',
                  name: '06_DIGITAL_SIGINT',
                  type: 'folder',
                  children: [
                    { id: 'dig-1', name: 'Thuraya_Satellite_Voice_Bursts_SAT992.wav', type: 'file', fileType: 'Audio Intercept', size: '32.1 MB', date: '2026-09-23', hash: '0x77ee9910aa2345bc', tier: 'RAW_DATA', role: 'Voice Intercept Frames', previewImg: '/evidence_previews/audio_wiretap.jpg' }
                  ]
                }
              ]
            },
            {
              id: 'case-117',
              name: 'Case 117 — Operation Black Tide',
              type: 'case_folder',
              caseId: 'case-117',
              status: 'ACTIVE',
              genre: 'Corporate Fraud & AML',
              lead: 'Inspector K. Varma',
              children: [
                {
                  id: 'c117-evd',
                  name: '01_EVIDENCE_VAULT',
                  type: 'folder',
                  children: [
                    { id: 'f-117-1', name: 'SWIFT_Transfer_Log_FIU-99201.csv', type: 'file', fileType: 'CSV Data', size: '1.8 MB', date: '2026-09-20', hash: '0x11b9a87c9920a711', tier: 'EVIDENCE', previewImg: '/evidence_previews/fin_ledger.jpg' },
                    { id: 'f-117-2', name: 'Customs_Overinvoicing_Audit_SuratSEZ.pdf', type: 'file', fileType: 'PDF Document', size: '6.4 MB', date: '2026-09-18', hash: '0x22c8a910bf993211', tier: 'EVIDENCE', previewImg: '/evidence_previews/doc_panchnama.jpg' }
                  ]
                },
                {
                  id: 'c117-ppl',
                  name: '02_PERSONS_OF_INTEREST',
                  type: 'folder',
                  children: [
                    { id: 'p-101', name: 'Farhan "Ghost" Qureshi.dossier', type: 'file', fileType: 'Suspect Dossier', size: '2.7 MB', date: '2026-09-21', hash: '0x99cc441290bb34ff', tier: 'ANALYTICAL_INFERENCE', role: 'AML Smurfing Master', previewImg: '/evidence_previews/suspect_tariq.jpg' }
                  ]
                }
              ]
            },
            {
              id: 'case-143',
              name: 'Case 143 — Red Sand Syndicate',
              type: 'case_folder',
              caseId: 'case-143',
              status: 'ACTIVE',
              genre: 'Human Trafficking',
              lead: 'Special Agent D. Roy',
              children: [
                {
                  id: 'c143-evd',
                  name: '01_EVIDENCE_VAULT',
                  type: 'folder',
                  children: [
                    { id: 'f-143-1', name: 'Porbandar_Creek_Hydrophone_Log.wav', type: 'file', fileType: 'Audio Recording', size: '34.1 MB', date: '2026-09-19', hash: '0x77aa8921c33b91a0', tier: 'RAW_DATA', previewImg: '/evidence_previews/audio_wiretap.jpg' },
                    { id: 'f-143-2', name: 'Forged_Seafarer_Certificates.pdf', type: 'file', fileType: 'PDF Document', size: '4.9 MB', date: '2026-09-17', hash: '0x88bb7710ff2990aa', tier: 'EVIDENCE', previewImg: '/evidence_previews/doc_panchnama.jpg' }
                  ]
                }
              ]
            },
            {
              id: 'case-155',
              name: 'Case 155 — Blue Horizon Sanctions Evasion',
              type: 'case_folder',
              caseId: 'case-155',
              status: 'ACTIVE',
              genre: 'Civil & Maritime Disputes',
              lead: 'Maritime Advocate N. Joshi',
              children: [
                {
                  id: 'c155-evd',
                  name: '01_EVIDENCE_VAULT',
                  type: 'folder',
                  children: [
                    { id: 'f-155-1', name: 'SAR_Satellite_Dark_Tanker_Track.tiff', type: 'file', fileType: 'TIFF Image', size: '38.4 MB', date: '2026-09-20', hash: '0x11ee88bb9922cc44', tier: 'RAW_DATA', previewImg: '/evidence_previews/satellite_radar.jpg' }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'dir-done',
          name: 'Cases Done (Closed & Convicted)',
          type: 'folder',
          isSystem: true,
          status: 'DONE',
          children: [
            {
              id: 'case-108',
              name: 'Case 108 — Waterfront Contract Hit [DONE]',
              type: 'case_folder',
              caseId: 'case-108',
              status: 'DONE',
              genre: 'Homicide & Murder',
              lead: 'Sr. Inspector R. Deshmukh',
              resolution: 'Shooter Vikram Jadhav sentenced to life imprisonment by Bombay Sessions Court.',
              children: [
                {
                  id: 'c108-evd',
                  name: '01_EVIDENCE_VAULT',
                  type: 'folder',
                  children: [
                    { id: 'f-108-1', name: '9mm_Glock_Striation_Ballistics_Certified.pdf', type: 'file', fileType: 'Certified Ballistics', size: '5.2 MB', date: '2026-09-18', hash: '0xaa19c344919028ab', tier: 'EVIDENCE', admissibility: 'CFSL Forensic Certified', previewImg: '/evidence_previews/ballistics_glock.jpg' },
                    { id: 'f-108-2', name: 'Dock4_CCTV_Shooter_Facial_Recognition.png', type: 'file', fileType: 'PNG Image', size: '4.8 MB', date: '2026-09-17', hash: '0x7129ff44c01289ae', tier: 'EVIDENCE', admissibility: 'Court Admitted Exhibit 12', previewImg: '/evidence_previews/suspect_tariq.jpg' },
                    { id: 'f-108-3', name: 'Empty_Cartridge_Spot4_Panchnama.pdf', type: 'file', fileType: 'PDF Document', size: '1.8 MB', date: '2026-09-17', hash: '0x88ba11290bb34109', tier: 'EVIDENCE', admissibility: 'Signed by Panchas', previewImg: '/evidence_previews/doc_panchnama.jpg' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export default function TotalFileExplorer({ onClose } = {}) {
  const { setActiveCaseId, setActiveNavSection, addNodeToCanvas, openWorkspace, workspaces } = useWorkspace();

  // File system state
  const [fs, setFs] = useState(INITIAL_DIRECTORY_TREE);

  // Navigation stack
  const [pathStack, setPathStack] = useState(['root', 'drive-c', 'dir-active', 'case-102', 'c102-evd']);
  const [history, setHistory] = useState([['root', 'drive-c', 'dir-active', 'case-102', 'c102-evd']]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Selection & View mode
  const [selectedItemId, setSelectedItemId] = useState('f-102-2'); // Default selected to CCTV
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'gallery' | 'details'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'IMAGE' | 'DOC' | 'DOSSIER'

  // Inline renaming
  const [renamingId, setRenamingId] = useState(null);
  const [renameText, setRenameText] = useState('');

  // Right-Click Context Menu
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    type: 'background',
    item: null
  });

  // Evidence Lightbox Preview Modal
  const [lightboxFile, setLightboxFile] = useState(null);

  // Tree nodes expanded
  const [expandedNodes, setExpandedNodes] = useState({
    'root': true,
    'drive-c': true,
    'dir-active': true,
    'case-102': true,
    'dir-done': true
  });

  // Sort settings
  const [sortBy, setSortBy] = useState('name'); // 'name' | 'date' | 'size'

  // Helper: Find node by ID
  const findNodeById = (node, id) => {
    if (!node) return null;
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findNodeById(child, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Current folder node
  const currentFolderId = pathStack[pathStack.length - 1];
  const currentFolder = useMemo(() => {
    return findNodeById(fs, currentFolderId) || fs.children[0]?.children?.[0] || fs;
  }, [fs, currentFolderId]);

  // Current breadcrumb nodes
  const breadcrumbNodes = useMemo(() => {
    return pathStack.map(id => findNodeById(fs, id)).filter(Boolean);
  }, [fs, pathStack]);

  // Navigate to folder
  const navigateTo = (folderId) => {
    if (folderId === currentFolderId) return;
    const newStack = [];

    const buildPath = (node, targetId, currentTrail = []) => {
      if (!node) return false;
      if (node.id === targetId) {
        newStack.push(...currentTrail, node.id);
        return true;
      }
      if (node.children) {
        for (const child of node.children) {
          if (buildPath(child, targetId, [...currentTrail, node.id])) {
            return true;
          }
        }
      }
      return false;
    };

    buildPath(fs, folderId);

    if (newStack.length > 0) {
      setPathStack(newStack);
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newStack);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setSelectedItemId(null);
      setContextMenu({ visible: false, x: 0, y: 0, type: 'background', item: null });
    }
  };

  // History controls
  const handleGoBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setPathStack(history[prevIndex]);
      setSelectedItemId(null);
    }
  };

  const handleGoForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setPathStack(history[nextIndex]);
      setSelectedItemId(null);
    }
  };

  const handleGoUp = () => {
    if (pathStack.length > 1) {
      const newStack = pathStack.slice(0, pathStack.length - 1);
      setPathStack(newStack);
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newStack);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setSelectedItemId(null);
    }
  };

  // Toggle tree expansion
  const toggleNodeExpansion = (nodeId, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setExpandedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  // Double click handling
  const handleItemDoubleClick = (item) => {
    if (item.type === 'folder' || item.type === 'case_folder' || item.type === 'drive') {
      navigateTo(item.id);
    } else {
      setLightboxFile(item);
    }
  };

  // Pin item to Investigation Workspace Canvas (Safely without crashing)
  const handlePinToCanvas = (item) => {
    if (!item) return;
    const parentCase = breadcrumbNodes.find(n => n.type === 'case_folder') || { name: 'Bureau Vault' };

    if (typeof addNodeToCanvas === 'function') {
      addNodeToCanvas({
        id: item.id || `node-${Date.now()}`,
        name: item.name,
        type: item.fileType || item.type || 'Case Exhibit',
        role: item.role || item.fileType || 'Evidence File',
        threat: item.threat || 'HIGH',
        provenance: item.tier || 'EVIDENCE',
        details: `File from ${parentCase.name}. SHA-256: ${item.hash || 'Verified Sealed'} (${item.size || 'Artifact'}).`
      });
    }

    if (parentCase.caseId && typeof setActiveCaseId === 'function') {
      setActiveCaseId(parentCase.caseId);
      const matchingWs = (workspaces || []).find(w => w.caseId === parentCase.caseId);
      if (matchingWs && typeof openWorkspace === 'function') {
        openWorkspace(matchingWs.id);
      }
    }

    if (typeof setActiveNavSection === 'function') {
      setActiveNavSection('workspace');
    }

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  // Create New Folder
  const handleCreateNewFolder = () => {
    const folderName = prompt('Enter folder name:', 'NEW_EVIDENCE_FOLDER');
    if (!folderName || !folderName.trim()) return;

    const newFolderObj = {
      id: `folder-${Date.now()}`,
      name: folderName.trim(),
      type: 'folder',
      date: new Date().toISOString().split('T')[0],
      children: []
    };

    const addRecursive = (node) => {
      if (node.id === currentFolderId) {
        return {
          ...node,
          children: [...(node.children || []), newFolderObj]
        };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(addRecursive)
        };
      }
      return node;
    };

    setFs(prev => addRecursive(prev));
    setContextMenu(prev => ({ ...prev, visible: false }));
  };

  // Delete Item
  const handleDeleteItem = (targetItem) => {
    const itemToDelete = targetItem || contextMenu.item;
    if (!itemToDelete) return;

    const deleteRecursive = (node) => {
      if (node.id === currentFolderId && node.children) {
        return {
          ...node,
          children: node.children.filter(c => c.id !== itemToDelete.id)
        };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(deleteRecursive)
        };
      }
      return node;
    };

    setFs(prev => deleteRecursive(prev));
    if (selectedItemId === itemToDelete.id) setSelectedItemId(null);
    setContextMenu(prev => ({ ...prev, visible: false }));
  };

  // Rename Confirm
  const handleConfirmRename = () => {
    if (!renamingId || !renameText.trim()) {
      setRenamingId(null);
      return;
    }

    const renameRecursive = (node) => {
      if (node.id === renamingId) {
        return { ...node, name: renameText.trim() };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(renameRecursive)
        };
      }
      return node;
    };

    setFs(prev => renameRecursive(prev));
    setRenamingId(null);
  };

  // Current folder items filtered & sorted
  const currentItems = useMemo(() => {
    if (!currentFolder || !currentFolder.children) return [];
    let items = [...currentFolder.children];

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(i =>
        (i.name || '').toLowerCase().includes(q) ||
        (i.fileType || '').toLowerCase().includes(q) ||
        (i.role || '').toLowerCase().includes(q)
      );
    }

    // Filter by Type Chip
    if (filterType === 'IMAGE') {
      items = items.filter(i => i.type !== 'file' || (i.fileType || '').includes('Image') || (i.fileType || '').includes('CCTV') || (i.name || '').match(/\.(png|jpg|jpeg|tiff|mp4)$/i));
    } else if (filterType === 'DOC') {
      items = items.filter(i => i.type !== 'file' || (i.fileType || '').includes('Document') || (i.name || '').match(/\.(pdf|docx|txt)$/i));
    } else if (filterType === 'DOSSIER') {
      items = items.filter(i => i.type !== 'file' || (i.fileType || '').includes('Dossier'));
    }

    // Sort items (folders always first)
    items.sort((a, b) => {
      const aIsFolder = a.type !== 'file';
      const bIsFolder = b.type !== 'file';
      if (aIsFolder && !bIsFolder) return -1;
      if (!aIsFolder && bIsFolder) return 1;

      if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
      if (sortBy === 'date') return (b.date || '').localeCompare(a.date || '');
      if (sortBy === 'size') return (b.size || '').localeCompare(a.size || '');
      return 0;
    });

    return items;
  }, [currentFolder, searchQuery, filterType, sortBy]);

  // Selected item object
  const selectedItem = useMemo(() => {
    return currentItems.find(i => i.id === selectedItemId);
  }, [currentItems, selectedItemId]);

  // Context Menu Handlers
  const handleItemContextMenu = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedItemId(item.id);
    setContextMenu({
      visible: true,
      x: Math.min(e.clientX, window.innerWidth - 230),
      y: Math.min(e.clientY, window.innerHeight - 260),
      type: 'item',
      item
    });
  };

  const handleCanvasContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: Math.min(e.clientX, window.innerWidth - 230),
      y: Math.min(e.clientY, window.innerHeight - 260),
      type: 'background',
      item: null
    });
  };

  // Close context menu on outside click or escape
  useEffect(() => {
    const handleGlobalClick = () => {
      if (contextMenu.visible) setContextMenu(prev => ({ ...prev, visible: false }));
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setContextMenu(prev => ({ ...prev, visible: false }));
        setLightboxFile(null);
      }
    };
    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [contextMenu.visible]);

  // Tree Node Renderer in Left Sidebar
  const renderTreeNode = (node) => {
    if (!node || node.type === 'file') return null;
    const isExpanded = !!expandedNodes[node.id];
    const isSelected = currentFolderId === node.id;
    const hasFolderChildren = node.children && node.children.some(c => c.type !== 'file');

    return (
      <div key={node.id} className="nb-tree-node-wrapper">
        <div
          className={`nb-tree-node-item ${isSelected ? 'selected' : ''}`}
          onClick={() => navigateTo(node.id)}
        >
          {hasFolderChildren ? (
            <span
              className="nb-tree-arrow"
              onClick={(e) => toggleNodeExpansion(node.id, e)}
            >
              {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
            </span>
          ) : (
            <span style={{ width: 16 }} />
          )}

          {node.type === 'drive' ? (
            <HardDrive size={14} className="text-blue" />
          ) : node.type === 'root' ? (
            <Monitor size={14} className="text-black" />
          ) : node.status === 'DONE' ? (
            <CheckCircle2 size={14} className="text-green" />
          ) : (
            <Folder size={14} className="text-amber" />
          )}

          <span className="nb-tree-label">{node.name}</span>
          {node.status === 'DONE' && <span className="nb-quick-badge badge-done">DONE</span>}
        </div>

        {isExpanded && node.children && (
          <div className="nb-tree-subchildren">
            {node.children.map(c => renderTreeNode(c))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="nb-explorer-container" onClick={() => setSelectedItemId(null)}>
      
      {/* ── 1. NEOBRUTALIST TOP ACTION & NAVIGATION STRIP ────────────── */}
      <header className="nb-explorer-topbar" onClick={e => e.stopPropagation()}>
        {/* Brand Tag */}
        <div className="nb-brand-tag">
          <Database size={13} className="nb-brand-tag-icon" />
          <span>VAULT-C // BUREAU EVIDENCE ARCHIVE</span>
        </div>

        {/* Navigation Controls: Back, Forward, Up, Refresh */}
        <div className="nb-nav-controls">
          <button
            className="nb-icon-btn"
            onClick={handleGoBack}
            disabled={historyIndex <= 0}
            title="Go Back"
          >
            <ArrowLeft size={14} />
          </button>
          <button
            className="nb-icon-btn"
            onClick={handleGoForward}
            disabled={historyIndex >= history.length - 1}
            title="Go Forward"
          >
            <ArrowRight size={14} />
          </button>
          <button
            className="nb-icon-btn"
            onClick={handleGoUp}
            disabled={pathStack.length <= 1}
            title="Up to Parent Directory"
          >
            <ArrowUp size={14} />
          </button>
          <button
            className="nb-icon-btn"
            onClick={() => setFs(prev => ({ ...prev }))}
            title="Refresh Directory"
          >
            <RefreshCw size={13} />
          </button>
        </div>

        {/* Clickable Breadcrumbs Capsule */}
        <nav className="nb-breadcrumbs-capsule" aria-label="Breadcrumb">
          <HardDrive size={13} className="text-blue flex-shrink-0" />
          {breadcrumbNodes.map((node, idx) => (
            <div key={node.id} className="nb-crumb-item">
              {idx > 0 && <span className="nb-crumb-divider">/</span>}
              <button
                className={`nb-crumb-btn ${idx === breadcrumbNodes.length - 1 ? 'active' : ''}`}
                onClick={() => navigateTo(node.id)}
              >
                {node.name}
              </button>
            </div>
          ))}
        </nav>

        {/* Topbar Search & Tools */}
        <div className="nb-topbar-tools">
          {/* Search Box */}
          <div className="nb-search-wrap">
            <Search size={13} className="text-muted flex-shrink-0" />
            <input
              type="text"
              placeholder={`Search ${currentFolder.name}...`}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="nb-search-input"
            />
            {searchQuery && (
              <button className="nb-search-clear" onClick={() => setSearchQuery('')}>
                <X size={12} />
              </button>
            )}
          </div>

          {/* View Mode Switcher */}
          <div className="nb-view-switcher">
            <button
              className={`nb-view-btn ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
              title="Visual Cards View with Image Previews"
            >
              <LayoutGrid size={13} />
              <span>Cards</span>
            </button>
            <button
              className={`nb-view-btn ${viewMode === 'gallery' ? 'active' : ''}`}
              onClick={() => setViewMode('gallery')}
              title="Media Gallery View"
            >
              <ImageIcon size={13} />
              <span>Gallery</span>
            </button>
            <button
              className={`nb-view-btn ${viewMode === 'details' ? 'active' : ''}`}
              onClick={() => setViewMode('details')}
              title="Forensic Ledger Table View"
            >
              <List size={13} />
              <span>Ledger</span>
            </button>
          </div>

          {/* Primary Action Buttons */}
          <button
            className="nb-btn nb-btn-primary"
            onClick={handleCreateNewFolder}
            title="Create New Folder"
          >
            <FolderPlus size={14} />
            <span>New Folder</span>
          </button>
        </div>
      </header>

      {/* ── 2. MAIN WORKSPACE (SIDEBAR + CENTER STAGE + INSPECTOR) ────── */}
      <div className="nb-explorer-main">

        {/* ══ LEFT SIDEBAR (QUICK ACCESS & DIRECTORY TREE) ══════════════ */}
        <aside className="nb-explorer-sidebar" onClick={e => e.stopPropagation()}>
          {/* Quick Access Section */}
          <div className="nb-sidebar-group">
            <div className="nb-sidebar-title">
              <span>QUICK ACCESS</span>
              <Compass size={12} />
            </div>

            <div
              className={`nb-quick-link ${currentFolderId === 'dir-active' ? 'active' : ''}`}
              onClick={() => navigateTo('dir-active')}
            >
              <Star size={13} className="text-amber" />
              <span>Active Cases</span>
              <span className="nb-quick-badge badge-active">6 OPEN</span>
            </div>

            <div
              className={`nb-quick-link ${currentFolderId === 'dir-done' ? 'active' : ''}`}
              onClick={() => navigateTo('dir-done')}
            >
              <CheckCircle2 size={13} className="text-green" />
              <span>Cases Closed (Done)</span>
              <span className="nb-quick-badge badge-done">CONVICTED</span>
            </div>

            <div
              className={`nb-quick-link ${currentFolderId === 'c102-evd' ? 'active' : ''}`}
              onClick={() => navigateTo('c102-evd')}
            >
              <ImageIcon size={13} className="text-blue" />
              <span>Case 102 Evidence Vault</span>
              <span className="nb-quick-badge badge-media">PHOTOS/CCTV</span>
            </div>

            <div
              className={`nb-quick-link ${currentFolderId === 'c102-ppl' ? 'active' : ''}`}
              onClick={() => navigateTo('c102-ppl')}
            >
              <Users size={13} className="text-purple" />
              <span>Persons of Interest</span>
              <span className="nb-quick-badge">DOSSIERS</span>
            </div>
          </div>

          <div className="nb-sidebar-divider" />

          {/* Filter By Evidence Type */}
          <div className="nb-sidebar-group">
            <div className="nb-sidebar-title">
              <span>EVIDENCE FILTER</span>
              <Filter size={11} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: '4px 6px' }}>
              <button
                className={`nb-btn ${filterType === 'ALL' ? 'nb-btn-yellow' : ''}`}
                style={{ height: 26, fontSize: 10, padding: '0 8px' }}
                onClick={() => setFilterType('ALL')}
              >
                All ({currentFolder.children?.length || 0})
              </button>
              <button
                className={`nb-btn ${filterType === 'IMAGE' ? 'nb-btn-primary' : ''}`}
                style={{ height: 26, fontSize: 10, padding: '0 8px' }}
                onClick={() => setFilterType('IMAGE')}
              >
                Images & Video
              </button>
              <button
                className={`nb-btn ${filterType === 'DOC' ? 'nb-btn-yellow' : ''}`}
                style={{ height: 26, fontSize: 10, padding: '0 8px' }}
                onClick={() => setFilterType('DOC')}
              >
                Documents
              </button>
              <button
                className={`nb-btn ${filterType === 'DOSSIER' ? 'nb-btn-primary' : ''}`}
                style={{ height: 26, fontSize: 10, padding: '0 8px' }}
                onClick={() => setFilterType('DOSSIER')}
              >
                Dossiers
              </button>
            </div>
          </div>

          <div className="nb-sidebar-divider" />

          {/* Directory Tree Section */}
          <div className="nb-sidebar-group">
            <div className="nb-sidebar-title">
              <span>VAULT REPOSITORY TREE</span>
              <Database size={11} />
            </div>
            {renderTreeNode(fs)}
          </div>
        </aside>

        {/* ══ CENTER STAGE (THE FOLDER SECTION) ════════════════════════ */}
        <main
          className="nb-explorer-canvas"
          onContextMenu={handleCanvasContextMenu}
          onClick={() => setSelectedItemId(null)}
        >
          {/* Case Folder Header Strip if Case Folder */}
          {currentFolder.type === 'case_folder' && (
            <div className="nb-folder-header-strip">
              <div className="nb-folder-strip-info">
                <span className={`nb-status-pill ${currentFolder.status === 'DONE' ? 'status-done-pill' : 'status-active-pill'}`}>
                  {currentFolder.status === 'DONE' ? 'CASE DONE · CONVICTION SECURED' : 'UNDER ACTIVE INVESTIGATION'}
                </span>
                <h2 className="nb-folder-header-title">{currentFolder.name}</h2>
                <p className="nb-folder-header-desc">
                  {currentFolder.resolution || `Lead Investigator: ${currentFolder.lead || 'Special Bureau Cell'} · Classification: ${currentFolder.genre}`}
                </p>
              </div>

              <button
                className="nb-btn nb-btn-primary"
                onClick={() => currentFolder.caseId && handlePinToCanvas({ name: currentFolder.name, id: currentFolder.id })}
              >
                <ExternalLink size={13} />
                <span>Open in Workspace</span>
              </button>
            </div>
          )}

          {/* Empty Folder Notice */}
          {currentItems.length === 0 && (
            <div className="nb-empty-state">
              <Folder size={48} className="text-muted" />
              <h3>This folder is empty</h3>
              <p>There are no exhibits or subfolders stored in this directory.</p>
              <button className="nb-btn nb-btn-primary" onClick={handleCreateNewFolder}>
                <Plus size={14} />
                <span>Create New Folder</span>
              </button>
            </div>
          )}

          {/* ── VIEW 1: CARDS VIEW (WITH VISUAL IMAGE PREVIEWS) ────────── */}
          {viewMode === 'cards' && currentItems.length > 0 && (
            <div className="nb-items-grid">
              {currentItems.map(item => {
                const isSelected = selectedItemId === item.id;
                const isFolder = item.type !== 'file';
                const isRenaming = renamingId === item.id;
                const previewImg = !isFolder ? getFilePreviewImage(item) : null;

                // 📁 FOLDER CARD
                if (isFolder) {
                  const subFiles = (item.children || []).filter(c => c.type === 'file');
                  const miniThumbs = subFiles.slice(0, 3).map(f => getFilePreviewImage(f));

                  return (
                    <div
                      key={item.id}
                      className={`nb-folder-card ${isSelected ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItemId(item.id);
                      }}
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        handleItemDoubleClick(item);
                      }}
                      onContextMenu={(e) => handleItemContextMenu(e, item)}
                    >
                      <div className={`nb-folder-top-tab ${item.status === 'DONE' ? 'folder-done' : ''}`}>
                        <div className="nb-folder-tab-left">
                          <Folder size={18} />
                          <span>FOLDER</span>
                        </div>
                        <span className="nb-folder-count-pill">
                          {item.children?.length || 0} ITEMS
                        </span>
                      </div>

                      {/* Mini Thumbnail Previews of Files Inside Folder */}
                      {miniThumbs.length > 0 && (
                        <div className="nb-folder-preview-strip">
                          {miniThumbs.map((thumb, idx) => (
                            <img
                              key={idx}
                              src={thumb}
                              alt="Folder file preview"
                              className="nb-folder-mini-thumb"
                              loading="lazy"
                            />
                          ))}
                        </div>
                      )}

                      <div className="nb-folder-card-body">
                        {isRenaming ? (
                          <input
                            type="text"
                            value={renameText}
                            onChange={e => setRenameText(e.target.value)}
                            onBlur={handleConfirmRename}
                            onKeyDown={e => {
                              if (e.key === 'Enter') handleConfirmRename();
                              if (e.key === 'Escape') setRenamingId(null);
                            }}
                            autoFocus
                            onClick={e => e.stopPropagation()}
                            style={{ border: '2px solid #000', padding: '3px 6px', fontWeight: 800 }}
                          />
                        ) : (
                          <span className="nb-folder-card-name">{item.name}</span>
                        )}
                        <span className="nb-folder-card-sub">
                          {item.genre || (item.children?.length ? `${item.children.length} artifacts` : 'Empty')}
                        </span>
                      </div>
                    </div>
                  );
                }

                // 📄 FILE CARD WITH REAL IMAGE PREVIEW
                return (
                  <div
                    key={item.id}
                    className={`nb-file-card ${isSelected ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItemId(item.id);
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      handleItemDoubleClick(item);
                    }}
                    onContextMenu={(e) => handleItemContextMenu(e, item)}
                  >
                    {/* Visual Image of the File */}
                    <div className="nb-file-preview-frame">
                      <img
                        src={previewImg}
                        alt={item.name}
                        className="nb-file-image"
                        loading="lazy"
                      />
                      <div className="nb-image-scanlines" />

                      {/* Overlay Badges */}
                      <div className="nb-img-overlay-badge">
                        <Tag size={10} />
                        <span>{item.fileType?.toUpperCase() || 'EXHIBIT'}</span>
                      </div>

                      <div className={`nb-img-tier-badge ${item.tier === 'RAW_DATA' ? 'tier-raw' : item.tier === 'ANALYTICAL_INFERENCE' ? 'tier-inference' : 'tier-evidence'}`}>
                        {item.tier || 'EVIDENCE'}
                      </div>

                      {/* Hover Quick Actions */}
                      <div className="nb-img-hover-actions">
                        <button
                          className="nb-action-icon-pill"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightboxFile(item);
                          }}
                          title="View High-Res Image"
                        >
                          <ZoomIn size={13} />
                        </button>
                        <button
                          className="nb-action-icon-pill"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePinToCanvas(item);
                          }}
                          title="Pin to Investigation Canvas"
                        >
                          <Star size={13} className="text-amber" />
                        </button>
                      </div>
                    </div>

                    {/* Card Body & Evidentiary Metadata */}
                    <div className="nb-file-body">
                      {isRenaming ? (
                        <input
                          type="text"
                          value={renameText}
                          onChange={e => setRenameText(e.target.value)}
                          onBlur={handleConfirmRename}
                          onKeyDown={e => {
                            if (e.key === 'Enter') handleConfirmRename();
                            if (e.key === 'Escape') setRenamingId(null);
                          }}
                          autoFocus
                          onClick={e => e.stopPropagation()}
                          style={{ border: '2px solid #000', padding: '2px 4px', fontWeight: 800 }}
                        />
                      ) : (
                        <span className="nb-file-title" title={item.name}>
                          {item.name}
                        </span>
                      )}

                      <div className="nb-file-meta-row">
                        <span>{item.size || '32 KB'}</span>
                        <span>{item.date || '2026-09-22'}</span>
                      </div>

                      {item.hash && (
                        <div className="nb-file-hash-pill" title={`SHA-256: ${item.hash}`}>
                          SHA: {item.hash.substring(0, 16)}...
                        </div>
                      )}

                      {item.admissibility && (
                        <div className="nb-admissibility-tag">
                          <CheckCircle2 size={11} />
                          <span>{item.admissibility}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── VIEW 2: VISUAL GALLERY VIEW ───────────────────────────── */}
          {viewMode === 'gallery' && currentItems.length > 0 && (
            <div className="nb-gallery-grid">
              {currentItems.map(item => {
                const isSelected = selectedItemId === item.id;
                const isFolder = item.type !== 'file';
                const previewImg = !isFolder ? getFilePreviewImage(item) : null;

                if (isFolder) {
                  return (
                    <div
                      key={item.id}
                      className={`nb-folder-card ${isSelected ? 'selected' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setSelectedItemId(item.id); }}
                      onDoubleClick={(e) => { e.stopPropagation(); handleItemDoubleClick(item); }}
                    >
                      <div className="nb-folder-top-tab">
                        <div className="nb-folder-tab-left">
                          <Folder size={18} />
                          <span>{item.name}</span>
                        </div>
                        <span className="nb-folder-count-pill">{item.children?.length || 0}</span>
                      </div>
                      <div className="nb-folder-card-body">
                        <span>Double-click to inspect folder contents</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={item.id}
                    className={`nb-gallery-card ${isSelected ? 'selected' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setSelectedItemId(item.id); }}
                    onDoubleClick={(e) => { e.stopPropagation(); handleItemDoubleClick(item); }}
                  >
                    <div className="nb-gallery-img-wrap">
                      <img src={previewImg} alt={item.name} className="nb-gallery-img" loading="lazy" />
                      <div className="nb-image-scanlines" />
                      <div className="nb-img-overlay-badge">
                        <span>{item.fileType || 'MEDIA'}</span>
                      </div>
                    </div>
                    <div className="nb-gallery-body">
                      <span className="nb-file-title">{item.name}</span>
                      <div className="nb-file-meta-row">
                        <span>{item.size}</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── VIEW 3: DETAILS TABLE (FORENSIC LEDGER) ────────────────── */}
          {viewMode === 'details' && currentItems.length > 0 && (
            <div className="nb-details-table-wrap">
              <table className="nb-details-table">
                <thead>
                  <tr>
                    <th style={{ width: 50 }}>Thumb</th>
                    <th onClick={() => setSortBy('name')}>Name {sortBy === 'name' && '▲'}</th>
                    <th onClick={() => setSortBy('date')}>Date Modified {sortBy === 'date' && '▲'}</th>
                    <th>Type</th>
                    <th onClick={() => setSortBy('size')}>Size {sortBy === 'size' && '▲'}</th>
                    <th>SHA-256 Checksum</th>
                    <th>Admissibility</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(item => {
                    const isSelected = selectedItemId === item.id;
                    const isFolder = item.type !== 'file';
                    const previewImg = !isFolder ? getFilePreviewImage(item) : null;

                    return (
                      <tr
                        key={item.id}
                        className={isSelected ? 'selected' : ''}
                        onClick={(e) => { e.stopPropagation(); setSelectedItemId(item.id); }}
                        onDoubleClick={(e) => { e.stopPropagation(); handleItemDoubleClick(item); }}
                        onContextMenu={(e) => handleItemContextMenu(e, item)}
                      >
                        <td>
                          {isFolder ? (
                            <Folder size={20} className="text-amber" />
                          ) : (
                            <img src={previewImg} alt="Thumb" className="nb-table-thumb" />
                          )}
                        </td>
                        <td style={{ fontWeight: 800 }}>{item.name}</td>
                        <td className="font-mono text-muted">{item.date || '2026-09-22'}</td>
                        <td>{item.fileType || (isFolder ? 'Folder' : 'Document')}</td>
                        <td className="font-mono">{item.size || '—'}</td>
                        <td className="font-mono" style={{ fontSize: 10 }}>{item.hash ? `${item.hash.substring(0, 16)}...` : '—'}</td>
                        <td>
                          {item.admissibility ? (
                            <span style={{ color: '#16a34a', fontWeight: 800 }}>{item.admissibility}</span>
                          ) : (
                            <span className="text-muted">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>

        {/* ══ RIGHT INSPECTOR DRAWER (EVIDENCE DOSSIER & LARGE IMAGE) ══ */}
        {selectedItem && selectedItem.type === 'file' && (
          <aside className="nb-inspector-drawer" onClick={e => e.stopPropagation()}>
            <div className="nb-inspector-header">
              <h4>EVIDENCE INSPECTOR</h4>
              <button
                className="nb-icon-btn"
                style={{ width: 24, height: 24 }}
                onClick={() => setSelectedItemId(null)}
              >
                <X size={12} />
              </button>
            </div>

            <div className="nb-inspector-body">
              {/* Large Image of the Selected File */}
              <div
                className="nb-inspector-image-card"
                onClick={() => setLightboxFile(selectedItem)}
                title="Click to view full lightbox"
              >
                <img
                  src={getFilePreviewImage(selectedItem)}
                  alt={selectedItem.name}
                  className="nb-inspector-image"
                />
                <div className="nb-image-scanlines" />
                <div className="nb-inspector-zoom-hint">
                  <ZoomIn size={11} />
                  <span>EXPAND IMAGE</span>
                </div>
              </div>

              {/* Cryptographic & Forensic Metadata */}
              <div className="nb-inspector-meta-box">
                <div className="nb-meta-entry">
                  <span className="nb-meta-key">FILE NAME</span>
                  <span className="nb-meta-val" style={{ fontWeight: 800 }}>{selectedItem.name}</span>
                </div>
                <div className="nb-meta-entry">
                  <span className="nb-meta-key">EPISTEMIC TIER</span>
                  <span className="nb-meta-val" style={{ color: '#ff2a85', fontWeight: 800 }}>
                    {selectedItem.tier || 'EVIDENCE'}
                  </span>
                </div>
                <div className="nb-meta-entry">
                  <span className="nb-meta-key">SHA-256 INTEGRITY HASH</span>
                  <span className="nb-meta-val text-blue font-mono" style={{ fontSize: 10 }}>
                    {selectedItem.hash || '63737bdaee9ae09c6eb0949d214697f26194b6ce'}
                  </span>
                </div>
                <div className="nb-meta-entry">
                  <span className="nb-meta-key">COURT ADMISSIBILITY</span>
                  <span className="nb-meta-val text-green">
                    {selectedItem.admissibility || 'BNSS Sec 63 Forensic Duplicate'}
                  </span>
                </div>
                <div className="nb-meta-entry">
                  <span className="nb-meta-key">FILE SIZE & DATE</span>
                  <span className="nb-meta-val">
                    {selectedItem.size || '2.4 MB'} · {selectedItem.date || '2026-09-22'}
                  </span>
                </div>
              </div>

              {/* Inspector Action Buttons */}
              <div className="nb-inspector-actions">
                <button
                  className="nb-btn nb-btn-primary"
                  onClick={() => handlePinToCanvas(selectedItem)}
                >
                  <Star size={13} className="text-amber" />
                  <span>Pin to Workspace Canvas</span>
                </button>
                <button
                  className="nb-btn"
                  onClick={() => setLightboxFile(selectedItem)}
                >
                  <Eye size={13} />
                  <span>Open Full Evidence Viewer</span>
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* ── 3. BOTTOM STATUS BAR ─────────────────────────────────────── */}
      <footer className="nb-explorer-statusbar" onClick={e => e.stopPropagation()}>
        <div className="nb-status-item">
          <span>{currentItems.length} items in current directory</span>
          {selectedItem && (
            <>
              <span className="nb-status-sep">|</span>
              <span style={{ fontWeight: 800 }}>Selected: {selectedItem.name}</span>
              {selectedItem.size && <span>({selectedItem.size})</span>}
            </>
          )}
        </div>

        <div className="nb-status-item">
          <ShieldCheck size={13} className="text-green" />
          <span>BNSS Sec 63 Tamper-Evident SHA-256 Ledger Synchronized</span>
        </div>
      </footer>

      {/* ── 4. LIGHTBOX / FULL EVIDENCE VIEWER MODAL ─────────────────── */}
      {lightboxFile && (
        <div className="nb-modal-backdrop" onClick={() => setLightboxFile(null)}>
          <div className="nb-modal-window" onClick={e => e.stopPropagation()}>
            <div className="nb-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ImageIcon size={16} />
                <h3>FORENSIC EVIDENCE VIEWER // {lightboxFile.name}</h3>
              </div>
              <button className="nb-icon-btn" onClick={() => setLightboxFile(null)}>
                <X size={14} />
              </button>
            </div>

            <div className="nb-modal-body">
              <div className="nb-modal-img-viewer">
                <img
                  src={getFilePreviewImage(lightboxFile)}
                  alt={lightboxFile.name}
                />
              </div>

              <div className="nb-inspector-meta-box">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <span className="nb-meta-key">EVIDENTIARY HASH</span>
                    <p className="font-mono text-blue" style={{ margin: '4px 0 0 0', wordBreak: 'break-all' }}>
                      {lightboxFile.hash || 'cf23df2207d99a74fbe169e3eba035e633b65d94bb51f838e0f672a819fb43f1'}
                    </p>
                  </div>
                  <div>
                    <span className="nb-meta-key">LEGAL STATUS</span>
                    <p style={{ margin: '4px 0 0 0', fontWeight: 800, color: '#16a34a' }}>
                      {lightboxFile.admissibility || 'Admissible under BNSS Sec 63 / Court Ready'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="nb-modal-footer">
              <button
                className="nb-btn nb-btn-primary"
                onClick={() => {
                  handlePinToCanvas(lightboxFile);
                  setLightboxFile(null);
                }}
              >
                <Star size={13} className="text-amber" />
                <span>Pin to Canvas</span>
              </button>
              <button className="nb-btn" onClick={() => setLightboxFile(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 5. RIGHT-CLICK CONTEXT MENU ──────────────────────────────── */}
      {contextMenu.visible && (
        <div
          className="nb-context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={e => e.stopPropagation()}
        >
          {contextMenu.type === 'item' && contextMenu.item ? (
            <>
              <div
                className="nb-ctx-item"
                style={{ fontWeight: 800 }}
                onClick={() => {
                  handleItemDoubleClick(contextMenu.item);
                  setContextMenu(prev => ({ ...prev, visible: false }));
                }}
              >
                <Eye size={13} />
                <span>Open / View Evidence</span>
                <span className="nb-ctx-shortcut">Enter</span>
              </div>

              <div
                className="nb-ctx-item"
                onClick={() => {
                  handlePinToCanvas(contextMenu.item);
                  setContextMenu(prev => ({ ...prev, visible: false }));
                }}
              >
                <Star size={13} className="text-amber" />
                <span>Pin to Canvas</span>
              </div>

              <div className="nb-ctx-divider" />

              <div
                className="nb-ctx-item"
                onClick={() => {
                  setRenamingId(contextMenu.item.id);
                  setRenameText(contextMenu.item.name);
                  setContextMenu(prev => ({ ...prev, visible: false }));
                }}
              >
                <Edit3 size={13} />
                <span>Rename</span>
                <span className="nb-ctx-shortcut">F2</span>
              </div>

              <div
                className="nb-ctx-item"
                style={{ color: '#dc2626' }}
                onClick={() => handleDeleteItem(contextMenu.item)}
              >
                <Trash2 size={13} />
                <span>Delete</span>
                <span className="nb-ctx-shortcut">Del</span>
              </div>
            </>
          ) : (
            <>
              <div className="nb-ctx-item" onClick={handleCreateNewFolder}>
                <FolderPlus size={13} />
                <span>New Folder</span>
              </div>
              <div
                className="nb-ctx-item"
                onClick={() => {
                  setViewMode(prev => prev === 'cards' ? 'gallery' : prev === 'gallery' ? 'details' : 'cards');
                  setContextMenu(prev => ({ ...prev, visible: false }));
                }}
              >
                <LayoutGrid size={13} />
                <span>Toggle View Mode</span>
              </div>
              <div
                className="nb-ctx-item"
                onClick={() => setContextMenu(prev => ({ ...prev, visible: false }))}
              >
                <RefreshCw size={13} />
                <span>Refresh Directory</span>
              </div>
            </>
          )}
        </div>
      )}

    </div>
  );
}
