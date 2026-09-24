# RTI Easy

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Electron](https://img.shields.io/badge/Electron-Desktop-47848F?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A simple web and desktop app that helps you draft Right to Information (RTI) applications in India. You type what you want to ask in plain English, and the app turns it into a structured, point-wise request asking for official government records.

---

## What is this?

I am a first-year computer science student. While learning about civic rights and web development, I wanted to build a practical project that solves a real problem.

The **Right to Information (RTI) Act, 2005** is a great tool for transparency, but writing an application can be confusing for a beginner:
- Most people don't know which department handles their issue (for example, whether a road is managed by the city municipality or the state PWD).
- People often ask questions like *"Why is this road still broken?"* or *"Who is responsible?"*. Under Section 2(f) of the RTI Act, Public Information Officers (PIOs) only have to provide **existing records**, not explanations or opinions.
- Figuring out the legal formatting and letter layout takes extra effort.

I built RTI Easy to make this process less intimidating. You describe what happened in normal everyday language, answer a couple of quick questions, and the app gives you a formatted Section 6(1) letter asking for concrete records (like work orders, sanction amounts, and inspection reports) that you can print out or copy.

---

## Features

- **Plain-English Input**: Type your question normally, or click one of the pre-made sample questions (road repairs, school funds, streetlights, etc.).
- **Guided Follow-up Questions**: Asks 1 to 3 quick multiple-choice questions depending on the topic to narrow down the details.
- **Department Suggestions**: Matches your request against common public authorities (Municipal Corporations, PWD, Electricity Boards, Police, Education Department, etc.) and suggests which office to address.
- **Editable Draft Generator**: Generates numbered, point-wise requests for specific documents (work orders, bills, inspection reports). You can edit any point, add new points, or delete points.
- **Print & PDF Layout**: Clean layout styled for A4 printing via your browser or desktop print dialog (*Print → Save as PDF*), plus a button to copy the plain text.
- **Saved Drafts ("My Requests")**: Saves your drafts locally in your browser's `localStorage` so you can return to them later without losing your work.
- **Runs on Web and Desktop**: Works in the browser and can also be run as a standalone desktop window using Electron.

---

## Screenshots

### 1. Home Screen & Question Input
![Home Screen](docs/screenshots/home.png)
*Start with a question in normal language or pick a sample topic.*

### 2. Clarification Questions
![Clarification Questions](docs/screenshots/rti-guidance.png)
*Quick multiple-choice options to clarify the scope of your request.*

### 3. Authority Suggestion
![Authority Suggestion](docs/screenshots/authority-match.png)
*Suggested public authority with a simple explanation of why it fits.*

### 4. Review & Edit Draft
![Review & Edit Draft](docs/screenshots/application.png)
*Structured point-wise RTI application that you can edit inline before printing.*

### 5. Saved Requests
![Saved Requests](docs/screenshots/tracking.png)
*Locally saved drafts to reopen, edit, or copy anytime.*

---

## Built With

- **React 19** - UI components and multi-step wizard state
- **TypeScript** - Type safety for RTI drafts, questions, and authorities
- **Vite 8** - Fast local development and bundling
- **Tailwind CSS v3** - Styling and print media layout
- **Electron** - Desktop app wrapper
- **Lucide React** - Icons
- **Browser localStorage** - Saving drafts on your device

---

## How to Run

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (v9 or higher)

### Setup

```bash
# Clone the repository
git clone https://github.com/Joepvt/RTI.git

# Go into the project directory
cd RTI

# Install dependencies
npm install
```

### Running the Web Version

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running the Desktop Version

The Electron app loads the built files from `dist/`, so make sure to build first:

```bash
npm run build
npm run electron:start
```

### Building for Production

```bash
npm run build
```

The compiled files will be saved in the `dist/` directory.

---

## What I Learned

Building this project helped me learn a lot of things outside of textbook exercises:
- **Managing multi-step forms in React**: Building a step-by-step wizard where user input carries forward between steps and persists across reloads took some trial and error.
- **TypeScript interfaces**: Defining clear types for drafts, authorities, and form inputs helped prevent bugs where properties were missing.
- **Electron basics**: Learning how to wrap a Vite React app into a desktop window and set up native application menus.
- **CSS Print Styles**: Using `@media print` rules so that an on-screen document prints cleanly on A4 paper without ugly scrollbars or cutoffs.
- **How the RTI Act works**: Reading through Section 6(1) and Section 2(f) taught me that public authorities only provide existing documents, which changed how I designed the drafting logic.

---

## Limitations

To be completely honest about what this project can and cannot do:
- **No automatic government submission**: The app cannot submit the RTI on official portals like `rtionline.gov.in` or state websites. Those portals require personal accounts, OTPs, and online payments. You still need to submit the generated text yourself (online or by Speed Post).
- **Rule-based drafting**: The app currently uses built-in keyword matching and pre-written templates rather than a live AI model or external API.
- **Directory is curated**: The authority list covers common central ministries, state departments, and municipal corporations, but it does not have every single local office or village panchayat across India.
- **Stored locally**: Everything is stored in your browser's `localStorage`. If you clear your browser cache or site data, your saved drafts will be erased.

---

## Future Ideas

Things I'd like to work on when I have more time:
- Expand the authority directory to cover more regional and district-level offices.
- Add support for Indian regional languages (like Hindi, Kannada, Tamil, etc.).
- Add an optional field where users can bring their own API key (like Gemini) for drafting more custom queries.
- Add a basic 30-day countdown timer for tracking when an RTI reply is due.

---

## Disclaimer

RTI Easy is an independent educational student project and is **not** affiliated with the Government of India or any state government department.

- It does not file RTIs automatically.
- It does not collect any government application fees.
- It does not provide formal legal advice.
- Always check official government portals (such as [rtionline.gov.in](https://rtionline.gov.in/)) or your local department for current rules, fees, and submission methods.

---

## License

This project is licensed under the [MIT License](LICENSE).
