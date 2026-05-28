import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import ArticleGrid from "../components/article/ArticleGrid";
import SectionHeading from "../components/article/SectionHeading";
import { allArticles, getArticleBySlug, getSeriesArticles } from "../data/articleData";
import { getFallbackRelated, getRecommendedNext } from "../utils/articleQueries";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "../utils/seo";

// ─────────────────────────────────────────────
// Rich Content Block Renderer
// Supports both plain strings AND typed objects:
//
//   string                  → paragraph (with **bold** support)
//   { type: "heading", text }           → h3 section heading
//   { type: "list", items: [] }         → bullet list
//   { type: "numbered", items: [] }     → numbered steps
//   { type: "callout", text, label? }   → red callout box
//   { type: "tip", text, label? }       → gold tip box
//   { type: "warning", text }           → warning box
//   { type: "table", headers, rows }    → comparison table
//   { type: "divider" }                 → visual section break
// ─────────────────────────────────────────────

function renderInline(text) {
  // Support **bold** in strings
  if (!text || typeof text !== "string") return text;
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

function ContentBlock({ block, index }) {
  // Plain string → paragraph
  if (typeof block === "string") {
    if (block.startsWith("**") && block.endsWith("**") && block.split("**").length === 3) {
      // Pure bold line = treat as subheading
      return (
        <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#1a1a1a", margin: "32px 0 12px", lineHeight: 1.3 }}>
          {block.replace(/\*\*/g, "")}
        </h3>
      );
    }
    return (
      <p style={{ fontSize: "16px", color: "#444", lineHeight: 1.85, marginBottom: "20px" }}>
        {renderInline(block)}
      </p>
    );
  }

  // Typed object blocks
  const { type } = block;

  if (type === "heading") {
    return (
      <h3 id={block.id} style={{ fontSize: "22px", fontWeight: 900, color: "#1a1a1a", margin: "38px 0 14px", lineHeight: 1.3, scrollMarginTop: "120px" }}>
        {block.text}
      </h3>
    );
  }

  if (type === "list") {
    return (
      <ul style={{ margin: "0 0 24px 0", paddingLeft: "0", listStyle: "none" }}>
        {block.items.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "10px", fontSize: "15px", color: "#444", lineHeight: 1.7 }}>
            <span style={{ flexShrink: 0, width: "8px", height: "8px", borderRadius: "50%", background: "#E2001A", marginTop: "9px" }} />
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (type === "numbered") {
    return (
      <ol style={{ margin: "0 0 24px 0", paddingLeft: "0", listStyle: "none", counterReset: "step-counter" }}>
        {block.items.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "14px" }}>
            <span style={{ flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%", background: "#E2001A", color: "#fff", fontSize: "12px", fontWeight: 900, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              {i + 1}
            </span>
            <span style={{ fontSize: "15px", color: "#444", lineHeight: 1.75, paddingTop: "4px" }}>{renderInline(item)}</span>
          </li>
        ))}
      </ol>
    );
  }

  if (type === "callout") {
    return (
      <aside style={{ background: "linear-gradient(135deg, #FFF2F2 0%, #FFF8F5 100%)", border: "1px solid #FFD1D1", borderLeft: "5px solid #E2001A", borderRadius: "0 8px 8px 0", padding: "20px 24px", margin: "28px 0" }}>
        {block.label && (
          <p style={{ fontSize: "11px", fontWeight: 900, color: "#E2001A", textTransform: "uppercase", letterSpacing: "1.2px", margin: "0 0 6px" }}>
            {block.label}
          </p>
        )}
        <p style={{ fontSize: "15px", color: "#1a1a1a", lineHeight: 1.75, margin: 0 }}>{renderInline(block.text)}</p>
      </aside>
    );
  }

  if (type === "tip") {
    return (
      <aside style={{ background: "#FFFDF5", border: "1px solid #D4AF37", borderLeft: "5px solid #D4AF37", borderRadius: "0 8px 8px 0", padding: "20px 24px", margin: "28px 0" }}>
        <p style={{ fontSize: "11px", fontWeight: 900, color: "#B8860B", textTransform: "uppercase", letterSpacing: "1.2px", margin: "0 0 6px" }}>
          {block.label || "💡 Pro tip"}
        </p>
        <p style={{ fontSize: "15px", color: "#333", lineHeight: 1.75, margin: 0 }}>{renderInline(block.text)}</p>
      </aside>
    );
  }

  if (type === "warning") {
    return (
      <aside style={{ background: "#FFFBF0", border: "1px solid #F5A623", borderLeft: "5px solid #F5A623", borderRadius: "0 8px 8px 0", padding: "20px 24px", margin: "28px 0" }}>
        <p style={{ fontSize: "11px", fontWeight: 900, color: "#B8690A", textTransform: "uppercase", letterSpacing: "1.2px", margin: "0 0 6px" }}>
          ⚠️ {block.label || "Watch out"}
        </p>
        <p style={{ fontSize: "15px", color: "#333", lineHeight: 1.75, margin: 0 }}>{renderInline(block.text)}</p>
      </aside>
    );
  }

  if (type === "table") {
    return (
      <div style={{ overflowX: "auto", margin: "28px 0", borderRadius: "8px", border: "1px solid #EAE2D8" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr style={{ background: "#1a1a1a" }}>
              {block.headers.map((h, i) => (
                <th key={i} style={{ padding: "12px 16px", color: "#fff", fontWeight: 800, textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri} style={{ background: ri % 2 === 0 ? "#fff" : "#FCFBF7", borderBottom: "1px solid #EAE2D8" }}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "11px 16px", color: "#444", lineHeight: 1.6 }}>{renderInline(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (type === "divider") {
    return <hr style={{ border: "none", borderTop: "2px solid #FAF3E0", margin: "40px 0" }} />;
  }

  return null;
}

// ─── Sidebar components ───────────────────────────────────────────

function QuickAnswerBox({ answer }) {
  if (!answer) return null;
  return (
    <aside style={{ background: "linear-gradient(135deg, #FFF8F0 0%, #FFF2F2 100%)", border: "1px solid #FFD1D1", borderLeft: "5px solid #E2001A", borderRadius: "0 8px 8px 0", padding: "20px 24px", marginBottom: "32px" }}>
      <p style={{ fontSize: "11px", fontWeight: 900, color: "#E2001A", textTransform: "uppercase", letterSpacing: "1.2px", margin: "0 0 6px" }}>
        Quick answer
      </p>
      <p style={{ fontSize: "15px", color: "#1a1a1a", lineHeight: 1.75, margin: 0, fontWeight: 600 }}>{answer}</p>
    </aside>
  );
}

function SriLankanOwnerNote({ hub, custom }) {
  const notes = {
    nutrition: "In Sri Lankan homes, family feeding and rice-based meals can make Labrador portions difficult to control. Measured meals and a shared household rule matter more than one perfect food choice.",
    "puppy-care": "For Sri Lankan puppy owners, tile floors, heat, visitors, and multi-generational feeding habits can shape behaviour quickly. A calm routine from day one is the strongest foundation.",
    grooming: "Sri Lanka's humidity makes ear care, skin hygiene, and coat drying especially important. The goal is a simple repeatable routine, not over-bathing.",
    health: "Heat, parasites, skin irritation, obesity, and joint strain are common local risks. Early prevention usually costs less and feels kinder than late treatment.",
    breed: "Labradors are popular in Sri Lanka because they are affectionate and adaptable, but they are still large working dogs that need movement, structure, and feeding discipline.",
  };
  return (
    <aside style={{ border: "1px solid #D4AF37", borderRadius: "8px", background: "#FFFDF5", padding: "20px 24px", margin: "36px 0" }}>
      <p style={{ fontSize: "12px", fontWeight: 900, color: "#B8860B", textTransform: "uppercase", letterSpacing: "1.2px", margin: "0 0 6px" }}>
        🇱🇰 Sri Lankan owner note
      </p>
      <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.75, margin: 0 }}>{custom || notes[hub]}</p>
    </aside>
  );
}

function CareNote() {
  return (
    <aside style={{ border: "1px solid #EAE2D8", borderRadius: "8px", background: "#FCFBF7", padding: "20px 24px", margin: "36px 0" }}>
      <p style={{ fontSize: "12px", fontWeight: 900, color: "#E2001A", textTransform: "uppercase", letterSpacing: "1.2px", margin: "0 0 6px" }}>
        Labrador.lk care note
      </p>
      <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.75, margin: 0 }}>
        This article is educational and should support, not replace, advice from your veterinarian or trusted pet care professional.
      </p>
    </aside>
  );
}

function ProductBlock({ block }) {
  if (!block) return null;
  return (
    <aside style={{ border: "1px solid #EAE2D8", borderRadius: "8px", background: "#fff", padding: "20px 24px", margin: "36px 0" }}>
      <p style={{ fontSize: "12px", fontWeight: 900, color: "#E2001A", textTransform: "uppercase", letterSpacing: "1.2px", margin: "0 0 6px" }}>
        Recommended care support: {block.brand}
      </p>
      <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.75, margin: 0 }}>
        {block.text} Discuss suitability with your vet or trusted pet store as part of a structured care routine.
      </p>
    </aside>
  );
}

function FAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);
  if (!faqs?.length) return null;
  return (
    <section style={{ marginTop: "48px" }}>
      <SectionHeading kicker="FAQ" title="Frequently asked questions" />
      {faqs.map((faq, index) => (
        <div key={faq.q} style={{ borderBottom: "1px solid #EAE2D8" }}>
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            style={{ width: "100%", border: "none", background: "transparent", padding: "16px 0", textAlign: "left", display: "flex", justifyContent: "space-between", gap: "16px", cursor: "pointer" }}
          >
            <strong style={{ color: "#1a1a1a", fontSize: "15px" }}>{faq.q}</strong>
            <i className={`fas fa-chevron-${openIndex === index ? "up" : "down"}`} style={{ color: "#E2001A", fontSize: "12px", marginTop: "4px" }} />
          </button>
          {openIndex === index && <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.75, margin: "0 0 16px" }}>{faq.a}</p>}
        </div>
      ))}
    </section>
  );
}

function SeriesNavigator({ article }) {
  if (!article.series) return null;
  const seriesArticles = getSeriesArticles(article.series);
  if (seriesArticles.length < 2) return null;
  return (
    <aside style={{ background: "#1a1a1a", borderRadius: "8px", padding: "24px", margin: "42px 0" }}>
      <p style={{ color: "#E2001A", fontSize: "11px", fontWeight: 900, letterSpacing: "1.3px", textTransform: "uppercase", margin: "0 0 6px" }}>Article series</p>
      <h2 style={{ color: "#fff", fontSize: "18px", fontWeight: 900, marginBottom: "16px" }}>{article.series}</h2>
      <div style={{ display: "grid", gap: "8px" }}>
        {seriesArticles.map((item, index) => (
          <Link
            key={item.slug}
            to={`/articles/${item.slug}`}
            style={{ display: "flex", gap: "12px", alignItems: "center", background: item.slug === article.slug ? "#E2001A" : "#2a2a2a", color: "#fff", borderRadius: "8px", padding: "10px 12px", textDecoration: "none" }}
          >
            <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 900 }}>{index + 1}</span>
            <span style={{ fontSize: "13px", fontWeight: 800 }}>{item.title}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

// ─── Build TOC from content[] headings ─────────────────────────────
function buildTOC(content) {
  if (!content?.length) return [];
  return content
    .filter(block => {
      if (typeof block === "string") {
        return block.startsWith("**") && block.endsWith("**") && block.split("**").length === 3;
      }
      return block.type === "heading";
    })
    .map((block, i) => ({
      id: `section-${i}`,
      text: typeof block === "string" ? block.replace(/\*\*/g, "") : block.text,
    }));
}

// ─── Main View ──────────────────────────────────────────────────────

export default function ArticleReaderView() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <main className="fix">
        <SEO title="Article not found" description="The requested Labrador.lk article could not be found." path={`/articles/${slug || ""}`} />
        <section style={{ padding: "90px 0", background: "var(--llk-cream)", borderTop: "4px solid #E2001A" }}>
          <div className="container">
            <h1 style={{ fontSize: "36px", fontWeight: 950 }}>Article not found</h1>
            <p style={{ color: "#555", marginBottom: "24px" }}>This article may have moved. Browse the full Labrador.lk article library instead.</p>
            <Link to="/articles" className="btn">Browse articles</Link>
          </div>
        </section>
      </main>
    );
  }

  const related = getFallbackRelated(article, 4);
  const next = getRecommendedNext(article);
  const popular = allArticles.filter(item => item.slug !== article.slug).slice(0, 5);

  // Support both old content[] and new sections[] structure
  const contentBlocks = article.content || [];
  const toc = buildTOC(contentBlocks);
  const hub = article.tag?.toLowerCase().replace(/\s+/g, "-") || "breed";

  return (
    <main className="fix">
      <SEO
        title={article.seoTitle || article.title}
        description={article.seoDescription || article.excerpt}
        path={`/articles/${article.slug}`}
        jsonLd={[
          articleJsonLd(article),
          article.faqs?.length ? faqJsonLd(article.faqs) : null,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: article.tag, path: `/${hub}` },
            { name: article.title, path: `/articles/${article.slug}` },
          ]),
        ].filter(Boolean)}
      />

      {/* Breadcrumb */}
      <section style={{ background: "var(--llk-cream)", borderTop: "4px solid #E2001A", padding: "28px 0" }}>
        <div className="container">
          <Link to="/" style={{ color: "#777", fontWeight: 700 }}>Home</Link>
          <span style={{ color: "#bbb", margin: "0 8px" }}>/</span>
          <Link to={`/${hub}`} style={{ color: "#777", fontWeight: 700 }}>{article.tag}</Link>
          <span style={{ color: "#bbb", margin: "0 8px" }}>/</span>
          <span style={{ color: "#E2001A", fontWeight: 800 }}>Article</span>
        </div>
      </section>

      {/* Main content */}
      <section style={{ background: "#fff", padding: "52px 0 80px" }}>
        <div className="container">
          <div className="row g-5">
            <article className="col-lg-8">

              {/* Tag + series */}
              <Link to={`/${hub}`} className="post-tag" style={{ textDecoration: "none", display: "inline-block", marginBottom: "14px" }}>
                {article.tag}
              </Link>
              {article.series && (
                <span style={{ marginLeft: "10px", color: "#B8860B", fontWeight: 800, fontSize: "12px" }}>
                  {article.series}
                </span>
              )}

              {/* Title + subtitle */}
              <h1 style={{ fontSize: "38px", fontWeight: 950, lineHeight: 1.18, marginBottom: "12px", marginTop: "8px" }}>{article.title}</h1>
              {article.subtitle && <p style={{ fontSize: "17px", color: "#666", lineHeight: 1.65 }}>{article.subtitle}</p>}

              {/* Meta */}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", color: "#777", fontSize: "13px", fontWeight: 700, margin: "18px 0 28px" }}>
                {article.readTime && <span><i className="flaticon-history" style={{ marginRight: "5px" }} />{article.readTime}</span>}
                {article.date && <span><i className="flaticon-calendar" style={{ marginRight: "5px" }} />{article.date}</span>}
              </div>

              {/* Hero image */}
              <figure style={{ margin: "0 0 32px 0" }}>
                <img 
                  src={article.coverImage?.src || article.image} 
                  alt={article.coverImage?.alt || article.title} 
                  style={{ width: "100%", maxHeight: "460px", objectFit: "cover", borderRadius: "8px", border: "1px solid #EAE2D8" }} 
                />
                {article.coverImage?.caption && (
                  <figcaption style={{ fontSize: "13px", color: "#666", textAlign: "center", marginTop: "12px", lineHeight: 1.5 }}>
                    {article.coverImage.caption}
                  </figcaption>
                )}
              </figure>

              {/* Quick Answer */}
              <QuickAnswerBox answer={article.quickAnswer} />

              {/* Table of Contents */}
              {toc.length > 2 && (
                <nav style={{ background: "#FCFBF7", border: "1px solid #EAE2D8", borderRadius: "8px", padding: "20px 24px", marginBottom: "32px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 900, letterSpacing: "1.2px", textTransform: "uppercase", margin: "0 0 12px", color: "#1a1a1a" }}>In this guide</p>
                  <ol style={{ margin: 0, paddingLeft: "18px" }}>
                    {toc.map((item, i) => (
                      <li key={i} style={{ marginBottom: "5px" }}>
                        <a href={`#${item.id}`} style={{ color: "#444", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>{item.text}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              {/* Content blocks */}
              <div style={{ marginBottom: "8px" }}>
                {contentBlocks.map((block, i) => {
                  // Insert Sri Lankan note after ~40% of content
                  const midpoint = Math.floor(contentBlocks.length * 0.42);
                  return (
                    <React.Fragment key={i}>
                      <ContentBlock block={block} index={i} />
                      {i === midpoint && <SriLankanOwnerNote hub={hub} custom={article.sriLankaNote} />}
                    </React.Fragment>
                  );
                })}
              </div>

              <CareNote />
              <ProductBlock block={article.productBlock} />
              <SeriesNavigator article={article} />

              {/* Tags */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", padding: "22px 0", borderTop: "1px solid #EAE2D8", borderBottom: "1px solid #EAE2D8" }}>
                {article.tags?.map(tag => (
                  <span key={tag} className="llk-topic-chip">#{tag}</span>
                ))}
              </div>

              {/* Next read */}
              {next && (
                <aside style={{ marginTop: "42px", border: "1px solid #EAE2D8", borderRadius: "8px", padding: "22px", background: "#FCFBF7" }}>
                  <p style={{ color: "#E2001A", fontSize: "12px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1.2px", margin: "0 0 8px" }}>Recommended next read</p>
                  <Link to={`/articles/${next.slug}`} style={{ color: "#1a1a1a", fontSize: "20px", fontWeight: 900, textDecoration: "none" }}>{next.title}</Link>
                </aside>
              )}

              <FAQSection faqs={article.faqs} />

              {/* Related reads */}
              <section style={{ marginTop: "52px" }}>
                <SectionHeading kicker="Related reads" title="Continue learning" />
                <ArticleGrid articles={related} />
              </section>

              {/* CTA */}
              <aside style={{ marginTop: "52px", background: "#1a1a1a", borderRadius: "8px", padding: "28px" }}>
                <h2 style={{ color: "#fff", fontSize: "24px", fontWeight: 950, marginBottom: "8px" }}>Still have a Labrador question?</h2>
                <p style={{ color: "#bbb", lineHeight: 1.7 }}>Ask Labrador.lk and help us shape future educational guides.</p>
                <Link to="/ask" className="btn">Ask Labrador.lk</Link>
              </aside>

            </article>

            {/* Sticky sidebar */}
            <aside className="col-lg-4">
              <div style={{ position: "sticky", top: "100px" }}>
                <div style={{ border: "1px solid #EAE2D8", borderRadius: "8px", padding: "22px", marginBottom: "24px", background: "#FCFBF7" }}>
                  <h3 style={{ fontSize: "17px", fontWeight: 900, marginBottom: "14px" }}>Browse this hub</h3>
                  <Link to={`/${hub}`} style={{ color: "#E2001A", fontWeight: 800 }}>{article.tag} articles</Link>
                </div>
                <div style={{ border: "1px solid #EAE2D8", borderRadius: "8px", padding: "22px", background: "#fff" }}>
                  <h3 style={{ fontSize: "17px", fontWeight: 900, marginBottom: "14px" }}>Popular guides</h3>
                  {popular.map(item => (
                    <Link key={item.slug} to={`/articles/${item.slug}`} style={{ display: "flex", gap: "12px", color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #EAE2D8", padding: "12px 0" }}>
                      <img src={item.coverImage?.src || item.image} alt="" style={{ width: "68px", height: "58px", objectFit: "cover", borderRadius: "6px" }} />
                      <span style={{ fontSize: "13px", fontWeight: 800, lineHeight: 1.35 }}>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
