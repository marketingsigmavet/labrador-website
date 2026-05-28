import React, { useState } from "react";
import { Link } from "react-router-dom";
import { hubs } from "../data/taxonomy";
import { publicPath } from "../utils/publicPath";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer id="footer-section" className="footer-section bg-dark">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 footer-brand">
              <Link to="/" aria-label="Labrador.lk home" style={{ display: "inline-flex", marginBottom: "20px" }}>
                <img alt="Labrador.lk" src={publicPath("/assets/img/logo/w_logo.png")} style={{ maxHeight: "55px" }} />
              </Link>
              <p className="text">
                Labrador.lk is a premium article-first education platform for Labrador Retriever owners in Sri Lanka.
                We publish practical guides on puppy care, nutrition, breed understanding, grooming, and preventive health.
              </p>
              <div className="footer-contact-details mb-25" style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: 1.8 }}>
                <div><i className="fas fa-map-marker-alt" style={{ color: "#E2001A", marginRight: "10px" }}></i>Colombo, Sri Lanka</div>
                <div><i className="fas fa-envelope" style={{ color: "#E2001A", marginRight: "10px" }}></i><a href="mailto:hello@labrador.lk">hello@labrador.lk</a></div>
              </div>
            </div>

            <div className="col-lg-5 col-md-6">
              <div className="row">
                <div className="col-sm-6">
                  <div className="footer-widget">
                    <h4 className="title">Hub</h4>
                    <ul className="list-unstyled">
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/articles">All articles</Link></li>
                      <li><Link to="/about">About Labrador.lk</Link></li>
                      <li><Link to="/ask">Ask Labrador.lk</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="footer-widget">
                    <h4 className="title">Hubs</h4>
                    <ul className="list-unstyled">
                      {hubs.map((hub) => (
                        <li key={hub.id}><Link to={`/hubs/${hub.slug}`}>{hub.label}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-12">
              <div className="footer-widget ml-0 mb-0">
                <h4 className="title">Newsletter</h4>
                <p className="text">Get Labrador care guides and new article updates. No sales pressure, just useful reading.</p>
                {subscribed ? (
                  <p style={{ color: "#fff", fontWeight: 800 }}>You're on the list. Thank you.</p>
                ) : (
                  <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}>
                    <div className="form-group" style={{ position: "relative", display: "flex", alignItems: "center" }}>
                      <input
                        autoComplete="email"
                        className="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        type="email"
                        style={{ width: "100%", padding: "12px 50px 12px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "30px", color: "#fff", fontSize: "14px" }}
                      />
                      <button type="submit" aria-label="Subscribe" style={{ position: "absolute", right: "5px", width: "38px", height: "38px", borderRadius: "50%", background: "#E2001A", border: "none", color: "#fff" }}>
                        <i className="far fa-paper-plane"></i>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "25px 0", background: "#0a0a0a" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-0" style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}>©2026 Labrador.lk. Educational content for Labrador owners.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <Link to="/about" style={{ color: "rgba(255,255,255,0.5)", marginRight: "20px" }}>Privacy</Link>
              <Link to="/about" style={{ color: "rgba(255,255,255,0.5)", marginRight: "20px" }}>Terms</Link>
              <Link to="/ask" style={{ color: "rgba(255,255,255,0.5)" }}>Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
