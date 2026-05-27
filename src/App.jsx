import React, { useState, useEffect } from 'react';

// Components & Views
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import NutritionView from './views/NutritionView';
import PuppyCareView from './views/PuppyCareView';
import BreedView from './views/BreedView';
import GroomingView from './views/GroomingView';
import HealthView from './views/HealthView';
import AboutView from './views/AboutView';
import ContactView from './views/ContactView';
import ArticleReaderView from './views/ArticleReaderView';

const scriptQueue = [
  '/assets/js/vendor/jquery-3.6.0.min.js',
  '/assets/js/bootstrap.min.js',
  '/assets/js/jquery.magnific-popup.min.js',
  '/assets/js/slick.min.js',
  '/assets/js/swiper-bundle.js',
  '/assets/js/wow.min.js',
  '/assets/js/main.js'
];

function loadScriptsSequentially(urls) {
  return urls.reduce((promise, src) => promise.then(() => new Promise((resolve) => {
    if (document.querySelector(`script[data-zaira-src="${src}"]`)) return resolve();
    const script = document.createElement('script');
    script.src = src;
    script.dataset.zairaSrc = src;
    script.onload = resolve;
    script.onerror = resolve;
    document.body.appendChild(script);
  })), Promise.resolve());
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // home, puppy-care, nutrition, training, grooming, health, about, contact, article-details
  const [activeArticle, setActiveArticle] = useState(null);

  // Global Navigation Handlers
  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    setActiveArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadArticle = (articleId) => {
    setActiveArticle(articleId);
    setCurrentPage('article-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Preloader, themes and assets setup
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'labrador-royal-canin');

    // Load Zaira template assets scripts
    loadScriptsSequentially(scriptQueue).then(() => {
      setTimeout(() => document.body.classList.add('llk-loaded'), 350);
    });

    // Fallback menu controls
    const onClick = (event) => {
      const menuBtn = event.target.closest('.mobile-nav-toggler, .menu-tigger');
      const closeBtn = event.target.closest('.close-btn, .menu-backdrop, .offCanvas-overlay, .offCanvas-toggle');
      const scrollTop = event.target.closest('.scroll-top');
      if (menuBtn) document.body.classList.add('mobile-menu-visible', 'offCanvas-menu-visible');
      if (closeBtn) document.body.classList.remove('mobile-menu-visible', 'offCanvas-menu-visible');
      if (scrollTop) window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, []);

  // Update background images and transitions on page change
  useEffect(() => {
    // Set background images
    document.querySelectorAll('[data-background]').forEach((el) => {
      const bg = el.getAttribute('data-background');
      if (bg) el.style.backgroundImage = `url(${bg})`;
    });

    // Intersection observers for reveal animations
    const revealTargets = document.querySelectorAll('section, .featured-post-item, .latest-post-item, .categories-item, .ta-horizontal-post, .sidebar-widget');
    revealTargets.forEach((el) => el.classList.add('llk-reveal'));
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('llk-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    
    revealTargets.forEach((el) => observer.observe(el));
    
    return () => {
      observer.disconnect();
    };
  }, [currentPage, activeArticle]);

  // Page Routing Switch
  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} onReadArticle={handleReadArticle} />;
      case 'puppy-care':
        return <PuppyCareView onReadArticle={handleReadArticle} onNavigate={handleNavigate} />;
      case 'nutrition':
        return <NutritionView onReadArticle={handleReadArticle} onNavigate={handleNavigate} />;
      case 'breed':
        return <BreedView onNavigate={handleNavigate} />;
      case 'grooming':
        return <GroomingView onReadArticle={handleReadArticle} onNavigate={handleNavigate} />;
      case 'health':
        return <HealthView onReadArticle={handleReadArticle} onNavigate={handleNavigate} />;
      case 'about':
        return <AboutView onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactView />;
      case 'article-details':
        return <ArticleReaderView articleId={activeArticle} onNavigate={handleNavigate} onReadArticle={handleReadArticle} />;
      default:
        return <HomeView onNavigate={handleNavigate} onReadArticle={handleReadArticle} />;
    }
  };

  return (
    <div className="zaira-react-template">
      {/* Loader */}
      <div id="preloader">
        <div className="loader-inner">
          <div id="loader">
            <h2 id="bg-loader">Labrador<span>.</span></h2>
            <h2 id="fg-loader">Labrador<span>.</span></h2>
          </div>
        </div>
      </div>



      {/* Scroll to Top */}
      <button className="scroll-top scroll-to-target" data-target="html">
        <i className="fas fa-angle-up"></i>
      </button>

      {/* Header Layout */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Dynamic View Content */}
      {renderCurrentView()}

      {/* Footer Layout */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
