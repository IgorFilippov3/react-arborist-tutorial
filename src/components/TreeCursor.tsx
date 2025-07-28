import type { CursorProps } from "react-arborist";

function TreeCursor({ top, left }: CursorProps) {
  return (
    <div
      style={{
        top,
        left,
        width: "100%",
        height: "34px",
        position: "absolute",
        backgroundColor: "#e3f2fd",
        borderRadius: "6px",
        transform: "scale(1.02)",
        boxShadow: "0 2px 8px rgba(33, 150, 243, 0.2)",
      }}
    ></div>
  );
}

export default TreeCursor;
