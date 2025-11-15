# Social Media Content Analyzer (SMCA)

A modern, lightweight, and fully responsive web application designed to analyze social-media content, extract text from PDFs and images using OCR, and provide actionable suggestions to improve engagement. This project is built as part of the **Unthinkable Solutions Technical Assessment** and follows all submission guidelines.

---

## 🚀 Overview

The **Social Media Content Analyzer (SMCA)** helps creators, marketers, and developers quickly evaluate and enhance social-media captions. It accepts text, PDF, and image uploads, extracts the underlying content, and performs a rule-based analysis to generate clear suggestions for:

- Hashtag usage
- CTA (Call-To-Action)
- Post length
- Emoji usage
- Sentiment cues
- Readability
- Engagement triggers (questions, tone, etc.)

The project emphasizes simplicity, correctness, performance, and high-quality code — ideal for technical assessment review.

---

## ✨ Features

- **📄 PDF Extraction** — Extracts text using `pdf-parse`.
- **🖼️ Image OCR** — Extracts text from images using in-browser `Tesseract.js`.
- **🧠 Intelligent Rule-Based Analysis** — Provides suggestions based on structure, tone, and engagement best practices.
- **💡 Clean & Modern UI** — Fully responsive, minimalistic, and professional.
- **⚡ Instant Feedback** — Progress indicators, copy/download tools, and real-time results.
- **📦 Lightweight Architecture** — Minimal dependencies, fast load, and clean code.

---

## 🧰 Tech Stack

**Frontend:**

- HTML5
- CSS3 (custom responsive UI)
- Vanilla JavaScript
- Tesseract.js (OCR engine)

**Backend:**

- Node.js
- Express.js
- Multer (file uploads)
- pdf-parse (PDF text extraction)
- CORS

**Hosting Recommended:** Vercel

---

## 📁 Project Structure

```
social-media-content-analyzer/
├─ public/
│  ├─ index.html
│  ├─ style.css
│  ├─ script.js
├─ server/
│  ├─ app.js
│  ├─ extractor.js
│  └─ analyzer.js
├─ .gitignore
├─ package.json
└─ README.md
```

---

## 🛠️ Installation & Setup (Local)

### 1️⃣ Clone the repository

```
cd social-media-content-analyzer
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Start the server

```
npm start
```

### 4️⃣ Open in browser

```
http://localhost:3000
```

---

## 🎯 Usage Guide

1. Upload a **PDF**, **TXT**, or **Image** file.
2. For images → click **OCR** to extract text.
3. Review or manually edit the extracted text.
4. Click **Analyze** to generate suggestions.
5. Use **Copy** or **Download** to export results.

---

## ☁️ Deployment (Render)

1. Push your project to a **public GitHub repo**.
2. Go to **Render.com → New Web Service**.
3. Connect your repository.
4. Set:

   - **Build Command:** _(leave empty)_
   - **Start Command:** `npm start`

5. Deploy.

Your live URL will be generated automatically.

---

## 🧪 Analyzer Logic (Rule-Based)

SMCA uses deterministic, transparent rules to evaluate:

- Caption length (too short / too long / ideal)
- Hashtag count and quality
- Presence of CTA (comment, share, follow, etc.)
- Emoji balance
- Basic sentiment indicators
- Readability hints (long words)
- Engagement boosters (questions)

This ensures predictable output and easy evaluation.

---

## 📌 Submission Checklist

✔ Public GitHub repository
✔ Branch set to `main`
✔ No `node_modules`
✔ No `.env` or sensitive files
✔ Runs locally with `npm install` + `npm start`
✔ README.md included and polished
✔ GitHub link included in Google Form submission
✔ Output matches assignment requirements

---

## 📝 200-Word Write-Up (Ready for Submission)

This Social Media Content Analyzer is designed to extract, interpret, and enhance social-media content using clean, production-ready engineering practices. The application processes PDF files using `pdf-parse` and handles image-based text extraction through in-browser OCR using `Tesseract.js`, offering a fast and lightweight solution that avoids server-load overhead. The extracted text is analyzed through a deterministic, rule-based engine that evaluates caption length, emoji usage, hashtag relevance, call-to-action presence, readability, sentiment cues, and engagement triggers. This ensures clear and explainable outputs suitable for both technical assessments and real-world usability.

The project uses a minimal tech stack for easy deployment, consisting of Node.js, Express.js, and vanilla frontend technologies. The interface is fully responsive, user-friendly, and enriched with progress indicators, copy/download features, and a clean card-based layout. The application follows all assignment submission guidelines, including proper project structure, removal of unnecessary dependencies, and a polished README for review. Overall, the solution balances engineering clarity, thoughtful UI/UX, efficient text processing, and practical insights — making it both assessment-ready and readily expandable.

---

## 📄 License

This project is released under the **MIT License**.

---

## 📬 Contact

**Author:** Rahul Ranjan
📧 [rahulkumarroy399@gmail.com](mailto:rahulkumarroy399@gmail.com)

If you need help with deployment or packaging your final submission, feel free to reach out!