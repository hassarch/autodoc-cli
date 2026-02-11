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
- Docker support for containerized usage
- Customizable output

## 📦 Installation

### Using npm

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Link globally (optional)
npm link
```

### Using Docker

```bash
# Build the Docker image
docker build -t autodoc-cli .

# Or use docker-compose
docker-compose build
```

## 📖 Usage

### Local Usage

```bash
# Generate README for current directory
npm start

# Or if linked globally
autodoc

# Enable AI-powered summarization
autodoc --ai

# Verbose output
autodoc --verbose

# Show help
autodoc --help
```

### Docker Usage

```bash
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

**DevOps**
- Docker
- Docker Compose

## ⚙️ Available Scripts

**Development**
- `npm run start` - Run the CLI locally

**Build**
- `npm run build` - Compile TypeScript to JavaScript

## 🐳 Docker

The project includes Docker support for containerized usage:

- **Dockerfile** - Multi-stage build for optimized image size
- **docker-compose.yml** - Easy orchestration
- **.dockerignore** - Excludes unnecessary files

The Docker image uses Node.js 20 Alpine for minimal footprint and mounts volumes to analyze projects on your host machine.

## 🔄 CI/CD Pipelines

Automated workflows are configured via GitHub Actions:

- **CI** - Builds and tests on Node.js 18.x and 20.x on every push and PR
- **Docker** - Builds and pushes Docker images to Docker Hub and GitHub Container Registry
- **CodeQL** - Security analysis and code scanning
- **Release** - Automated release creation and artifact uploads on version tags
- **Dependabot** - Automatic dependency updates for npm and Docker

### Setting up CI/CD

1. Push code to GitHub
2. Configure secrets in repository settings:
   - `DOCKER_USERNAME` - Docker Hub username
   - `DOCKER_PASSWORD` - Docker Hub access token
3. Workflows run automatically on push, PR, and tags

## 🤝 Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## 📄 License

MIT

---
_Generated automatically by AutoDoc CLI_
