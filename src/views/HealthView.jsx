import React, { useState } from 'react';
import { articleData } from '../data/articleData';

const ARTICLES_PER_PAGE = 6;

export default function HealthView({ onReadArticle, onNavigate }) {
  const [page, setPage] = useState(1);

  const healthArticles = articleData.filter(a => a.tag === 'Health');
  const totalPages = Math.ceil(healthArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = healthArticles.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);

  const featuredArticle = healthArticles[0];
  const moreArticles = healthArticles.filter(a => a.id !== featuredArticle?.id).slice(0, 3);

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

  return (
    <main className="fix">

      {/* Hero Banner */}
      <section style={{ background: 'var(--llk-cream)', borderTop: '4px solid #E2001A', paddingTop: '60px', paddingBottom: '50px' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#E2001A', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '14px' }}>
                Health Center
              </span>
              <h1 style={{ fontSize: '40px', fontWeight: '900', color: '#1a1a1a', lineHeight: '1.2', marginBottom: '16px' }}>
                Keep Your Lab Healthy,<br />Not Just Happy
              </h1>
              <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.7', maxWidth: '560px', margin: 0 }}>
                From hip dysplasia to tropical heat safety — Labradors face real, breed-specific health risks.
                These guides give you the science straight, in language that actually makes sense.
              </p>
            </div>
            <div className="col-lg-4 d-none d-lg-flex justify-content-end align-items-center">
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '48px', fontWeight: '900', color: '#E2001A', lineHeight: 1 }}>{healthArticles.length}</div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Articles</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Health Facts Bar */}
      <section style={{ background: '#1a1a1a', padding: '22px 0' }}>
        <div className="container">
          <div className="row g-3 text-center">
            {[
              { icon: 'fa-heartbeat', text: 'BCS 4–5 is ideal weight', label: 'Body Score' },
              { icon: 'fa-thermometer-half', text: 'Danger above 39.5°C', label: 'Heat Alert' },
              { icon: 'fa-bone', text: 'Hip &amp; elbow DNA clearances', label: 'Genetics' },
            ].map((fact, i) => (
              <div className="col-md-4" key={i}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                  <i className={`fas ${fact.icon}`} style={{ fontSize: '18px', color: '#E2001A' }}></i>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }} dangerouslySetInnerHTML={{ __html: fact.label }}></div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }} dangerouslySetInnerHTML={{ __html: fact.text }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section style={{ background: '#fff', paddingTop: '60px', paddingBottom: '0' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <div style={{ width: '4px', height: '22px', background: '#E2001A', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Must-Read Guide</span>
            </div>
            <div
              onClick={() => onReadArticle(featuredArticle.id)}
              className="row g-0"
              style={{ background: '#fff', border: '1px solid #EAE2D8', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}
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

      {/* More Health Articles */}
      {moreArticles.length > 0 && (
        <section style={{ background: '#fff', paddingTop: '60px', paddingBottom: '20px' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <div style={{ width: '4px', height: '22px', background: '#E2001A', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Preventative Care</span>
            </div>
            <div className="row g-4">
              {moreArticles.map(article => (
                <div className="col-lg-4 col-md-6" key={article.id}>
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Joint & Supplement Info Block */}
      <section style={{ background: 'var(--llk-cream)', padding: '48px 0' }}>
        <div className="container">
          <div style={{ border: '1px solid #D4AF37', borderRadius: '16px', background: '#fff', padding: '32px 36px', display: 'flex', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#FFF2F2', border: '1px solid #FFD1D1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <i className="fas fa-shield-alt" style={{ fontSize: '18px', color: '#E2001A' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '15px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 8px 0' }}>
                Start joint care early — cartilage doesn't regenerate.
              </p>
              <p style={{ fontSize: '13px', color: '#666', margin: 0, lineHeight: '1.7' }}>
                Labradors are heavy-boned athletes. Joint cartilage erodes silently for years before limping starts. Glucosamine and Chondroitin supplements rebuild the joint fluid matrix, while cold-pressed Omega-3 fish oil reduces chronic inflammation. Starting at 1–2 years old makes a real difference by age 7+.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* All Health Articles — Paginated */}
      <section style={{ background: '#fff', paddingTop: '60px', paddingBottom: '80px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '4px', height: '22px', background: '#E2001A', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>All Health Guides</span>
            </div>
            <span style={{ fontSize: '13px', color: '#888' }}>{healthArticles.length} articles total</span>
          </div>

          <div className="row g-4">
            {paginatedArticles.map(article => (
              <div className="col-lg-4 col-md-6" key={article.id}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>

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
