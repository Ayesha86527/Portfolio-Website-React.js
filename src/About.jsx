import React, { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
  const canvasRef = useRef(null);
  const [hoveredBar, setHoveredBar] = useState(null);

  // Load fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // Skills data
  const skills = [
    { name: 'Generative AI', level: 90, color: '#00d9ff' },
    { name: 'Python', level: 95, color: '#a855f7' },
    { name: 'Automations', level: 85, color: '#10b981' },
    { name: 'Natural Language Processing (NLP)', level: 80, color: '#00d9ff' },
    { name: 'Agentic AI', level: 75, color: '#a855f7' },
    { name: 'Machine Learning', level: 70, color: '#10b981' }
  ];

  // Canvas background animation (matching hero)
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
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
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
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 3 + 2;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.color = ['#00d9ff', '#a855f7', '#10b981'][Math.floor(Math.random() * 3)];
      }

      update() {
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
        const glowSize = this.size + pulse * 6;
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
      
      // Reduce particle count on mobile
      const particleCount = window.innerWidth < 768 ? 25 : 50;
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());
      
      // Reduce node count on mobile
      const cols = window.innerWidth < 768 ? 3 : 6;
      const rows = window.innerWidth < 768 ? 2 : 4;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (canvas.width / (cols + 1)) * (i + 1) + (Math.random() - 0.5) * 80;
          const y = (canvas.height / (rows + 1)) * (j + 1) + (Math.random() - 0.5) * 80;
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
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.2;
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
      ctx.fillStyle = 'rgba(10, 10, 25, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      nodes.forEach(n => { n.update(); n.draw(time); });
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

  return (
    <div className="relative w-full min-h-screen bg-[#0a0a19] overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      {/* Animated background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-3 sm:mb-4 tracking-tight" style={{fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.05em'}}>
            ABOUT ME
          </h2>
          <div className="h-1 w-24 sm:w-32 mx-auto bg-gradient-to-r from-cyan-500 via-purple-500 to-green-500 rounded-full" />
        </div>

        {/* Main content glassmorphic card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            
            {/* Left side - Bio */}
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-cyan-400 tracking-wide" style={{fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.05em'}}>
                  WHO I AM
                </h3>
                <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
              </div>

              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                I'm an AI engineer transforming ideas into intelligent, cutting-edge solutions. From AI-powered automation 
                to customized workflows, I help businesses and individuals streamline processes, solve complex problems, 
                and unlock new opportunities.
              </p>

              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                Explore my portfolio to see innovative projects, interactive AI demos, and tailor-made automation solutions 
                designed to make technology work smarter for you. Let's collaborate to bring your vision to life with 
                AI-driven efficiency and creativity.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-8">
                <div className="text-center backdrop-blur-xl bg-white/5 border border-cyan-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 mb-1" style={{fontFamily: 'Orbitron, sans-serif'}}>1+</div>
                  <div className="text-xs text-gray-400 tracking-wider" style={{fontFamily: 'Rajdhani, sans-serif'}}>YEAR EXP</div>
                </div>
                <div className="text-center backdrop-blur-xl bg-white/5 border border-purple-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400 mb-1" style={{fontFamily: 'Orbitron, sans-serif'}}>10+</div>
                  <div className="text-xs text-gray-400 tracking-wider" style={{fontFamily: 'Rajdhani, sans-serif'}}>AI SOLUTIONS</div>
                </div>
              </div>
            </div>

            {/* Right side - Skills */}
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-purple-400 tracking-wide" style={{fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.05em'}}>
                  EXPERTISE
                </h3>
                <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-purple-500 to-green-500 rounded-full" />
              </div>

              <div className="space-y-4 sm:space-y-5">
                {skills.map((skill, index) => (
                  <div 
                    key={index}
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                    onTouchStart={() => setHoveredBar(index)}
                    onTouchEnd={() => setHoveredBar(null)}
                    className="group"
                  >
                    <div className="flex justify-between mb-1.5 sm:mb-2">
                      <span className="text-sm sm:text-base text-gray-300 font-medium tracking-wider" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                        {skill.name}
                      </span>
                      <span 
                        className="text-sm sm:text-base font-bold transition-all duration-300"
                        style={{
                          fontFamily: 'Orbitron, sans-serif',
                          color: hoveredBar === index ? skill.color : '#9ca3af'
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2.5 sm:h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out relative"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: skill.color,
                          boxShadow: hoveredBar === index ? `0 0 20px ${skill.color}` : `0 0 10px ${skill.color}66`,
                          transform: hoveredBar === index ? 'scaleY(1.2)' : 'scaleY(1)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Download CV Button */}
              <div className="pt-4 sm:pt-6">
                <a 
                  href="./assets/Ayesha Noman AI Engineer Resume PDF.pdf" 
                  download="Ayesha Noman AI Engineer Resume"
                  className="block w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-green-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 tracking-widest text-center text-sm sm:text-base min-h-[44px]" 
                  style={{fontFamily: 'Rajdhani, sans-serif'}}
                >
                DOWNLOAD CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

