export function generateDescriptionHint(
  projectType: string,
  languages: string[],
  frameworks: string[]
): string {
  const langPart = languages.join(", ");
  const frameworkPart = frameworks.length
    ? ` using ${frameworks.join(", ")}`
    : "";

  switch (projectType) {
    case "CLI":
      return `A command-line tool written in ${langPart}${frameworkPart}.`;
    case "API":
      return `A backend API built with ${langPart}${frameworkPart}.`;
    case "Web App":
      return `A web application developed using ${langPart}${frameworkPart}.`;
    default:
      return `A software project written in ${langPart}.`;
  }
}
