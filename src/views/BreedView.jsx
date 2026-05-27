import React from 'react';

export default function BreedView({ onNavigate }) {
  const handleCategoryClick = (e, pageId) => {
    e.preventDefault();
    onNavigate(pageId);
  };

  return (
    <main className="fix">
      {/* Page Banner */}
      <section className="pt-60 pb-30" style={{ background: '#E2001A', color: '#fff' }}>
        <div className="container">
          <div className="row align-items-center py-4">
            <div className="col-md-8">
              <span className="post-tag mb-3" style={{ background: '#D4AF37', color: '#1a1a1a', fontWeight: '700', borderRadius: '30px' }}>
                Breed Profile
              </span>
              <h1 className="title" style={{ fontSize: '36px', fontWeight: '800', margin: '10px 0 15px 0', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                The Labrador Retriever
              </h1>
              <p style={{ fontSize: '16px', color: '#ffdfdf', lineHeight: '1.6', margin: 0 }}>
                Learn the genetic history, unique physical traits, and scientific care considerations 
                behind Sri Lanka's most beloved companion breed.
              </p>
            </div>
            <div className="col-md-4 text-center d-none d-md-block">
              <img src="/assets/img/images/categories_img03.png" alt="Breed Icon" style={{ maxHeight: '90px', filter: 'brightness(0) invert(1)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Breed Content */}
      <section className="pt-60 pb-60" style={{ background: '#fff' }}>
        <div className="container">
          <div className="row">
            
            {/* Left Column: Extensive Breed Details */}
            <div className="col-lg-8 mb-40">
              
              {/* History Block */}
              <div className="breed-segment mb-50">
                <h2 style={{ fontSize: '24px', fontWeight: '850', color: '#1a1a1a', marginBottom: '20px', borderBottom: '2px solid #EAE2D8', paddingBottom: '10px' }}>
                  1. Genetic History & Heritage
                </h2>
                <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.8' }}>
                  Despite their name, Labrador Retrievers actually originated in **Newfoundland, Canada** during the 1700s, not Labrador. 
                  They were developed from the St. John's water dog, a rugged retrieving dog that worked alongside local fishermen. 
                  These early ancestors retrieved heavy fish nets, escaped ropes, and caught fish that slipped from hooks in the ice-cold waters of the North Atlantic.
                </p>
                <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.8' }}>
                  During the 1800s, English aristocrats visiting Canada fell in love with their incredible swimming agility and co-operative nature. 
                  They imported the dogs to England, where they refined the breed as elite upland game and waterfowl retrievers. This rich working heritage 
                  gives the modern Labrador their signature love for water, soft mouths (capable of carrying game without marking it), and a deep cooperative drive.
                </p>
              </div>

              {/* Physical Features */}
              <div className="breed-segment mb-50">
                <h2 style={{ fontSize: '24px', fontWeight: '850', color: '#1a1a1a', marginBottom: '20px', borderBottom: '2px solid #EAE2D8', paddingBottom: '10px' }}>
                  2. Physical Features & Mechanics
                </h2>
                <div className="row g-4 mb-20">
                  <div className="col-md-6">
                    <div className="p-4" style={{ border: '1px solid #EAE2D8', borderRadius: '12px', background: '#FCFBF7' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#E2001A', marginBottom: '8px' }}>Size & Proportions</h4>
                      <p style={{ fontSize: '13.5px', color: '#555', lineHeight: '1.6', margin: 0 }}>
                        Labradors are muscular, athletic large-breed dogs. Standard adult males weigh between **29 to 36 kg**, while females range from **25 to 32 kg**. 
                        Their heavy-set skeletal frame is designed for power and endurance.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-4" style={{ border: '1px solid #EAE2D8', borderRadius: '12px', background: '#FCFBF7' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#E2001A', marginBottom: '8px' }}>Double Waterproof Coat</h4>
                      <p style={{ fontSize: '13.5px', color: '#555', lineHeight: '1.6', margin: 0 }}>
                        Their coat consists of two layers: a soft, dense, insulating undercoat that traps air for warmth, and a coarse, water-repellent outer guard coat. 
                        This double layer constantly produces natural sebum oils to remain waterproof.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-4" style={{ border: '1px solid #EAE2D8', borderRadius: '12px', background: '#FCFBF7' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#E2001A', marginBottom: '8px' }}>The Otter Tail</h4>
                      <p style={{ fontSize: '13.5px', color: '#555', lineHeight: '1.6', margin: 0 }}>
                        Thick at the base and tapering towards the tip, their signature tail acts as a powerful rudder when swimming. 
                        It is covered in short, dense hair, giving it a rounded appearance.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-4" style={{ border: '1px solid #EAE2D8', borderRadius: '12px', background: '#FCFBF7' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#E2001A', marginBottom: '8px' }}>Webbed Paws</h4>
                      <p style={{ fontSize: '13.5px', color: '#555', lineHeight: '1.6', margin: 0 }}>
                        Unlike most land breeds, Labradors have distinct webbing between their toes. This acts like natural swim fins, 
                        providing incredible thrust and stability in rivers, pools, or lakes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Misconceptions */}
              <div className="breed-segment mb-50">
                <h2 style={{ fontSize: '24px', fontWeight: '850', color: '#1a1a1a', marginBottom: '20px', borderBottom: '2px solid #EAE2D8', paddingBottom: '10px' }}>
                  3. Common Breed Misconceptions
                </h2>
                
                <div className="misconception-card p-4 mb-30" style={{ border: '1.5px solid #FAF3E0', borderRadius: '16px', background: '#ffffff' }}>
                  <h4 style={{ fontSize: '16.5px', fontWeight: '800', color: '#E2001A', marginBottom: '8px' }}>
                    <i className="fas fa-times-circle" style={{ marginRight: '6px' }}></i> Myth 1: "Labradors must be shaved in summer to stay cool."
                  </h4>
                  <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.7', margin: 0 }}>
                    <strong>The Science:</strong> Absolutely false. A Labrador's double coat acts as a natural thermodynamic insulator. 
                    It keeps them warm in cold water, but it also traps a layer of cool air next to their skin in hot tropical climates, protecting them from heat and sunburn. 
                    Shaving strips this defense, ruins the hair follicles (often permanently), and exposes their skin to mosquitoes, flies, and solar radiation. 
                    Instead of shaving, use regular brushing to remove dead undercoat fibers.
                  </p>
                </div>

                <div className="misconception-card p-4 mb-30" style={{ border: '1.5px solid #FAF3E0', borderRadius: '16px', background: '#ffffff' }}>
                  <h4 style={{ fontSize: '16.5px', fontWeight: '800', color: '#E2001A', marginBottom: '8px' }}>
                    <i className="fas fa-times-circle" style={{ marginRight: '6px' }}></i> Myth 2: "Golden Retrievers and Labradors are the same breed with different coats."
                  </h4>
                  <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.7', margin: 0 }}>
                    <strong>The Science:</strong> They are distinct lineages with different working histories. 
                    Golden Retrievers were bred in Scotland for land-based upland flushing and soft-mouthed bird retrieval. 
                    Labradors were bred in Canada for cold-water retrieving. Structurally, Labradors are heavier-boned, have wider skulls, 
                    distinct 'otter tails' (Goldens have feathered tails), and possess a water-resistant double coat, whereas Goldens have a long, wavy coat.
                  </p>
                </div>

                <div className="misconception-card p-4" style={{ border: '1.5px solid #FAF3E0', borderRadius: '16px', background: '#ffffff' }}>
                  <h4 style={{ fontSize: '16.5px', fontWeight: '800', color: '#E2001A', marginBottom: '8px' }}>
                    <i className="fas fa-times-circle" style={{ marginRight: '6px' }}></i> Myth 3: "Labradors are hyperactive and destructive by nature."
                  </h4>
                  <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.7', margin: 0 }}>
                    <strong>The Science:</strong> Labradors are high-energy working athletes. Destruction (like chewing doors or barking endlessly) 
                    is not a breed defect—it is a symptom of boredom and lack of exercise. When their athletic energy is channeled through regular walks, 
                    swimming, and nose work (snuffle mats, food puzzles), they are remarkably calm, gentle, and quiet house dogs.
                  </p>
                </div>
              </div>

              {/* Disease profile */}
              <div className="breed-segment">
                <h2 style={{ fontSize: '24px', fontWeight: '850', color: '#1a1a1a', marginBottom: '20px', borderBottom: '2px solid #EAE2D8', paddingBottom: '10px' }}>
                  4. Genetic Health & Disease Profiles
                </h2>
                <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.8', marginBottom: '20px' }}>
                  Understanding genetic vulnerabilities helps you take active precautions. Below is the physiological breakdown of standard large-breed conditions:
                </p>

                <div className="disease-box mb-25" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--llk-soft-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="fas fa-bone" style={{ color: '#E2001A', fontSize: '14px' }}></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 6px 0' }}>Hip & Elbow Dysplasia</h4>
                    <p style={{ fontSize: '13.5px', color: '#555', lineHeight: '1.6', margin: 0 }}>
                      An inherited joint socket deformity where the bone head does not fit smoothly, causing wear, cartilage erosion, and arthritis. 
                      It is highly aggravated by rapid puppy growth and obesity. Supporting cartilage early with pure salmon oil and Glucosamine tablets is vital.
                    </p>
                  </div>
                </div>

                <div className="disease-box mb-25" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--llk-soft-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="fas fa-exclamation-triangle" style={{ color: '#E2001A', fontSize: '14px' }}></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 6px 0' }}>Gastric Dilatation-Volvulus (Bloat)</h4>
                    <p style={{ fontSize: '13.5px', color: '#555', lineHeight: '1.6', margin: 0 }}>
                      A rapid build-up of gas causing the stomach to twist on its axis, cutting off blood supply. It is a fatal emergency. 
                      Caused by gulping down meals fast, drinking large volumes of water immediately after eating, or high-intensity exercise within 1 hour of feeding. 
                      Using slow-feed bowls is a crucial physical safeguard.
                    </p>
                  </div>
                </div>

                <div className="disease-box" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--llk-soft-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className="fas fa-heartbeat" style={{ color: '#E2001A', fontSize: '14px' }}></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 6px 0' }}>Exercise Induced Collapse (EIC)</h4>
                    <p style={{ fontSize: '13.5px', color: '#555', lineHeight: '1.6', margin: 0 }}>
                      A recessive genetic neuromuscular disorder. Dogs with EIC appear perfectly normal but collapse after 5 to 15 minutes of extreme excitement or high-strain retrieving. 
                      Responsible breeders conduct EIC DNA testing on parents to ensure their puppies are genetically clear.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Sidebar Info cards */}
            <div className="col-lg-4">
              <div className="sidebar-wrap" style={{ paddingLeft: '15px' }}>
                
                {/* Fast Facts */}
                <div className="widget p-4 mb-30" style={{ border: '1px solid #EAE2D8', borderRadius: '12px', background: 'var(--llk-cream)' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1a1a1a', marginBottom: '15px', borderBottom: '2px solid #E2001A', paddingBottom: '8px' }}>
                    Quick Breed Facts
                  </h3>
                  <table style={{ width: '100%', fontSize: '13px', color: '#444', lineHeight: '2' }}>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: '700', width: '40%' }}>Origin:</td>
                        <td>Newfoundland, Canada</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: '700' }}>Temperament:</td>
                        <td>Cooperative, smart, active</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: '700' }}>Weight (M):</td>
                        <td>29 - 36 kg</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: '700' }}>Weight (F):</td>
                        <td>25 - 32 kg</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: '700' }}>Lifespan:</td>
                        <td>10 - 12 Years</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: '700' }}>Double Coat:</td>
                        <td>Yes (Never Shave)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Satiety block */}
                <div className="widget p-4 mb-30" style={{ border: '1px solid #EAE2D8', borderRadius: '12px', background: '#FCFBF7' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1a1a1a', marginBottom: '12px', borderBottom: '2px solid #E2001A', paddingBottom: '8px' }}>
                    The Hunger Gene
                  </h3>
                  <p style={{ fontSize: '13px', color: '#444', lineHeight: '1.6', margin: 0 }}>
                    Labradors have a deletion in the **POMC gene** that essentially removes their satiety off-switch. 
                    They are biologically wired to act hungry even when full. Keeping their meals measured, using slow feeders, 
                    and avoiding high-calorie table scraps is the most important care measure to protect their hips.
                  </p>
                  <a href="#nutrition" onClick={(e) => handleCategoryClick(e, 'nutrition')} style={{ color: '#E2001A', fontSize: '12px', fontWeight: '700', display: 'block', marginTop: '10px', textDecoration: 'none' }}>
                    Read Satiety Science <i className="fas fa-chevron-right" style={{ fontSize: '10px', marginLeft: '3px' }}></i>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
