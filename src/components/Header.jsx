import React from 'react';

export default function Header({ currentPage, onNavigate }) {
  const getActiveClass = (pageId) => {
    return currentPage === pageId ? 'active' : '';
  };

  const handleNavClick = (e, pageId) => {
    e.preventDefault();
    onNavigate(pageId);
    // Close mobile menu if open
    document.body.classList.remove('mobile-menu-visible', 'offCanvas-menu-visible');
  };

  return (
    <header>
      <div id="header-fixed-height"></div>
      
      {/* Top Banner Bar */}
      <div className="header-top-wrap">
        <div className="container-fluid p-0">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="header-top-menu">
                <ul className="list-wrap">
                  <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
                  <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact & FAQ</a></li>
                  <li><a href="#nutrition" onClick={(e) => handleNavClick(e, 'nutrition')}>Nutritional Science</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="header-top-social">
                <h2 className="title">Official Labrador Platform:</h2>
                <ul className="list-wrap">
                  <li><a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a></li>
                  <li><a href="https://youtube.com" target="_blank" rel="noreferrer"><i class="fab fa-youtube"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div id="sticky-header" className="menu-area">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-12">
              <div className="menu-wrap">
                <div className="row align-items-center g-0">
                  
                  {/* Left Navigation */}
                  <div className="col-xl-6">
                    <div className="header-left-side">
                      <div className="offcanvas-toggle">
                        <a href="javascript:void(0)" className="menu-tigger">
                          <span></span>
                          <span></span>
                          <span></span>
                        </a>
                      </div>
                      <div className="navbar-wrap main-menu d-none d-xl-flex">
                        <ul className="navigation">
                          <li className={getActiveClass('home')}>
                            <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
                          </li>
                          <li className={getActiveClass('puppy-care')}>
                            <a href="#puppy-care" onClick={(e) => handleNavClick(e, 'puppy-care')}>Puppy Care</a>
                          </li>
                          <li className={getActiveClass('nutrition')}>
                            <a href="#nutrition" onClick={(e) => handleNavClick(e, 'nutrition')}>Nutrition</a>
                          </li>
                          <li className={getActiveClass('breed')}>
                            <a href="#breed" onClick={(e) => handleNavClick(e, 'breed')}>Breed</a>
                          </li>
                          <li className={getActiveClass('grooming')}>
                            <a href="#grooming" onClick={(e) => handleNavClick(e, 'grooming')}>Grooming</a>
                          </li>
                          <li className={getActiveClass('health')}>
                            <a href="#health" onClick={(e) => handleNavClick(e, 'health')}>Health</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Logo Center */}
                  <div className="col-xl-2 col-lg-3 col-md-4">
                    <div className="logo text-center">
                      <a href="#home" onClick={(e) => handleNavClick(e, 'home')} style={{ display: 'inline-block' }}>
                        <img src="/assets/img/logo/logo.png" alt="Labrador.lk" style={{ maxHeight: '55px' }} />
                      </a>
                    </div>
                  </div>

                  {/* Right Navigation / Search & Ask */}
                  <div className="col-xl-4 col-lg-9 col-md-8">
                    <div className="header-right-side">
                      <div className="header-search-wrap">
                        <form action="#" onSubmit={(e) => e.preventDefault()}>
                          <input type="text" placeholder="Search Labrador guides..." />
                          <button type="button"><i className="flaticon-search"></i></button>
                        </form>
                      </div>
                      <div className="header-action d-none d-md-block">
                        <ul className="list-wrap">
                          <li className="header-wishlist">
                            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} title="About Labrador.lk">
                              <i className="flaticon-heart"></i><span>1</span>
                            </a>
                          </li>
                          <li className="header-sine-in">
                            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>
                              <i className="flaticon-user"></i>Ask a Question
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
                
                {/* Mobile Menu Toggler */}
                <div className="mobile-nav-toggler"><i className="fas fa-bars"></i></div>
              </div>

              {/* Mobile Navigation Drawer */}
              <div className="mobile-menu">
                <nav className="menu-box">
                  <div className="close-btn"><i className="fas fa-times"></i></div>
                  <div className="nav-logo text-center py-3">
                    <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>
                      <img src="/assets/img/logo/logo.png" alt="Labrador.lk" style={{ maxHeight: '45px' }} />
                    </a>
                  </div>
                  <div className="mobile-search">
                    <form action="#" onSubmit={(e) => e.preventDefault()}>
                      <input type="text" placeholder="Search Labrador guides..." />
                      <button type="button"><i className="flaticon-search"></i></button>
                    </form>
                  </div>
                  <div className="menu-outer">
                    <ul className="navigation">
                      <li className={getActiveClass('home')}>
                        <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
                      </li>
                      <li className={getActiveClass('puppy-care')}>
                        <a href="#puppy-care" onClick={(e) => handleNavClick(e, 'puppy-care')}>Puppy Care</a>
                      </li>
                      <li className={getActiveClass('nutrition')}>
                        <a href="#nutrition" onClick={(e) => handleNavClick(e, 'nutrition')}>Nutrition</a>
                      </li>
                      <li className={getActiveClass('breed')}>
                        <a href="#breed" onClick={(e) => handleNavClick(e, 'breed')}>Breed</a>
                      </li>
                      <li className={getActiveClass('grooming')}>
                        <a href="#grooming" onClick={(e) => handleNavClick(e, 'grooming')}>Grooming</a>
                      </li>
                      <li className={getActiveClass('health')}>
                        <a href="#health" onClick={(e) => handleNavClick(e, 'health')}>Health</a>
                      </li>
                      <li className={getActiveClass('about')}>
                        <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About Us</a>
                      </li>
                      <li className={getActiveClass('contact')}>
                        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact & FAQ</a>
                      </li>
                    </ul>
                  </div>
                  <div className="social-links">
                    <ul className="clearfix list-wrap">
                      <li><a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="https://twitter.com"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="https://instagram.com"><i className="fab fa-instagram"></i></a></li>
                      <li><a href="https://youtube.com"><i className="fab fa-youtube"></i></a></li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="menu-backdrop"></div>

            </div>
          </div>
        </div>
      </div>

      {/* Offcanvas Overlay Menu */}
      <div className="offCanvas-wrap">
        <div className="offCanvas-body">
          <div className="offCanvas-toggle">
            <span></span>
            <span></span>
          </div>
          <div className="offCanvas-content">
            <div className="offCanvas-logo logo">
              <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="logo-dark">
                <img src="/assets/img/logo/logo.png" alt="Labrador.lk" style={{ maxHeight: '60px' }} />
              </a>
            </div>
            <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.6', marginTop: '20px' }}>
              <strong>Labrador.lk</strong> is Sri Lanka’s premium educational platform for Labrador Retriever owners, 
              created as a science-backed educational resource, inspired by advanced veterinary nutrition standards.
            </p>
            <ul className="offCanvas-instagram list-wrap">
              <li><a href="#nutrition" onClick={(e) => handleNavClick(e, 'nutrition')} className="popup-image"><img src="/assets/img/blog/featured_post01.jpg" alt="img" /></a></li>
              <li><a href="#puppy-care" onClick={(e) => handleNavClick(e, 'puppy-care')} className="popup-image"><img src="/assets/img/blog/featured_post02.jpg" alt="img" /></a></li>
              <li><a href="#breed" onClick={(e) => handleNavClick(e, 'breed')} className="popup-image"><img src="/assets/img/blog/featured_post03.jpg" alt="img" /></a></li>
              <li><a href="#grooming" onClick={(e) => handleNavClick(e, 'grooming')} className="popup-image"><img src="/assets/img/blog/featured_post04.jpg" alt="img" /></a></li>
              <li><a href="#health" onClick={(e) => handleNavClick(e, 'health')} className="popup-image"><img src="/assets/img/blog/latest_post01.jpg" alt="img" /></a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="popup-image"><img src="/assets/img/blog/latest_post02.jpg" alt="img" /></a></li>
            </ul>
          </div>
          <div className="offCanvas-contact">
            <h2 className="title">Get In Touch</h2>
            <ul className="offCanvas-contact-list list-wrap">
              <li><i className="fas fa-envelope-open"></i><a href="mailto:hello@labrador.lk">hello@labrador.lk</a></li>
              <li><i className="fas fa-phone"></i><a href="tel:+94771234567">+94 77 123 4567</a></li>
              <li><i className="fas fa-map-marker-alt"></i> Colombo, Sri Lanka</li>
            </ul>
            <ul className="offCanvas-social list-wrap">
              <li><a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="https://twitter.com"><i className="fab fa-twitter"></i></a></li>
              <li><a href="https://instagram.com"><i className="fab fa-instagram"></i></a></li>
              <li><a href="https://youtube.com"><i className="fab fa-youtube"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="offCanvas-overlay"></div>
    </header>
  );
}
