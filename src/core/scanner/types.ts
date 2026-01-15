export type FileNode = {
  path: string;
  name: string;
  type: "file" | "directory";
  extension?: string;
  size?: number;
  children?: FileNode[];
};
