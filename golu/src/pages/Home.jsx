import React, { useState, useEffect } from 'react';
import './Home.css';

const SSVMHighSchool = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentFormStep, setCurrentFormStep] = useState(1);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  // Form state
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    gender: '',
    parentName: '',
    relationship: '',
    classApplying: '',
    prevSchool: '',
    lastClass: '',
    stream: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });

  // Gallery images
  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600", category: "classroom", title: "Modern Classrooms" },
    { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600", category: "sports", title: "Sports Activities" },
    { src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600", category: "classroom", title: "Library" },
    { src: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600", category: "classroom", title: "Science Lab" },
    { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600", category: "events", title: "Annual Events" },
    { src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600", category: "campus", title: "Campus View" }
  ];

  // Filtered gallery images
  const filteredGalleryImages = galleryFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === galleryFilter);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('nav') && !event.target.closest('.mobile-menu')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  // Handle scroll for back to top button and active nav
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
      
      // Update active nav based on scroll position
      const sections = ['home', 'about', 'academics', 'gallery', 'admissions', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveNav(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form navigation
  const nextFormStep = () => {
    // Basic validation
    if (currentFormStep === 1) {
      if (!formData.studentName || !formData.dob || !formData.gender || !formData.parentName || !formData.relationship) {
        alert('Please fill out all required fields');
        return;
      }
    }
    if (currentFormStep === 2) {
      if (!formData.classApplying) {
        alert('Please select the class you are applying for');
        return;
      }
    }
    if (currentFormStep === 3) {
      if (!formData.email || !formData.phone || !formData.address) {
        alert('Please fill out all required fields');
        return;
      }
    }

    setCurrentFormStep(prev => Math.min(prev + 1, 4));
  };

  const prevFormStep = () => {
    setCurrentFormStep(prev => Math.max(prev - 1, 1));
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Application Submitted Successfully!');
    // Reset form
    setFormData({
      studentName: '',
      dob: '',
      gender: '',
      parentName: '',
      relationship: '',
      classApplying: '',
      prevSchool: '',
      lastClass: '',
      stream: '',
      email: '',
      phone: '',
      address: '',
      message: ''
    });
    setCurrentFormStep(1);
  };

  // Gallery lightbox
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % filteredGalleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + filteredGalleryImages.length) % filteredGalleryImages.length);
  };

  // Smooth scrolling
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setActiveNav(sectionId);
    setMobileMenuOpen(false);
  };

  // Back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setActiveNav('home');
  };

  return (
    <div className="ssvm-app">
      {/* News Ticker */}
      <div className="news-ticker">
        <div className="container ticker-container">
          <div className="ticker-label">Latest News</div>
          <div className="ticker-content">
            <ul className="ticker-list">
              <li>Admissions open for Academic Year 2025-26 | Apply now!</li>
              <li>Annual Sports Day scheduled for March 15, 2026</li>
              <li>SSVM students win 3 gold medals at State Science Olympiad</li>
              <li>Parent-Teacher meeting on February 28, 2026</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Header Top */}
      <div className="header-top">
        <div className="container">
          <div className="contact-info">
            <span><i className="fas fa-phone"></i> +91 1234567890</span>
            <span><i className="fas fa-envelope"></i> info@ssvmschool.edu</span>
          </div>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header>
        <div className="main-header">
          <div className="container">
            <div className="logo">
              <div className="logo-img">
                <img 
                  src="https://tse3.mm.bing.net/th/id/OIP.K7HzUKAyojywGypEKWOd6gAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" 
                  alt="SSVM High School Logo" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="logo-fallback">SSVM</div>
              </div>
              <div className="logo-text">
                <h1>SSVM</h1>
                <p>सरस्वती शिशु विद्या मन्दिर </p>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="mobile-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <div className={`menu-icon ${mobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            {/* Navigation */}
            <nav className={mobileMenuOpen ? 'nav-active' : ''}>
              {/* Mobile Menu Header */}
              <div className="mobile-nav-header">
                <div className="mobile-logo">
                  <div className="logo-img">
                    <img 
                      src="https://tse3.mm.bing.net/th/id/OIP.K7HzUKAyojywGypEKWOd6gAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" 
                      alt="SSVM High School Logo"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="logo-fallback">SSVM</div>
                  </div>
                  <div className="logo-text">
                    <h3>सरस्वती शिशु विद्या मन्दिर</h3>
                  </div>
                </div>
                <button 
                  className="mobile-close"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Navigation Links */}
              <ul>
                <li>
                  <a 
                    href="#home" 
                    className={activeNav === 'home' ? 'active' : ''}
                    onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                  >
                    <i className="fas fa-home"></i>
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#about" 
                    className={activeNav === 'about' ? 'active' : ''}
                    onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                  >
                    <i className="fas fa-info-circle"></i>
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#academics" 
                    className={activeNav === 'academics' ? 'active' : ''}
                    onClick={(e) => { e.preventDefault(); scrollToSection('academics'); }}
                  >
                    <i className="fas fa-graduation-cap"></i>
                    Academics
                  </a>
                </li>
                <li>
                  <a 
                    href="#gallery" 
                    className={activeNav === 'gallery' ? 'active' : ''}
                    onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}
                  >
                    <i className="fas fa-images"></i>
                    Gallery
                  </a>
                </li>
                <li>
                  <a 
                    href="#admissions" 
                    className={activeNav === 'admissions' ? 'active' : ''}
                    onClick={(e) => { e.preventDefault(); scrollToSection('admissions'); }}
                  >
                    <i className="fas fa-user-plus"></i>
                    Admissions
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    className={activeNav === 'contact' ? 'active' : ''}
                    onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                  >
                    <i className="fas fa-phone"></i>
                    Contact
                  </a>
                </li>
              </ul>

              {/* Mobile Contact Info */}
              <div className="mobile-contact-info">
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>+91 1234567890</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>info@ssvmschool.edu</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>hafuwa  chatra  jharkhand</span>
                </div>
              </div>

              {/* Mobile Social Links */}
              <div className="mobile-social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
              </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
              <div 
                className="mobile-overlay"
                onClick={() => setMobileMenuOpen(false)}
              ></div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content container">
          <h2>Welcome to SSVM High School</h2>
          <p>Saraswati Shishu Vidya Mandir is dedicated to nurturing young minds through a perfect blend of modern education and traditional Indian values.
              We aim to build students who are knowledgeable, disciplined, and rooted in culture, ready to lead with confidence and compassion.</p>
          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => scrollToSection('admissions')}>Apply Now</button>
            <button className="btn btn-secondary" onClick={() => scrollToSection('about')}>Learn More</button>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="principal-message">
        <div className="container">
          <h2 className="section-title">Principal's Message</h2>
          <div className="message-container">
            <div className="principal-photo">
              <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500" alt="Principal" />
            </div>
            <div className="message-content">
              <h3>Shaping Future Leaders</h3>
              <p>Saraswati Shishu Vidya Mandir (SSVM) is more than just a school — it is a center of values, learning, and character-building.
                 Founded with the vision of providing holistic education, SSVM strives to blend the richness of Indian culture and moral values with the demands of modern knowledge and technology.</p>

              <p>We take pride in being a part of the Vidya Bharati Akhil Bharatiya Shiksha Sansthan tradition, where education is seen as a sacred mission to shape responsible and self-reliant citizens who will contribute positively to the nation.</p>

              <p> <strong>Our Motto:</strong> “Sanskār, Shiksha aur Sanskr̥iti – The Three Pillars of True Education.” <br />
                 <strong>Our Vision:</strong> To develop children into enlightened individuals who embody knowledge, humility, and compassion.  <br />
                 <strong>Our Mission:</strong>  To provide value-based education that builds strong character, fosters national pride, and prepares students to face the challenges of the modern world.</p>
              <p className="principal-signature">- Abhay Narayan Singh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose SSVM?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <h3>Expert Faculty</h3>
              <p>Our dedicated and experienced teachers guide every student with care, combining modern teaching and traditional values to shape confident, disciplined, and responsible individuals.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-microscope"></i>
              </div>
              <h3>Modern Labs</h3>
              <p>State-of-the-art science and computer laboratories for practical learning</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <h3>Sports Excellence</h3>
              <p>At SSVM, we believe sports build team spirit, discipline, and confidence. Our students actively participate in various games, promoting a healthy body and a sharp mind.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-book-reader"></i>
              </div>
              <h3>Rich Library</h3>
              <p>Our well-stocked library offers a wide range of books, journals, and study materials, inspiring students to read, explore, and learn beyond the classroom.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <h3>Ready to Enroll Your Child?</h3>
          <button className="btn btn-primary" onClick={() => scrollToSection('admissions')}>Start Application Today!</button>
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section">
        <div className="container">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="events-grid">
            <div className="event-card">
              <div className="event-date">
                <div className="event-day">15</div>
                <div className="event-month">March</div>
              </div>
              <div className="event-content">
                <h3>Annual Sports Day</h3>
                <p>Join us for our exciting annual sports competition with various track and field events.</p>
                <div className="event-meta">
                  <span><i className="far fa-clock"></i> 9:00 AM</span>
                  <span><i className="fas fa-map-marker-alt"></i> School Ground</span>
                </div>
              </div>
            </div>
            <div className="event-card">
              <div className="event-date">
                <div className="event-day">28</div>
                <div className="event-month">Feb</div>
              </div>
              <div className="event-content">
                <h3>Parent-Teacher Meeting</h3>
                <p>Discuss your child's progress with teachers and get valuable feedback.</p>
                <div className="event-meta">
                  <span><i className="far fa-clock"></i> 2:00 PM</span>
                  <span><i className="fas fa-map-marker-alt"></i> School Auditorium</span>
                </div>
              </div>
            </div>
            <div className="event-card">
              <div className="event-date">
                <div className="event-day">05</div>
                <div className="event-month">April</div>
              </div>
              <div className="event-content">
                <h3>Science Exhibition</h3>
                <p>Students showcase their innovative science projects and experiments.</p>
                <div className="event-meta">
                  <span><i className="far fa-clock"></i> 10:00 AM</span>
                  <span><i className="fas fa-map-marker-alt"></i> Science Block</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about-section" id="about">
        <div className="container">
          <h2 className="section-title">About SSVM High School</h2>
          <div className="about-content">
            <div className="about-text">
              <h3>Building Future Leaders Since 1985</h3>
              <p>SSVM High School has been a beacon of quality education for over three decades. We are committed to providing a nurturing environment where students can discover their potential and excel academically, socially, and personally.</p>
              <p>Our curriculum is designed to blend traditional values with modern teaching methodologies, ensuring holistic development of every student. We focus on character building, critical thinking, and creativity.</p>
              <button className="btn btn-primary">Read More</button>
            </div>
            <div className="about-img">
              <img src="https://images.unsplash.com/photo-1562774053-701939374585?w=800" alt="School Building" />
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">2000+</div>
              <p>Students</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <p>Teachers</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">98%</div>
              <p>Success Rate</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">35+</div>
              <p>Years Legacy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="faculty-section">
        <div className="container">
          <h2 className="section-title">Our Faculty</h2>
          <div className="faculty-grid">
            <div className="faculty-card">
              <div className="faculty-photo">
                <img src="https://th.bing.com/th/id/OIP.ACdzJUjFhGz9_Rf-oqbw_AHaE7?w=276&h=184&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3" alt="Arbind kr singh" />
              </div>
              <div className="faculty-content">
                <h3>Arbind kr singh</h3>
                <div className="faculty-subject">Sst & Hindi</div>
                <p>Ms in History with 25+ years of teaching experience</p>
                <div className="faculty-exp">Experience: 25 years</div>
              </div>
            </div>
            <div className="faculty-card">
              <div className="faculty-photo">
                <img src="https://images.unsplash.com/photo-1554126802-9a5d1a58d60c?w=300" alt="Ms. A. Verma" />
              </div>
              <div className="faculty-content">
                <h3>Ms. A. Verma</h3>
                <div className="faculty-subject">Mathematics</div>
                <p>M.Sc. in Mathematics with specialization in Algebra</p>
                <div className="faculty-exp">Experience: 15 years</div>
              </div>
            </div>
            <div className="faculty-card">
              <div className="faculty-photo">
                <img src="https://images.unsplash.com/photo-1549227092-2374e2df4488?w=300" alt="Mr. S. Kumar" />
              </div>
              <div className="faculty-content">
                <h3>Mr. S. Kumar</h3>
                <div className="faculty-subject">Chemistry</div>
                <p>M.Sc. in Chemistry with research background</p>
                <div className="faculty-exp">Experience: 18 years</div>
              </div>
            </div>
            <div className="faculty-card">
              <div className="faculty-photo">
                <img src="https://images.unsplash.com/photo-1579782527581-22904c0df0d6?w=300" alt="Mrs. P. Singh" />
              </div>
              <div className="faculty-content">
                <h3>Mrs. P. Singh</h3>
                <div className="faculty-subject">English Literature</div>
                <p>MA in English with specialization in British Literature</p>
                <div className="faculty-exp">Experience: 12 years</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academics Section */}
      <section className="section academics-section" id="academics">
        <div className="container">
          <h2 className="section-title">Academic Programs</h2>
          <div className="programs-grid">
            <div className="program-card">
              <div className="program-img">
                <i className="fas fa-child"></i>
              </div>
              <div className="program-content">
                <h3>Primary Education</h3>
                <p>Classes 1-5 with focus on fundamental skills and creative development</p>
                <ul>
                  <li>Interactive Learning</li>
                  <li>Activity-Based Education</li>
                  <li>Skill Development</li>
                  <li>Value Education</li>
                </ul>
              </div>
            </div>
            <div className="program-card">
              <div className="program-img">
                <i className="fas fa-user-graduate"></i>
              </div>
              <div className="program-content">
                <h3>Secondary Education</h3>
                <p>Classes 6-10 preparing students for board examinations</p>
                <ul>
                  <li>CBSE Curriculum</li>
                  <li>Subject Specialization</li>
                  <li>Practical Learning</li>
                  <li>Career Guidance</li>
                </ul>
              </div>
            </div>
            <div className="program-card">
              <div className="program-img">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className="program-content">
                <h3>Senior Secondary</h3>
                <p>Classes 11-12 with Science and Commerce streams</p>
                <ul>
                  <li>Stream Selection</li>
                  <li>Competitive Exam Prep</li>
                  <li>Advanced Labs</li>
                  <li>College Counseling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section gallery-section" id="gallery">
        <div className="container">
          <h2 className="section-title">School Gallery</h2>
          <div className="gallery-filters">
            <button 
              className={`filter-btn ${galleryFilter === 'all' ? 'active' : ''}`} 
              onClick={() => setGalleryFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${galleryFilter === 'classroom' ? 'active' : ''}`} 
              onClick={() => setGalleryFilter('classroom')}
            >
              Classrooms
            </button>
            <button 
              className={`filter-btn ${galleryFilter === 'sports' ? 'active' : ''}`} 
              onClick={() => setGalleryFilter('sports')}
            >
              Sports
            </button>
            <button 
              className={`filter-btn ${galleryFilter === 'events' ? 'active' : ''}`} 
              onClick={() => setGalleryFilter('events')}
            >
              Events
            </button>
            <button 
              className={`filter-btn ${galleryFilter === 'campus' ? 'active' : ''}`} 
              onClick={() => setGalleryFilter('campus')}
            >
              Campus
            </button>
          </div>
          <div className="gallery-grid">
            {filteredGalleryImages.map((image, index) => (
              <div 
                key={index} 
                className="gallery-item" 
                data-category={image.category}
                onClick={() => openLightbox(index)}
              >
                <img src={image.src} alt={image.title} />
                <div className="gallery-overlay">
                  <h4>{image.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox active" onClick={closeLightbox}>
          <div className="lightbox-close" onClick={closeLightbox}>×</div>
          <div className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>&lt;</div>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={filteredGalleryImages[currentImageIndex].src} alt={filteredGalleryImages[currentImageIndex].title} />
          </div>
          <div className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>&gt;</div>
        </div>
      )}

      {/* Admissions Section */}
      <section className="section admission-section" id="admissions">
        <div className="container">
          <h2 className="section-title">Admissions Open</h2>
          <p style={{textAlign: 'center', fontSize: '1.2rem', marginBottom: '20px'}}>Join SSVM High School for Academic Year 2024-25</p>
          
          <div className="admission-form">
            <h3>Apply Now</h3>
            
            <div className="form-steps">
              {[1, 2, 3, 4].map(step => (
                <div 
                  key={step}
                  className={`step ${currentFormStep === step ? 'active' : ''} ${currentFormStep > step ? 'completed' : ''}`}
                  data-step={step}
                >
                  {step}
                  <div className="step-label">
                    {step === 1 && 'Personal Info'}
                    {step === 2 && 'Academic Info'}
                    {step === 3 && 'Contact & Docs'}
                    {step === 4 && 'Review'}
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Info */}
              <div className={`form-step ${currentFormStep === 1 ? 'active' : ''}`} id="step-1">
                <div className="form-group">
                  <label htmlFor="studentName">Student Name *</label>
                  <input 
                    type="text" 
                    id="studentName" 
                    name="studentName" 
                    value={formData.studentName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth *</label>
                  <input 
                    type="date" 
                    id="dob" 
                    name="dob" 
                    value={formData.dob}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender *</label>
                  <select 
                    id="gender" 
                    name="gender" 
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="parentName">Parent/Guardian Name *</label>
                  <input 
                    type="text" 
                    id="parentName" 
                    name="parentName" 
                    value={formData.parentName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="relationship">Relationship *</label>
                  <select 
                    id="relationship" 
                    name="relationship" 
                    value={formData.relationship}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Relationship</option>
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Guardian</option>
                  </select>
                </div>
                <div className="form-navigation">
                  <button type="button" className="btn btn-secondary" disabled>Previous</button>
                  <button type="button" className="btn btn-primary" onClick={nextFormStep}>Next</button>
                </div>
              </div>
              
              {/* Step 2: Academic Info */}
              <div className={`form-step ${currentFormStep === 2 ? 'active' : ''}`} id="step-2">
                <div className="form-group">
                  <label htmlFor="classApplying">Class Applying For *</label>
                  <select 
                    id="classApplying" 
                    name="classApplying" 
                    value={formData.classApplying}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Class</option>
                    <option>Nursery</option>
                    <option>LKG</option>
                    <option>UKG</option>
                    <option>Class 1</option>
                    <option>Class 5</option>
                    <option>Class 8</option>
                    <option>Class 10</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="prevSchool">Previous School (if any)</label>
                  <input 
                    type="text" 
                    id="prevSchool" 
                    name="prevSchool" 
                    value={formData.prevSchool}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastClass">Last Class Attended</label>
                  <input 
                    type="text" 
                    id="lastClass" 
                    name="lastClass" 
                    value={formData.lastClass}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="stream">Stream (For Class 11-12)</label>
                  <select 
                    id="stream" 
                    name="stream" 
                    value={formData.stream}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Stream</option>
                    <option>Science</option>
                    <option>Commerce</option>
                    <option>Arts</option>
                  </select>
                </div>
                <div className="form-navigation">
                  <button type="button" className="btn btn-secondary" onClick={prevFormStep}>Previous</button>
                  <button type="button" className="btn btn-primary" onClick={nextFormStep}>Next</button>
                </div>
              </div>
              
              {/* Step 3: Contact & Documents */}
              <div className={`form-step ${currentFormStep === 3 ? 'active' : ''}`} id="step-3">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <textarea 
                    rows="3" 
                    id="address" 
                    name="address" 
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="birthCert">Upload Birth Certificate *</label>
                  <input type="file" id="birthCert" name="birthCert" accept=".pdf,.jpg,.png" required />
                </div>
                <div className="form-group">
                  <label htmlFor="marksheet">Upload Previous Marksheet</label>
                  <input type="file" id="marksheet" name="marksheet" accept=".pdf,.jpg,.png" />
                </div>
                <div className="form-group">
                  <label htmlFor="photo">Upload Student Photo</label>
                  <input type="file" id="photo" name="photo" accept=".jpg,.png" />
                </div>
                <div className="form-navigation">
                  <button type="button" className="btn btn-secondary" onClick={prevFormStep}>Previous</button>
                  <button type="button" className="btn btn-primary" onClick={nextFormStep}>Next</button>
                </div>
              </div>
              
              {/* Step 4: Review */}
              <div className={`form-step ${currentFormStep === 4 ? 'active' : ''}`} id="step-4">
                <div className="form-group">
                  <h4>Please review your information:</h4>
                  <div id="review-content" style={{background: '#f1f5f9', padding: '20px', borderRadius: '8px'}}>
                    {Object.entries(formData).map(([key, value]) => (
                      value && (
                        <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}</p>
                      )
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Additional Message (Optional)</label>
                  <textarea 
                    rows="4" 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="form-navigation">
                  <button type="button" className="btn btn-secondary" onClick={prevFormStep}>Previous</button>
                  <button type="submit" className="submit-btn">Submit Application</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section" id="contact">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Address</h3>
              <p>123 Education Street<br />Knowledge City, KC 12345</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <h3>Phone</h3>
              <p>+91 1234567890<br />+91 9876543210</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>Email</h3>
              <p>info@ssvmschool.edu<br />admissions@ssvmschool.edu</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Office Hours</h3>
              <p>Monday - Friday: 8:00 AM - 4:00 PM<br />Saturday: 9:00 AM - 1:00 PM</p>
            </div>
          </div>
          
          <div style={{marginTop: '50px', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15383.170877960305!2d77.58988645!3d12.97159875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba557f6b92138b7%3A0x2863e46c7f8a3d53!2sKnowledge%20City!5e0!3m2!1sen!2sin!4v1684344402688!5m2!1sen!2sin" 
              width="100%" 
              height="400" 
              style={{border: 0}} 
              allowFullScreen="" 
              loading="lazy"
              title="SSVM High School Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>SSVM High School</h3>
              <p>Excellence in Education since 1985. We are committed to nurturing young minds for a brighter future through quality education, innovation, and excellence.</p>
              <div className="social-links" style={{marginTop: '20px'}}>
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
            <div className="footer-col">
              <h3>Quick Links</h3>
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a>
              <a href="#academics" onClick={(e) => { e.preventDefault(); scrollToSection('academics'); }}>Academics</a>
              <a href="#admissions" onClick={(e) => { e.preventDefault(); scrollToSection('admissions'); }}>Admissions</a>
              <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>Gallery</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
            </div>
            <div className="footer-col">
              <h3>Programs</h3>
              <a href="#">Primary Education</a>
              <a href="#">Secondary Education</a>
              <a href="#">Senior Secondary</a>
              <a href="#">Sports Programs</a>
              <a href="#">Extracurricular Activities</a>
            </div>
            <div className="footer-col">
              <h3>Newsletter</h3>
              <p>Subscribe to our newsletter for the latest updates and news.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email address" style={{width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: 'none'}} />
                <button className="submit-btn" style={{width: '100%', padding: '10px'}}>Subscribe</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 SSVM High School. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a href="https://wa.me/911234567890" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button className="back-top show" onClick={scrollToTop}>
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
};

export default SSVMHighSchool;