import React from "react";
import { Link } from "react-router-dom";

export default function ArticleCard({ article, variant = "default" }) {
  if (!article) return null;
  const isLarge = variant === "large";

  return (
    <article
      className={`llk-article-card llk-article-card--${variant}`}
      style={{
        background: "#fff",
        border: "1px solid #EAE2D8",
        borderRadius: "8px",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <Link to={`/articles/${article.slug}`} style={{ display: "block", overflow: "hidden" }}>
        <img
          src={article.image}
          alt={article.title}
          style={{
            width: "100%",
            height: isLarge ? "300px" : "190px",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Link>
      <div style={{ padding: isLarge ? "26px" : "18px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "10px" }}>
          <Link to={`/hubs/${article.hub}`} className="post-tag" style={{ textDecoration: "none" }}>
            {article.hubLabel}
          </Link>
          <span style={{ fontSize: "11px", color: "#777", fontWeight: 700, alignSelf: "center" }}>
            {article.readingTime}
          </span>
        </div>
        <h3
          style={{
            fontSize: isLarge ? "24px" : "17px",
            fontWeight: 900,
            lineHeight: 1.32,
            margin: "0 0 10px",
          }}
        >
          <Link to={`/articles/${article.slug}`} style={{ color: "#1a1a1a", textDecoration: "none" }}>
            {article.title}
          </Link>
        </h3>
        <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.65, margin: "0 0 16px", flex: 1 }}>
          {article.excerpt}
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "auto" }}>
          <span style={{ fontSize: "12px", color: "#777", fontWeight: 700 }}>{article.lifeStage}</span>
          <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 800 }}>{article.difficultyLevel}</span>
        </div>
      </div>
    </article>
  );
}

