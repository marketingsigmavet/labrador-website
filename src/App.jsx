import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./views/HomeView";
import ArticleIndexView from "./views/ArticleIndexView";
import ArticleReaderView from "./views/ArticleReaderView";
import HubView from "./views/HubView";
import AboutView from "./views/AboutView";
import ContactView from "./views/ContactView";

const scriptQueue = [
  "/assets/js/vendor/jquery-3.6.0.min.js",
  "/assets/js/bootstrap.min.js",
  "/assets/js/jquery.magnific-popup.min.js",
  "/assets/js/slick.min.js",
  "/assets/js/swiper-bundle.js",
  "/assets/js/wow.min.js",
  "/assets/js/main.js",
];

function loadScriptsSequentially(urls) {
  return urls.reduce(
    (promise, src) =>
      promise.then(
        () =>
          new Promise((resolve) => {
            if (document.querySelector(`script[data-zaira-src="${src}"]`)) return resolve();
            const script = document.createElement("script");
            script.src = src;
            script.dataset.zairaSrc = src;
            script.onload = resolve;
            script.onerror = resolve;
            document.body.appendChild(script);
          })
      ),
    Promise.resolve()
  );
}

function ScrollAndEnhancements() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "labrador-royal-canin");
    loadScriptsSequentially(scriptQueue).then(() => {
      setTimeout(() => document.body.classList.add("llk-loaded"), 250);
    });

    const onClick = (event) => {
      const menuBtn = event.target.closest(".mobile-nav-toggler, .menu-tigger");
      const closeBtn = event.target.closest(".close-btn, .menu-backdrop, .offCanvas-overlay, .offCanvas-toggle");
      const scrollTop = event.target.closest(".scroll-top");
      if (menuBtn) document.body.classList.add("mobile-menu-visible", "offCanvas-menu-visible");
      if (closeBtn) document.body.classList.remove("mobile-menu-visible", "offCanvas-menu-visible");
      if (scrollTop) window.scrollTo({ top: 0, behavior: "smooth" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    document.body.classList.remove("mobile-menu-visible", "offCanvas-menu-visible");
  }, [location.pathname]);

  useEffect(() => {
    const elements = document.querySelectorAll(
      "main section, .llk-article-card, .llk-path-card, .llk-breed-fact, .llk-pagination"
    );
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("llk-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("llk-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((element) => {
      element.classList.add("llk-reveal");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname, location.search]);

  return null;
}

export default function App() {
  return (
    <div className="zaira-react-template">
      <ScrollAndEnhancements />
      <div id="preloader">
        <div className="loader-inner">
          <div id="loader">
            <h2 id="bg-loader">
              Labrador<span>.</span>
            </h2>
            <h2 id="fg-loader">
              Labrador<span>.</span>
            </h2>
          </div>
        </div>
      </div>
      <button className="scroll-top scroll-to-target" data-target="html" aria-label="Scroll to top">
        <i className="fas fa-angle-up"></i>
      </button>
      <Header />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/articles" element={<ArticleIndexView />} />
        <Route path="/articles/:slug" element={<ArticleReaderView />} />
        <Route path="/hubs/:hubSlug" element={<HubView />} />
        <Route path="/tags/:tagSlug" element={<ArticleIndexView mode="tag" />} />
        <Route path="/series/:seriesSlug" element={<ArticleIndexView mode="series" />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/ask" element={<ContactView />} />
        <Route path="/contact" element={<Navigate to="/ask" replace />} />
        <Route path="/puppy-care" element={<Navigate to="/hubs/puppy-care" replace />} />
        <Route path="/nutrition" element={<Navigate to="/hubs/nutrition" replace />} />
        <Route path="/breed" element={<Navigate to="/hubs/breed" replace />} />
        <Route path="/grooming" element={<Navigate to="/hubs/grooming" replace />} />
        <Route path="/health" element={<Navigate to="/hubs/health" replace />} />
        <Route path="*" element={<Navigate to="/articles" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}
