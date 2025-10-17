# Current Architecture Documentation
## Analiz Değerlendirme Formu v1.8.0

**Last Updated:** 2025-10-17

---

## 1. SYSTEM OVERVIEW

### Application Type
- Single-Page Application (SPA)
- Monolithic Architecture
- Client-side Only (No backend)
- Offline-capable

### Current Technology Stack
- **HTML5:** Structure and markup
- **CSS3:** Styling with custom properties (CSS variables)
- **Vanilla JavaScript:** ES5/ES6 mix, no framework
- **LocalStorage:** Data persistence
- **Google Fonts:** Lexend font family

### File Structure
```
/workspace
├── index.html          (Main application - 2,157 lines, ~124KB)
├── .github/
│   └── workflows/
│       └── blank.yml   (Basic CI workflow)
└── .git/               (Version control)
```

---

## 2. APPLICATION ARCHITECTURE

### 2.1 Monolithic Structure

```
┌─────────────────────────────────────────────────────────┐
│                     index.html                           │
│                                                          │
│  ┌────────────────────────────────────────────────┐   │
│  │              HEAD SECTION                       │   │
│  │  - Meta tags & viewport                        │   │
│  │  - Google Fonts (Lexend)                       │   │
│  │  - Embedded CSS (~400 lines)                   │   │
│  │  - Jira Gadget integration scripts             │   │
│  └────────────────────────────────────────────────┘   │
│                                                          │
│  ┌────────────────────────────────────────────────┐   │
│  │              BODY SECTION                       │   │
│  │                                                 │   │
│  │  ┌──────────────────────────────────────┐     │   │
│  │  │    Header (headerbar)                │     │   │
│  │  │  - Enerjisa Logo                     │     │   │
│  │  │  - Title                             │     │   │
│  │  │  - Department                        │     │   │
│  │  │  - Theme Toggle Button               │     │   │
│  │  └──────────────────────────────────────┘     │   │
│  │                                                 │   │
│  │  ┌──────────────────────────────────────┐     │   │
│  │  │  Main Container (neural-hub-container)│    │   │
│  │  │                                       │     │   │
│  │  │  ┌─────────┬──────────┬──────────┐  │     │   │
│  │  │  │  Left   │  Center  │  Right   │  │     │   │
│  │  │  │  Column │  Column  │  Column  │  │     │   │
│  │  │  │         │          │          │  │     │   │
│  │  │  │  Nav    │  Active  │   AI     │  │     │   │
│  │  │  │  Panel  │  Stage   │  Panel   │  │     │   │
│  │  │  └─────────┴──────────┴──────────┘  │     │   │
│  │  └──────────────────────────────────────┘     │   │
│  │                                                 │   │
│  │  ┌──────────────────────────────────────┐     │   │
│  │  │   Embedded JavaScript (~1,700 lines)  │    │   │
│  │  │  - State Management                   │    │   │
│  │  │  - Form Handlers                      │    │   │
│  │  │  - Navigation Logic                   │    │   │
│  │  │  - AI Integration                     │    │   │
│  │  │  - Scoring Engine                     │    │   │
│  │  │  - Report Generator                   │    │   │
│  │  │  - LocalStorage Persistence           │    │   │
│  │  │  - Pattern Library (35+ patterns)     │    │   │
│  │  └──────────────────────────────────────┘     │   │
│  └────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 3. COMPONENT BREAKDOWN

### 3.1 CSS Architecture (~400 lines)

```css
:root {
  /* CSS Custom Properties */
  --bg, --panel-bg, --text, --muted, --border
  --danger, --warning, --success
  --accent, --accent-hover, --accent-glow
  --mono, --hb-h
}

/* Theme Variants */
body.theme-yellow { /* Alternative color scheme */ }

/* Animations */
@keyframes fadeIn, panel-in, highlight-fade

/* Layout */
.headerbar               /* Sticky header */
.neural-hub-container    /* 3-column grid layout */
.hub-column             /* Flex column */
.hub-panel              /* Panel container */

/* Navigation */
.timeline-nav           /* Stage navigation */
.timeline-node          /* Navigation buttons */

/* Stages */
.stage                  /* Stage container */
.stage-content          /* Scrollable content */
.stage-footer           /* Action buttons */

/* Form Elements */
input, select, textarea /* Styled form controls */

/* Report */
.report-section         /* Report sections */
#report-table           /* Scoring table */
.effect-row, .penalty-row /* Dynamic rows */

/* Print Styles */
@media print { /* Print-specific styles */ }

/* Jira Gadget Styles */
.in-gadget { /* Gadget mode overrides */ }
```

### 3.2 JavaScript Architecture (~1,700 lines)

#### Core Modules

```javascript
// 1. State Management (Global State Object)
const State = {
  app: {
    inputs: {},           // Form inputs
    gptResponse: {},      // AI response
    stage: 1,             // Current stage
    // ... more state
  },
  $: (id) => {},         // DOM selector helper
  esc: (str) => {}       // HTML escape helper
};

// 2. Form Validation
function validateStage1() {}
function validateStage2() {}
// ... validation functions

// 3. Navigation System
function activateStage(stageNumber) {}
function goToStage(n) {}
// ... navigation logic

// 4. AI Integration
async function callGPT(payload) {}
function parseAIResponse(response) {}
// ... AI logic

// 5. Scoring Engine
function calculateScore(criteria) {}
function applyEffects(score, effects) {}
function recalculateAndDisplayFinalScore() {}
// ... scoring logic

// 6. Report Generation
function renderReport(savedState) {}
function renderQuickReport() {}
function renderDetailedReport(savedState) {}
function generateReportTable() {}
// ... report logic

// 7. LocalStorage Persistence
const DRAFT_KEY = "degerlendirme_studyo_draft_v2";
function saveDraft() {}
function loadDraft() {}
function clearDraft() {}
// ... persistence logic

// 8. Pattern Library
window.PATTERN_LIBRARY = [
  {
    id: "PROB-01",
    criterion: "Problemin Tanımı & İş Değeri",
    title: "İş değeri ölçütleri (KPI) sayısal tanımlı",
    polarity: "pos",
    defaultDelta: 2.0,
    minSP: 0.5,
    tags: ["kpi", "değer", "ölçülebilir"]
  },
  // ... 35+ patterns
];

// 9. Dynamic Effect Rows
window.addEffectRow = function(linkElement, initialState) {}
function removeEffectRow(row) {}
// ... effect management

// 10. Event Handlers
document.addEventListener('DOMContentLoaded', () => {
  // Initialize app
  // Bind event listeners
  // Load saved draft
});
```

---

## 4. DATA FLOW

### 4.1 User Input Flow

```
┌─────────────────┐
│   User Input    │
│   (Stage 1-2)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Form Validation│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  State Update   │
│  (State.app)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  LocalStorage   │
│  Auto-save      │
└─────────────────┘
```

### 4.2 AI Analysis Flow

```
┌─────────────────┐
│  User Clicks    │
│  "Analiz Et"    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Collect Data   │
│  (inputs, SP,   │
│   criteria)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Build Prompt   │
│  for GPT        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Call GPT API   │
│  (async)        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Parse Response │
│  (JSON extract) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Store in State │
│  gptResponse    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Navigate to    │
│  Stage 4 Report │
└─────────────────┘
```

### 4.3 Scoring Flow

```
┌─────────────────┐
│  AI Returns     │
│  Initial Scores │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Render Table   │
│  with Scores    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  User Edits     │
│  Scores/Effects │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Recalculate    │
│  Total Score    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Update Display │
│  (with animate) │
└─────────────────┘
```

---

## 5. STATE MANAGEMENT

### 5.1 Global State Object

```javascript
State = {
  app: {
    inputs: {
      workMode: "detailed" | "quick",
      analistAdi: string,
      talepNo: string,
      talepAdi: string,
      talep: string,
      analiz: string,
      sp: "0.5" | "1" | "3" | "5" | "8" | "13",
      raporModu: "standard" | "brief" | "strict",
      moduleSelect: string,
      flowQuality: "yok" | "zayif" | "yeterli" | "detayli",
      docStatus: "taslak" | "son",
      // ... more inputs
    },
    
    gptResponse: {
      raw: string,          // Raw AI response
      json: {
        overallNote: string,
        criteria: [
          {
            name: string,
            score: number,
            max: number,
            justification: string
          }
        ],
        antiPatterns: [
          {
            id: string,
            found: boolean,
            explanation: string
          }
        ],
        strengths: string[],
        improvements: string[],
        constructiveFeedbackNote: string,
        rewrittenAnalysis: string,
        overallScore: {
          total: number,
          maxTotal: number
        }
      }
    },
    
    stage: 1 | 2 | 3 | 4,   // Current active stage
    
    dirty: boolean,          // Unsaved changes flag
  },
  
  // Helper methods
  $: (id) => document.getElementById(id),
  esc: (str) => /* HTML escape */
};
```

### 5.2 LocalStorage Schema

```javascript
// Key: "degerlendirme_studyo_draft_v2"
{
  version: "1.8.0",
  timestamp: "2025-10-17T10:30:00Z",
  inputs: { /* All form inputs */ },
  stage: 1,
  gptResponse: { /* AI response if exists */ }
}
```

---

## 6. API INTEGRATION

### 6.1 GPT Integration (Hypothetical - needs verification)

```javascript
async function callGPT(payload) {
  // Endpoint not visible in code (might be proxy)
  // Appears to call external AI service
  
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: generatePrompt(payload),
      model: "gpt-4" // or similar
    })
  });
  
  return await response.json();
}
```

**Note:** Actual implementation details are abstracted in the current code.

---

## 7. PATTERN LIBRARY

### 7.1 Pattern Structure

```javascript
{
  id: string,              // Unique identifier (e.g., "PROB-01")
  criterion: string,       // Evaluation criterion name
  title: string,          // Pattern description
  polarity: "pos" | "neg", // Positive or negative impact
  defaultDelta: number,   // Default score change
  minSP: number,          // Minimum Story Point to apply
  tags: string[]          // Tags for filtering
}
```

### 7.2 Pattern Categories

1. **PROB-XX:** Problem Definition & Business Value
2. **REQ-XX:** Functional Requirements
3. **ACC-XX:** Acceptance Criteria
4. **BUS-XX:** Business Rules & Constraints
5. **ALT-XX:** Alternative Flows
6. **ARF-XX:** Flow/Model Artifacts
7. **MDL-XX:** Model/BPMN/Data Model
8. **INT-XX:** Integration & Systems
9. **RSK-XX:** Risks & Dependencies
10. **TRC-XX:** Traceability
11. **IMT-XX:** Impact Analysis
12. **NFR-XX:** Non-Functional Requirements (General)
13. **NFRM-XX:** Non-Functional Requirements (Measurable)
14. **DOC-XX:** Documentation
15. **UX-XX:** User Experience

### 7.3 Pattern Filtering Logic

```javascript
function getRelevantPatterns(criterionName, sp) {
  const spNum = parseFloat(sp);
  return PATTERN_LIBRARY.filter(p => 
    p.criterion === criterionName && 
    p.minSP <= spNum
  );
}
```

---

## 8. SCORING SYSTEM

### 8.1 Criteria Weights

```javascript
// Default criteria (can vary by AI response)
const DEFAULT_CRITERIA = [
  { name: "Problemin Tanımı & İş Değeri", max: 10 },
  { name: "Fonksiyonel Gereksinimler", max: 15 },
  { name: "Kabul Kriterleri / Testlenebilirlik", max: 10 },
  { name: "İş Kuralları & Kısıtlar", max: 8 },
  { name: "Alternatif Akışlar", max: 7 },
  { name: "Akış/Model Artefaktı", max: 7 },
  { name: "Model/BPMN/Data Model", max: 8 },
  { name: "Entegrasyon & Sistemler", max: 8 },
  { name: "Riskler & Bağımlılıklar", max: 7 },
  { name: "İzlenebilirlik & Kapsam", max: 7 },
  { name: "Etki Analizi", max: 5 },
  { name: "NFR (Genel Uyum)", max: 5 },
  { name: "NFR (Ölçülebilir)", max: 3 }
];

// Total: 100 points
```

### 8.2 Effect System

**Effect Row Structure:**
```javascript
{
  criterionIndex: number,  // Which criterion
  patternId: string,       // Pattern applied
  delta: number,           // Score change (-5 to +5)
  reason: string           // Explanation
}
```

**Score Calculation:**
```
Final Score = Base Score + Σ(Effect Deltas) - Σ(Penalties)
```

---

## 9. USER INTERFACE

### 9.1 Layout Structure

**Desktop Layout (Grid-based):**
```
┌──────────────────────────────────────────────────────┐
│                     Header Bar                        │
│  [Logo] [Title]                [Dept] [Theme Toggle] │
├────────┬─────────────────────────────┬───────────────┤
│  Left  │         Center              │    Right      │
│  Nav   │      Active Stage           │   AI Info     │
│ Panel  │                             │   Panel       │
│        │                             │               │
│ Stage  │  ┌───────────────────────┐  │  ┌─────────┐ │
│ Links  │  │                       │  │  │ AI      │ │
│        │  │  Stage Content        │  │  │ Status  │ │
│ [ 1 ]  │  │  (Scrollable)         │  │  │         │ │
│ [ 2 ]  │  │                       │  │  │ Info    │ │
│ [ 3 ]  │  │                       │  │  │         │ │
│ [ 4 ]  │  └───────────────────────┘  │  └─────────┘ │
│        │  [Prev] [Next]              │               │
└────────┴─────────────────────────────┴───────────────┘
```

**Mobile/Tablet:** Responsive collapse (not fully implemented)

### 9.2 Stage Flow

```
Stage 1: Görev Tanımı
├── Work Mode Selection
├── Analyst Name *
├── Request Number (if detailed)
├── Request Title *
├── Request Text *
└── Analysis Text *

Stage 2: Değerlendirme Kapsamı
├── Story Point
├── Report Mode
├── Module Context
├── Flow Quality
└── Document Status

Stage 3: Yapay Zeka Analizi
├── AI Loading State
├── Progress Indicator
└── Auto-navigate to Stage 4

Stage 4: Sonuç Raporu
├── Editable Report Sections
├── Score Table (editable)
├── Effect Rows (dynamic)
├── Anti-patterns List
├── Strengths & Improvements
└── Export/Print Options
```

---

## 10. PERSISTENCE & STATE RECOVERY

### 10.1 Auto-Save Strategy

```javascript
// Save on every significant change
const AUTOSAVE_EVENTS = [
  'input',      // Input field changes
  'change',     // Select/checkbox changes
  'blur',       // Focus loss
  'beforeunload' // Page exit
];

// Debounced save (150ms delay)
let saveTimeout;
function debouncedSave() {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(saveDraft, 150);
}
```

### 10.2 Recovery Flow

```javascript
// On page load
window.addEventListener('DOMContentLoaded', () => {
  const draft = loadDraft();
  
  if (draft) {
    // Restore inputs
    Object.entries(draft.inputs).forEach(([key, value]) => {
      const el = State.$(key);
      if (el) el.value = value;
    });
    
    // Restore stage
    if (draft.stage) {
      activateStage(draft.stage);
    }
    
    // Restore AI response if exists
    if (draft.gptResponse) {
      State.app.gptResponse = draft.gptResponse;
      renderReport();
    }
  }
});
```

---

## 11. PRINT FUNCTIONALITY

### 11.1 Print-Specific Styles

```css
@media print {
  /* Hide interactive elements */
  .no-print,
  .headerbar,
  .timeline-nav,
  .stage-footer,
  button,
  .icon-btn {
    display: none !important;
  }
  
  /* Show print-only elements */
  .print-only-header {
    display: block !important;
  }
  
  /* Optimize layout */
  body {
    background: white;
  }
  
  .neural-hub-container {
    display: block;
    height: auto;
  }
  
  /* Page breaks */
  .report-section {
    page-break-inside: avoid;
  }
}
```

### 11.2 Print Header

```html
<div class="print-only-header">
  <img src="[Logo URL]" alt="Enerjisa Logo">
  <h1>İş Uygulamaları Müdürlüğü</h1>
  <p>Analiz Değerlendirme Formu</p>
  <p>Değerlendirme Tarihi: [Date]</p>
</div>
```

---

## 12. JIRA GADGET INTEGRATION

### 12.1 Gadget Detection

```javascript
// Detect if running in Jira Gadget context
function isInGadget() {
  try {
    return window.parent !== window && 
           window.location !== window.parent.location;
  } catch (e) {
    return true; // Cross-origin restriction = likely in iframe
  }
}

if (isInGadget()) {
  document.body.classList.add('in-gadget');
}
```

### 12.1 Gadget-Specific Styles

```css
.in-gadget {
  /* Override height restrictions */
  html, body {
    height: auto !important;
    overflow: visible !important;
  }
  
  /* Adjust layout */
  .neural-hub-container {
    height: auto !important;
  }
}
```

### 12.3 Gadget Core Loader

```javascript
// Load Jira gadget libraries
(function() {
  function load(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = () => resolve(url);
      script.onerror = () => reject(url);
      document.head.appendChild(script);
    });
  }
  
  const candidates = [
    '/plugins/servlet/gadgets/js/core.js',
    '/gadgets/js/core.js'
  ];
  
  // Try loading gadget core
  (async () => {
    for (const url of candidates) {
      try {
        await load(url);
        break;
      } catch (e) {
        // Try next
      }
    }
  })();
})();
```

---

## 13. KNOWN LIMITATIONS

### 13.1 Technical Limitations
- ❌ No server-side logic (purely client-side)
- ❌ No user authentication
- ❌ No multi-user support
- ❌ Data stored only in browser
- ❌ No backup/export automation
- ❌ Limited to single device (no sync)
- ❌ No version history
- ❌ No collaborative editing
- ❌ AI API details abstracted/hidden
- ❌ No automated testing

### 13.2 Scalability Limitations
- ❌ All code in single file (hard to maintain)
- ❌ No code splitting
- ❌ No lazy loading
- ❌ Large initial load size
- ❌ No caching strategy
- ❌ No CDN usage
- ❌ No performance optimization

### 13.3 Security Limitations
- ❌ No input sanitization (XSS risk)
- ❌ No CSRF protection
- ❌ API keys might be exposed
- ❌ No rate limiting
- ❌ No audit logging
- ❌ Data stored unencrypted

---

## 14. DEPENDENCIES

### 14.1 External Dependencies

**Runtime:**
- Google Fonts API (Lexend font)
- AI/GPT API (endpoint not visible)
- Browser LocalStorage API

**Development:**
- None (no build process)

**Optional (Jira Gadget):**
- Jira Gadget Core JS
- Jira context

---

## 15. BROWSER COMPATIBILITY

**Tested/Supported:**
- Modern browsers (Chrome, Firefox, Edge, Safari)
- ES6 support required
- LocalStorage support required
- CSS Grid support required
- CSS Custom Properties required

**Minimum Versions:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Not Supported:**
- Internet Explorer
- Opera Mini
- Old mobile browsers

---

## 16. PERFORMANCE CHARACTERISTICS

**Current Metrics (Estimated):**
- Initial Load: ~200-300ms (single file, no external JS)
- Time to Interactive: ~500ms
- First Contentful Paint: ~300ms
- LocalStorage read/write: <10ms
- AI Analysis: Variable (depends on API)

**Bottlenecks:**
- AI API response time (1-5 seconds)
- Large single file (no code splitting)
- No caching strategy
- No lazy loading

---

## Document Control

- **Version:** 1.0
- **Date:** 2025-10-17
- **Author:** AI Development Assistant
- **Status:** Complete
- **Next Review:** On architecture changes

---

**END OF ARCHITECTURE DOCUMENTATION**
