import React from "react";
import ArticleCard from "./ArticleCard";

export default function ArticleGrid({ articles, emptyText = "No articles found." }) {
  if (!articles?.length) {
    return (
      <div style={{ border: "1px solid #EAE2D8", borderRadius: "8px", padding: "28px", background: "#FCFBF7" }}>
        <p style={{ margin: 0, color: "#555", fontWeight: 700 }}>{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {articles.map((article) => (
        <div className="col-lg-4 col-md-6" key={article.slug}>
          <ArticleCard article={article} />
        </div>
      ))}
    </div>
  );
}

