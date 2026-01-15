export function renderHeader(
  projectName: string,
  description: string
): string {
  return `# ${projectName}

${description}

`;
}
