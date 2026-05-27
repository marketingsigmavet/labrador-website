import React from 'react';

export default function AboutView({ onNavigate }) {
  return (
    <main className="fix">
      {/* Hero Banner — cream, editorial */}
      <section style={{ background: 'var(--llk-cream)', borderTop: '4px solid #E2001A', paddingTop: '60px', paddingBottom: '50px' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#E2001A', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '14px' }}>
                Our Mission
              </span>
              <h1 style={{ fontSize: '40px', fontWeight: '900', color: '#1a1a1a', lineHeight: '1.2', marginBottom: '16px' }}>
                About Labrador.lk
              </h1>
              <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.7', maxWidth: '560px', margin: 0 }}>
                Sri Lanka's dedicated digital education resource for Labrador Retriever owners — science-backed, simple language, built for Gen Z pet parents.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Main Content */}
      <section className="pt-60 pb-60" style={{ background: '#fff' }}>
        <div className="container">
          <div className="row justify-content-center">
            
            <div className="col-lg-10">
              
              <div className="about-content-wrap mb-50" style={{ fontSize: '15px', color: '#444', lineHeight: '1.8' }}>
                <h2 style={{ fontSize: '26px', fontWeight: '850', color: '#1a1a1a', marginBottom: '20px' }}>
                  Raising the Standard of Labrador Care in Sri Lanka
                </h2>
                <p>
                  Labrador Retrievers are Sri Lanka's most beloved pet dog breed. Their legendary friendly nature, 
                  protective instincts, and outstanding suitability for families make them incredibly popular. However, 
                  raising a large, double-coated working breed in a tropical, urban environment presents unique challenges. 
                  Without proper advice, many Labradors suffer from avoidable joint conditions, skin infections, and metabolic weight struggles.
                </p>
                <p>
                  <strong>Labrador.lk</strong> was created as a premium educational initiative. Our goal is to provide 
                  every Labrador owner in Sri Lanka with instant, free access to science-backed breed guidelines. 
                  By offering expert advice on puppy development milestones, correct physical conditioning, and tropical grooming protocols, 
                  we empower local families to raise healthier, happier companions.
                </p>
                
                <div className="quote-box p-4 my-4" style={{ background: 'var(--llk-cream)', borderLeft: '4px solid #E2001A', borderRadius: '0 8px 8px 0', fontStyle: 'italic' }}>
                  "Labradors are genetically wired to be food-obsessed due to a variation in their POMC gene. Keeping them physically active and feeding them slow-feed, portion-controlled premium kibble is the best way to prevent joint stress and double their happiness."
                  <span style={{ display: 'block', fontWeight: '700', color: '#1a1a1a', marginTop: '5px', fontSize: '13px', fontStyle: 'normal' }}>
                    — Labrador.lk Science-Backed Breed Guide
                  </span>
                </div>
              </div>

              {/* Partnership Banner */}
              <div className="partnership-panel p-5 mb-50 text-center" style={{ background: 'linear-gradient(135deg, #FAF3E0 0%, #FCFBF7 100%)', border: '1px solid #D4AF37', borderRadius: '16px' }}>
                <div className="mb-3" style={{ display: 'inline-flex', width: '60px', height: '60px', borderRadius: '50%', background: '#fff', border: '2px solid #E2001A', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-microscope" style={{ fontSize: '24px', color: '#E2001A' }}></i>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1a1a1a', marginBottom: '10px' }}>
                  Evidence-Based Breed Nutrition
                </h3>
                <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.6', maxWidth: '750px', margin: '0 auto' }}>
                  Our platform works in harmony with advanced veterinary nutrition guidelines. By aligning our guidelines with 
                  global research on breed-specific canine dietetics, we provide precise portion sizing, 
                  eating pace management, and essential skeletal health recommendations for Labrador Retrievers.
                </p>
              </div>

              {/* Editorial Pillar Grid */}
              <h2 style={{ fontSize: '24px', fontWeight: '850', color: '#1a1a1a', marginBottom: '25px', textAlign: 'center' }}>
                Our Core Principles
              </h2>

              <div className="row g-4">
                
                <div className="col-md-4">
                  <div className="p-4 h-100" style={{ border: '1px solid #EAE2D8', borderRadius: '12px', background: '#fff' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#E2001A', marginBottom: '10px' }}>
                      1. Science-Backed Content
                    </h3>
                    <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6', margin: 0 }}>
                      Every health, warning, and dietary guideline published on our platform is compiled from peer-reviewed scientific studies and international breed feeding guidelines.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="p-4 h-100" style={{ border: '1px solid #EAE2D8', borderRadius: '12px', background: '#fff' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#E2001A', marginBottom: '10px' }}>
                      2. Tropical Specificity
                    </h3>
                    <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6', margin: 0 }}>
                      We do not copy cold-weather Western breed templates. Our guidelines are written specifically for 
                      caring for Labradors in Sri Lanka's high temperatures, rainfalls, and tile-floor households.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="p-4 h-100" style={{ border: '1px solid #EAE2D8', borderRadius: '12px', background: '#fff' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#E2001A', marginBottom: '10px' }}>
                      3. Responsible Breeding
                    </h3>
                    <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6', margin: 0 }}>
                      We strictly advocate for ethical, responsible breeding. We strongly discourage backyard breeders 
                      and promote certified DNA health clearances to stamp out painful hip and eye diseases.
                    </p>
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
