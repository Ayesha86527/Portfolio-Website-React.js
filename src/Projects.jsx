import React, { useEffect, useState } from 'react';

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  // Load fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const projects = [
    {
      id: 1,
      name: "PharmaGene",
      tagline: "Prescribe With Care",
      description: "An AI-powered medical agent that helps clinicians reduce medication errors by analyzing patient records, prescriptions, and genetic markers. Combines vector-based retrieval with trusted medical sources (FDA, WHO, PubMed) for real-time, explainable prescribing insights.",
      image: "./assets/PharmaGene.png",
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
      image: "./assets/PestiAI.png",
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
      image: "./assets/propexity.png",
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
    <div className="relative w-full min-h-screen bg-[#0a0a19] overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      {/* Static gradient overlays - No canvas animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-green-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-3 sm:mb-4 tracking-tight" style={{fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.05em'}}>
            PROJECTS
          </h2>
          <div className="h-1 w-24 sm:w-32 mx-auto bg-gradient-to-r from-cyan-500 via-purple-500 to-green-500 rounded-full" />
          <p className="text-gray-400 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg px-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
            Building intelligent solutions that make a difference
          </p>
        </div>

        {/* Projects Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              onTouchStart={() => setHoveredProject(index)}
              onTouchEnd={() => setHoveredProject(null)}
            >
              {/* Project Card */}
              <div 
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/10 h-full flex flex-col"
                style={{
                  borderColor: hoveredProject === index ? project.color + '66' : 'rgba(255,255,255,0.1)',
                  boxShadow: hoveredProject === index ? `0 0 40px ${project.color}33` : 'none',
                  transform: hoveredProject === index ? 'translateY(-8px)' : 'translateY(0)'
                }}
              >
                {/* Project Image */}
                <div className="relative h-40 sm:h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
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
                      <div className="text-4xl sm:text-6xl mb-2">🖼️</div>
                      <p className="text-gray-500 text-xs sm:text-sm px-2" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                        Image not found
                      </p>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  {project.status && (
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 text-xs rounded-full backdrop-blur-xl border tracking-wider"
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
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 px-2 sm:px-3 py-1 text-xs rounded-full backdrop-blur-xl bg-black/50 border border-white/20 text-white tracking-wider"
                    style={{fontFamily: 'Rajdhani, sans-serif'}}
                  >
                    {project.category.toUpperCase()}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                  {/* Title & Tagline */}
                  <div className="mb-3 sm:mb-4">
                    <h3 
                      className="text-xl sm:text-2xl font-bold mb-1 tracking-wide"
                      style={{
                        fontFamily: 'Orbitron, sans-serif',
                        color: project.color
                      }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm tracking-wider" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                      {project.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 flex-1" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="mb-3 sm:mb-4 space-y-1.5 sm:space-y-2">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 sm:gap-2">
                        <div 
                          className="mt-1 sm:mt-1.5 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: project.color }}
                        />
                        <span className="text-gray-400 text-xs leading-relaxed" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 sm:py-1 text-xs rounded-md bg-gray-800/50 text-gray-300 border border-gray-700/50"
                        style={{fontFamily: 'Rajdhani, sans-serif'}}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span 
                        className="px-2 py-0.5 sm:py-1 text-xs rounded-md bg-gray-800/50 text-gray-400 border border-gray-700/50"
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
