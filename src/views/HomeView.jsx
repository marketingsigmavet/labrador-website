import React, { useEffect } from 'react';
import { articleData } from '../data/articleData';

export default function HomeView({ onNavigate, onReadArticle }) {
  const handlePrev = (e) => {
    e.preventDefault();
    if (window.$ && typeof window.$.fn.slick === 'function') {
      window.$('.featured-post-active').slick('slickPrev');
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (window.$ && typeof window.$.fn.slick === 'function') {
      window.$('.featured-post-active').slick('slickNext');
    }
  };

  // ── Hero Carousel: 8 articles — Slick needs ≥ slidesToShow×2 slides for infinite loop ──
  const featuredArticles = [
    articleData.find(a => a.id === "why-labradors-always-act-hungry"),
    articleData.find(a => a.id === "labrador-joint-care"),
    articleData.find(a => a.id === "the-first-7-days-with-a-labrador-puppy"),
    articleData.find(a => a.id === "complete-labrador-grooming-guide-sri-lanka"),
    articleData.find(a => a.id === "before-you-get-a-labrador-in-sri-lanka"),
    articleData.find(a => a.id === "labrador-puppy-growth-stages"),
    articleData.find(a => a.id === "labrador-skin-problems-sri-lanka"),
    articleData.find(a => a.id === "labrador-temperament-explained"),
  ].filter(Boolean);

  // ── Featured Vet & Care Articles (big + 2 small layout) ──
  const mainHealthArticle = articleData.find(a => a.id === "labrador-joint-care");
  const smallArticles = [
    articleData.find(a => a.id === "heat-safety-for-labradors-sri-lanka"),
    articleData.find(a => a.id === "the-first-7-days-with-a-labrador-puppy"),
  ].filter(Boolean);

  // ── Weekly Hand-Picked Guides ──
  const weeklyLeftArticle = articleData.find(a => a.id === "why-labradors-always-act-hungry");
  const weeklyRightArticles = [
    articleData.find(a => a.id === "complete-labrador-feeding-guide-sri-lanka"),
    articleData.find(a => a.id === "why-labradors-shed-so-much"),
    articleData.find(a => a.id === "labrador-obesity-why-it-happens"),
    articleData.find(a => a.id === "how-often-should-you-bathe-a-labrador-sri-lanka"),
  ].filter(Boolean);

  // ── Healthy Articles grid (6 cards across all hubs) ──
  const healthyArticles = [
    articleData.find(a => a.id === "labrador-puppy-growth-stages"),
    articleData.find(a => a.id === "is-your-labrador-overweight"),
    articleData.find(a => a.id === "what-makes-a-labrador-retriever-different"),
    articleData.find(a => a.id === "labrador-ear-cleaning-guide"),
    articleData.find(a => a.id === "labrador-skin-problems-sri-lanka"),
    articleData.find(a => a.id === "labrador-vaccine-schedule-sri-lanka"),
  ].filter(Boolean);

  // ── Popular Articles sidebar (5 items) ──
  const popularArticles = [
    articleData.find(a => a.id === "why-labradors-always-act-hungry"),
    articleData.find(a => a.id === "before-you-get-a-labrador-in-sri-lanka"),
    articleData.find(a => a.id === "labrador-puppy-feeding-schedule"),
    articleData.find(a => a.id === "complete-labrador-grooming-guide-sri-lanka"),
    articleData.find(a => a.id === "neutering-a-labrador-guide"),
  ].filter(Boolean);

  // Initialize jQuery Slick Slider for horizontal scroll matching Zaira template behavior
  useEffect(() => {
    const initSlick = () => {
      if (window.$ && typeof window.$.fn.slick === 'function') {
        const $slider = window.$('.featured-post-active');
        if ($slider.length > 0) {
          if ($slider.hasClass('slick-initialized')) {
            try {
              $slider.slick('unslick');
            } catch (e) {
              console.log("Unslick error:", e);
            }
          }
          $slider.slick({
            dots: false,
            infinite: true,
            speed: 500,
            cssEase: 'ease-in-out',
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 3500,
            pauseOnHover: true,
            responsive: [
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                }
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          });
        }
      }
    };

    // A tiny timeout to ensure React DOM rendering completes before jQuery queries it
    const timer = setTimeout(initSlick, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleArticleClick = (e, articleId) => {
    e.preventDefault();
    onReadArticle(articleId);
  };

  const handleCategoryClick = (e, catId) => {
    e.preventDefault();
    onNavigate(catId);
  };

  return (
    <main className="fix">
      {/* Featured post area (Horizontal Scrolling Carousel) */}
      <section className="featured-post-area pt-60 pb-30">
        <div className="container" style={{ position: 'relative' }}>
          <div className="featured-post-wrap">
            {/* Custom Carousel Arrows */}
            <button 
              onClick={handlePrev} 
              className="carousel-arrow carousel-arrow-left" 
              style={{
                position: 'absolute',
                top: '50%',
                left: '-20px',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1.5px solid #EAE2D8',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#E2001A',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#E2001A'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(226,0,26,0.12)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EAE2D8'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)'; }}
            >
              <i className="fas fa-chevron-left" style={{ fontSize: '16px' }}></i>
            </button>
            <button 
              onClick={handleNext} 
              className="carousel-arrow carousel-arrow-right" 
              style={{
                position: 'absolute',
                top: '50%',
                right: '-20px',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1.5px solid #EAE2D8',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#E2001A',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#E2001A'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(226,0,26,0.12)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EAE2D8'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)'; }}
            >
              <i className="fas fa-chevron-right" style={{ fontSize: '16px' }}></i>
            </button>

            <div className="row featured-post-active">
              {featuredArticles.map((article) => (
                <div className="col-lg-4" key={article.id}>
                  <div className="featured-post-item d-flex flex-column m-2" style={{ border: '1px solid #EAE2D8', borderRadius: '12px', overflow: 'hidden', height: '490px', background: '#fff', boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
                    <div className="featured-post-thumb">
                      <a href={`#article-${article.id}`} onClick={(e) => handleArticleClick(e, article.id)}>
                        <img src={article.image} alt={article.title} style={{ width: '100%', height: '275px', objectFit: 'cover' }} />
                      </a>
                    </div>
                    <div className="featured-post-content d-flex flex-column flex-grow-1 p-4">
                      <a href={`#${article.tag.toLowerCase().replace(' ', '-')}`} onClick={(e) => handleCategoryClick(e, article.tag.toLowerCase().replace(' ', '-'))} className="post-tag mb-3" style={{ alignSelf: 'flex-start' }}>
                        {article.tag}
                      </a>
                      <h2 className="post-title" style={{ fontSize: '19px', lineHeight: '1.4', fontWeight: '800', marginBottom: '10px' }}>
                        <a href={`#article-${article.id}`} onClick={(e) => handleArticleClick(e, article.id)} style={{ color: '#1a1a1a', textDecoration: 'none' }}>
                          {article.title}
                        </a>
                      </h2>
                      <div className="blog-post-meta mt-auto">
                        <ul className="list-wrap d-flex align-items-center" style={{ gap: '10px', padding: 0, margin: 0, listStyle: 'none', fontSize: '11px', color: '#777' }}>
                          <li><i className="flaticon-calendar"></i> {article.date}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter signup area */}
      <section className="newsletter-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="newsletter-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #ffffff 0%, var(--llk-light-gold) 100%)', border: '1px solid #EAE2D8' }}>
                <h2 className="title" style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 10px 0' }}>
                  Want expert scientific Labrador care tips?
                </h2>
                <p style={{ color: '#555', margin: '0 0 25px 0', fontSize: '14.5px', maxWidth: '600px' }}>
                  Subscribe to receive weekly science-backed updates on food, joint health, and anti-shedding grooming.
                </p>
                <form action="#" onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing! Check your email for your guide."); }} style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '480px', justifyContent: 'center' }}>
                  <input type="email" placeholder="Your Email Address" required style={{ flex: '1', padding: '12px 25px', border: '1px solid #EAE2D8', borderRadius: '30px', background: '#fff', fontSize: '14px', outline: 'none' }} />
                  <button type="submit" className="btn" style={{ borderRadius: '30px', padding: '12px 25px', fontSize: '14px', fontWeight: '700', border: 'none', background: '#E2001A', color: '#fff' }}>
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles + Sidebar */}
      <section className="latest-post-area pt-60 pb-60">
        <div className="container">
          <div className="latest-post-inner-wrap">
            <div className="row">
              
              {/* Left Column (Articles) */}
              <div className="col-lg-8 col-md-12">
                <div className="section-title-wrap mb-30" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #EAE2D8', paddingBottom: '10px' }}>
                  <div className="section-title">
                    <h2 className="title" style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: '#1a1a1a' }}>
                      Featured Vet & Care Articles
                    </h2>
                  </div>
                  <div className="view-all-btn">
                    <a href="#health" onClick={(e) => handleCategoryClick(e, 'health')} className="link-btn" style={{ color: '#E2001A', fontWeight: '600', textDecoration: 'none' }}>
                      View Health Guides
                    </a>
                  </div>
                </div>
                
                <div className="latest-post-item-wrap">
                  <div className="row">
                    
                    {/* Large Spotlight Article */}
                    {mainHealthArticle && (
                      <div className="col-md-7 mb-30">
                        <div className="featured-post-item latest-post-item big-post h-100 d-flex flex-column">
                          <div className="featured-post-thumb">
                            <a href={`#article-${mainHealthArticle.id}`} onClick={(e) => handleArticleClick(e, mainHealthArticle.id)}>
                              <img src={mainHealthArticle.image} alt={mainHealthArticle.title} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
                            </a>
                          </div>
                          <div className="featured-post-content p-4 d-flex flex-column flex-grow-1">
                            <a href="#health" onClick={(e) => handleCategoryClick(e, 'health')} className="post-tag mb-3" style={{ alignSelf: 'flex-start' }}>
                              {mainHealthArticle.tag}
                            </a>
                            <h2 className="post-title bold-underline mb-3" style={{ fontSize: '22px', fontWeight: '800', lineHeight: '1.3' }}>
                              <a href={`#article-${mainHealthArticle.id}`} onClick={(e) => handleArticleClick(e, mainHealthArticle.id)} style={{ color: '#1a1a1a', textDecoration: 'none' }}>
                                {mainHealthArticle.title}
                              </a>
                            </h2>
                             <div className="blog-post-meta mb-3">
                              <ul className="list-wrap d-flex align-items-center" style={{ gap: '15px', padding: 0, margin: 0, listStyle: 'none', fontSize: '12px', color: '#777' }}>
                                <li><i className="flaticon-calendar"></i> {mainHealthArticle.date}</li>
                                <li><i className="flaticon-history"></i> {mainHealthArticle.readTime}</li>
                              </ul>
                            </div>
                            <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                              {mainHealthArticle.excerpt}
                            </p>
                            <a href={`#article-${mainHealthArticle.id}`} onClick={(e) => handleArticleClick(e, mainHealthArticle.id)} className="read-more-btn" style={{ color: '#E2001A', fontWeight: '700', fontSize: '14px', textDecoration: 'none', marginTop: 'auto' }}>
                              Read Full Guide <i className="fas fa-arrow-right" style={{ marginLeft: '5px' }}></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Small Articles Column */}
                    <div className="col-md-5">
                      <div className="latest-post-wrap">
                        {smallArticles.map((article) => (
                          <div className="featured-post-item latest-post-item small-post mb-30" key={article.id}>
                            <div className="featured-post-thumb">
                              <a href={`#article-${article.id}`} onClick={(e) => handleArticleClick(e, article.id)}>
                                <img src={article.image} alt={article.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                              </a>
                            </div>
                            <div className="featured-post-content p-3">
                              <a href={`#${article.tag.toLowerCase().replace(' ', '-')}`} onClick={(e) => handleCategoryClick(e, article.tag.toLowerCase().replace(' ', '-'))} className="post-tag mb-2" style={{ alignSelf: 'flex-start', fontSize: '10px', padding: '2px 8px' }}>
                                {article.tag}
                              </a>
                              <h3 className="post-title" style={{ fontSize: '15px', fontWeight: '700', margin: '5px 0 10px 0', lineHeight: '1.4' }}>
                                <a href={`#article-${article.id}`} onClick={(e) => handleArticleClick(e, article.id)} style={{ color: '#1a1a1a', textDecoration: 'none' }}>
                                  {article.title}
                                </a>
                              </h3>
                              <div className="blog-post-meta">
                                <ul className="list-wrap d-flex align-items-center" style={{ gap: '10px', padding: 0, margin: 0, listStyle: 'none', fontSize: '11px', color: '#777' }}>
                                  <li><i className="flaticon-calendar"></i> {article.date}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Right Column (Sidebar Widgets) */}
              <div className="col-lg-4 col-md-12">
                <div className="sidebar-wrap">
                  
                  {/* Author Widget / About */}
                  <div className="sidebar-widget mb-30" style={{ border: '1px solid #EAE2D8', borderRadius: '12px', overflow: 'hidden' }}>
                    <div className="sidebar-avatar p-4 text-center" style={{ background: 'var(--llk-cream)' }}>
                      <div className="sidebar-avatar-thumb mb-3" style={{ display: 'inline-block' }}>
                        <img src="/assets/img/images/avatar_img.png" alt="Labrador.lk" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #D4AF37' }} />
                      </div>
                      <div className="sidebar-avatar-content">
                        <h2 className="title" style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a1a', marginBottom: '10px' }}>
                          Welcome to Labrador.lk
                        </h2>
                        <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.6', margin: '0 0 15px 0' }}>
                          Sri Lanka’s premium educational platform for Labrador Retrievers, built in association with veterinary nutrition experts to support healthy growth and breed care.
                        </p>
                        <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} className="btn" style={{ borderRadius: '30px', padding: '8px 20px', fontSize: '13px' }}>
                          Read Our Mission
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Veterinary Partnership Widget */}
                  <div className="sidebar-widget mb-30" style={{ border: '1px solid #EAE2D8', borderRadius: '12px', padding: '25px' }}>
                    <div className="widget-title mb-20">
                      <h2 className="title" style={{ fontSize: '18px', fontWeight: '800', margin: 0, paddingBottom: '8px', borderBottom: '2px solid #D4AF37' }}>
                        Breed Nutrition Science
                      </h2>
                    </div>
                    <div className="partnership-box text-center p-3" style={{ background: '#FFF2F2', borderRadius: '8px', border: '1px solid #FFD1D1' }}>
                      <div className="mb-2" style={{ display: 'inline-flex', width: '45px', height: '45px', borderRadius: '50%', background: '#fff', border: '1px solid #E2001A', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fas fa-heartbeat" style={{ color: '#E2001A', fontSize: '18px' }}></i>
                      </div>
                      <p style={{ fontSize: '13px', color: '#1a1a1a', fontWeight: '600', margin: '0 0 5px 0' }}>
                        Breed-Specific Health Science
                      </p>
                      <p style={{ fontSize: '12px', color: '#555', margin: 0 }}>
                        Learn how precise breed-specific portioning and scientific diets nourish your Labrador's active joints, skin barrier, and double coat.
                      </p>
                      <a href="#nutrition" onClick={(e) => { e.preventDefault(); onNavigate('nutrition'); }} style={{ color: '#E2001A', fontSize: '12px', fontWeight: '700', textDecoration: 'none', display: 'block', marginTop: '10px' }}>
                        Explore Nutrition Articles <i className="fas fa-chevron-right" style={{ fontSize: '10px', marginLeft: '3px' }}></i>
                      </a>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Labrador Breed Health Standards Grid (Premium Red & Gold Theme) */}
      <section className="health-standards-area pt-70 pb-40" style={{ background: '#fff', borderTop: '1px solid #FAF3E0' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-50">
                <span className="post-tag mb-3" style={{ background: 'var(--llk-gold)', color: '#1a1a1a', fontWeight: '800' }}>
                  LABRADOR CARE STANDARDS
                </span>
                <h2 className="title" style={{ fontSize: '32px', fontWeight: '900', color: '#1a1a1a', marginTop: '10px' }}>
                  Labrador Structural & Physiological Care
                </h2>
                <p style={{ color: '#555', fontSize: '15px', marginTop: '10px' }}>
                  Labrador Retrievers have unique anatomical structures that require targeted nutrition and care to ensure healthy development in tropical Sri Lanka.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Pillar 1: Joint & Skeletal Integrity */}
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="featured-post-item latest-post-item big-post h-100 d-flex flex-column" style={{ border: '1px solid #EAE2D8', borderRadius: '12px', overflow: 'hidden', background: '#fff', boxShadow: 'none' }}>
                <div className="featured-post-thumb">
                  <a href="#health" onClick={(e) => { e.preventDefault(); onNavigate('health'); }}>
                    <img src="/assets/img/blog/latest_post01.jpg" alt="Joint & Skeletal Defense" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  </a>
                </div>
                <div className="featured-post-content p-4 d-flex flex-column flex-grow-1">
                  <a href="#health" onClick={(e) => { e.preventDefault(); onNavigate('health'); }} className="post-tag mb-3" style={{ alignSelf: 'flex-start' }}>
                    Skeletal Health
                  </a>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#1a1a1a', marginBottom: '10px', lineHeight: '1.4' }}>
                    <a href="#health" onClick={(e) => { e.preventDefault(); onNavigate('health'); }} style={{ color: '#1a1a1a', textDecoration: 'none' }}>
                      Joint & Skeletal Defense
                    </a>
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#555', lineHeight: '1.6', marginBottom: '20px' }}>
                    As active large-breed dogs, Labradors put severe mechanical stress on cartilage and joint capsules. Early joint support prevents degenerative skeletal issues.
                  </p>
                  <a href="#health" onClick={(e) => { e.preventDefault(); onNavigate('health'); }} style={{ color: '#E2001A', fontWeight: '700', fontSize: '13px', textDecoration: 'none', marginTop: 'auto', display: 'inline-block' }}>
                    Explore Joint Care <i className="fas fa-arrow-right" style={{ marginLeft: '5px', fontSize: '11px' }}></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Pillar 2: Skin Barrier & Coat Oil */}
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="featured-post-item latest-post-item big-post h-100 d-flex flex-column" style={{ border: '1px solid #EAE2D8', borderRadius: '12px', overflow: 'hidden', background: '#fff', boxShadow: 'none' }}>
                <div className="featured-post-thumb">
                  <a href="#grooming" onClick={(e) => { e.preventDefault(); onNavigate('grooming'); }}>
                    <img src="/assets/img/blog/featured_post04.jpg" alt="Coat & Skin Barrier" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  </a>
                </div>
                <div className="featured-post-content p-4 d-flex flex-column flex-grow-1">
                  <a href="#grooming" onClick={(e) => { e.preventDefault(); onNavigate('grooming'); }} className="post-tag mb-3" style={{ alignSelf: 'flex-start' }}>
                    Dermatology
                  </a>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#1a1a1a', marginBottom: '10px', lineHeight: '1.4' }}>
                    <a href="#grooming" onClick={(e) => { e.preventDefault(); onNavigate('grooming'); }} style={{ color: '#1a1a1a', textDecoration: 'none' }}>
                      Coat & Skin Barrier
                    </a>
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#555', lineHeight: '1.6', marginBottom: '20px' }}>
                    The dense, water-resistant double coat constantly sheds. Targeted skincare nutrients protect this barrier's oil structure in high tropical humidity.
                  </p>
                  <a href="#grooming" onClick={(e) => { e.preventDefault(); onNavigate('grooming'); }} style={{ color: '#E2001A', fontWeight: '700', fontSize: '13px', textDecoration: 'none', marginTop: 'auto', display: 'inline-block' }}>
                    Explore Skin Care <i className="fas fa-arrow-right" style={{ marginLeft: '5px', fontSize: '11px' }}></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Pillar 3: Portions & Satiety */}
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="featured-post-item latest-post-item big-post h-100 d-flex flex-column" style={{ border: '1px solid #EAE2D8', borderRadius: '12px', overflow: 'hidden', background: '#fff', boxShadow: 'none' }}>
                <div className="featured-post-thumb">
                  <a href="#nutrition" onClick={(e) => { e.preventDefault(); onNavigate('nutrition'); }}>
                    <img src="/assets/img/blog/article_img01.jpg" alt="Satiety & Portions Management" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  </a>
                </div>
                <div className="featured-post-content p-4 d-flex flex-column flex-grow-1">
                  <a href="#nutrition" onClick={(e) => { e.preventDefault(); onNavigate('nutrition'); }} className="post-tag mb-3" style={{ alignSelf: 'flex-start' }}>
                    Dietetics
                  </a>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#1a1a1a', marginBottom: '10px', lineHeight: '1.4' }}>
                    <a href="#nutrition" onClick={(e) => { e.preventDefault(); onNavigate('nutrition'); }} style={{ color: '#1a1a1a', textDecoration: 'none' }}>
                      Satiety & Portions Management
                    </a>
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#555', lineHeight: '1.6', marginBottom: '20px' }}>
                    Labradors have a genetic drive to overeat. Precision portioning protects their heart and large weight-bearing limbs from load strain and joint friction.
                  </p>
                  <a href="#nutrition" onClick={(e) => { e.preventDefault(); onNavigate('nutrition'); }} style={{ color: '#E2001A', fontWeight: '700', fontSize: '13px', textDecoration: 'none', marginTop: 'auto', display: 'inline-block' }}>
                    Explore Diet Science <i className="fas fa-arrow-right" style={{ marginLeft: '5px', fontSize: '11px' }}></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Labrador Care Categories Grid */}
      <section className="categories-area pt-60 pb-60" style={{ background: 'var(--llk-cream)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="section-title section-title-two text-center mb-40">
                <h2 className="title" style={{ fontSize: '28px', fontWeight: '800', color: '#1a1a1a', marginBottom: '15px' }}>
                  Labrador Care Pillars
                </h2>
                <p style={{ color: '#555', fontSize: '15px' }}>
                  Explore specific categories loaded with scientific advice and healthy care tips for your Labrador.
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4">

            {/* Category Card 1: Puppy Care */}
            <div className="col-lg-4 col-md-6">
              <div
                onClick={(e) => { e.preventDefault(); onNavigate('puppy-care'); }}
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
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#E2001A'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EAE2D8'; }}
              >
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img src="/assets/img/blog/latest_post03.jpg" alt="Puppy Care" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 8px 0' }}>Puppy Care</h4>
                  <p style={{ fontSize: '13px', color: '#666', margin: '0 0 16px 0', lineHeight: '1.55', flexGrow: 1 }}>
                    Growth milestones, vaccine schedules, and early socialisation guides.
                  </p>
                  <span style={{ fontSize: '13px', color: '#E2001A', fontWeight: '700' }}>
                    Explore Guides <i className="fas fa-arrow-right" style={{ fontSize: '11px', marginLeft: '4px' }}></i>
                  </span>
                </div>
              </div>
            </div>

            {/* Category Card 2: Nutrition */}
            <div className="col-lg-4 col-md-6">
              <div
                onClick={(e) => { e.preventDefault(); onNavigate('nutrition'); }}
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
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#E2001A'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EAE2D8'; }}
              >
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img src="/assets/img/blog/featured_post01.jpg" alt="Nutrition" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 8px 0' }}>Nutrition</h4>
                  <p style={{ fontSize: '13px', color: '#666', margin: '0 0 16px 0', lineHeight: '1.55', flexGrow: 1 }}>
                    Breed-specific diets, portion control, and satiety science explained simply.
                  </p>
                  <span style={{ fontSize: '13px', color: '#E2001A', fontWeight: '700' }}>
                    Explore Guides <i className="fas fa-arrow-right" style={{ fontSize: '11px', marginLeft: '4px' }}></i>
                  </span>
                </div>
              </div>
            </div>

            {/* Category Card 3: Breed Profile */}
            <div className="col-lg-4 col-md-6">
              <div
                onClick={(e) => { e.preventDefault(); onNavigate('breed'); }}
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
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#E2001A'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EAE2D8'; }}
              >
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img src="/assets/img/blog/featured_post03.jpg" alt="Breed Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 8px 0' }}>Breed Profile</h4>
                  <p style={{ fontSize: '13px', color: '#666', margin: '0 0 16px 0', lineHeight: '1.55', flexGrow: 1 }}>
                    Labrador history, anatomy, temperament traits, and common misconceptions.
                  </p>
                  <span style={{ fontSize: '13px', color: '#E2001A', fontWeight: '700' }}>
                    Explore Guides <i className="fas fa-arrow-right" style={{ fontSize: '11px', marginLeft: '4px' }}></i>
                  </span>
                </div>
              </div>
            </div>

            {/* Category Card 4: Grooming */}
            <div className="col-lg-4 col-md-6">
              <div
                onClick={(e) => { e.preventDefault(); onNavigate('grooming'); }}
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
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#E2001A'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EAE2D8'; }}
              >
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img src="/assets/img/blog/featured_post04.jpg" alt="Grooming" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 8px 0' }}>Grooming</h4>
                  <p style={{ fontSize: '13px', color: '#666', margin: '0 0 16px 0', lineHeight: '1.55', flexGrow: 1 }}>
                    Double-coat care, bathing routines, and seasonal de-shedding techniques.
                  </p>
                  <span style={{ fontSize: '13px', color: '#E2001A', fontWeight: '700' }}>
                    Explore Guides <i className="fas fa-arrow-right" style={{ fontSize: '11px', marginLeft: '4px' }}></i>
                  </span>
                </div>
              </div>
            </div>

            {/* Category Card 5: Health */}
            <div className="col-lg-4 col-md-6">
              <div
                onClick={(e) => { e.preventDefault(); onNavigate('health'); }}
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
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#E2001A'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EAE2D8'; }}
              >
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img src="/assets/img/blog/latest_post01.jpg" alt="Health" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 8px 0' }}>Health</h4>
                  <p style={{ fontSize: '13px', color: '#666', margin: '0 0 16px 0', lineHeight: '1.55', flexGrow: 1 }}>
                    Joint health, tropical climate safety, and common breed-specific conditions.
                  </p>
                  <span style={{ fontSize: '13px', color: '#E2001A', fontWeight: '700' }}>
                    Explore Guides <i className="fas fa-arrow-right" style={{ fontSize: '11px', marginLeft: '4px' }}></i>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Labrador Life Stages Explorer Section */}
      <section className="life-stages-area pt-60 pb-60" style={{ background: 'linear-gradient(180deg, #FCFBF7 0%, #ffffff 100%)', borderTop: '1px solid #FAF3E0' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-40">
                <span className="post-tag mb-3" style={{ background: 'var(--llk-red)', color: '#fff', fontWeight: '700' }}>
                  CARE LIFESPAN
                </span>
                <h2 className="title" style={{ fontSize: '32px', fontWeight: '900', color: '#1a1a1a', marginTop: '10px' }}>
                  Identify Your Labrador's Growth Stage
                </h2>
                <p style={{ color: '#555', fontSize: '15px', marginTop: '10px' }}>
                  Select your Labrador's current age milestone below to immediately access targeted vet articles and breed care advice.
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            {/* Stage 1: Puppy Care */}
            <div className="col-lg-4 col-md-6 mb-20">
              <div 
                onClick={(e) => handleCategoryClick(e, 'puppy-care')}
                className="stage-card p-4 text-center" 
                style={{ background: '#fff', border: '2px solid #FAF3E0', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--llk-red)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#FAF3E0'; e.currentTarget.style.transform = 'none'; }}
              >
                <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--llk-gold)', display: 'block', textTransform: 'uppercase', marginBottom: '8px' }}>
                  0 - 12 Months
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 10px 0' }}>
                  Puppy Growth & Boosters
                </h3>
                <p style={{ fontSize: '13px', color: '#555', margin: '0 0 15px 0' }}>
                  Vaccine schedules, puppy socialization guidelines, and early obedience training instructions.
                </p>
                <span style={{ color: 'var(--llk-red)', fontWeight: '700', fontSize: '13px' }}>
                  Open Puppy Library <i className="fas fa-arrow-right" style={{ fontSize: '11px', marginLeft: '5px' }}></i>
                </span>
              </div>
            </div>

            {/* Stage 2: Nutrition */}
            <div className="col-lg-4 col-md-6 mb-20">
              <div 
                onClick={(e) => handleCategoryClick(e, 'nutrition')}
                className="stage-card p-4 text-center" 
                style={{ background: '#fff', border: '2px solid #FAF3E0', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--llk-red)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#FAF3E0'; e.currentTarget.style.transform = 'none'; }}
              >
                <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--llk-gold)', display: 'block', textTransform: 'uppercase', marginBottom: '8px' }}>
                  1 - 7 Years
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 10px 0' }}>
                  Active Adult Wellness
                </h3>
                <p style={{ fontSize: '13px', color: '#555', margin: '0 0 15px 0' }}>
                  Chewing habits, joint protection nutrients, skincare, and high-energy exercise guidelines.
                </p>
                <span style={{ color: 'var(--llk-red)', fontWeight: '700', fontSize: '13px' }}>
                  Open Adult Hub <i className="fas fa-arrow-right" style={{ fontSize: '11px', marginLeft: '5px' }}></i>
                </span>
              </div>
            </div>

            {/* Stage 3: Health */}
            <div className="col-lg-4 col-md-6 mb-20">
              <div 
                onClick={(e) => handleCategoryClick(e, 'health')}
                className="stage-card p-4 text-center" 
                style={{ background: '#fff', border: '2px solid #FAF3E0', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--llk-red)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#FAF3E0'; e.currentTarget.style.transform = 'none'; }}
              >
                <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--llk-gold)', display: 'block', textTransform: 'uppercase', marginBottom: '8px' }}>
                  7+ Years
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 10px 0' }}>
                  Senior Care & Vitality
                </h3>
                <p style={{ fontSize: '13px', color: '#555', margin: '0 0 15px 0' }}>
                  Skeletal dysplasia preventive checks, heat stroke safety, and senior organ health support.
                </p>
                <span style={{ color: 'var(--llk-red)', fontWeight: '700', fontSize: '13px' }}>
                  Open Health Library <i className="fas fa-arrow-right" style={{ fontSize: '11px', marginLeft: '5px' }}></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Best Articles (Overlay + Horizontal list) */}
      <section className="article-area pt-70 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-wrap mb-30" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #EAE2D8', paddingBottom: '10px' }}>
                <div className="section-title">
                  <h2 className="title" style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: '#1a1a1a' }}>
                    Weekly Hand-Picked Guides
                  </h2>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            
            {/* Left Column - Large Overlay Post */}
            {weeklyLeftArticle && (
              <div className="col-xl-6 mb-30">
                <div className="ta-overlay-post" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '450px' }}>
                  <img src={weeklyLeftArticle.image} alt={weeklyLeftArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div className="overlay-post-content" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '30px', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)', color: '#fff' }}>
                    <a href="#training" onClick={(e) => handleCategoryClick(e, 'training')} className="post-tag mb-2" style={{ background: '#E2001A', color: '#fff', display: 'inline-block', padding: '3px 12px', borderRadius: '30px', fontSize: '11px', textDecoration: 'none', fontWeight: '600' }}>
                      {weeklyLeftArticle.tag}
                    </a>
                    <h2 className="post-title" style={{ fontSize: '24px', fontWeight: '800', margin: '10px 0', lineHeight: '1.3' }}>
                      <a href={`#article-${weeklyLeftArticle.id}`} onClick={(e) => handleArticleClick(e, weeklyLeftArticle.id)} style={{ color: '#fff', textDecoration: 'none' }}>
                        {weeklyLeftArticle.title}
                      </a>
                    </h2>
                    <div className="blog-post-meta" style={{ fontSize: '12px', color: '#ccc' }}>
                      <span><i className="flaticon-calendar"></i> {weeklyLeftArticle.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Right Column - Horizontal Lists */}
            <div className="col-xl-6">
              {weeklyRightArticles.map((article) => (
                <div className="ta-horizontal-post d-flex align-items-center mb-20 p-3" key={article.id} style={{ border: '1px solid #EAE2D8', borderRadius: '12px', background: '#fff', gap: '20px' }}>
                  <div className="horizontal-post-thumb" style={{ flex: '0 0 160px', borderRadius: '8px', overflow: 'hidden' }}>
                    <a href={`#article-${article.id}`} onClick={(e) => handleArticleClick(e, article.id)}>
                      <img src={article.image} alt={article.title} style={{ width: '160px', height: '110px', objectFit: 'cover' }} />
                    </a>
                  </div>
                  <div className="horizontal-post-content" style={{ flex: '1' }}>
                    <a href={`#${article.tag.toLowerCase().replace(' ', '-')}`} onClick={(e) => handleCategoryClick(e, article.tag.toLowerCase().replace(' ', '-'))} className="post-tag" style={{ display: 'inline-block', fontSize: '10px', padding: '2px 8px', marginBottom: '8px' }}>
                      {article.tag}
                    </a>
                    <h3 className="post-title" style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                      <a href={`#article-${article.id}`} onClick={(e) => handleArticleClick(e, article.id)} style={{ color: '#1a1a1a', textDecoration: 'none' }}>
                        {article.title}
                      </a>
                    </h3>
                    <div className="blog-post-meta" style={{ fontSize: '11px', color: '#777' }}>
                      <span><i className="flaticon-calendar"></i> {article.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Premium Food & Care Spotlight (Veterinary & Beaphar Aesthetic) */}
      <section className="vet-spotlight-area pt-60 pb-60" style={{ background: '#fff', borderTop: '1px solid #FAF3E0' }}>
        <div className="container">
          <div className="row align-items-center" style={{ background: 'linear-gradient(135deg, #FFF2F2 0%, #FFFFFF 100%)', padding: '40px', borderRadius: '16px', border: '1px solid #FFD1D1' }}>
            <div className="col-lg-7 mb-30 mb-lg-0">
              <span className="post-tag mb-3" style={{ background: 'var(--llk-red)', color: '#fff', fontWeight: '700', borderRadius: '4px' }}>
                BREED CARE ADVICE
              </span>
              <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#1a1a1a', marginTop: '10px' }}>
                Have a Specific Labrador Care or Food Question?
              </h2>
              <p style={{ color: '#555', fontSize: '14.5px', lineHeight: '1.6', marginTop: '15px', marginBottom: '20px' }}>
                Reach out to our breed care advisors! Whether you want to know about waterproof coat shine, Beaphar joint supplement portioning, or how to balance premium large-breed kibble in Sri Lanka's high humidity, we've got you covered with simple, scientific tips.
              </p>
              <div className="d-flex flex-wrap" style={{ gap: '15px' }}>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
                  className="btn" 
                  style={{ borderRadius: '30px', fontWeight: '700', padding: '12px 25px' }}
                >
                  Ask Our Advisors <i className="fas fa-envelope-open-text" style={{ marginLeft: '6px' }}></i>
                </a>
              </div>
            </div>
            
            <div className="col-lg-5 text-center">
              <div className="vet-answered-badge p-4" style={{ background: '#fff', border: '1.5px solid var(--llk-gold)', borderRadius: '12px', boxShadow: '0 8px 24px rgba(212,175,55,0.06)' }}>
                <div style={{ fontSize: '30px', color: 'var(--llk-gold)', marginBottom: '10px' }}>
                  <i className="fas fa-award"></i>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 10px 0' }}>
                  Science-Backed Library
                </h3>
                <p style={{ fontSize: '12.5px', color: '#666', lineHeight: '1.5', margin: 0 }}>
                  Our guides compile global scientific research on the Retriever family to help you understand your Labrador's unique nutrition, joint maintenance, and grooming needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Healthy Articles & Popular Articles Sidebar Section */}
      <section className="healthy-area pt-60 pb-30">
        <div className="container">
          <div className="healthy-inner-wrap">
            <div className="row">
              
              {/* Left Column - Healthy Articles */}
              <div className="col-xl-8 col-lg-7 col-md-12">
                <div className="section-title-wrap mb-30" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #EAE2D8', paddingBottom: '10px' }}>
                  <div className="section-title">
                    <h2 className="title" style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: '#1a1a1a' }}>
                      Healthy Articles
                    </h2>
                  </div>
                  <div className="section-title-line"></div>
                </div>
                
                <div className="row">
                  {healthyArticles.map((article) => (
                    <div className="col-lg-4 col-md-6 col-sm-6 mb-30" key={article.id}>
                      <div className="featured-post-item healthy-post d-flex flex-column h-100" style={{ border: '1px solid #EAE2D8', borderRadius: '12px', overflow: 'hidden', background: '#fff', transition: 'transform 0.3s' }}>
                        <div className="featured-post-thumb">
                          <a href={`#article-${article.id}`} onClick={(e) => handleArticleClick(e, article.id)}>
                            <img src={article.image} alt={article.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                          </a>
                        </div>
                        <div className="featured-post-content d-flex flex-column flex-grow-1 p-4">
                          <a href={`#${article.tag.toLowerCase().replace(' ', '-')}`} onClick={(e) => handleCategoryClick(e, article.tag.toLowerCase().replace(' ', '-'))} className="post-tag mb-3" style={{ alignSelf: 'flex-start', fontSize: '10px', padding: '2px 8px' }}>
                            {article.tag}
                          </a>
                          <h2 className="post-title" style={{ fontSize: '15px', lineHeight: '1.4', fontWeight: '800', marginBottom: '10px' }}>
                            <a href={`#article-${article.id}`} onClick={(e) => handleArticleClick(e, article.id)} style={{ color: '#1a1a1a', textDecoration: 'none' }}>
                              {article.title}
                            </a>
                          </h2>
                          <div className="blog-post-meta mt-auto">
                            <ul className="list-wrap d-flex align-items-center" style={{ gap: '10px', padding: 0, margin: 0, listStyle: 'none', fontSize: '11px', color: '#777' }}>
                              <li><i className="flaticon-calendar"></i> {article.date.split(',')[0]}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Popular Articles Sidebar */}
              <div className="col-xl-4 col-lg-5 col-md-12">
                <div className="sidebar-wrap no-sticky">
                  <div className="sidebar-widget" style={{ border: '1px solid #EAE2D8', borderRadius: '12px', padding: '25px', background: '#fff' }}>
                    <div className="widget-title mb-25" style={{ borderBottom: '2px solid #D4AF37', paddingBottom: '8px' }}>
                      <h2 className="title" style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>
                        Popular Articles
                      </h2>
                    </div>
                    
                    <div className="popular-post-wrap d-flex flex-column gap-3">
                      {popularArticles.map((article) => (
                        <div className="popular-post d-flex align-items-center gap-3" key={article.id} style={{ borderBottom: '1px solid #F0EAE1', paddingBottom: '15px' }}>
                          <div className="thumb" style={{ flex: '0 0 80px', height: '60px', borderRadius: '6px', overflow: 'hidden' }}>
                            <a href={`#article-${article.id}`} onClick={(e) => handleArticleClick(e, article.id)}>
                              <img src={article.image} alt={article.title} style={{ width: '80px', height: '60px', objectFit: 'cover' }} />
                            </a>
                          </div>
                          <div className="content" style={{ flex: '1' }}>
                            <a href={`#${article.tag.toLowerCase().replace(' ', '-')}`} onClick={(e) => handleCategoryClick(e, article.tag.toLowerCase().replace(' ', '-'))} className="post-tag-two" style={{ fontSize: '10px', color: '#D4AF37', fontWeight: '700', textTransform: 'uppercase', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
                              {article.tag}
                            </a>
                            <h2 className="post-title" style={{ fontSize: '13px', fontWeight: '700', margin: 0, lineHeight: '1.3' }}>
                              <a href={`#article-${article.id}`} onClick={(e) => handleArticleClick(e, article.id)} style={{ color: '#1a1a1a', textDecoration: 'none' }}>
                                {article.title}
                              </a>
                            </h2>
                            <div className="blog-post-meta" style={{ fontSize: '10px', color: '#888', marginTop: '3px' }}>
                              <i className="flaticon-calendar"></i> {article.date}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
