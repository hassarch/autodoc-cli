# AutoDoc CLI

[![npm version](https://img.shields.io/npm/v/autodoc-cli?style=flat-square)](https://www.npmjs.com/package/autodoc-cli)
[![license](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/autodoc-cli?style=flat-square)](https://www.npmjs.com/package/autodoc-cli)

> 🚀 An intelligent command-line tool that automatically generates high-quality, GitHub-ready README.md files by analyzing your project's structure, technologies, and purpose.

It removes the pain of writing documentation by combining static project analysis with optional AI-powered summarization.

## ✨ Features

- 🔍 Automatically scans your project directory
- 🧠 Detects programming languages, frameworks, and dependencies
- 🗂️ Understands project type (CLI, Web App, API, etc.)
- 📝 Generates a structured, professional README
- 🤖 Optional AI-powered description & feature generation
- 🔐 Privacy-first (AI is opt-in, metadata-only)
- ⚡ Zero configuration required

## 📦 Installation

### Use with npx (recommended)

```bash
npx autodoc-cli
```

### Install globally

```bash
npm install -g autodoc-cli
```

## ▶️ Usage

Navigate to any project directory and run:

```bash
autodoc
```

This will:
- Scan the project
- Detect the tech stack
- Understand the project structure
- Generate a README.md

### Enable AI (optional)

```bash
autodoc --ai
```

Requires `OPENAI_API_KEY` to be set in your environment:

```bash
export OPENAI_API_KEY=your_api_key
```

### Additional flags

```bash
autodoc --ai --verbose
```

| Flag | Description |
|------|-------------|
| `--ai` | Enable AI-powered summarization |
| `--no-ai` | Disable AI (default) |
| `--verbose` | Debug / verbose logs |

## 🧠 How It Works

```
CLI
 └── File Scanner
      └── Tech Stack Analyzer
           └── Project Understanding Engine
                └── (Optional) AI Enhancer
                     └── README Generator
```

- ✓ Static analysis first (fast, deterministic)
- ✓ AI only enhances, never blocks
- ✓ Safe fallback if AI is unavailable

## 🧰 Tech Stack

- **Node.js**
- **TypeScript**
- **Commander.js** (CLI)
- **Chalk** (terminal output)
- **OpenAI API** (optional)

## 🔐 Privacy & Security

- 🔒 No source code is uploaded by default
- 📄 Only metadata is sent when AI is enabled
- 📴 Works fully offline without AI
- 🧠 AI failures gracefully fall back to heuristics

## 📁 Supported Project Types

- Node.js projects
- CLI tools
- Web applications (React / Next.js)
- APIs (Express)
- Static websites
- Mixed-language repositories (best-effort)

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Open an issue
- Submit a pull request
- Suggest features or improvements

## 📄 License

MIT License © 2026

---

<div align="center">

**Think of it as Prettier for documentation — zero effort, consistent, and developer-friendly.**

⭐ If you find this helpful, please consider giving us a star!

</div>
