import React, { useEffect, useRef, useState } from 'react';

const AIPortfolioHero = () => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let nodes = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;  
      initNetwork();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 200, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    class Node {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 4 + 3;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.color = ['#00d9ff', '#a855f7', '#10b981'][Math.floor(Math.random() * 3)];
      }

      update(time) {
        this.x += this.vx;
        this.y += this.vy;
        const dx = this.baseX - this.x;
        const dy = this.baseY - this.y;
        this.x += dx * 0.01;
        this.y += dy * 0.01;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw(time) {
        const pulse = Math.sin(time * 0.002 + this.pulsePhase) * 0.5 + 0.5;
        const glowSize = this.size + pulse * 8;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowSize);
        gradient.addColorStop(0, this.color + 'ff');
        gradient.addColorStop(0.5, this.color + '66');
        gradient.addColorStop(1, this.color + '00');
        ctx.beginPath();
        ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initNetwork = () => {
      particles = [];
      nodes = [];
      
      // Reduce particle count on mobile for better performance
      const particleCount = window.innerWidth < 768 ? 40 : 80;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      // Reduce node count on mobile
      const cols = window.innerWidth < 768 ? 4 : 8;
      const rows = window.innerWidth < 768 ? 3 : 6;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (canvas.width / (cols + 1)) * (i + 1) + (Math.random() - 0.5) * 100;
          const y = (canvas.height / (rows + 1)) * (j + 1) + (Math.random() - 0.5) * 100;
          nodes.push(new Node(x, y));
        }
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const opacity = (1 - dist / 200) * 0.3;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      time += 16;
      ctx.fillStyle = 'rgba(10, 10, 25, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      nodes.forEach(n => { n.update(time); n.draw(time); });
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a19]" onMouseMove={handleMouseMove}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center">
        {/* Glassmorphic card - Responsive padding */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl max-w-4xl w-full">
          <div className="space-y-4 sm:space-y-6">
            {/* Responsive heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent animate-pulse tracking-tight leading-tight" style={{fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.05em'}}>
              AYESHA NOMAN
            </h1>
            
            {/* Divider */}
            <div className="h-1 w-24 sm:w-32 mx-auto bg-gradient-to-r from-cyan-500 via-purple-500 to-green-500 rounded-full" />
            
            {/* Responsive tagline */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-medium tracking-wider" style={{fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.15em'}}>
              AI & AUTOMATION ENGINEER
            </p>
            
            {/* Responsive description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light px-2" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              Building intelligent systems that shape the future of technology
            </p>
            
            {/* Responsive buttons - Stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-4 sm:pt-8">
              <button 
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 tracking-wide text-sm sm:text-base min-h-[44px]" 
                style={{fontFamily: 'Rajdhani, sans-serif'}}
              >
                VIEW PROJECTS
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 tracking-wide text-sm sm:text-base min-h-[44px]" 
                style={{fontFamily: 'Rajdhani, sans-serif'}}
              >
                CONTACT ME
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator - Hide on very small screens */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block">
          <div className="flex flex-col items-center gap-2 text-gray-400 animate-bounce">
            <span className="text-xs sm:text-sm tracking-widest" style={{fontFamily: 'Rajdhani, sans-serif'}}>SCROLL TO EXPLORE</span>
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Corner accents - Smaller on mobile */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl" />
    </div>
  );
};

export default AIPortfolioHero;
