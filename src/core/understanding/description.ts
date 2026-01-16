export function generateDescriptionHint(
  projectType: string,
  languages: string[],
  frameworks: string[]
): string {
  const primaryLang = languages[0] || "JavaScript";
  const frameworkPart = frameworks.length > 0
    ? ` powered by ${frameworks.slice(0, 2).join(" and ")}`
    : "";

  switch (projectType) {
    case "CLI":
      return `A powerful command-line tool built with ${primaryLang}${frameworkPart} for streamlined development workflows.`;
    case "API":
      return `A robust REST API built with ${primaryLang}${frameworkPart}, designed for scalability and performance.`;
    case "Web App":
      return `A modern web application developed with ${primaryLang}${frameworkPart}, featuring a responsive and intuitive interface.`;
    case "Library":
      return `A reusable ${primaryLang} library${frameworkPart} providing essential utilities and components.`;
    default:
      return `A ${primaryLang} application${frameworkPart} designed for efficient and maintainable code.`;
  }
}
