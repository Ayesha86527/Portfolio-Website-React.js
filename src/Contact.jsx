import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = 'service_infm3ox';
  const EMAILJS_TEMPLATE_ID = 'template_civ3dq4';
  const EMAILJS_PUBLIC_KEY = 'n2MNE7FslZHWpYsil';

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    setFormStatus('sending');

    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Ayesha',
        },
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', result.text);
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setFormStatus(null), 3000);
    } catch (error) {
      console.error('Email send failed:', error);
      setFormStatus('error');
      alert('Failed to send message. Please try again or contact me directly at ayeshanoman490@gmail.com');
      
      setTimeout(() => setFormStatus(null), 3000);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      title: "Email",
      value: "ayeshanoman490@gmail.com",
      link: "mailto:ayeshanoman490@gmail.com",
      color: "#00d9ff"
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
        </svg>
      ),
      title: "LinkedIn",
      value: "linkedin.com/in/ayesha-noman",
      link: "https://www.linkedin.com/in/ayesha-noman-268656321/",
      color: "#a855f7"
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
        </svg>
      ),
      title: "GitHub",
      value: "github.com/Ayesha86527",
      link: "https://github.com/Ayesha86527",
      color: "#10b981"
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#0a0a19] overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      {/* Static gradient overlays - No canvas animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-3 sm:mb-4 tracking-tight px-2" 
            style={{fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.05em'}}
          >
            GET IN TOUCH
          </h2>
          <div className="h-1 w-24 sm:w-32 mx-auto bg-gradient-to-r from-cyan-500 via-purple-500 to-green-500 rounded-full" />
          <p className="text-gray-400 mt-4 sm:mt-6 text-base sm:text-lg px-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
            Let's collaborate on your next AI project
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Contact Form */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
            <h3 
              className="text-xl sm:text-2xl font-bold text-cyan-400 mb-5 sm:mb-6 tracking-wide" 
              style={{fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.05em'}}
            >
              SEND MESSAGE
            </h3>

            <div className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-gray-400 text-xs sm:text-sm mb-2 tracking-wider" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                  YOUR NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-gray-300 text-sm sm:text-base focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs sm:text-sm mb-2 tracking-wider" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                  YOUR EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-gray-300 text-sm sm:text-base focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs sm:text-sm mb-2 tracking-wider" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                  SUBJECT
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-gray-300 text-sm sm:text-base focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  placeholder="Enter subject"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs sm:text-sm mb-2 tracking-wider" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-gray-300 text-sm sm:text-base focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                  style={{fontFamily: 'Space Grotesk, sans-serif'}}
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={formStatus === 'sending'}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-green-500 rounded-full text-white text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed tracking-widest"
                style={{fontFamily: 'Rajdhani, sans-serif'}}
              >
                {formStatus === 'sending' && (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    SENDING...
                  </span>
                )}
                {formStatus === 'success' && (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    MESSAGE SENT!
                  </span>
                )}
                {formStatus === 'error' && (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    FAILED - TRY AGAIN
                  </span>
                )}
                {!formStatus && 'SEND MESSAGE'}
              </button>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-4 sm:space-y-6">
            <h3 
              className="text-xl sm:text-2xl font-bold text-purple-400 mb-4 sm:mb-6 tracking-wide" 
              style={{fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.05em'}}
            >
              CONNECT WITH ME
            </h3>

            {contactInfo.map((info, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {info.link ? (
                  <a
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="block backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all duration-300 hover:bg-white/10 active:scale-95"
                    style={{
                      borderColor: hoveredCard === index ? info.color + '66' : 'rgba(255,255,255,0.1)',
                      boxShadow: hoveredCard === index ? `0 0 30px ${info.color}33` : 'none',
                      transform: hoveredCard === index ? 'translateX(8px)' : 'translateX(0)'
                    }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          backgroundColor: info.color + '22',
                          color: info.color,
                          boxShadow: hoveredCard === index ? `0 0 20px ${info.color}66` : 'none'
                        }}
                      >
                        {info.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 
                          className="text-xs sm:text-sm font-semibold tracking-wider mb-0.5 sm:mb-1"
                          style={{
                            fontFamily: 'Rajdhani, sans-serif',
                            color: info.color
                          }}
                        >
                          {info.title}
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm truncate" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                          {info.value}
                        </p>
                      </div>
                      <svg 
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0 transition-all duration-300"
                        style={{
                          color: hoveredCard === index ? info.color : '#6b7280',
                          transform: hoveredCard === index ? 'translateX(4px)' : 'translateX(0)'
                        }}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                ) : (
                  <div
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all duration-300"
                    style={{
                      borderColor: hoveredCard === index ? info.color + '66' : 'rgba(255,255,255,0.1)',
                      boxShadow: hoveredCard === index ? `0 0 30px ${info.color}33` : 'none'
                    }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: info.color + '22',
                          color: info.color
                        }}
                      >
                        {info.icon}
                      </div>
                      <div className="min-w-0">
                        <h4 
                          className="text-xs sm:text-sm font-semibold tracking-wider mb-0.5 sm:mb-1"
                          style={{
                            fontFamily: 'Rajdhani, sans-serif',
                            color: info.color
                          }}
                        >
                          {info.title}
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm truncate" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;


