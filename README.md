# RTI Easy ⚖️

> **"Ask your government. Without the jargon."**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Electron](https://img.shields.io/badge/Electron-Desktop-47848F?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

An independent civic-tech web and desktop application that helps citizens turn everyday questions into clean, structured, and legally actionable Right to Information (RTI) requests.

Built as a first-year computer science portfolio project to explore modern frontend development with React, TypeScript, and Electron while tackling a real-world civic problem in India.

---

## 🏛️ Project Disclaimer

> [!IMPORTANT]
> **RTI Easy is an independent educational civic-tech project and is NOT affiliated with the Government of India or any state government department.**
>
> - RTI Easy does **not** submit RTIs automatically.
> - It does **not** collect government fees.
> - It does **not** fabricate government officers, Public Information Officer (PIO) names, official URLs, fees, application numbers, or fake tracking numbers.
> - If official information or online submission portals are unavailable, the application transparently advises citizens to verify directly with local authorities.

---

## 💡 Why I Built This

I am a first-year computer science student in India. While learning about civic rights and public administration, I realized that the **Right to Information (RTI) Act, 2005** is one of the most powerful tools Indian citizens have to demand transparency.

However, actually filing an RTI can feel intimidating:
- Many people think you need a lawyer or need to memorize complicated legal sections.
- It is often confusing to figure out which department handles what (for example, whether a pothole on your street is under your Municipal Corporation or the State Public Works Department).
- Most first-time applicants ask questions like *"Why did the road break within three months?"*—which Public Information Officers can immediately reject under Section 2(f) because the law covers **existing records**, not explanations or opinions.

I built RTI Easy to solve these practical hurdles. It takes what you want to know in ordinary everyday words, guides you through a few quick clarifying questions, suggests the right department, and generates a formatted, point-wise Section 6(1) RTI draft asking for concrete records (like work orders, sanction amounts, and inspection registers) that you can print and file.

---

## 🎯 The Problem

1. **Legalistic Intimidation**: Citizens believe they must know complex legal citations to ask simple questions about public work.
2. **Jurisdiction Confusion**: Citizens often don't know whether a school, road, or water pipeline is managed by a Municipal Corporation, District Collectorate, State Department, or Central Ministry.
3. **Asking for Opinions Instead of Records**: Questions asking *"Why"* or *"Who is responsible"* can be lawfully rejected under Section 2(f). What public authorities are actually required to provide are *certified copies of work orders, measurement books, sanctioned estimates, and inspection reports*.

---

## 🧭 How It Works

```
Describe ──▶ Clarify ──▶ Find Authority ──▶ Draft RTI ──▶ Review & Edit ──▶ Export (Print / PDF)
```

1. **Describe**: Enter your question in plain English (e.g., *"I want to know how much money was spent repairing the main road near my college last year"*), or pick one of the sample scenarios.
2. **Clarify**: Answer 1–3 simple multiple-choice questions to narrow down the scope (e.g., repair type, timeline).
3. **Find Authority**: The app matches your query against a categorized directory of public authorities, giving confidence badges and straightforward reasoning.
4. **Draft RTI**: Generates a point-wise request asking for official records, tender agreements, sanction orders, and inspection logs.
5. **Review & Edit**: Edit the subject line, reword specific points, or add custom requests using the inline document editor.
6. **Export**: One-click print-ready Section 6(1) letter layout (*Print → Save as PDF*) or plain text copy, along with step-by-step submission advice.

---

## ✨ Features

- **Plain-Language Input**: Type your question naturally or click a 1-click example to test the workflow.
- **Guided Clarifications**: Tailored multiple-choice questions based on the topic (roads, schools, streetlights, police, water, public funds).
- **Public Authority Engine**: Categorizes requests into Municipalities, PWD/Roads, Education, Police, Revenue, Transport, Electricity, Water, Public Health, Rural Development, State, and Central Government.
- **Pluggable Drafting Service**: Built around a clean TypeScript interface (`AIService`) with an offline mock engine that simulates structured draft generation without needing an external API key.
- **Inline Document Editor**: Edit the subject, rewrite points, or add/remove questions with a single click.
- **Print & PDF Ready**: Clean layout styled for A4 printing via the browser's native *Print / Save as PDF* dialog.
- **100% Client-Side Privacy**: All drafts, applicant details, and saved requests stay strictly in your browser's `localStorage`. No telemetry, no external database, no tracking cookies.
- **Responsive Web & Native Desktop**: Works smoothly on mobile screens, tablets, laptops, and runs as a standalone desktop app on macOS/Windows via Electron.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Desktop Wrapper**: [Electron](https://www.electronjs.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Storage**: Browser & Electron `localStorage`
- **Output**: Static web bundle (`dist/`) and desktop window

---

## 📚 What I Learned

Building this project taught me a lot of practical software engineering concepts beyond classroom theory:

- **Component Architecture & State**: Managing a multi-step wizard state machine in React while keeping drafts persistent across steps and reloads without needing heavy third-party state libraries.
- **Strict TypeScript Types**: Creating domain-specific types for RTI drafts, authorities, applicant info, and question categories, which helped catch dozens of edge-case bugs early during development.
- **Packaging with Electron**: Integrating a modern Vite + React single-page app with Electron, handling window sizing, macOS application menus, and secure context isolation.
- **Designing for Print**: Using CSS `@media print` rules to produce clean, properly paginated legal documents directly from the browser window without needing a heavy server-side PDF generator.
- **Service Interfaces**: Structuring the code with a pluggable `AIService` interface, so the current rule-based mock engine can be swapped with a real LLM API (like Gemini or OpenAI) in the future without rewriting any UI components.
- **Understanding RTI Law**: Reading and learning the actual mechanics of the Right to Information Act, 2005 (specifically Section 6(1) for filing procedures and Section 2(f) for what qualifies as an accessible record).

---

## ⚠️ Limitations

To keep this project honest and transparent, here are its current limitations:

- **Offline Mock Drafting by Default**: The drafting engine currently uses pre-built civic templates and rule-based logic to generate requests rather than calling a live external LLM API.
- **No Direct Government Portal Submission**: The app cannot automatically submit requests on `rtionline.gov.in` or state RTI portals. These portals require individual citizen logins, CAPTCHAs, and payment gateways. You still need to submit the exported application yourself either online or via Speed Post.
- **Curated Authority Directory**: The public authority list covers major central ministries, state departments, and typical urban local bodies, but it does not yet contain all 4,000+ Urban Local Bodies (ULBs) and village Panchayats across India.
- **Local Storage Only**: Drafts and saved requests are stored in the browser's or Electron's local storage. Clearing your browser cache or site data will remove your saved drafts unless you exported them.

---

## 📁 Project Structure

```
rti-easy/
├── AppIcon.icns                # Application icon
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS design configuration
├── vite.config.ts              # Vite build configuration
├── electron/
│   └── main.cjs                # Electron main process and window manager
├── docs/
│   └── screenshots/            # Application screenshots for README
├── src/
│   ├── App.tsx                 # Root component with routing and active view
│   ├── main.tsx                # React DOM entry point
│   ├── index.css               # Tailwind directives and print styles
│   ├── types/
│   │   └── rti.ts              # RTI draft, authority, and wizard TypeScript models
│   ├── data/
│   │   ├── authorities.ts      # Categorized public authority data and portal links
│   │   ├── sampleQuestions.ts  # Pre-configured demo scenarios for 1-click testing
│   │   └── statesAndDistricts.ts # Indian states and districts dataset
│   ├── services/
│   │   ├── ai/                 # AIService interface, mock engine, and factory
│   │   ├── authority/          # Authority matching logic and category filters
│   │   ├── export/             # Text export, clipboard copy, and print helpers
│   │   └── storage/            # LocalStorage persistence manager
│   ├── pages/
│   │   ├── HomePage.tsx        # Wizard state coordinator and draft editor
│   │   ├── AboutPage.tsx       # Mission, legal principles, and disclaimers
│   │   └── SavedRequestsPage.tsx # Local draft history manager ("My Requests")
│   ├── components/
│   │   ├── common/             # Toast, Modal, LoadingState, EmptyState, ProgressIndicator
│   │   ├── document/           # RTIDocument, EditableRTIDocument, PrintableRTI
│   │   ├── export/             # ExportButton, ExportModal, SubmissionGuide
│   │   ├── layout/             # AppShell, TopBar, Footer
│   │   ├── saved/              # SavedRequestsList, SavedRequestCard
│   │   └── wizard/             # Step0Describe, Step1Clarify, Step2Details, Step3Authority, Step4Review
│   └── utils/
│       └── formatters.ts       # Date and text formatting utilities
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/Joepvt/RTI.git

# Navigate to project folder
cd RTI

# Install dependencies
npm install
```

### Running the Web Application

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Running the Desktop Application

```bash
npm run electron:start
```

### Building for Production

```bash
npm run build
```

The production assets will be built to the `dist/` directory.

---

## 📸 Screenshots

### 1. Plain-Language Question Input
![Home Screen](docs/screenshots/home.png)
*Landing screen featuring ordinary-language prompt, quick-start sample scenarios, and 1-click demo.*

### 2. Contextual Clarification Wizard
![Clarification & Question Understanding](docs/screenshots/rti-guidance.png)
*Guided clarification cards that hone request scope without requesting intrusive personal details.*

### 3. Public Authority Matching & Rationale
![Authority Match](docs/screenshots/authority-match.png)
*Automatic public authority identification with confidence rating and transparent jurisdictional reasoning.*

### 4. Structured Point-Wise RTI Draft & Inline Editor
![Generated RTI Draft](docs/screenshots/application.png)
*Point-wise legal record request focusing strictly on existing ledgers, work orders, and inspection reports.*

### 5. Local Draft Management ("My Requests")
![Saved Requests Management](docs/screenshots/tracking.png)
*100% private client-side storage to review, copy, export, and manage saved RTI drafts.*

---

## 🧪 Testing the Core Experience

1. **Open the App**: Launch the home screen.
2. **Run Demo**: Click **"Try 1-Click Road Repair Demo"** or enter any plain question.
3. **Clarify**: Select the repair type (e.g., *Complete tarring / Re-surfacing*) and click **Continue**.
4. **Details**: Select state and district. Notice how **"I don't know"** is supported if you're unsure of the exact department. Click **Find the authority**.
5. **Authority Match**: Review the suggested **Municipal Corporation / Local Urban Body** with the confidence badge and explanation. Click **Looks right**.
6. **Generated RTI**: Review the numbered record requests (sanction amounts, tender work orders, quality inspection reports, defect liability period).
7. **Edit**: Modify any point or click **Add another point**.
8. **Export**: Click **Export RTI**, enter applicant details, and test **Print or Save as PDF** or **Copy Formal Text**.
9. **Persistence**: Refresh the page—your draft is restored from `localStorage`.
10. **Saved Requests**: Click **Save draft** and inspect the **My Requests** page.

---

## 🔮 Future Roadmap

- [ ] **Verified Authority Directory**: Searchable directory covering all 4,000+ Indian Urban Local Bodies (ULBs) and Panchayati Raj Institutions.
- [ ] **Multilingual Support**: Translations for Hindi, Kannada, Tamil, Marathi, Bengali, and Telugu.
- [ ] **Live AI Integration**: Optional setting to connect a personal Gemini or OpenAI API key for real-time natural language query refinement.
- [ ] **Postal Tracking Companion**: Citizen-entered registered Speed Post tracking reminders to follow up within the 30-day statutory deadline.

---

## 👤 Author

Developed by **Karthikeya** ([@Joepvt](https://github.com/Joepvt))

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

*RTI Easy is created for educational and portfolio demonstration purposes.*
