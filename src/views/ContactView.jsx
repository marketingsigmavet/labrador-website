import React, { useState } from 'react';
import SEO from '../components/SEO';
import { breadcrumbJsonLd, faqJsonLd } from '../utils/seo';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Nutrition');
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Stateful FAQ accordion indexes
  const [openFaq, setOpenFaq] = useState(0); // default open first

  const faqs = [
    {
      q: "Is a Labrador Retriever suitable for apartment living in Colombo?",
      a: "Yes, but only if you are fully committed to meeting their physical and mental exercise needs. Labradors are highly adaptable and quiet indoors if they receive at least 1.5 to 2 hours of daily activity (brisk walks, swimming, brain games). Without this release, they can become hyperactive and destructive. Note that polished apartment tile floors are slippery; place traction rugs to protect their joints."
    },
    {
      q: "Why is my Labrador shedding so much, and should I shave their coat?",
      a: "Labradors shed continuously in Sri Lanka's tropical climate, with heavy 'coat blows' twice a year. You should NEVER shave a Labrador. Their double coat acts as an insulator, protecting their skin from both tropical heat and sunburn. Shaving ruins their coat texture, increases risk of heatstroke, and exposes them to mosquitoes. Instead, use undercoat rakes to brush out dead hair 3-4 times a week."
    },
    {
      q: "How do I know if my Labrador puppy is growing at a healthy rate?",
      a: "Rapid growth is highly dangerous for large breeds. You should monitor their weight weekly. A healthy puppy grows at a steady curve; you should easily feel their ribs under a thin muscle layer but not see them protrude. Avoid calcium supplements (which cause skeletal deformities) and feed a controlled calorie diet specifically formulated for large-breed puppies. Use our Puppy Weight Predictor to track estimates."
    },
    {
      q: "Can I feed my Labrador a standard generic dog food?",
      a: "While they will eat anything, generic kibble does not address a Labrador's specific breed vulnerabilities. Generic kibbles are usually small, allowing Labradors to gulp them down without chewing, triggering digestive issues. They also lack the high concentration of joint protectors (Glucosamine/Chondroitin) and Omega-3 lipids required to nourish their heavy frame and waterproof double coats."
    },
    {
      q: "What should I do if my Labrador gets too hot during play?",
      a: "Heat exhaustion is a veterinary emergency. If your Labrador is panting frantically, has dark red gums, or seems weak, act immediately. Move them to a cool, shaded room or air-conditioned area. Wrap them in towels soaked in cool water (not ice-cold water, which constricts blood vessels and traps heat) and direct a fan at them. Get them to a veterinary hospital immediately."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !question) return;
    setSubmitted(true);
    setName('');
    setEmail('');
    setQuestion('');
  };

  return (
    <main className="fix">
      <SEO
        title="Ask Labrador.lk"
        description="Ask Labrador.lk a Labrador Retriever care question or browse frequently asked questions for Sri Lankan owners."
        path="/ask"
        jsonLd={[
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Ask Labrador.lk', path: '/ask' }]),
          faqJsonLd(faqs),
        ]}
      />
      {/* Hero Banner — cream, editorial */}
      <section style={{ background: 'var(--llk-cream)', borderTop: '4px solid #E2001A', paddingTop: '60px', paddingBottom: '50px' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#E2001A', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '14px' }}>
                Get In Touch
              </span>
              <h1 style={{ fontSize: '40px', fontWeight: '900', color: '#1a1a1a', lineHeight: '1.2', marginBottom: '16px' }}>
                Ask Labrador.lk &amp; FAQ
              </h1>
              <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.7', maxWidth: '560px', margin: 0 }}>
                Questions about your Lab's diet, grooming, or health? Browse our FAQ or drop us a message — we keep it real, no jargon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="pt-60 pb-60" style={{ background: '#fff' }}>
        <div className="container">
          <div className="row">
            
            {/* Left Column: FAQ Accordion */}
            <div className="col-lg-7 mb-40">
              <h2 style={{ fontSize: '24px', fontWeight: '850', color: '#1a1a1a', marginBottom: '25px', borderBottom: '2px solid #EAE2D8', paddingBottom: '10px' }}>
                Frequently Asked Labrador Questions
              </h2>

              <div className="accordion-wrap">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div 
                      className="accordion-item mb-20" 
                      key={idx} 
                      style={{ 
                        border: '1px solid #EAE2D8', 
                        borderRadius: '12px', 
                        overflow: 'hidden',
                        background: isOpen ? 'var(--llk-cream)' : '#fff',
                        transition: 'background 0.3s'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '20px',
                          background: 'none',
                          border: 'none',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontWeight: '700',
                          fontSize: '16px',
                          color: '#1a1a1a',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <span>{faq.q}</span>
                        <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ color: '#E2001A', fontSize: '14px', marginLeft: '10px' }}></i>
                      </button>
                      
                      {isOpen && (
                        <div 
                          style={{ 
                            padding: '0 20px 20px 20px', 
                            fontSize: '14px', 
                            lineHeight: '1.6', 
                            color: '#4b4b4b',
                            borderTop: '1px solid #f2ded0'
                          }}
                        >
                          <p style={{ margin: '15px 0 0 0' }}>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Contact form */}
            <div className="col-lg-5">
              <div className="contact-form-card p-4 p-md-5" style={{ border: '1px solid #D4AF37', borderRadius: '16px', background: '#FCFBF7', boxShadow: '0 15px 40px rgba(212, 175, 55, 0.08)' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '850', color: '#1a1a1a', marginBottom: '10px', borderBottom: '2px solid #E2001A', paddingBottom: '10px' }}>
                  Ask Labrador.lk
                </h2>
                
                {submitted ? (
                  <div className="success-message text-center py-4">
                    <div style={{ fontSize: '48px', color: '#2e7d32', marginBottom: '15px' }}>
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a', marginBottom: '10px' }}>Question Received Successfully</h3>
                    <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.5' }}>
                      Thank you! Your question has been received by <strong>Labrador.lk</strong>.
                      We may use it to improve future educational articles and owner guides.
                    </p>
                    <button 
                      type="button" 
                      className="btn mt-3"
                      onClick={() => setSubmitted(false)}
                      style={{ borderRadius: '30px', padding: '8px 20px', fontSize: '12px' }}
                    >
                      Ask Another Question
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                    
                    <div className="form-grp mb-3">
                      <label style={{ fontWeight: '700', color: '#1a1a1a', display: 'block', fontSize: '13px', marginBottom: '8px' }}>Your Name:</label>
                      <input 
                        type="text" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        style={{ width: '100%', padding: '12px 20px', border: '1px solid #EAE2D8', borderRadius: '30px', fontSize: '14px', background: '#fff' }} 
                      />
                    </div>

                    <div className="form-grp mb-3">
                      <label style={{ fontWeight: '700', color: '#1a1a1a', display: 'block', fontSize: '13px', marginBottom: '8px' }}>Your Email Address:</label>
                      <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        style={{ width: '100%', padding: '12px 20px', border: '1px solid #EAE2D8', borderRadius: '30px', fontSize: '14px', background: '#fff' }} 
                      />
                    </div>

                    <div className="form-grp mb-3">
                      <label style={{ fontWeight: '700', color: '#1a1a1a', display: 'block', fontSize: '13px', marginBottom: '8px' }}>Select Topic:</label>
                      <select 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        style={{ width: '100%', padding: '12px 20px', border: '1px solid #EAE2D8', borderRadius: '30px', fontSize: '14px', background: '#fff', outline: 'none' }}
                      >
                        <option value="Nutrition">Breed Nutrition & Portioning</option>
                        <option value="PuppyCare">Puppy Milestones & Growth</option>
                        <option value="Breed">Breed Characteristics & History</option>
                        <option value="Grooming">Coat Blowing & Bathing Schedule</option>
                        <option value="Health">Tropical Heat & Hip Dysplasia Precautions</option>
                      </select>
                    </div>

                    <div className="form-grp mb-4">
                      <label style={{ fontWeight: '700', color: '#1a1a1a', display: 'block', fontSize: '13px', marginBottom: '8px' }}>Describe Your Labrador Concerns:</label>
                      <textarea 
                        required 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Please details your dog's age, weight, and symptoms..."
                        style={{ width: '100%', height: '120px', padding: '15px 20px', border: '1px solid #EAE2D8', borderRadius: '15px', fontSize: '14px', background: '#fff', resize: 'none' }} 
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn w-100" 
                      style={{ background: '#E2001A', color: '#fff', borderRadius: '30px', fontWeight: '700', padding: '12px 20px' }}
                    >
                      Submit Question <i className="fas fa-paper-plane" style={{ marginLeft: '5px' }}></i>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
