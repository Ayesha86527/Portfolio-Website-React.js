import Hero from './Hero.jsx'
import About from './About.jsx'
import Experience from './Exp.jsx'
import Projects from './Projects.jsx'
import Contact from './Contact.jsx'

export default function App() {
  return (
    <div style={{ scrollBehavior: 'smooth' }}>
      <div id="Home">
        <Hero />
      </div>
      <div id="About">
        <About />
      </div>
      <div id="Experience">
        <Experience />
      </div>
      <div id="Projects">
        <Projects />
      </div>
      <div id="Contact">
        <Contact />
      </div>
    </div>
  )
}