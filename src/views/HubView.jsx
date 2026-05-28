import React from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import ArticleCard from "../components/article/ArticleCard";
import ArticleGrid from "../components/article/ArticleGrid";
import Pagination from "../components/article/Pagination";
import SectionHeading from "../components/article/SectionHeading";
import { allArticles, getArticleBySlug } from "../data/articleData";
import { getHub } from "../utils/articleQueries";
import { getArticleImage, getArticleImageAlt, handleArticleImageError } from "../utils/images";
import { breadcrumbJsonLd, itemListJsonLd } from "../utils/seo";

export default function HubView() {
  const { hubSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const hub = getHub(hubSlug);
  if (!hub) return <Navigate to="/articles" replace />;

  const articles = allArticles.filter((article) => article.hub === hub.id);
  const featured = articles[0];
  const sideFeatured = articles.filter((article) => article.slug !== featured?.slug).slice(0, 4);
  const startHere = hub.startHere.map(getArticleBySlug).filter(Boolean);
  const remaining = articles.filter((article) => !startHere.some((item) => item.slug === article.slug));
  const libraryArticles = remaining.length ? remaining : articles;
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const articlesPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(libraryArticles.length / articlesPerPage));
  const currentPage = Math.min(page, totalPages);
  const paginatedArticles = libraryArticles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);
  const updatePage = (nextPage) => {
    const next = new URLSearchParams(searchParams);
    if (nextPage <= 1) next.delete("page");
    else next.set("page", String(nextPage));
    setSearchParams(next);
  };

  return (
    <main className="fix">
      <SEO
        title={`${hub.label} Labrador articles`}
        description={hub.description}
        path={`/hubs/${hub.slug}`}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: hub.label, path: `/hubs/${hub.slug}` },
          ]),
          itemListJsonLd(articles, `/hubs/${hub.slug}`),
        ]}
      />

      <section style={{ background: "var(--llk-cream)", borderTop: "4px solid #E2001A", padding: "60px 0 50px" }}>
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <span style={{ color: "#E2001A", fontSize: "12px", fontWeight: 900, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                {hub.kicker}
              </span>
              <h1 style={{ fontSize: "40px", fontWeight: 950, lineHeight: 1.18, margin: "10px 0 14px" }}>{hub.title}</h1>
              <p style={{ maxWidth: "680px", color: "#555", fontSize: "16px", lineHeight: 1.75, margin: 0 }}>{hub.description}</p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div style={{ fontSize: "52px", fontWeight: 950, color: "#E2001A", lineHeight: 1 }}>{articles.length}</div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#777", textTransform: "uppercase", letterSpacing: "1px" }}>Articles</div>
            </div>
          </div>
        </div>
      </section>

      {featured && (
        <section style={{ padding: "56px 0 20px", background: "#fff" }}>
          <div className="container">
            <SectionHeading kicker="Featured guide" title={`Start with ${hub.label}`} />
            <div className="row g-4 align-items-stretch">
              <div className="col-lg-7">
                <ArticleCard article={featured} variant="large" />
              </div>
              <div className="col-lg-5">
                <div style={{ height: "100%", border: "1px solid #EAE2D8", borderRadius: "8px", background: "#FCFBF7", padding: "16px" }}>
                  <div style={{ border: "1px solid #D4AF37", borderRadius: "8px", background: "#fff", padding: "16px", marginBottom: "14px" }}>
                    <span style={{ display: "block", color: "#E2001A", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "6px" }}>
                      {hub.kicker}
                    </span>
                    <h3 style={{ fontSize: "17px", fontWeight: 950, lineHeight: 1.25, margin: "0 0 8px", color: "#1a1a1a" }}>
                      {hub.title}
                    </h3>
                    <p style={{ color: "#555", fontSize: "13px", lineHeight: 1.6, margin: "0 0 10px" }}>
                      {hub.description}
                    </p>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{ color: "#777", fontSize: "12px", fontWeight: 800 }}>{articles.length} articles</span>
                      <Link to={`/articles?hub=${hub.id}`} style={{ color: "#E2001A", fontSize: "12px", fontWeight: 900, textDecoration: "none" }}>
                        Browse hub
                      </Link>
                    </div>
                  </div>
                  <p style={{ color: "#E2001A", fontSize: "11px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1.2px", margin: "0 0 10px" }}>
                    More from this hub
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" }}>
                    {sideFeatured.map((article) => (
                      <Link
                        key={article.slug}
                        to={`/articles/${article.slug}`}
                        style={{ display: "flex", flexDirection: "column", color: "#1a1a1a", textDecoration: "none", border: "1px solid #EAE2D8", borderRadius: "8px", background: "#fff", overflow: "hidden", minHeight: "100%" }}
                      >
                        <span style={{ display: "block", aspectRatio: "3 / 2", background: "#F6F1EA", borderBottom: "1px solid #EAE2D8", overflow: "hidden" }}>
                          <img
                            src={getArticleImage(article)}
                            alt={getArticleImageAlt(article)}
                            loading="lazy"
                            decoding="async"
                            onError={handleArticleImageError}
                            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                          />
                        </span>
                        <span style={{ display: "block", padding: "10px 11px 12px" }}>
                          <span style={{ display: "block", color: "#777", fontSize: "10px", fontWeight: 800, marginBottom: "4px" }}>
                            {article.readingTime}
                          </span>
                          <strong style={{ display: "block", fontSize: "12px", lineHeight: 1.35, fontWeight: 900 }}>{article.title}</strong>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: "56px 0", background: "#fff" }}>
        <div className="container">
          <SectionHeading kicker="Start here" title={`Essential ${hub.label} reads`} />
          <ArticleGrid articles={startHere.length ? startHere : articles.slice(0, 3)} />
        </div>
      </section>

      {hub.id === "breed" && (
        <section style={{ padding: "46px 0", background: "var(--llk-cream)" }}>
          <div className="container">
            <div style={{ border: "1px solid #D4AF37", borderRadius: "8px", padding: "28px", background: "#fff" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 950, marginBottom: "10px" }}>Quick Labrador breed profile</h2>
              <p style={{ color: "#555", lineHeight: 1.75, marginBottom: "16px" }}>
                Labradors are friendly, food-motivated, athletic working dogs with a short waterproof double coat,
                an otter tail, strong retrieving instincts, and a high need for exercise and weight control.
                In Sri Lanka, the biggest ownership challenges are heat, humidity, slippery tile floors, and family feeding habits.
              </p>
              <Link to="/articles/what-makes-a-labrador-retriever-different" style={{ color: "#E2001A", fontWeight: 800 }}>
                Read the full breed explanation
              </Link>
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: "56px 0 80px", background: hub.id === "breed" ? "#fff" : "var(--llk-cream)" }}>
        <div className="container">
          <SectionHeading
            kicker="Library"
            title={`All ${hub.label} articles`}
            action={<Link to={`/articles?hub=${hub.id}`} style={{ color: "#E2001A", fontWeight: 800 }}>Filter in library</Link>}
          />
          <ArticleGrid articles={paginatedArticles} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={updatePage} />
        </div>
      </section>
    </main>
  );
}
