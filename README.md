# autodoc-cli

![Version](https://img.shields.io/badge/version-1.0.3-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg)

Automatically generate README.md files by analyzing your project

## ✨ Features

- Intelligent project analysis and type detection (CLI, API, Web App, Library)
- Professional README generation with badges and structured sections
- AI-powered content enhancement (optional)
- Zero-configuration - works out of the box
- TypeScript support with full type safety
- Categorized scripts and dependencies
- Customizable output

## 📖 Usage

### Using npm

```bash
# Build the project
npm run build

# Run locally
npm start

# Or link globally
npm link
autodoc

# Enable AI-powered summarization
autodoc --ai

# Verbose output
autodoc --verbose
```

### Using Docker

```bash
# Build the Docker image
docker build -t autodoc-cli .

# Run the CLI (analyzes current directory)
docker run --rm -v $(pwd):/workspace -w /workspace autodoc-cli

# With AI enhancement
docker run --rm -v $(pwd):/workspace -w /workspace autodoc-cli --ai

# Using docker-compose
docker-compose run --rm autodoc

# Analyze a specific project
docker run --rm -v /path/to/project:/workspace -w /workspace autodoc-cli
```

## 🛠️ Tech Stack

**Languages**
- TypeScript

**Runtime**
- Node.js

**Key Dependencies**
- `commander` - CLI framework
- `chalk` - Terminal styling

## ⚙️ Available Scripts

**Development**
- `npm run start` - Run the CLI locally

**Build**
- `npm run build` - Compile TypeScript to JavaScript

## 🤝 Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## 📄 License

MIT

---
_Generated automatically by AutoDoc CLI_
