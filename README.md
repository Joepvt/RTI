# RTI Easy

RTI Easy is a project I built to make drafting Right to Information (RTI) applications in India easier. You describe what you want to know in normal everyday words, answer a few quick questions, and the app helps you prepare a formatted draft asking for specific government records. It works in the browser and can also run as a desktop app.

## Why I Built This

I am a first-year computer science student. When I first looked into filing an RTI, I realized how confusing it can be for someone doing it for the first time.

Most people don't know which department handles their problem (for example, whether a broken street is under the city corporation or the state PWD). Also, people usually ask questions like *"Why is this road still broken?"*, but under the RTI Act, government offices only have to provide existing records (like bills, contracts, and inspection reports), not explanations or opinions. I built this to help people turn everyday questions into clear requests for real documents without having to worry about legal formatting.

## What It Does

- **Plain-English input**: Type what you want to know in regular words, or pick one of the sample topics (like road repairs or school funds).
- **Follow-up questions**: Asks 1 to 3 simple questions based on your topic to help narrow down what records you need.
- **Department suggestion**: Matches your topic against common public authorities (Municipal Corporations, PWD, Electricity Boards, Police, etc.) and suggests which one to send the request to.
- **Editable draft**: Creates a numbered list of requests for specific documents. You can edit the text, add new points, or delete points directly in the app.
- **Print and export**: Formats everything into a standard Section 6(1) letter layout that you can print, save as PDF, or copy as text.
- **Saved drafts**: Saves your drafts locally in your browser so you can come back to them later without losing your progress.
- **Desktop version**: Can run as a standalone desktop app using Electron in addition to running in the browser.

## Screenshots

### Home Screen
![Home Screen](docs/screenshots/home.png)

### Follow-up Questions
![Clarification Questions](docs/screenshots/rti-guidance.png)

### Suggested Department
![Authority Suggestion](docs/screenshots/authority-match.png)

### Review & Edit Draft
![Review & Edit Draft](docs/screenshots/application.png)

### Saved Requests
![Saved Requests](docs/screenshots/tracking.png)

## Built With

- React
- TypeScript
- Vite
- Tailwind CSS
- Electron
- Browser localStorage

## Running Locally

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Clone and install

```bash
git clone https://github.com/Joepvt/RTI.git
cd RTI
npm install
```

### 2. Run the web version

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 3. Run the desktop version

Build the frontend first, then launch Electron:

```bash
npm run build
npm run electron:start
```

## What I Learned

Building this helped me learn practical things that I hadn't tried before:
- Managing multi-step form state in React without losing data between steps.
- Using TypeScript types for forms, drafts, and authority data so things don't break unexpectedly.
- How to wrap a Vite and React app into a desktop window using Electron.
- Using CSS `@media print` rules so a document looks clean when printed on A4 paper.
- How the RTI Act actually works in practice, especially why Section 2(f) requires asking for existing records instead of asking officers for opinions.

## Limitations

- It does not automatically submit the RTI for you. You still need to submit the generated text yourself on official portals (like `rtionline.gov.in`) or by post.
- The drafting logic uses built-in keyword matching and templates, not a live AI model.
- The authority directory is curated and does not have every single local office or village panchayat across India.
- Government authority information and fees change over time, so they should always be verified independently.
- Drafts are stored in your browser's localStorage, so clearing your browser data will remove them.

## Future Ideas

- Add more municipal corporations and district-level offices.
- Add support for regional Indian languages like Hindi, Kannada, and Tamil.
- Add an optional field where users can add their own API key (like Gemini) to help draft custom queries.
- Add a simple 30-day response countdown timer.

## Disclaimer

RTI Easy is an independent student project and is not affiliated with the Government of India or any state government. It does not submit applications on your behalf or provide legal advice. Always check official government portals like [rtionline.gov.in](https://rtionline.gov.in/) for official guidelines and fee details.

## License

This project is licensed under the [MIT License](LICENSE).
