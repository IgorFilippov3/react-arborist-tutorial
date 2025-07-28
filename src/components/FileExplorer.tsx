import React, { useRef, useState, type SyntheticEvent } from "react";
import { NodeApi, Tree, TreeApi } from "react-arborist";
import { File, Folder, Edit2, Trash2 } from "lucide-react";
import data from "./data";
import type { FileNode } from "./types";
import TreeCursor from "./TreeCursor";

const FileExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const treeRef = useRef<TreeApi<FileNode> | null>(null);

  const handleNodeClick = (e: SyntheticEvent, node: NodeApi<FileNode>) => {
    e.preventDefault();
    e.stopPropagation();

    node.select();

    if (!node.isLeaf) {
      if (node.isOpen) {
        node.close();
      } else {
        node.open();
      }
    }
  };

  const startEditing = (e: React.MouseEvent, node: NodeApi<FileNode>) => {
    e.stopPropagation();
    node.edit();
  };

  const deleteNode = (e: React.MouseEvent, node: NodeApi<FileNode>) => {
    e.stopPropagation();
    treeRef?.current?.delete(node.id);
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  const handleInputBlur = (node: NodeApi<FileNode>) => {
    node.reset();
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    node: NodeApi<FileNode>
  ) => {
    e.stopPropagation();
    if (e.key === "Escape") node.reset();
    if (e.key === "Enter") {
      node.submit(e.currentTarget.value);
    }
  };

  return (
    <div>
      <div
        style={{
          width: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          margin: "12px 0",
        }}
      >
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Tree
        initialData={data}
        ref={treeRef}
        searchTerm={searchTerm}
        width={400}
        height={500}
        indent={34}
        rowHeight={34}
        openByDefault={false}
        renderCursor={TreeCursor}
      >
        {({ node, style, dragHandle }) => {
          const CustomIcon = node.data.icon;
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: node.isSelected ? "bold" : "normal",
                height: "100%",
                cursor: "pointer",
                ...style,
              }}
              onClick={(e) => handleNodeClick(e, node)}
              ref={dragHandle}
            >
              <span style={{ marginRight: "8px" }}>
                {CustomIcon ? (
                  <CustomIcon />
                ) : node.isLeaf ? (
                  <File />
                ) : (
                  <Folder />
                )}
              </span>
              {node.isEditing ? (
                <input
                  defaultValue={node.data.name}
                  onFocus={handleInputFocus}
                  onBlur={() => handleInputBlur(node)}
                  onClick={handleInputClick}
                  onKeyDown={(e) => handleInputKeyDown(e, node)}
                  autoFocus
                />
              ) : (
                <span>{node.data.name}</span>
              )}
              {node.isSelected && (
                <>
                  <button
                    onClick={(e) => startEditing(e, node)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "2px",
                      marginLeft: "12px",
                      display: "flex",
                      alignItems: "center",
                      opacity: 0.6,
                    }}
                    title="Edit node"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={(e) => deleteNode(e, node)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "2px",
                      marginLeft: "12px",
                      display: "flex",
                      alignItems: "center",
                      opacity: 0.6,
                    }}
                    title="Edit node"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </div>
          );
        }}
      </Tree>
    </div>
  );
};

export default FileExplorer;
