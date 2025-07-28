import type { ComponentType } from "react";

export interface FileNode {
  id: string;
  name: string;
  type?: FileNodeType;
  children?: FileNode[];
  icon?: ComponentType;
}

export interface SelectedNodeData {
  id: string;
  name: string;
  type: FileNodeType;
}

export type FileNodeType = "folder" | "file";
