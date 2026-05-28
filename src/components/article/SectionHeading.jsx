import React from "react";

export default function SectionHeading({ kicker, title, action }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "end",
        justifyContent: "space-between",
        gap: "16px",
        borderBottom: "1px solid #EAE2D8",
        paddingBottom: "14px",
        marginBottom: "26px",
      }}
    >
      <div>
        {kicker && (
          <span style={{ fontSize: "11px", color: "#E2001A", fontWeight: 900, letterSpacing: "1.3px", textTransform: "uppercase" }}>
            {kicker}
          </span>
        )}
        <h2 style={{ fontSize: "24px", lineHeight: 1.25, margin: kicker ? "5px 0 0" : 0, fontWeight: 900 }}>
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

