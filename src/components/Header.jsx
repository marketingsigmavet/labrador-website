import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { hubs } from "../data/taxonomy";

export default function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const submitSearch = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/articles?q=${encodeURIComponent(trimmed)}` : "/articles");
    document.body.classList.remove("mobile-menu-visible", "offCanvas-menu-visible");
  };

  const linkClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <header>
      <div id="header-fixed-height"></div>

      <div className="header-top-wrap">
        <div className="container-fluid p-0">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="header-top-menu">
                <ul className="list-wrap">
                  <li><Link to="/articles">All articles</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/ask">Ask Labrador.lk</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="header-top-social">
                <h2 className="title">Labrador.lk care hub</h2>
                <ul className="list-wrap">
                  <li><a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a></li>
                  <li><a href="https://youtube.com" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="sticky-header" className="menu-area">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-12">
              <div className="menu-wrap">
                <div className="row align-items-center g-0">
                  <div className="col-xl-5">
                    <div className="header-left-side">
                      <div className="offcanvas-toggle">
                        <a href="#menu" className="menu-tigger" aria-label="Open menu">
                          <span></span>
                          <span></span>
                          <span></span>
                        </a>
                      </div>
                      <nav className="navbar-wrap main-menu d-none d-xl-flex" aria-label="Primary navigation">
                        <ul className="navigation">
                          <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
                          {hubs.map((hub) => (
                            <li key={hub.id}>
                              <NavLink to={`/hubs/${hub.slug}`} className={linkClass}>{hub.label}</NavLink>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  </div>

                  <div className="col-xl-2 col-lg-3 col-md-4">
                    <div className="logo text-center">
                      <Link to="/" style={{ display: "inline-block" }}>
                        <img src="/assets/img/logo/logo.png" alt="Labrador.lk" style={{ maxHeight: "55px" }} />
                      </Link>
                    </div>
                  </div>

                  <div className="col-xl-5 col-lg-9 col-md-8">
                    <div className="header-right-side">
                      <div className="header-search-wrap">
                        <form onSubmit={submitSearch}>
                          <input
                            type="search"
                            placeholder="Search Labrador guides..."
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                          />
                          <button type="submit"><i className="flaticon-search"></i></button>
                        </form>
                      </div>
                      <div className="header-action d-none d-md-block">
                        <ul className="list-wrap">
                          <li className="header-sine-in">
                            <Link to="/ask"><i className="flaticon-user"></i>Ask a Question</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mobile-nav-toggler"><i className="fas fa-bars"></i></div>
              </div>

              <div className="mobile-menu">
                <nav className="menu-box" aria-label="Mobile navigation">
                  <div className="close-btn"><i className="fas fa-times"></i></div>
                  <div className="nav-logo text-center py-3">
                    <Link to="/"><img src="/assets/img/logo/logo.png" alt="Labrador.lk" style={{ maxHeight: "45px" }} /></Link>
                  </div>
                  <div className="mobile-search">
                    <form onSubmit={submitSearch}>
                      <input
                        type="search"
                        placeholder="Search Labrador guides..."
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                      />
                      <button type="submit"><i className="flaticon-search"></i></button>
                    </form>
                  </div>
                  <div className="menu-outer">
                    <ul className="navigation">
                      <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
                          <li><NavLink to="/articles" className={linkClass}>All articles</NavLink></li>
                      {hubs.map((hub) => (
                        <li key={hub.id}><NavLink to={`/hubs/${hub.slug}`} className={linkClass}>{hub.label}</NavLink></li>
                      ))}
                      <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
                      <li><NavLink to="/ask" className={linkClass}>Ask Labrador.lk</NavLink></li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="menu-backdrop"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="offCanvas-wrap">
        <div className="offCanvas-body">
          <div className="offCanvas-toggle"><span></span><span></span></div>
          <div className="offCanvas-content">
            <div className="offCanvas-logo logo">
              <Link to="/" className="logo-dark">
                <img src="/assets/img/logo/logo.png" alt="Labrador.lk" style={{ maxHeight: "60px" }} />
              </Link>
            </div>
            <p style={{ color: "#555", fontSize: "14px", lineHeight: 1.6, marginTop: "20px" }}>
              <strong>Labrador.lk</strong> is Sri Lanka's Labrador-specific education platform for puppy care,
              nutrition, breed knowledge, grooming, and preventive health.
            </p>
          </div>
          <div className="offCanvas-contact">
            <h2 className="title">Explore</h2>
            <ul className="offCanvas-contact-list list-wrap">
              <li><i className="fas fa-book-open"></i><Link to="/articles">All Articles</Link></li>
              <li><i className="fas fa-envelope-open"></i><Link to="/ask">Ask Labrador.lk</Link></li>
              <li><i className="fas fa-map-marker-alt"></i> Colombo, Sri Lanka</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="offCanvas-overlay"></div>
    </header>
  );
}
