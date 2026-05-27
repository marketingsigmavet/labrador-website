import React, { useState } from 'react';
import { articleData } from '../data/articleData';

const ARTICLES_PER_PAGE = 6;

export default function NutritionView({ onReadArticle, onNavigate }) {
  const [page, setPage] = useState(1);

  const nutritionArticles = articleData.filter(a => a.tag === 'Nutrition');
  const totalPages = Math.ceil(nutritionArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = nutritionArticles.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);

  const featuredArticle = nutritionArticles[0];
  const scienceArticles = nutritionArticles.filter(a => a.id !== featuredArticle?.id).slice(0, 3);
  const allOtherArticles = nutritionArticles;

  const ArticleCard = ({ article, large = false }) => (
    <div
      onClick={() => onReadArticle(article.id)}
      style={{
        background: '#fff',
        border: '1px solid #EAE2D8',
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.25s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#E2001A'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#EAE2D8'}
    >
      <div style={{ height: large ? '260px' : '190px', overflow: 'hidden', flexShrink: 0 }}>
        <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: large ? '24px' : '18px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <span style={{ fontSize: '10px', fontWeight: '800', color: '#E2001A', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', display: 'block' }}>
          {article.tag} &bull; {article.readTime} read
        </span>
        <h3 style={{ fontSize: large ? '20px' : '16px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 10px 0', lineHeight: '1.4' }}>
          {article.title}
        </h3>
        <p style={{ fontSize: '13px', color: '#666', margin: '0 0 16px 0', lineHeight: '1.6', flexGrow: 1 }}>
          {article.excerpt}
        </p>
        <span style={{ fontSize: '13px', color: '#E2001A', fontWeight: '700' }}>
          Read Article <i className="fas fa-arrow-right" style={{ fontSize: '11px', marginLeft: '4px' }}></i>
        </span>
      </div>
    </div>
  );

  const SmallListItem = ({ article }) => (
    <div
      onClick={() => onReadArticle(article.id)}
      style={{ display: 'flex', gap: '14px', padding: '16px 0', borderBottom: '1px solid #EAE2D8', cursor: 'pointer' }}
      onMouseEnter={e => e.currentTarget.querySelector('h4').style.color = '#E2001A'}
      onMouseLeave={e => e.currentTarget.querySelector('h4').style.color = '#1a1a1a'}
    >
      <div style={{ width: '80px', height: '70px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
        <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div>
        <span style={{ fontSize: '10px', fontWeight: '800', color: '#E2001A', textTransform: 'uppercase', letterSpacing: '1px' }}>{article.readTime} read</span>
        <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#1a1a1a', margin: '4px 0 4px 0', lineHeight: '1.4', transition: 'color 0.2s' }}>
          {article.title}
        </h4>
        <span style={{ fontSize: '11px', color: '#888' }}>{article.date}</span>
      </div>
    </div>
  );

  return (
    <main className="fix">

      {/* Hero Banner — Cream, editorial, no black-on-red */}
      <section style={{ background: 'var(--llk-cream)', borderTop: '4px solid #E2001A', paddingTop: '60px', paddingBottom: '50px' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#E2001A', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '14px' }}>
                Nutrition Hub
              </span>
              <h1 style={{ fontSize: '40px', fontWeight: '900', color: '#1a1a1a', lineHeight: '1.2', marginBottom: '16px' }}>
                What Your Lab Actually<br />Needs to Eat
              </h1>
              <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.7', maxWidth: '560px', margin: 0 }}>
                Labradors are built different — from their POMC hunger gene to their heavy skeletal frame.
                These science-backed guides break down breed-specific nutrition in plain language, no jargon.
              </p>
            </div>
            <div className="col-lg-4 d-none d-lg-flex justify-content-end align-items-center">
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '48px', fontWeight: '900', color: '#E2001A', lineHeight: 1 }}>{nutritionArticles.length}</div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Articles</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section style={{ background: '#fff', paddingTop: '60px', paddingBottom: '0' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <div style={{ width: '4px', height: '22px', background: '#E2001A', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Featured Guide</span>
            </div>
            <div
              onClick={() => onReadArticle(featuredArticle.id)}
              style={{ background: '#fff', border: '1px solid #EAE2D8', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              className="row g-0"
              onMouseEnter={e => e.currentTarget.style.borderColor = '#E2001A'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#EAE2D8'}
            >
              <div className="col-lg-6" style={{ overflow: 'hidden', minHeight: '320px' }}>
                <img src={featuredArticle.image} alt={featuredArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '320px' }} />
              </div>
              <div className="col-lg-6" style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#E2001A', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '14px', display: 'block' }}>
                  {featuredArticle.tag} &bull; {featuredArticle.readTime} read &bull; {featuredArticle.date}
                </span>
                <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#1a1a1a', lineHeight: '1.3', marginBottom: '16px' }}>
                  {featuredArticle.title}
                </h2>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.7', marginBottom: '24px' }}>
                  {featuredArticle.excerpt}
                </p>
                <span style={{ fontSize: '14px', color: '#E2001A', fontWeight: '800' }}>
                  Read Full Guide <i className="fas fa-arrow-right" style={{ fontSize: '12px', marginLeft: '5px' }}></i>
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Science of Feeding Section */}
      {scienceArticles.length > 0 && (
        <section style={{ background: '#fff', paddingTop: '60px', paddingBottom: '20px' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <div style={{ width: '4px', height: '22px', background: '#E2001A', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>The Science of Feeding</span>
            </div>
            <div className="row g-4">
              {scienceArticles.map(article => (
                <div className="col-lg-4 col-md-6" key={article.id}>
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brand Spotlight — subtle Beaphar/premium nutrition mention */}
      <section style={{ background: 'var(--llk-cream)', padding: '48px 0' }}>
        <div className="container">
          <div style={{ border: '1px solid #D4AF37', borderRadius: '16px', background: '#fff', padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#FFF2F2', border: '1px solid #FFD1D1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="fas fa-flask" style={{ fontSize: '18px', color: '#E2001A' }}></i>
              </div>
              <div>
                <p style={{ fontSize: '15px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 6px 0' }}>
                  Did you know? Kibble shape is actually science.
                </p>
                <p style={{ fontSize: '13px', color: '#666', margin: 0, lineHeight: '1.7' }}>
                  Premium breed-specific dry foods use donut-shaped kibble to physically slow down a Labrador's notoriously fast eating pace — reducing bloat risk and promoting real satiety signals. Pair with cold-pressed salmon oil daily to reinforce the skin's lipid barrier and keep that coat gleaming.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Nutrition Articles — Paginated */}
      <section style={{ background: '#fff', paddingTop: '60px', paddingBottom: '80px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '4px', height: '22px', background: '#E2001A', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>All Nutrition Guides</span>
            </div>
            <span style={{ fontSize: '13px', color: '#888' }}>{nutritionArticles.length} articles total</span>
          </div>

          <div className="row g-4">
            {paginatedArticles.map(article => (
              <div className="col-lg-4 col-md-6" key={article.id}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '48px' }}>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #EAE2D8', background: page === 1 ? '#f5f5f5' : '#fff', color: page === 1 ? '#bbb' : '#1a1a1a', fontWeight: '700', cursor: page === 1 ? 'default' : 'pointer', fontSize: '14px' }}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', border: p === page ? '2px solid #E2001A' : '1px solid #EAE2D8', background: p === page ? '#E2001A' : '#fff', color: p === page ? '#fff' : '#1a1a1a', fontWeight: '800', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s' }}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #EAE2D8', background: page === totalPages ? '#f5f5f5' : '#fff', color: page === totalPages ? '#bbb' : '#1a1a1a', fontWeight: '700', cursor: page === totalPages ? 'default' : 'pointer', fontSize: '14px' }}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
