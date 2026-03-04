import React from "react";

export default function EditorPanel({ mode, setMode }) {
  const MODES = [
    { key: "business", label: "Business Mode" },
    { key: "university", label: "University Mode" },
    { key: "clients", label: "Clients Mode" },
    { key: "social", label: "Social Mode" },
    { key: "networking", label: "Networking Mode" },
  ];

  return (
    <div
      style={{
        width: "280px",
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        border: "1px solid #f2f2f2",
        height: "fit-content",
      }}
    >
      <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>
        TAPLY.CARD
      </h3>

      <div style={{ marginBottom: "24px", color: "#666", fontWeight: 500 }}>
        Modes
      </div>

      {MODES.map((m) => (
        <button
          key={m.key}
          onClick={() => setMode(m.key)}
          style={{
            width: "100%",
            padding: "12px 16px",
            marginBottom: "10px",
            borderRadius: "10px",
            border:
              mode === m.key ? "2px solid #3f8bff" : "1px solid #e5e5e5",
            background: mode === m.key ? "#f0f6ff" : "#ffffff",
            textAlign: "left",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: mode === m.key ? 600 : 500,
            color: "#333",
            transition: "0.2s",
          }}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
