import React, { useEffect, useRef, useState } from 'react';

const ExperienceSection = () => {
  const canvasRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Load fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

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
      canvas.height = canvas.offsetHeight;
      initNetwork();
    };

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
      for (let i = 0; i < 50; i++) particles.push(new Particle());
      const cols = 6;
      const rows = 4;
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

  const experiences = [
    {
      title: "AI/ML Developer",
      company: "Revotic AI",
      type: "Internship",
      duration: "Aug 2025 - Oct 2025 · 3 mos",
      location: "Islāmābād, Pakistan · Remote",
      color: "#00d9ff",
      achievements: [
        "Integrated a live AI chatbot widget into the company website using FastAPI, delivering real-time query resolution for RevoticAI products/services with seamless user experience and reduced support overhead.",
        "Fine-tuned LLM models to generate structured outputs following specific formatting standards for academic references and research papers, ensuring >95% compliance with citation styles.",
        "Developed production-ready RAG pipelines for document ingestion and retrieval, processing multiple document formats (PDF, DOCX, etc.) to enable context-aware Q&A and knowledge extraction; served via FastAPI for scalable, low-latency inference."
      ]
    },
    {
      title: "AI Engineer",
      company: "Wenawa",
      type: "Internship",
      duration: "Jun 2025 - Aug 2025 · 3 mos",
      location: "Karāchi, Sindh, Pakistan · Hybrid",
      color: "#a855f7",
      achievements: [
        "Developed a RAG-powered AI voice assistant using ASR and TTS for real-time speech-to-speech medical conversations; enabled symptom checking, emergency routing, and pre-diagnosis with >90% accuracy in test scenarios.",
        "Researched and benchmarked open-source ASR/TTS models (e.g., Whisper, Coqui, ElevenLabs), optimizing latency by 35% and improving response time for real-time inference use cases.",
        "Built 10+ automation workflows using n8n across HR, lead gen, financial reporting, and content ops; integrated google services and databases (Quadrant, Postgres) to streamline multi-domain processes."
      ]
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#0a0a19] overflow-hidden py-20 px-6">
      {/* Animated background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-4 tracking-tight" style={{fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.05em'}}>
            EXPERIENCE
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-500 via-purple-500 to-green-500 rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-green-500 opacity-30" />

          {/* Experience cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative ${index % 2 === 0 ? 'md:ml-0 md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'} md:w-1/2 w-full`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Timeline dot */}
                <div 
                  className="absolute left-0 md:left-auto md:right-0 top-8 transform md:translate-x-1/2 w-6 h-6 rounded-full border-4 border-[#0a0a19] z-20 transition-all duration-300"
                  style={{
                    backgroundColor: exp.color,
                    boxShadow: hoveredCard === index ? `0 0 20px ${exp.color}` : `0 0 10px ${exp.color}66`,
                    left: index % 2 === 0 ? 'auto' : '0',
                    right: index % 2 === 0 ? '-3px' : 'auto',
                    transform: index % 2 === 0 ? 'translateX(50%)' : 'translateX(-50%)'
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ backgroundColor: exp.color, opacity: 0.4 }}
                  />
                </div>

                {/* Experience card */}
                <div 
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 ml-12 md:ml-0 transition-all duration-300 hover:bg-white/10"
                  style={{
                    borderColor: hoveredCard === index ? exp.color + '66' : 'rgba(255,255,255,0.1)',
                    boxShadow: hoveredCard === index ? `0 0 30px ${exp.color}33` : 'none'
                  }}
                >
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 
                        className="text-2xl md:text-3xl font-bold tracking-wide"
                        style={{
                          fontFamily: 'Orbitron, sans-serif',
                          color: exp.color,
                          letterSpacing: '0.05em'
                        }}
                      >
                        {exp.title}
                      </h3>
                      <span 
                        className="px-3 py-1 text-xs rounded-full backdrop-blur-xl border tracking-wider"
                        style={{
                          fontFamily: 'Rajdhani, sans-serif',
                          backgroundColor: exp.color + '22',
                          borderColor: exp.color + '66',
                          color: exp.color
                        }}
                      >
                        {exp.type.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex flex-col gap-2 text-gray-400" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                        <span className="font-semibold text-gray-300">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-4">
                    {exp.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start gap-3 group">
                        <div 
                          className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300"
                          style={{
                            backgroundColor: exp.color,
                            boxShadow: `0 0 8px ${exp.color}`
                          }}
                        />
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default ExperienceSection;
