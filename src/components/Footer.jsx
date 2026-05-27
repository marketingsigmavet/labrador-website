import React from 'react';

export default function Footer({ onNavigate }) {
  const handleNavClick = (e, pageId) => {
    e.preventDefault();
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-section" className="footer-section bg-dark">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            
            {/* Brand column */}
            <div className="col-lg-4 col-md-4 col-sm-6 footer-brand">
              <div className="brand-header">
                <div 
                  style={{ 
                    background: 'transparent', 
                    padding: '0', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start',
                    marginBottom: '20px'
                  }}
                >
                  <a href="#home" onClick={(e) => handleNavClick(e, 'home')} aria-label="Labrador.lk home" style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <img alt="Labrador.lk" src="/assets/img/logo/w_logo.png" style={{ maxHeight: '55px', width: 'auto', display: 'block' }} />
                  </a>
                </div>
                <p className="text">
                  Labrador.lk is Sri Lanka's premium educational platform for Labrador Retrievers, delivering science-backed breed care advice, puppy growth milestones, grooming guidelines, and brand nutrition insights for healthy growth.
                </p>
              </div>
              
              {/* Clean, high-impact contact details with red icons */}
              <div 
                className="footer-contact-details mb-25"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '14px',
                  lineHeight: '1.8',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginTop: '20px'
                }}
              >
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <i className="fas fa-map-marker-alt" style={{ color: '#E2001A', fontSize: '15px', marginTop: '4px' }}></i>
                  <span>Colombo, Sri Lanka</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <i className="fas fa-phone" style={{ color: '#E2001A', fontSize: '14px' }}></i>
                  <a href="tel:+94771234567" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>+94 77 123 4567</a>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <i className="fas fa-envelope" style={{ color: '#E2001A', fontSize: '14px' }}></i>
                  <a href="mailto:hello@labrador.lk" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>hello@labrador.lk</a>
                </div>
              </div>

              <div className="footer-social">
                <a className="social-link" href="https://facebook.com" target="_blank" rel="noreferrer" onMouseEnter={e => e.currentTarget.style.color = '#E2001A'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>FB.</a>
                <a className="social-link" href="https://instagram.com" target="_blank" rel="noreferrer" onMouseEnter={e => e.currentTarget.style.color = '#E2001A'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>IG.</a>
                <a className="social-link" href="https://twitter.com" target="_blank" rel="noreferrer" onMouseEnter={e => e.currentTarget.style.color = '#E2001A'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>TW.</a>
                <a className="social-link" href="https://youtube.com" target="_blank" rel="noreferrer" onMouseEnter={e => e.currentTarget.style.color = '#E2001A'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>YT.</a>
              </div>
            </div>

            {/* Menu Links columns */}
            <div className="col-lg-4 col-md-4">
              <div className="row">
                <div className="col-lg-6 col-md-6 p-0 sm-pl-15">
                  <div className="footer-widget">
                    <h4 className="title">Company</h4>
                    <ul className="list-unstyled">
                      <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home Portal</a></li>
                      <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About Platform</a></li>
                      <li><a href="#puppy-care" onClick={(e) => handleNavClick(e, 'puppy-care')}>Puppy Care</a></li>
                      <li><a href="#nutrition" onClick={(e) => handleNavClick(e, 'nutrition')}>Nutrition Hub</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 p-0 sm-pl-15">
                  <div className="footer-widget">
                    <h4 className="title">Support</h4>
                    <ul className="list-unstyled">
                      <li><a href="#breed" onClick={(e) => handleNavClick(e, 'breed')}>Breed Profile</a></li>
                      <li><a href="#grooming" onClick={(e) => handleNavClick(e, 'grooming')}>Grooming Guide</a></li>
                      <li><a href="#health" onClick={(e) => handleNavClick(e, 'health')}>Health Center</a></li>
                      <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact & FAQ</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Spacer */}
            <div className="col-lg-1 md-d-none"></div>

            {/* Newsletter column */}
            <div className="col-lg-3 col-md-4">
              <div className="footer-widget ml-0 mb-0">
                <h4 className="title">Newsletter</h4>
                <p className="text">Receive updates about Labrador breed health guides, premium brand insights, and nutrition tips.</p>
                <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Subscribed successfully! Thank you."); }}>
                  <div className="form-group" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input autoComplete="on" className="email" name="email" placeholder="Enter your email" required type="email" style={{ width: '100%', padding: '12px 50px 12px 20px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '30px', color: '#ffffff', fontSize: '14px', outline: 'none' }} />
                    <button type="submit" style={{ position: 'absolute', right: '5px', width: '38px', height: '38px', borderRadius: '50%', background: '#E2001A', border: 'none', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><i className="far fa-paper-plane" style={{ color: '#ffffff' }}></i></button>
                  </div>
                </form>
                <div className="notify" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
                  <div className="icon" style={{ color: '#E2001A' }}><i className="fa-regular fa-bell"></i></div>
                  Sri Lanka • Premium Labrador Care • Science-Backed Brand Guides
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', padding: '25px 0', background: '#0a0a0a' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-0" style={{ color: 'rgba(255, 255, 255, 0.5)', margin: 0 }}>©2026 - All Rights Reserved by Labrador.lk. Science-Backed Breed Nutrition.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="footer-policy" style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                <a href="#about" onClick={(e) => handleNavClick(e, 'about')} style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none', transition: 'all 0.3s ease' }}>Privacy</a>
                <a href="#about" onClick={(e) => handleNavClick(e, 'about')} style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none', transition: 'all 0.3s ease' }}>Terms</a>
                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none', transition: 'all 0.3s ease' }}>Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
