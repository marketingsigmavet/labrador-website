import React, { useEffect, useState, useRef } from 'react';
import { articleData, getArticlesBySeries } from '../data/articleData';

// ── Quick Answer Box ─────────────────────────────────────────────────────────
function QuickAnswerBox({ answer }) {
  if (!answer) return null;
  return (
    <div style={{
      background: 'linear-gradient(135deg, #FFF8F0 0%, #FFF2F2 100%)',
      border: '1px solid #FFD1D1',
      borderLeft: '5px solid #E2001A',
      borderRadius: '0 14px 14px 0',
      padding: '20px 24px',
      marginBottom: '32px',
    }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <div style={{ flexShrink: 0, marginTop: '2px' }}>
          <i className="fas fa-bolt" style={{ color: '#E2001A', fontSize: '14px' }}></i>
        </div>
        <div>
          <p style={{ fontSize: '11px', fontWeight: '800', color: '#E2001A', textTransform: 'uppercase', letterSpacing: '1.2px', margin: '0 0 6px 0' }}>
            Quick Answer
          </p>
          <p style={{ fontSize: '15px', color: '#1a1a1a', lineHeight: '1.7', margin: 0, fontWeight: '500' }}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Table of Contents ────────────────────────────────────────────────────────
function TableOfContents({ content }) {
  const headings = content.filter(p => p.startsWith('**') && p.endsWith('**'));
  if (headings.length < 3) return null;

  return (
    <div style={{ background: 'var(--llk-cream)', border: '1px solid #EAE2D8', borderRadius: '14px', padding: '20px 24px', marginBottom: '32px' }}>
      <p style={{ fontSize: '12px', fontWeight: '800', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '1.2px', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <i className="fas fa-list" style={{ color: '#E2001A', fontSize: '11px' }}></i> In This Guide
      </p>
      <ol style={{ margin: 0, padding: '0 0 0 18px' }}>
        {headings.map((h, i) => (
          <li key={i} style={{ fontSize: '13px', color: '#444', lineHeight: '1.7', fontWeight: '600' }}>
            {h.replace(/\*\*/g, '')}
          </li>
        ))}
      </ol>
    </div>
  );
}

// ── Sri Lankan Owner Note ────────────────────────────────────────────────────
function SriLankanNote({ tag }) {
  const notes = {
    'Nutrition': 'In many Sri Lankan homes, Labradors are fed rice, leftover curries, or scraps alongside their kibble. While homemade food feels caring, it makes portion control nearly impossible and can lead to rapid weight gain — a serious problem for this breed.',
    'Puppy Care': 'Sri Lankan puppy owners often face unique challenges — from high humidity and tile floors to multi-generational households where everyone wants to feed the puppy. Setting clear house rules from day one makes a huge difference.',
    'Grooming': 'Sri Lanka\'s year-round tropical heat and high humidity means Labrador grooming needs are more intense than in temperate climates. Skin infections, ear problems, and coat odour are significantly more common here than in cooler countries.',
    'Health': 'Heat-related illness, skin infections from humidity, and joint problems worsened by slippery tile floors are among the most common health concerns for Labradors in Sri Lanka. Prevention costs far less than treatment.',
    'Breed': 'Labradors are the most popular dog breed in Sri Lanka — but their popularity means they\'re often sold by backyard breeders without proper health clearances. Understanding the breed standard helps owners make smarter choices.',
  };
  const note = notes[tag];
  if (!note) return null;
  return (
    <div style={{ border: '1px solid #D4AF37', borderRadius: '14px', background: '#FFFDF5', padding: '20px 24px', margin: '36px 0', display: 'flex', gap: '14px' }}>
      <div style={{ flexShrink: 0 }}>
        <span style={{ fontSize: '20px' }}>🇱🇰</span>
      </div>
      <div>
        <p style={{ fontSize: '12px', fontWeight: '800', color: '#B8860B', textTransform: 'uppercase', letterSpacing: '1.2px', margin: '0 0 6px 0' }}>Sri Lankan Owner Note</p>
        <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.7', margin: 0 }}>{note}</p>
      </div>
    </div>
  );
}

// ── Product Education Block ──────────────────────────────────────────────────
function ProductBlock({ block }) {
  if (!block) return null;
  const isRC = block.brand === 'Royal Canin';
  return (
    <div style={{ border: '1px solid #EAE2D8', borderRadius: '14px', background: '#FCFBF7', padding: '20px 24px', margin: '36px 0', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FFF2F2', border: '1px solid #FFD1D1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <i className={isRC ? 'fas fa-award' : 'fas fa-flask'} style={{ fontSize: '16px', color: '#E2001A' }}></i>
      </div>
      <div>
        <p style={{ fontSize: '12px', fontWeight: '800', color: '#E2001A', textTransform: 'uppercase', letterSpacing: '1.2px', margin: '0 0 4px 0' }}>
          {isRC ? 'Nutrition Support' : 'Care Support'} — {block.brand}
        </p>
        <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.7', margin: 0 }}>{block.text}</p>
      </div>
    </div>
  );
}

// ── FAQ Section ──────────────────────────────────────────────────────────────
function FAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);
  if (!faqs || faqs.length === 0) return null;
  return (
    <div style={{ margin: '48px 0 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ width: '4px', height: '22px', background: '#E2001A', borderRadius: '2px' }}></div>
        <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#1a1a1a', margin: 0 }}>Frequently Asked Questions</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderTop: i === 0 ? '1px solid #EAE2D8' : 'none', borderBottom: '1px solid #EAE2D8' }}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', padding: '16px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}
            >
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#1a1a1a', lineHeight: '1.4', flex: 1 }}>
                {faq.q}
              </span>
              <i className={`fas fa-chevron-${openIndex === i ? 'up' : 'down'}`} style={{ fontSize: '12px', color: '#E2001A', flexShrink: 0, marginTop: '4px' }}></i>
            </button>
            {openIndex === i && (
              <div style={{ padding: '0 0 16px', fontSize: '14px', color: '#555', lineHeight: '1.75' }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Series Navigator ─────────────────────────────────────────────────────────
function SeriesNavigator({ article, onReadArticle }) {
  if (!article.series) return null;
  const seriesArticles = getArticlesBySeries(article.series);
  if (seriesArticles.length < 2) return null;
  const currentPos = seriesArticles.findIndex(a => a.id === article.id);

  return (
    <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '24px 28px', margin: '48px 0' }}>
      <p style={{ fontSize: '11px', fontWeight: '800', color: '#E2001A', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 4px 0' }}>
        Article Series
      </p>
      <p style={{ fontSize: '16px', fontWeight: '900', color: '#fff', margin: '0 0 20px 0' }}>{article.series}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {seriesArticles.map((a, i) => (
          <div
            key={a.id}
            onClick={() => a.id !== article.id && onReadArticle(a.id)}
            style={{
              display: 'flex', gap: '12px', alignItems: 'center',
              background: a.id === article.id ? '#E2001A' : '#2a2a2a',
              borderRadius: '10px', padding: '10px 14px',
              cursor: a.id === article.id ? 'default' : 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { if (a.id !== article.id) e.currentTarget.style.background = '#333'; }}
            onMouseLeave={e => { if (a.id !== article.id) e.currentTarget.style.background = '#2a2a2a'; }}
          >
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: a.id === article.id ? 'rgba(255,255,255,0.3)' : '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: '#fff', flexShrink: 0 }}>
              {i + 1}
            </span>
            <span style={{ fontSize: '13px', fontWeight: a.id === article.id ? '800' : '600', color: '#fff', flex: 1, lineHeight: '1.3' }}>
              {a.title}
            </span>
            {a.id === article.id && (
              <span style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px' }}>Reading</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Article Reader View ─────────────────────────────────────────────────
export default function ArticleReaderView({ articleId, onNavigate, onReadArticle }) {
  const article = articleData.find(a => a.id === articleId || a.slug === articleId) || articleData[0];
  const [shareMsg, setShareMsg] = useState('');
  const [email, setEmail] = useState('');
  const [subMsg, setSubMsg] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [articleId]);

  // Related articles
  const relatedArticles = (() => {
    const slugs = article.relatedArticles || [];
    const fromSlugs = slugs
      .map(slug => articleData.find(a => a.id === slug || a.slug === slug))
      .filter(Boolean);
    if (fromSlugs.length >= 3) return fromSlugs.slice(0, 3);
    const same = articleData.filter(a => a.tag === article.tag && a.id !== article.id);
    const all = [...fromSlugs, ...same].filter((a, i, arr) => arr.findIndex(b => b.id === a.id) === i);
    return all.slice(0, 3);
  })();

  // Prev / Next article
  const currentIndex = articleData.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articleData[currentIndex - 1] : null;
  const nextArticle = currentIndex < articleData.length - 1 ? articleData[currentIndex + 1] : null;

  // Sidebar: popular posts
  const popularPosts = articleData.filter(a => a.id !== article.id).slice(0, 5);

  // Categories for sidebar
  const categories = [
    { label: 'Nutrition', id: 'nutrition' },
    { label: 'Puppy Care', id: 'puppy-care' },
    { label: 'Grooming', id: 'grooming' },
    { label: 'Health', id: 'health' },
    { label: 'Breed', id: 'breed' },
  ];

  const catPageId = (() => {
    const map = { 'Puppy Care': 'puppy-care', 'Nutrition': 'nutrition', 'Breed': 'breed', 'Grooming': 'grooming', 'Health': 'health' };
    return map[article.tag] || 'home';
  })();

  // Content split
  const [leadPara, ...bodyParas] = article.content || [''];
  const midIndex = Math.max(Math.floor(bodyParas.length / 2), 1);
  const firstHalf = bodyParas.slice(0, midIndex);
  const secondHalf = bodyParas.slice(midIndex);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareMsg('Link copied!');
      setTimeout(() => setShareMsg(''), 2500);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubMsg("You're in! Check your inbox. 🐾");
    setEmail('');
  };

  const renderPara = (para, i) => {
    if (para.startsWith('**') && para.endsWith('**')) {
      return <h2 key={i} style={{ fontSize: '22px', fontWeight: '800', color: '#1a1a1a', margin: '36px 0 14px', lineHeight: '1.3' }}>{para.replace(/\*\*/g, '')}</h2>;
    }
    return <p key={i} style={{ fontSize: '15px', color: '#444', lineHeight: '1.85', marginBottom: '20px' }}>{para}</p>;
  };

  return (
    <main className="fix">

      {/* ── Breadcrumb ────────────────────────────────── */}
      <section style={{ background: 'var(--llk-cream)', borderTop: '4px solid #E2001A', padding: '24px 0 20px' }}>
        <div className="container">
          <ol className="breadcrumb" style={{ background: 'none', padding: 0, margin: 0, fontSize: '13px', fontWeight: '600', display: 'flex', gap: '6px', alignItems: 'center', listStyle: 'none', flexWrap: 'wrap' }}>
            <li>
              <span onClick={() => onNavigate('home')} style={{ color: '#888', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.color = '#E2001A'}
                onMouseLeave={e => e.currentTarget.style.color = '#888'}>Home</span>
            </li>
            <li style={{ color: '#ccc', fontSize: '10px' }}><i className="fas fa-chevron-right"></i></li>
            <li>
              <span onClick={() => onNavigate(catPageId)} style={{ color: '#888', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.color = '#E2001A'}
                onMouseLeave={e => e.currentTarget.style.color = '#888'}>{article.tag}</span>
            </li>
            <li style={{ color: '#ccc', fontSize: '10px' }}><i className="fas fa-chevron-right"></i></li>
            <li style={{ color: '#E2001A' }}>Article</li>
          </ol>
        </div>
      </section>

      {/* ── Main ──────────────────────────────────────── */}
      <section style={{ background: '#fff', paddingTop: '52px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="row">

            {/* ═══ Article Column ════════════════════════ */}
            <div className="col-lg-8">

              {/* Tag + Title + Meta */}
              <div style={{ marginBottom: '28px' }}>
                <span
                  onClick={() => onNavigate(catPageId)}
                  className="post-tag"
                  style={{ cursor: 'pointer', display: 'inline-block', marginBottom: '14px' }}
                >{article.tag}</span>

                {article.series && (
                  <span style={{ display: 'inline-block', marginLeft: '8px', marginBottom: '14px', fontSize: '11px', fontWeight: '700', color: '#B8860B', background: '#FFF8DC', border: '1px solid #D4AF37', borderRadius: '30px', padding: '3px 12px' }}>
                    <i className="fas fa-layer-group" style={{ marginRight: '5px' }}></i>{article.series}
                  </span>
                )}

                <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#1a1a1a', lineHeight: '1.25', marginBottom: '8px' }}>
                  {article.title}
                </h1>
                {article.subtitle && (
                  <p style={{ fontSize: '16px', color: '#666', fontWeight: '500', margin: '0 0 16px 0' }}>{article.subtitle}</p>
                )}

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '13px', color: '#888' }}>
                  <span><i className="flaticon-calendar" style={{ marginRight: '5px' }}></i>{article.date}</span>
                  <span><i className="flaticon-history" style={{ marginRight: '5px' }}></i>{article.readTime} read</span>
                  <span
                    onClick={() => onNavigate(catPageId)}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#E2001A'}
                    onMouseLeave={e => e.currentTarget.style.color = '#888'}
                  >
                    <i className="fas fa-folder-open" style={{ marginRight: '5px' }}></i>{article.tag}
                  </span>
                </div>
              </div>

              {/* Hero Image */}
              <div style={{ marginBottom: '32px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #EAE2D8' }}>
                <img src={article.image} alt={article.title} style={{ width: '100%', maxHeight: '460px', objectFit: 'cover', display: 'block' }} />
              </div>

              {/* Quick Answer Box */}
              <QuickAnswerBox answer={article.quickAnswer} />

              {/* Table of Contents */}
              <TableOfContents content={article.content || []} />

              {/* Lead Paragraph */}
              <p style={{ fontSize: '17px', lineHeight: '1.8', color: '#2a2a2a', fontWeight: '500', marginBottom: '28px', borderLeft: '4px solid #E2001A', paddingLeft: '18px' }}>
                {leadPara}
              </p>

              {/* First Half of Body */}
              {firstHalf.map(renderPara)}

              {/* Sri Lankan Owner Note (after first half) */}
              <SriLankanNote tag={article.tag} />

              {/* Pull Quote */}
              {article.excerpt && (
                <blockquote style={{ margin: '36px 0', padding: '22px 26px 22px 32px', background: 'var(--llk-cream)', borderLeft: '5px solid #E2001A', borderRadius: '0 12px 12px 0' }}>
                  <p style={{ fontSize: '16px', fontStyle: 'italic', color: '#1a1a1a', fontWeight: '600', lineHeight: '1.7', margin: 0 }}>
                    "{article.excerpt}"
                  </p>
                  <cite style={{ display: 'block', marginTop: '10px', fontSize: '11px', fontWeight: '800', color: '#E2001A', fontStyle: 'normal', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    — Labrador.lk Breed Science Guide
                  </cite>
                </blockquote>
              )}

              {/* Mid-Article Image */}
              {relatedArticles[0] && (
                <div style={{ margin: '8px 0 28px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #EAE2D8' }}>
                  <img src={relatedArticles[0].image || article.image} alt="Labrador care" style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }} />
                </div>
              )}

              {/* Second Half of Body */}
              {secondHalf.map(renderPara)}

              {/* Key Takeaways */}
              <div style={{ background: 'var(--llk-cream)', border: '1px solid #EAE2D8', borderRadius: '14px', padding: '24px 28px', margin: '36px 0' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1a1a1a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fas fa-lightbulb" style={{ color: '#E2001A' }}></i> Key Takeaways
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {(article.tags || []).slice(0, 4).map((tag, i) => (
                    <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px', fontSize: '14px', color: '#444', lineHeight: '1.6' }}>
                      <i className="fas fa-check-circle" style={{ color: '#E2001A', marginTop: '2px', flexShrink: 0 }}></i>
                      <span>This article covers <strong>{tag}</strong> — an important topic for Labrador owners in Sri Lanka.</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Education Block */}
              <ProductBlock block={article.productBlock} />

              {/* Series Navigator */}
              <SeriesNavigator article={article} onReadArticle={onReadArticle} />

              {/* Tags + Share */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', padding: '20px 0', borderTop: '1px solid #EAE2D8', borderBottom: '1px solid #EAE2D8', marginTop: '16px' }}>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '800', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Topics</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(article.tags || [article.tag]).map((tag, i) => (
                      <span key={i} style={{ display: 'inline-block', padding: '4px 12px', background: '#f5f0e8', borderRadius: '30px', fontSize: '12px', fontWeight: '700', color: '#555', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#E2001A'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#f5f0e8'; e.currentTarget.style.color = '#555'; }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '800', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Share</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[
                      { icon: 'fab fa-facebook-f', color: '#1877F2' },
                      { icon: 'fab fa-twitter', color: '#1DA1F2' },
                      { icon: 'fab fa-whatsapp', color: '#25D366' },
                      { icon: 'fas fa-link', color: '#E2001A', action: handleShare },
                    ].map((s, i) => (
                      <button key={i} onClick={s.action}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #EAE2D8', background: '#fff', color: s.color, cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = s.color; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = s.color; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = '#EAE2D8'; }}>
                        <i className={s.icon}></i>
                      </button>
                    ))}
                  </div>
                  {shareMsg && <p style={{ fontSize: '11px', color: '#E2001A', fontWeight: '700', marginTop: '4px' }}>{shareMsg}</p>}
                </div>
              </div>

              {/* FAQ Section */}
              <FAQSection faqs={article.faqs} />

              {/* Prev / Next Navigation */}
              {(prevArticle || nextArticle) && (
                <div style={{ display: 'flex', gap: '12px', margin: '48px 0 0', flexWrap: 'wrap' }}>
                  {prevArticle && (
                    <div onClick={() => onReadArticle(prevArticle.id)}
                      style={{ flex: 1, minWidth: '200px', display: 'flex', gap: '12px', alignItems: 'center', border: '1px solid #EAE2D8', borderRadius: '14px', padding: '14px', cursor: 'pointer', transition: 'border-color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#E2001A'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#EAE2D8'}>
                      <div style={{ width: '64px', height: '54px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={prevArticle.image} alt={prevArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <span style={{ fontSize: '10px', fontWeight: '800', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', display: 'block' }}>
                          <i className="fas fa-chevron-left" style={{ marginRight: '4px', color: '#E2001A' }}></i> Previous
                        </span>
                        <p style={{ fontSize: '13px', fontWeight: '800', color: '#1a1a1a', margin: '4px 0 0', lineHeight: '1.3' }}>{prevArticle.title}</p>
                      </div>
                    </div>
                  )}
                  {nextArticle && (
                    <div onClick={() => onReadArticle(nextArticle.id)}
                      style={{ flex: 1, minWidth: '200px', display: 'flex', gap: '12px', alignItems: 'center', border: '1px solid #EAE2D8', borderRadius: '14px', padding: '14px', cursor: 'pointer', transition: 'border-color 0.2s', flexDirection: 'row-reverse', textAlign: 'right' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#E2001A'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#EAE2D8'}>
                      <div style={{ width: '64px', height: '54px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={nextArticle.image} alt={nextArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <span style={{ fontSize: '10px', fontWeight: '800', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', display: 'block' }}>
                          Next <i className="fas fa-chevron-right" style={{ marginLeft: '4px', color: '#E2001A' }}></i>
                        </span>
                        <p style={{ fontSize: '13px', fontWeight: '800', color: '#1a1a1a', margin: '4px 0 0', lineHeight: '1.3' }}>{nextArticle.title}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Related Guides Grid */}
              {relatedArticles.length > 0 && (
                <div style={{ marginTop: '52px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div style={{ width: '4px', height: '22px', background: '#E2001A', borderRadius: '2px' }}></div>
                    <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#1a1a1a', margin: 0 }}>Related Guides</h2>
                  </div>
                  <div className="row g-3">
                    {relatedArticles.map(rel => (
                      <div className="col-md-4" key={rel.id}>
                        <div onClick={() => onReadArticle(rel.id)}
                          style={{ border: '1px solid #EAE2D8', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s', height: '100%', display: 'flex', flexDirection: 'column' }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = '#E2001A'}
                          onMouseLeave={e => e.currentTarget.style.borderColor = '#EAE2D8'}>
                          <img src={rel.image} alt={rel.title} style={{ width: '100%', height: '130px', objectFit: 'cover', display: 'block' }} />
                          <div style={{ padding: '12px', flexGrow: 1 }}>
                            <span style={{ fontSize: '10px', fontWeight: '800', color: '#E2001A', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                              {rel.tag} &bull; {rel.readTime}
                            </span>
                            <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#1a1a1a', margin: 0, lineHeight: '1.4' }}>{rel.title}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* ═══ Sidebar ════════════════════════════════ */}
            <div className="col-lg-4">
              <div style={{ paddingLeft: '10px', position: 'sticky', top: '100px' }}>

                {/* Search */}
                <div style={{ background: 'var(--llk-cream)', borderRadius: '16px', padding: '22px', marginBottom: '28px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#1a1a1a', marginBottom: '14px', paddingBottom: '10px', borderBottom: '2px solid #EAE2D8' }}>Search</h4>
                  <div style={{ display: 'flex', border: '1px solid #EAE2D8', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
                    <input type="text" placeholder="Search guides..." style={{ flex: 1, border: 'none', padding: '10px 12px', fontSize: '13px', outline: 'none', background: 'transparent', color: '#1a1a1a' }} />
                    <button style={{ background: '#E2001A', border: 'none', color: '#fff', padding: '10px 14px', cursor: 'pointer', fontSize: '13px' }}>
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>

                {/* Popular Posts */}
                <div style={{ background: '#fff', border: '1px solid #EAE2D8', borderRadius: '16px', padding: '22px', marginBottom: '28px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#1a1a1a', marginBottom: '18px', paddingBottom: '10px', borderBottom: '2px solid #EAE2D8' }}>Popular Guides</h4>
                  {popularPosts.map((a, i) => (
                    <div key={a.id} onClick={() => onReadArticle(a.id)}
                      style={{ display: 'flex', gap: '12px', paddingBottom: '14px', marginBottom: '14px', borderBottom: i < 4 ? '1px solid #EAE2D8' : 'none', cursor: 'pointer' }}
                      onMouseEnter={e => e.currentTarget.querySelector('.rc-t').style.color = '#E2001A'}
                      onMouseLeave={e => e.currentTarget.querySelector('.rc-t').style.color = '#1a1a1a'}>
                      <div style={{ width: '68px', height: '58px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={a.image} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <span style={{ fontSize: '10px', fontWeight: '800', color: '#E2001A', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '3px' }}>{a.tag}</span>
                        <h5 className="rc-t" style={{ fontSize: '13px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 3px', lineHeight: '1.35', transition: 'color 0.2s' }}>{a.title}</h5>
                        <span style={{ fontSize: '11px', color: '#aaa' }}>{a.readTime} read</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Categories */}
                <div style={{ background: '#fff', border: '1px solid #EAE2D8', borderRadius: '16px', padding: '22px', marginBottom: '28px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#1a1a1a', marginBottom: '18px', paddingBottom: '10px', borderBottom: '2px solid #EAE2D8' }}>Browse Categories</h4>
                  {categories.map((cat, i) => {
                    const count = articleData.filter(a => a.tag === cat.label).length;
                    return (
                      <div key={i} onClick={() => onNavigate(cat.id)}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: i < categories.length - 1 ? '1px solid #EAE2D8' : 'none', cursor: 'pointer' }}
                        onMouseEnter={e => e.currentTarget.querySelector('.cat-lbl').style.color = '#E2001A'}
                        onMouseLeave={e => e.currentTarget.querySelector('.cat-lbl').style.color = '#1a1a1a'}>
                        <span className="cat-lbl" style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a1a', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <i className="fas fa-chevron-right" style={{ fontSize: '10px', color: '#E2001A' }}></i>{cat.label}
                        </span>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff', background: '#E2001A', padding: '2px 9px', borderRadius: '30px' }}>{count}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Newsletter */}
                <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '24px 22px', marginBottom: '28px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#fff', marginBottom: '6px' }}>Stay in the loop</h4>
                  <p style={{ fontSize: '13px', color: '#aaa', lineHeight: '1.6', marginBottom: '16px' }}>
                    New Lab guides, nutrition drops, and breed science — straight to your inbox. No spam.
                  </p>
                  {subMsg ? (
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#E2001A' }}>{subMsg}</p>
                  ) : (
                    <form onSubmit={handleSubscribe}>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #333', background: '#2a2a2a', color: '#fff', fontSize: '13px', outline: 'none', marginBottom: '8px', boxSizing: 'border-box' }} />
                      <button type="submit"
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: '#E2001A', color: '#fff', fontWeight: '800', fontSize: '14px', cursor: 'pointer' }}>
                        Subscribe Free
                      </button>
                    </form>
                  )}
                </div>

                {/* Tags Cloud */}
                <div style={{ background: 'var(--llk-cream)', border: '1px solid #EAE2D8', borderRadius: '16px', padding: '22px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#1a1a1a', marginBottom: '14px', paddingBottom: '10px', borderBottom: '2px solid #EAE2D8' }}>Popular Tags</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['Labrador', 'Nutrition', 'Puppy Care', 'Grooming', 'Health', 'Joint Care', 'Salmon Oil', 'Sri Lanka', 'Royal Canin', 'Beaphar', 'Shedding', 'Obesity'].map((tag, i) => (
                      <span key={i} style={{ display: 'inline-block', padding: '4px 12px', background: '#fff', border: '1px solid #EAE2D8', borderRadius: '30px', fontSize: '12px', fontWeight: '700', color: '#555', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#E2001A'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#E2001A'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = '#EAE2D8'; }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
