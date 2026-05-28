import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import ArticleCard from "../components/article/ArticleCard";
import ArticleGrid from "../components/article/ArticleGrid";
import SectionHeading from "../components/article/SectionHeading";
import { allArticles, getArticleBySlug, getRecentArticles, allSeries } from "../data/articleData";
import { guidedPaths, hubs } from "../data/taxonomy";
import { getEditorPicks } from "../utils/articleQueries";
import { getArticleImage, getArticleImageAlt, handleArticleImageError } from "../utils/images";
import { itemListJsonLd } from "../utils/seo";

function IconAction({ to, label }) {
  return (
    <Link
      to={to}
      aria-label={label}
      title={label}
      style={{
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        background: "#E2001A",
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        flexShrink: 0,
        boxShadow: "0 8px 18px rgba(226, 0, 26, 0.18)",
      }}
    >
      <i className="fas fa-arrow-right" style={{ fontSize: "12px" }} />
    </Link>
  );
}

function CompactArticleLink({ article, large = false, showExcerpt = false }) {
  if (!article) return null;

  return (
    <Link
      to={`/articles/${article.slug}`}
      style={{
        display: "grid",
        gridTemplateColumns: large ? "142px 1fr" : "92px 1fr",
        gap: "14px",
        alignItems: "center",
        color: "#1a1a1a",
        textDecoration: "none",
        border: "1px solid #EAE2D8",
        borderRadius: "8px",
        background: "#fff",
        padding: "10px",
      }}
    >
      <span style={{ display: "block", aspectRatio: "3 / 2", background: "#F6F1EA", borderRadius: "6px", overflow: "hidden", border: "1px solid #EAE2D8" }}>
        <img
          src={getArticleImage(article)}
          alt={getArticleImageAlt(article)}
          loading="lazy"
          decoding="async"
          onError={handleArticleImageError}
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        />
      </span>
      <span>
        <span style={{ display: "block", color: "#777", fontSize: "11px", fontWeight: 800, marginBottom: "4px" }}>
          {article.hubLabel} · {article.readingTime}
        </span>
        <strong style={{ display: "block", fontSize: large ? "16px" : "13px", lineHeight: 1.35, fontWeight: 900 }}>
          {article.title}
        </strong>
        {showExcerpt && (
          <span style={{ display: "block", color: "#555", fontSize: large ? "13px" : "12px", lineHeight: 1.5, marginTop: "6px" }}>
            {article.excerpt}
          </span>
        )}
      </span>
    </Link>
  );
}

function MiniArticleTile({ article }) {
  if (!article) return null;

  return (
    <Link
      to={`/articles/${article.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        color: "#1a1a1a",
        textDecoration: "none",
        border: "1px solid #EAE2D8",
        borderRadius: "8px",
        background: "#fff",
        overflow: "hidden",
        minHeight: "100%",
      }}
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
      <span style={{ display: "block", padding: "10px" }}>
        <span style={{ display: "block", color: "#777", fontSize: "10px", fontWeight: 800, marginBottom: "4px" }}>
          {article.readingTime}
        </span>
        <strong style={{ display: "block", fontSize: "12px", lineHeight: 1.35, fontWeight: 900 }}>
          {article.title}
        </strong>
      </span>
    </Link>
  );
}

export default function HomeView() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [subscribed, setSubscribed] = useState(false);
  const [activeFeatured, setActiveFeatured] = useState(0);
  const [heroQuery, setHeroQuery] = useState("");
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
  const heroResults = useMemo(() => {
    const query = heroQuery.trim().toLowerCase();
    if (query.length < 2) return [];
    return allArticles
      .filter((article) =>
        [
          article.title,
          article.excerpt,
          article.quickAnswer,
          article.hubLabel,
          article.category,
          article.lifeStage,
          ...(article.tags || []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
      .slice(0, 4);
  }, [heroQuery]);
  const latest = getRecentArticles(6);
  const editorPicks = getEditorPicks();
  const puppyArticles = allArticles.filter((article) => article.hub === "puppy-care").slice(0, 3);
  const nutritionSpotlight = allArticles.filter((article) => article.hub === "nutrition").slice(0, 6);
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
  const latestLead = latest[0];
  const latestSide = latest.slice(1, 6);
  const nutritionLead = nutritionSpotlight[0];
  const nutritionSide = nutritionSpotlight.slice(1, 6);

  useEffect(() => {
    if (heroArticles.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActiveFeatured((current) => (current + 1) % heroArticles.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [heroArticles.length]);

  useEffect(() => {
    const carousel = carouselRef.current;
    const activeCard = carousel?.querySelector(`[data-hero-index="${activeFeatured}"]`);
    if (!carousel || !activeCard) return;

    const targetLeft = activeCard.offsetLeft - (carousel.clientWidth - activeCard.clientWidth) / 2;
    carousel.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }, [activeFeatured]);

  const submitHeroSearch = (event) => {
    event.preventDefault();
    const query = heroQuery.trim();
    if (!query) return;
    if (heroResults.length) navigate(`/articles?q=${encodeURIComponent(query)}`);
    else navigate(`/ask?question=${encodeURIComponent(query)}`);
  };

  return (
    <main className="fix">
      <SEO
        title="Labrador Retriever care guides for Sri Lanka"
        description="A premium Labrador-specific article library for Sri Lankan owners covering puppy care, nutrition, breed knowledge, grooming, and health."
        path="/"
        jsonLd={[itemListJsonLd(latest, "/")]}
      />

      <section style={{ background: "var(--llk-cream)", borderTop: "4px solid #E2001A", padding: "64px 0 46px", overflow: "hidden" }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <span style={{ color: "#E2001A", fontSize: "12px", fontWeight: 900, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                Labrador.lk Hub
              </span>
              <h1 style={{ fontSize: "44px", lineHeight: 1.08, fontWeight: 950, margin: "12px 0 16px" }}>
                Lab parent mode, unlocked.
              </h1>
              <p style={{ color: "#555", fontSize: "16px", lineHeight: 1.75, marginBottom: "22px" }}>
                Ask a Labrador question, find the right guide, and build a care routine that actually works in Sri Lankan homes.
              </p>
              <form onSubmit={submitHeroSearch} style={{ position: "relative", marginBottom: "16px" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", background: "#fff", border: "1px solid #EAE2D8", borderRadius: "999px", padding: "7px", boxShadow: "0 18px 45px rgba(26, 26, 26, 0.08)" }}>
                  <i className="fas fa-search" style={{ color: "#E2001A", marginLeft: "10px", fontSize: "13px" }} />
                  <input
                    type="search"
                    value={heroQuery}
                    onChange={(event) => setHeroQuery(event.target.value)}
                    placeholder="Ask Labrador.lk"
                    aria-label="Ask Labrador.lk"
                    style={{ flex: 1, border: "none", outline: "none", fontSize: "15px", padding: "12px 4px", minWidth: 0 }}
                  />
                  <button
                    type="submit"
                    aria-label="Search Labrador.lk"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      border: "none",
                      background: "#E2001A",
                      color: "#fff",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      cursor: "pointer",
                      boxShadow: "0 8px 18px rgba(226, 0, 26, 0.22)",
                    }}
                  >
                    <i className="fas fa-arrow-right" style={{ fontSize: "13px" }} />
                  </button>
                </div>
                {heroQuery.trim().length >= 2 && (
                  <div style={{ position: "absolute", zIndex: 5, top: "calc(100% + 8px)", left: 0, right: 0, background: "#fff", border: "1px solid #EAE2D8", borderRadius: "12px", boxShadow: "0 18px 45px rgba(26, 26, 26, 0.12)", padding: "10px" }}>
                    {heroResults.length ? (
                      <>
                        {heroResults.map((article) => (
                          <Link key={article.slug} to={`/articles/${article.slug}`} style={{ display: "block", color: "#1a1a1a", textDecoration: "none", padding: "10px 8px", borderBottom: "1px solid #F0E8DD" }}>
                            <strong style={{ display: "block", fontSize: "14px", lineHeight: 1.35 }}>{article.title}</strong>
                            <span style={{ color: "#777", fontSize: "12px", fontWeight: 700 }}>{article.hubLabel} · {article.readingTime}</span>
                          </Link>
                        ))}
                        <Link to={`/articles?q=${encodeURIComponent(heroQuery.trim())}`} style={{ display: "block", color: "#E2001A", fontSize: "13px", fontWeight: 900, padding: "10px 8px 4px", textDecoration: "none" }}>
                          View all matching guides
                        </Link>
                      </>
                    ) : (
                      <div style={{ padding: "10px 8px" }}>
                        <strong style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}>No matching guide yet.</strong>
                        <p style={{ color: "#555", fontSize: "13px", lineHeight: 1.5, margin: "0 0 8px" }}>Send it as a request and we can turn it into a future Labrador.lk guide.</p>
                        <Link to={`/ask?question=${encodeURIComponent(heroQuery.trim())}`} style={{ color: "#E2001A", fontWeight: 900, fontSize: "13px", textDecoration: "none" }}>
                          Submit this question
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </form>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", color: "#777", fontSize: "13px", fontWeight: 800 }}>
                <span>62 guides</span>
                <span>5 hubs</span>
                <span>Sri Lanka-focused</span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="llk-hero-feature" style={{ overflow: "hidden" }}>
                <div
                  ref={carouselRef}
                  style={{
                    display: "flex",
                    gap: "18px",
                    overflowX: "auto",
                    scrollSnapType: "x mandatory",
                    scrollBehavior: "smooth",
                    padding: "4px 4px 14px",
                    scrollbarWidth: "none",
                  }}
                >
                  {heroArticles.map((article, index) => (
                    <div
                      key={article.slug}
                      data-hero-index={index}
                      style={{
                        flex: "0 0 min(430px, 82vw)",
                        scrollSnapAlign: "center",
                        opacity: index === activeFeatured ? 1 : 0.72,
                        transform: index === activeFeatured ? "scale(1)" : "scale(0.96)",
                        transition: "opacity 0.35s ease, transform 0.35s ease",
                      }}
                    >
                      <ArticleCard article={article} variant="large" />
                    </div>
                  ))}
                </div>
                <div className="llk-hero-controls" aria-label="Featured articles" style={{ justifyContent: "center" }}>
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
            action={<IconAction to="/hubs/breed" label="Open breed hub" />}
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
            action={<IconAction to="/articles" label="View all articles" />}
          />
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-6">
              <ArticleCard article={latestLead} variant="large" />
            </div>
            <div className="col-lg-6">
              <div style={{ height: "100%", border: "1px solid #EAE2D8", borderRadius: "8px", background: "#FCFBF7", padding: "16px", display: "grid", gap: "12px" }}>
                {latestSide.map((article, index) => (
                  <CompactArticleLink key={article.slug} article={article} large={index === 0} showExcerpt />
                ))}
              </div>
            </div>
          </div>
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
            action={<IconAction to="/hubs/puppy-care" label="Open puppy care hub" />}
          />
          <ArticleGrid articles={puppyArticles} />
        </div>
      </section>

      <section style={{ padding: "56px 0", background: "#fff" }}>
        <div className="container">
          <SectionHeading
            kicker="Nutrition spotlight"
            title="Feeding, weight, and routine"
            action={<IconAction to="/hubs/nutrition" label="Open nutrition hub" />}
          />
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-7">
              <ArticleCard article={nutritionLead} variant="large" />
            </div>
            <div className="col-lg-5">
              <div style={{ height: "100%", border: "1px solid #EAE2D8", borderRadius: "8px", background: "#FCFBF7", padding: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" }}>
                  <div style={{ border: "1px solid #D4AF37", borderRadius: "8px", background: "#fff", padding: "14px", minHeight: "100%" }}>
                    <span style={{ display: "block", color: "#E2001A", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1.1px", marginBottom: "6px" }}>
                      Nutrition hub
                    </span>
                    <h3 style={{ fontSize: "15px", fontWeight: 950, lineHeight: 1.25, margin: "0 0 7px" }}>
                      Feed the Lab, not the begging.
                    </h3>
                    <p style={{ color: "#555", fontSize: "12px", lineHeight: 1.55, margin: 0 }}>
                      Portion control, weight checks, food motivation, and structured routines for Sri Lankan homes.
                    </p>
                  </div>
                  {nutritionSide.map((article) => (
                    <MiniArticleTile key={article.slug} article={article} />
                  ))}
                </div>
              </div>
            </div>
          </div>
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
                  action={<IconAction to={`/hubs/${hub.slug}`} label={`Open ${hub.label} hub`} />}
                />
                <div style={{ display: "grid", gap: "12px" }}>
                  {articles.map((article) => (
                    <CompactArticleLink article={article} key={article.slug} />
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
              <Link
                to="/ask"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  minHeight: "48px",
                  borderRadius: "999px",
                  background: "#E2001A",
                  color: "#fff",
                  fontWeight: 900,
                  padding: "13px 22px",
                  textDecoration: "none",
                  boxShadow: "0 10px 24px rgba(226, 0, 26, 0.24)",
                }}
              >
                Ask Labrador.lk
                <i className="fas fa-arrow-right" style={{ fontSize: "12px" }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "44px 0", background: "#fff" }}>
        <div className="container">
          <div style={{ border: "1px solid #EAE2D8", borderRadius: "18px", padding: "28px", display: "flex", gap: "18px", justifyContent: "space-between", flexWrap: "wrap", alignItems: "center", background: "#FCFBF7" }}>
            <div style={{ flex: "1 1 260px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 900, marginBottom: "6px" }}>Get new guides when they publish</h2>
              <p style={{ color: "#555", margin: 0 }}>A quiet newsletter for Labrador care reading, not shopping pressure.</p>
            </div>
            {subscribed ? (
              <strong style={{ color: "#E2001A", flex: "0 1 auto" }}>You're subscribed.</strong>
            ) : (
              <form
                onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}
                style={{ display: "flex", gap: "8px", flex: "1 1 340px", maxWidth: "520px", minWidth: 0, flexWrap: "wrap" }}
              >
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  style={{
                    flex: "1 1 220px",
                    minWidth: 0,
                    border: "1px solid #EAE2D8",
                    borderRadius: "999px",
                    padding: "13px 18px",
                    background: "#fff",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    border: "none",
                    borderRadius: "999px",
                    background: "#E2001A",
                    color: "#fff",
                    fontWeight: 900,
                    padding: "13px 20px",
                    minHeight: "48px",
                    flex: "0 0 auto",
                    cursor: "pointer",
                    boxShadow: "0 10px 24px rgba(226, 0, 26, 0.18)",
                  }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
