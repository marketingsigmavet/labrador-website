import React, { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import ArticleGrid from "../components/article/ArticleGrid";
import Pagination from "../components/article/Pagination";
import SectionHeading from "../components/article/SectionHeading";
import { allArticles, allSeries, allTags } from "../data/articleData";
import { hubs } from "../data/taxonomy";
import { filterArticles, getSeriesFromSlug, getTagLabelFromSlug, slugify } from "../utils/articleQueries";
import { breadcrumbJsonLd, itemListJsonLd } from "../utils/seo";

export default function ArticleIndexView({ mode = "all" }) {
  const { tagSlug, seriesSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const hub = searchParams.get("hub") || "";
  const category = searchParams.get("category") || "";
  const tag = mode === "tag" ? getTagLabelFromSlug(tagSlug) : searchParams.get("tag") || "";
  const series = mode === "series" ? seriesSlug : searchParams.get("series") || "";
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const seriesMeta = mode === "series" ? getSeriesFromSlug(seriesSlug) : null;
  const articlesPerPage = 12;

  const articles = useMemo(
    () => filterArticles({ query, hub, category, tag, series }),
    [query, hub, category, tag, series]
  );
  const totalPages = Math.max(1, Math.ceil(articles.length / articlesPerPage));
  const currentPage = Math.min(page, totalPages);
  const paginatedArticles = articles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);

  const title =
    mode === "tag"
      ? `Articles tagged ${tag}`
      : mode === "series"
        ? seriesMeta?.title || "Article series"
        : "All Labrador articles";

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    setSearchParams(next);
  };

  const updatePage = (nextPage) => {
    const next = new URLSearchParams(searchParams);
    if (nextPage <= 1) next.delete("page");
    else next.set("page", String(nextPage));
    setSearchParams(next);
  };

  return (
    <main className="fix">
      <SEO
        title={title}
        description="Search and filter Labrador.lk articles by hub, category, tag, series, and care topic."
        path={mode === "tag" ? `/tags/${tagSlug}` : mode === "series" ? `/series/${seriesSlug}` : "/articles"}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Articles", path: "/articles" },
          ]),
          itemListJsonLd(articles, "/articles"),
        ]}
      />

      <section style={{ background: "var(--llk-cream)", borderTop: "4px solid #E2001A", padding: "60px 0 48px" }}>
        <div className="container">
          <span style={{ color: "#E2001A", fontSize: "12px", fontWeight: 900, letterSpacing: "1.5px", textTransform: "uppercase" }}>
            Article library
          </span>
          <h1 style={{ fontSize: "40px", fontWeight: 950, margin: "10px 0 12px" }}>{title}</h1>
          <p style={{ maxWidth: "720px", color: "#555", fontSize: "16px", lineHeight: 1.7, margin: 0 }}>
            Browse Labrador-specific care guides built for Sri Lankan homes, climate, feeding habits, and everyday routines.
          </p>
        </div>
      </section>

      <section style={{ padding: "42px 0 70px", background: "#fff" }}>
        <div className="container">
          <div style={{ border: "1px solid #EAE2D8", borderRadius: "8px", padding: "20px", marginBottom: "32px", background: "#FCFBF7" }}>
            <div className="row g-3">
              <div className="col-lg-4">
                <label className="llk-filter-label">Search</label>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => updateParam("q", event.target.value)}
                  placeholder="Search by topic, problem, or keyword"
                  className="llk-filter-input"
                />
              </div>
              <div className="col-lg-2 col-md-6">
                <label className="llk-filter-label">Hub</label>
                <select value={hub} onChange={(event) => updateParam("hub", event.target.value)} className="llk-filter-input">
                  <option value="">All hubs</option>
                  {hubs.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}
                </select>
              </div>
              <div className="col-lg-2 col-md-6">
                <label className="llk-filter-label">Category</label>
                <select value={category} onChange={(event) => updateParam("category", event.target.value)} className="llk-filter-input">
                  <option value="">All categories</option>
                  {hubs.map((item) => <option value={item.category} key={item.category}>{item.category}</option>)}
                </select>
              </div>
              <div className="col-lg-2 col-md-6">
                <label className="llk-filter-label">Tag</label>
                <select value={tag} onChange={(event) => updateParam("tag", event.target.value)} className="llk-filter-input" disabled={mode === "tag"}>
                  <option value="">All tags</option>
                  {allTags.map((item) => <option value={item} key={item}>{item}</option>)}
                </select>
              </div>
              <div className="col-lg-2 col-md-6">
                <label className="llk-filter-label">Series</label>
                <select value={series} onChange={(event) => updateParam("series", event.target.value)} className="llk-filter-input" disabled={mode === "series"}>
                  <option value="">All series</option>
                  {allSeries.map((item) => <option value={item.slug} key={item.slug}>{item.title}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", marginTop: "16px" }}>
              <span style={{ color: "#555", fontWeight: 800 }}>{articles.length} articles found</span>
              <Link to="/articles" style={{ color: "#E2001A", fontWeight: 800 }}>Clear filters</Link>
            </div>
          </div>

          <SectionHeading kicker={mode === "all" ? "Browse" : "Filtered"} title={title} />
          <ArticleGrid articles={paginatedArticles} emptyText="No articles match these filters yet." />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={updatePage} />

          <div style={{ marginTop: "42px" }}>
            <SectionHeading kicker="Popular tags" title="Explore by topic" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {allTags.slice(0, 36).map((item) => (
                <Link key={item} to={`/tags/${slugify(item)}`} className="llk-topic-chip">#{item}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
