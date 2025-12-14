import React, { useEffect, useRef, useState } from 'react';

const ProjectsSection = () => {
  const canvasRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  // Load fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // Canvas background animation
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

  const projects = [
    {
      id: 1,
      name: "PharmaGene",
      tagline: "Prescribe With Care",
      description: "An AI-powered medical agent that helps clinicians reduce medication errors by analyzing patient records, prescriptions, and genetic markers. Combines vector-based retrieval with trusted medical sources (FDA, WHO, PubMed) for real-time, explainable prescribing insights.",
      image: "./assets/PharmaGene.png", // Replace with your actual image path
      category: "Healthcare AI",
      tags: ["Python", "LangChain", "LangGraph", "FAISS", "Streamlit", "GPT-OSS-120B"],
      features: [
        "Patient Record Analysis & Processing",
        "Pharmacogenomic Checks for Drug Interactions",
        "Trusted Knowledge Retrieval from FDA, WHO, PubMed",
        "Real-Time AI Reasoning & Interactive Interface"
      ],
      color: "#00d9ff"
    },
    {
      id: 2,
      name: "PestiAI",
      tagline: "Smart Farming for Pakistan",
      description: "Empowering Pakistani farmers with accessible knowledge about pesticides and fertilizers through speech-to-speech guidance in regional languages. Helps ensure safe chemical usage, reducing over-application and environmental pollution while improving crop yields.",
      image: "./assets/PestiAI.png", // Replace with your actual image path
      category: "Agricultural AI",
      tags: ["React", "LangChain", "LangGraph", "PaddleOCR", "Whisper", "FastAPI", "gTTS"],
      features: [
        "Multilingual Speech-to-Speech Guidance",
        "OCR for Chemical Label Recognition",
        "Safe Dosage & Timing Recommendations",
        "Crop Compatibility Analysis"
      ],
      color: "#10b981",
      status: "In Development"
    },
    {
      id: 3,
      name: "Propexity",
      tagline: "AI Real Estate Agent",
      description: "Reimagining property search in Pakistan by aggregating listings from Zameen, OLX, Lamudi and more. Presents property details with AI-powered insights and direct source links. Think Perplexity, but for real estate—making property discovery smarter and faster.",
      image: "./assets/propexity.png", // Replace with your actual image path
      category: "Real Estate AI",
      tags: ["LangChain", "LangGraph", "Groq AI", "DeepSeek"],
      features: [
        "Multi-Platform Listing Aggregation",
        "AI-Powered Property Insights",
        "Direct Source Links & Comparisons",
        "Smart Search & Filtering"
      ],
      color: "#a855f7",
      status: "In Development"
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#0a0a19] overflow-hidden py-20 px-6">
      {/* Animated background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-4 tracking-tight" style={{fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.05em'}}>
            PROJECTS
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-500 via-purple-500 to-green-500 rounded-full" />
          <p className="text-gray-400 mt-6 text-lg" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
            Building intelligent solutions that make a difference
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Card */}
              <div 
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/10 h-full flex flex-col"
                style={{
                  borderColor: hoveredProject === index ? project.color + '66' : 'rgba(255,255,255,0.1)',
                  boxShadow: hoveredProject === index ? `0 0 40px ${project.color}33` : 'none',
                  transform: hoveredProject === index ? 'translateY(-8px)' : 'translateY(0)'
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div 
                    className="absolute inset-0 hidden items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}22, transparent)`
                    }}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-2">🖼️</div>
                      <p className="text-gray-500 text-sm" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                        Image not found:<br/>{project.image}
                      </p>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  {project.status && (
                    <div className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full backdrop-blur-xl border tracking-wider"
                      style={{
                        fontFamily: 'Rajdhani, sans-serif',
                        backgroundColor: project.color + '33',
                        borderColor: project.color + '66',
                        color: project.color
                      }}
                    >
                      {project.status.toUpperCase()}
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 text-xs rounded-full backdrop-blur-xl bg-black/50 border border-white/20 text-white tracking-wider"
                    style={{fontFamily: 'Rajdhani, sans-serif'}}
                  >
                    {project.category.toUpperCase()}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Title & Tagline */}
                  <div className="mb-4">
                    <h3 
                      className="text-2xl font-bold mb-1 tracking-wide"
                      style={{
                        fontFamily: 'Orbitron, sans-serif',
                        color: project.color
                      }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-gray-400 text-sm tracking-wider" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                      {project.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4 space-y-2">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div 
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: project.color }}
                        />
                        <span className="text-gray-400 text-xs leading-relaxed" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 text-xs rounded-md bg-gray-800/50 text-gray-300 border border-gray-700/50"
                        style={{fontFamily: 'Rajdhani, sans-serif'}}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span 
                        className="px-2 py-1 text-xs rounded-md bg-gray-800/50 text-gray-400 border border-gray-700/50"
                        style={{fontFamily: 'Rajdhani, sans-serif'}}
                      >
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default ProjectsSection;
