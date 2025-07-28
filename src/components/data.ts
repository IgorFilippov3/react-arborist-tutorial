import { Bomb, DatabaseZap } from "lucide-react";
import type { FileNode } from "./types";

const data: FileNode[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    icon: DatabaseZap,
    children: [
      {
        id: "2",
        name: "Projects",
        type: "folder",
        children: [
          { id: "3", name: "Website Redesign.pdf", type: "file", icon: Bomb },
          { id: "4", name: "Mobile App Mockups.sketch", type: "file" },
        ],
      },
      { id: "5", name: "Resume.docx", type: "file" },
      { id: "6", name: "Cover Letter.pdf", type: "file" },
    ],
  },
  {
    id: "7",
    name: "Pictures",
    type: "folder",
    children: [
      { id: "8", name: "Vacation 2023", type: "folder" },
      { id: "9", name: "Family Photos", type: "folder" },
    ],
  },
  { id: "10", name: "Downloads", type: "file" },
];

export default data;
