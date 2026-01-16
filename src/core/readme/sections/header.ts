export function renderHeader(
  projectName: string,
  description: string,
  version?: string,
  license?: string
): string {
  let badges = "";
  
  if (version) {
    badges += `![Version](https://img.shields.io/badge/version-${version}-blue.svg) `;
  }
  if (license) {
    badges += `![License](https://img.shields.io/badge/license-${license}-green.svg)`;
  }
  
  return `# ${projectName}

${badges ? badges + "\n\n" : ""}${description}

`;
}
