import React from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import ArticleCard from "../components/article/ArticleCard";
import ArticleGrid from "../components/article/ArticleGrid";
import Pagination from "../components/article/Pagination";
import SectionHeading from "../components/article/SectionHeading";
import { allArticles, getArticleBySlug } from "../data/articleData";
import { getHub } from "../utils/articleQueries";
import { breadcrumbJsonLd, itemListJsonLd } from "../utils/seo";

export default function HubView() {
  const { hubSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const hub = getHub(hubSlug);
  if (!hub) return <Navigate to="/articles" replace />;

  const articles = allArticles.filter((article) => article.hub === hub.id);
  const featured = articles[0];
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
            <ArticleCard article={featured} variant="large" />
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
