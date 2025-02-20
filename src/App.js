import React, { useEffect, useState } from 'react';
import './components/styles.css';
import appScreenshot from './assets/app-screenshot2.png'; // You'll need to add this image
import Logo from './components/Logo';
import prashant from './assets/prashanthead.jpeg';
import harender from './assets/harender.jpeg';
import ReactGA from 'react-ga4';
import logoImage from './assets/logo.png'; // Assuming you have a logo image

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeFaq, setActiveFaq] = React.useState(null);
  const [cookieConsent, setCookieConsent] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  const acceptCookies = () => {
    setCookieConsent(true);
    localStorage.setItem('cookieConsent', 'true');
  };

  useEffect(() => {
    const consentGiven = localStorage.getItem('cookieConsent');
    if (consentGiven) {
      setCookieConsent(true);
    }
  }, []);

  const submitForm = async (data) => {
    // You can replace this with your actual API endpoint
    const API_URL = process.env.REACT_APP_API_URL + '/contact';
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    return response.json();
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await submitForm(formData);
      // Update analytics event
      ReactGA.event({
        category: "Contact",
        action: "Submit",
        label: "Contact Form",
      });
      
      setFormData({ name: '', email: '', message: '' });
      alert('Message sent successfully!');
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ErrorMessage = ({ message }) => (
    <div className="error-message">
      <i className="fas fa-exclamation-circle"></i>
      {message}
    </div>
  );

  useEffect(() => {
    if (process.env.REACT_APP_GA_ID) {
      ReactGA.initialize(process.env.REACT_APP_GA_ID);
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }
  }, []);

  return (
    <div className="App">
      {/* Navigation Header */}
      <header className="nav-header">
        <div className="container nav-container">
          {/* <Logo /> */}
    
          {/* <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button> */}
          <a href="#" className="nav-link">Recall Ai - Ai for your memory</a>
          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            <i className="fas fa-bars"></i>
          </button>
          <nav className="nav-links">
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#team" className="nav-link">Team</a>
            <a href="#contact" className="nav-link">Contact</a>
            <button className="cta-button">Download App</button>
          </nav>
        </div>
        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#team" className="nav-link">Team</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button className="cta-button">Download App</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <div className="hero-logo">
              <img src={logoImage} alt="RecallAI Logo" className="hero-logo-image" />
            </div>
            <h1>Transform Your Conversations with RecallAI</h1>
            <p>The smart recording solution that helps you capture, transcribe, and analyze conversations in real-time.</p>
            <button className="cta-button">Get Started</button>
          </div>
          <div className="hero-image floating">
            <img src={appScreenshot} alt="RecallAI App Interface" className="app-preview" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section how-it-works">
        <div className="container">
          <h2>How RecallAI Works</h2>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Record</h3>
              <p>Start recording your conversation with a single tap using our smart device or mobile app</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Transcribe</h3>
              <p>Our AI automatically converts speech to text in real-time with high accuracy</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Analyze</h3>
              <p>Get instant insights, key points, and action items from your conversations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section features">
        <div className="container">
          <h2>Why Choose RecallAI?</h2>
          <div className="feature-grid">
            <div className="feature-card fade-in">
              <i className="fas fa-microphone feature-icon"></i>
              <h3>Real-time Transcription</h3>
              <p>Convert speech to text instantly with our advanced AI technology</p>
            </div>
            <div className="feature-card fade-in">
              <i className="fas fa-brain feature-icon"></i>
              <h3>Smart Analysis</h3>
              <p>Get actionable insights and key takeaways from your conversations</p>
            </div>
            <div className="feature-card fade-in">
              <i className="fas fa-shield-alt feature-icon"></i>
              <h3>Secure Storage</h3>
              <p>Your recordings are encrypted and stored safely in the cloud</p>
            </div>
            <div className="feature-card fade-in">
              <i className="fas fa-share-alt feature-icon"></i>
              <h3>Easy Sharing</h3>
              <p>Share transcripts and insights with team members in one click</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section pricing">
        <div className="container">
          <h2>Choose Your Plan</h2>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Basic</h3>
              <div className="price">$9<span>/month</span></div>
              <ul className="feature-list">
                <li><i className="fas fa-check"></i> 10 hours recording/month</li>
                <li><i className="fas fa-check"></i> Basic transcription</li>
                <li><i className="fas fa-check"></i> 7-day storage</li>
              </ul>
              <button className="cta-button">Get Started</button>
            </div>
            <div className="pricing-card popular">
              <div className="popular-badge">Most Popular</div>
              <h3>Pro</h3>
              <div className="price">$19<span>/month</span></div>
              <ul className="feature-list">
                <li><i className="fas fa-check"></i> Unlimited recording</li>
                <li><i className="fas fa-check"></i> Advanced AI analysis</li>
                <li><i className="fas fa-check"></i> 30-day storage</li>
                <li><i className="fas fa-check"></i> Priority support</li>
              </ul>
              <button className="cta-button">Get Started</button>
            </div>
            <div className="pricing-card">
              <h3>Enterprise</h3>
              <div className="price">$49<span>/month</span></div>
              <ul className="feature-list">
                <li><i className="fas fa-check"></i> Custom solutions</li>
                <li><i className="fas fa-check"></i> Advanced security</li>
                <li><i className="fas fa-check"></i> Unlimited storage</li>
                <li><i className="fas fa-check"></i> 24/7 support</li>
              </ul>
              <button className="cta-button">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials">
        <div className="container">
          <h2>What Our Users Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card fade-in">
              <i className="fas fa-quote-left quote-icon"></i>
              <div className="testimonial-header">
                <img src="testimonial1.jpg" alt="User" className="testimonial-image" />
                <div className="testimonial-info">
                  <h4>Sarah Johnson</h4>
                  <p>Marketing Director</p>
                </div>
              </div>
              <p className="testimonial-text">
                "RecallAI has transformed how we handle client meetings. The transcription accuracy is impressive, and the insights help us make better decisions."
              </p>
            </div>
            <div className="testimonial-card fade-in">
              <i className="fas fa-quote-left quote-icon"></i>
              <div className="testimonial-header">
                <img src="testimonial2.jpg" alt="User" className="testimonial-image" />
                <div className="testimonial-info">
                  <h4>Michael Chen</h4>
                  <p>Startup Founder</p>
                </div>
              </div>
              <p className="testimonial-text">
                "The ability to quickly search through past conversations has been a game-changer for our team. Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="section download">
        <div className="container">
          <h2>Get RecallAI Today</h2>
          <p>Download our app and start transforming your conversations</p>
          <div className="store-buttons">
            <a href="#" className="store-button">
              <i className="fab fa-apple store-icon"></i>
              <div className="store-text">
                <small>Download on the</small>
                <span>App Store</span>
              </div>
            </a>
            <a href="#" className="store-button">
              <i className="fab fa-google-play store-icon"></i>
              <div className="store-text">
                <small>Get it on</small>
                <span>Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section newsletter">
        <div className="container newsletter-container">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest features and updates</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              className="newsletter-input" 
              placeholder="Enter your email" 
              required 
            />
            <button type="submit" className="cta-button">Subscribe</button>
          </form>
        </div>
      </section>

      {/* About Section - Enhanced */}
      <section id="about" className="section about">
        <div className="container">
          <h2>About RecallAI</h2>
          <p>RecallAI was born from a simple idea: making conversation insights accessible to everyone. Our smart recording device and mobile app work together seamlessly to help you capture and understand the important moments in your life.</p>
          
          <div className="stats-grid">
            <div className="stat-item fade-in">
              <div className="stat-number">1M+</div>
              <p>Active Users</p>
            </div>
            <div className="stat-item fade-in">
              <div className="stat-number">10M+</div>
              <p>Hours Recorded</p>
            </div>
            <div className="stat-item fade-in">
              <div className="stat-number">99%</div>
              <p>Accuracy Rate</p>
            </div>
            <div className="stat-item fade-in">
              <div className="stat-number">50+</div>
              <p>Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section team">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {/* Add team member components here */}
            <div className="team-member">
              <img src={prashant} alt="Team member" height={300} />
              <h3>Prashant Jadon</h3>
              <p>Founder</p>
            </div>

            <div className="team-member">
              <img src={harender} alt="Team member" height={300} />
              <h3>Harender Chaudhary</h3>
              <p>Web Developer</p>
            </div>
            {/* Add more team members */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact">
        <div className="container">
          <h2>Get in Touch</h2>
          <div className="contact-form">
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Your Message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button
                type="submit"
                className={`cta-button ${isSubmitting ? 'button-loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? '' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            {[
              {
                question: "How accurate is the transcription?",
                answer: "Our AI-powered transcription maintains 99% accuracy for clear audio in most languages and accents."
              },
              {
                question: "Can I use RecallAI offline?",
                answer: "While recording works offline, transcription and analysis require an internet connection for optimal accuracy."
              },
              {
                question: "How secure is my data?",
                answer: "We use enterprise-grade encryption for all recordings and transcripts. Your data is stored in secure cloud servers with regular backups."
              },
              {
                question: "What languages are supported?",
                answer: "RecallAI currently supports 30+ languages including English, Spanish, French, German, Chinese, and Japanese."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  {faq.question}
                  <i className={`fas fa-chevron-down faq-icon`}></i>
                </div>
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add a Use Cases Section */}
      <section className="section use-cases">
        <div className="container">
          <h2>Perfect For</h2>
          <div className="use-cases-grid">
            <div className="use-case-card fade-in">
              <i className="fas fa-briefcase use-case-icon"></i>
              <h3>Business Meetings</h3>
              <p>Never miss important details from your client meetings and team discussions</p>
            </div>
            <div className="use-case-card fade-in">
              <i className="fas fa-graduation-cap use-case-icon"></i>
              <h3>Education</h3>
              <p>Record and transcribe lectures, seminars, and study sessions</p>
            </div>
            <div className="use-case-card fade-in">
              <i className="fas fa-microphone-alt use-case-icon"></i>
              <h3>Interviews</h3>
              <p>Perfect for journalists, researchers, and HR professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Add an Integration Partners Section */}
      <section className="section integrations">
        <div className="container">
          <h2>Works With Your Favorite Tools</h2>
          <div className="integration-logos fade-in">
            <img src="/logos/slack.png" alt="Slack" />
            <img src="/logos/zoom.png" alt="Zoom" />
            <img src="/logos/teams.png" alt="Microsoft Teams" />
            <img src="/logos/google.png" alt="Google Workspace" />
            <img src="/logos/dropbox.png" alt="Dropbox" />
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>RecallAI</h3>
              <p>Transform your conversations into actionable insights with our smart recording solution.</p>
              <div className="footer-social">
                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className="footer-section">
              <h3>Product</h3>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Company</h3>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#team">Team</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Legal</h3>
              <ul className="footer-links">
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#compliance">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 RecallAI. All rights reserved.</p>
            <p>Made with ❤️ for better conversations</p>
          </div>
        </div>
      </footer>

      {/* Add Cookie Consent Banner */}
      {!cookieConsent && (
        <div className="cookie-banner">
          <div className="container">
            <div className="cookie-content">
              <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
              <div className="cookie-buttons">
                <button className="cta-button" onClick={acceptCookies}>Accept</button>
                <a href="#privacy" className="cookie-link">Learn more</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
