import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import ArticleCard from "../components/article/ArticleCard";
import ArticleGrid from "../components/article/ArticleGrid";
import SectionHeading from "../components/article/SectionHeading";
import { allArticles, getArticleBySlug, getRecentArticles, allSeries } from "../data/articleData";
import { guidedPaths, hubs } from "../data/taxonomy";
import { getEditorPicks } from "../utils/articleQueries";
import { itemListJsonLd } from "../utils/seo";

export default function HomeView() {
  const [subscribed, setSubscribed] = useState(false);
  const [activeFeatured, setActiveFeatured] = useState(0);
  const featuredArticles = [
    "complete-labrador-feeding-guide-sri-lanka",
    "the-first-7-days-with-a-labrador-puppy",
    "why-labradors-always-act-hungry",
    "labrador-joint-care",
    "complete-labrador-grooming-guide-sri-lanka",
    "before-you-get-a-labrador-in-sri-lanka",
    "labrador-puppy-growth-stages",
    "common-labrador-health-problems",
    "labrador-temperament-explained",
  ].map(getArticleBySlug).filter(Boolean);
  const heroArticles = featuredArticles.length >= 8 ? featuredArticles : allArticles.slice(0, 9);
  const featured = heroArticles[activeFeatured] || heroArticles[0] || allArticles[0];
  const latest = getRecentArticles(6);
  const editorPicks = getEditorPicks();
  const puppyArticles = allArticles.filter((article) => article.hub === "puppy-care").slice(0, 3);
  const nutritionSpotlight = allArticles.filter((article) => article.hub === "nutrition").slice(0, 3);
  const careBlocks = [
    { hub: hubs.find((item) => item.id === "grooming"), articles: allArticles.filter((article) => article.hub === "grooming").slice(0, 3) },
    { hub: hubs.find((item) => item.id === "health"), articles: allArticles.filter((article) => article.hub === "health").slice(0, 3) },
  ];
  const breedFacts = [
    { label: "Temperament", value: "Good-tempered, intelligent, biddable, and keen to please." },
    { label: "Build", value: "Strong, active, broad through skull and chest, with powerful hindquarters." },
    { label: "Coat", value: "Short, dense, weather-resistant coat with no wave or feathering." },
    { label: "Colours", value: "Wholly black, yellow, or liver/chocolate, with yellow ranging cream to fox red." },
    { label: "Ideal Height", value: "Dogs 56-57 cm; bitches 54-56 cm at the withers." },
    { label: "Signature Tail", value: "Medium-length otter tail, thick at the base and tapering toward the tip." },
  ];

  useEffect(() => {
    if (heroArticles.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActiveFeatured((current) => (current + 1) % heroArticles.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [heroArticles.length]);

  return (
    <main className="fix">
      <SEO
        title="Labrador Retriever care guides for Sri Lanka"
        description="A premium Labrador-specific article library for Sri Lankan owners covering puppy care, nutrition, breed knowledge, grooming, and health."
        path="/"
        jsonLd={[itemListJsonLd(latest, "/")]}
      />

      <section style={{ background: "var(--llk-cream)", borderTop: "4px solid #E2001A", padding: "64px 0 44px" }}>
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-5">
              <span style={{ color: "#E2001A", fontSize: "12px", fontWeight: 900, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                Labrador.lk Hub
              </span>
              <h1 style={{ fontSize: "42px", lineHeight: 1.15, fontWeight: 950, margin: "12px 0 16px" }}>
                Labrador care, written for Sri Lankan homes.
              </h1>
              <p style={{ color: "#555", fontSize: "16px", lineHeight: 1.75, marginBottom: "24px" }}>
                Practical, Labrador-specific articles on feeding, growth, grooming, breed behaviour, and preventive health.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link to="/articles" className="btn">Browse articles</Link>
                <Link to="/ask" style={{ color: "#E2001A", fontWeight: 800, alignSelf: "center" }}>Ask Labrador.lk</Link>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="llk-hero-feature">
                <ArticleCard article={featured} variant="large" />
                <div className="llk-hero-controls" aria-label="Featured articles">
                  {heroArticles.map((article, index) => (
                    <button
                      type="button"
                      key={article.slug}
                      className={`llk-hero-dot${index === activeFeatured ? " active" : ""}`}
                      onClick={() => setActiveFeatured(index)}
                      aria-label={`Show featured article ${index + 1}: ${article.title}`}
                      aria-current={index === activeFeatured ? "true" : undefined}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 0", background: "#fff" }}>
        <div className="container">
          <SectionHeading kicker="Start here" title="Guided reading paths" />
          <div className="row g-4">
            {guidedPaths.map((path) => (
              <div className="col-lg-4 col-md-6" key={path.title}>
                <div className="llk-path-card" style={{ height: "100%", border: "1px solid #EAE2D8", borderRadius: "8px", padding: "22px", background: "#FCFBF7" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 900, marginBottom: "8px" }}>{path.title}</h3>
                  <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.65 }}>{path.description}</p>
                  <Link to={`/articles?q=${encodeURIComponent(path.title.split(" ")[0])}`} style={{ color: "#E2001A", fontWeight: 800 }}>
                    Open path <i className="fas fa-arrow-right" style={{ fontSize: "11px", marginLeft: "4px" }}></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "20px 0 56px", background: "#fff" }}>
        <div className="container">
          <SectionHeading
            kicker="Breed snapshot"
            title="Labrador facts at a glance"
            action={<Link to="/hubs/breed" style={{ color: "#E2001A", fontWeight: 800 }}>Open breed hub</Link>}
          />
          <p style={{ color: "#555", lineHeight: 1.7, maxWidth: "760px", marginBottom: "24px" }}>
            A simple owner-friendly summary based on the FCI Labrador Retriever breed standard, shaped for quick reading before you dive into the full breed guides.
          </p>
          <div className="row g-3">
            {breedFacts.map((fact) => (
              <div className="col-lg-4 col-md-6" key={fact.label}>
                <div className="llk-breed-fact">
                  <span>{fact.label}</span>
                  <p>{fact.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "20px 0 56px", background: "#fff" }}>
        <div className="container">
          <SectionHeading
            kicker="Latest"
            title="New Labrador guides"
            action={<Link to="/articles" style={{ color: "#E2001A", fontWeight: 800 }}>View all</Link>}
          />
          <ArticleGrid articles={latest} />
        </div>
      </section>

      <section style={{ padding: "56px 0", background: "var(--llk-cream)" }}>
        <div className="container">
          <SectionHeading kicker="Editor's picks" title="Essential reads" />
          <ArticleGrid articles={editorPicks} />
        </div>
      </section>

      <section style={{ padding: "56px 0", background: "#fff" }}>
        <div className="container">
          <SectionHeading
            kicker="Puppy care"
            title="First-year foundations"
            action={<Link to="/hubs/puppy-care" style={{ color: "#E2001A", fontWeight: 800 }}>Open hub</Link>}
          />
          <ArticleGrid articles={puppyArticles} />
        </div>
      </section>

      <section style={{ padding: "56px 0", background: "#fff" }}>
        <div className="container">
          <SectionHeading
            kicker="Nutrition spotlight"
            title="Feeding, weight, and routine"
            action={<Link to="/hubs/nutrition" style={{ color: "#E2001A", fontWeight: 800 }}>Open hub</Link>}
          />
          <ArticleGrid articles={nutritionSpotlight} />
        </div>
      </section>

      <section style={{ padding: "56px 0", background: "var(--llk-cream)" }}>
        <div className="container">
          <div className="row g-5">
            {careBlocks.map(({ hub, articles }) => (
              <div className="col-lg-6" key={hub.id}>
                <SectionHeading
                  kicker={hub.label}
                  title={hub.title}
                  action={<Link to={`/hubs/${hub.slug}`} style={{ color: "#E2001A", fontWeight: 800 }}>Open</Link>}
                />
                <div style={{ display: "grid", gap: "14px" }}>
                  {articles.map((article) => (
                    <ArticleCard article={article} key={article.slug} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {allSeries.length > 0 && (
        <section style={{ padding: "56px 0", background: "#fff" }}>
          <div className="container">
            <SectionHeading kicker="Series" title="Follow a complete topic" />
            <div className="row g-3">
              {allSeries.map((series) => (
                <div className="col-lg-4 col-md-6" key={series.slug}>
                  <Link to={`/series/${series.slug}`} style={{ display: "block", border: "1px solid #EAE2D8", borderRadius: "8px", padding: "22px", color: "#1a1a1a", textDecoration: "none", fontWeight: 900 }}>
                    <i className="fas fa-layer-group" style={{ color: "#E2001A", marginRight: "8px" }}></i>
                    {series.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: "56px 0", background: "#1a1a1a" }}>
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <h2 style={{ color: "#fff", fontSize: "30px", fontWeight: 950, marginBottom: "10px" }}>Have a Labrador care question?</h2>
              <p style={{ color: "#bbb", lineHeight: 1.7, margin: 0 }}>Send a question and help shape future Labrador.lk articles.</p>
            </div>
            <div className="col-lg-5 text-lg-end">
              <Link to="/ask" className="btn">Ask Labrador.lk</Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "44px 0", background: "#fff" }}>
        <div className="container">
          <div style={{ border: "1px solid #EAE2D8", borderRadius: "8px", padding: "28px", display: "flex", gap: "18px", justifyContent: "space-between", flexWrap: "wrap", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: 900, marginBottom: "6px" }}>Get new guides when they publish</h2>
              <p style={{ color: "#555", margin: 0 }}>A quiet newsletter for Labrador care reading, not shopping pressure.</p>
            </div>
            {subscribed ? (
              <strong style={{ color: "#E2001A" }}>You're subscribed.</strong>
            ) : (
              <form onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }} style={{ display: "flex", gap: "8px", minWidth: "300px" }}>
                <input type="email" required placeholder="Email address" style={{ flex: 1, border: "1px solid #EAE2D8", borderRadius: "30px", padding: "12px 16px" }} />
                <button className="btn" type="submit">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
