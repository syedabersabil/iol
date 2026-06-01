<script setup>
import { ref, onMounted, watch, computed } from 'vue'

// Theme management
const theme = ref(localStorage.getItem('theme') || 'dark')

watch(theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
}, { immediate: true })

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// Interactive sandbox controls
const borderRadius = ref(50)
const rotation = ref(45)
const scale = ref(1)
const hue = ref(270)

// Active filter state
const activeFilter = ref('all')

const handleFilterChange = (filter) => {
  activeFilter.value = filter
}

// Projects list
const projects = [
  {
    id: 1,
    name: "Nebula UI Design System",
    description: "A highly accessible, glassmorphic component library styled using custom HSL tokens and subtle CSS keyframe micro-animations.",
    category: "vue",
    emoji: "🌌",
    tech: ["Vue 3", "CSS Variables", "A11y"],
    link: "#"
  },
  {
    id: 2,
    name: "Helix Web Synthesizer",
    description: "An audio synthesizer built on the Web Audio API with visual frequency rendering on an interactive canvas viewport.",
    category: "creative",
    emoji: "🔊",
    tech: ["Web Audio", "Vite", "Canvas"],
    link: "#"
  },
  {
    id: 3,
    name: "Chroma Interactive Mesh",
    description: "Real-time interactive color and vector shape playground letting developers customize fluid responsive containers.",
    category: "creative",
    emoji: "🎨",
    tech: ["Vue 3", "CSS Grid", "Interpolation"],
    link: "#"
  },
  {
    id: 4,
    name: "Flux Cache Engine",
    description: "High-performance caching middleware library optimized for modern Node.js edge deployments and serverless functions.",
    category: "node",
    emoji: "⚡",
    tech: ["Node.js", "Redis", "TypeScript"],
    link: "#"
  }
]

// Computed filtered projects
const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects
  }
  return projects.filter(p => p.category === activeFilter.value)
})

// Skills capabilities
const skills = [
  { name: "Frontend Development", level: 95, desc: "Modern Vue 3 (Composition API, Pinia), HTML5, Semantic SEO structure" },
  { name: "CSS Design Systems", level: 90, desc: "Custom variables, keyframe animations, grid layouts, fluid responsiveness" },
  { name: "Creative Web GL / Canvas", level: 80, desc: "2D context mapping, interactive physics, browser animation loops" },
  { name: "Node.js & Backend Architecture", level: 85, desc: "RESTful API engineering, Serverless functions, routing systems" }
]

// Contact form state
const nameInput = ref('')
const emailInput = ref('')
const messageInput = ref('')
const submitStatus = ref('')

const handleFormSubmit = () => {
  submitStatus.value = 'sending'
  
  // Simulate API transmission
  setTimeout(() => {
    submitStatus.value = 'success'
    nameInput.value = ''
    emailInput.value = ''
    messageInput.value = ''
    
    // Clear status notification
    setTimeout(() => {
      submitStatus.value = ''
    }, 4000)
  }, 1500)
}
</script>

<template>
  <div class="app-container">
    <div class="bg-gradient-mesh"></div>
    
    <!-- Navigation Header -->
    <nav class="navbar">
      <div class="nav-brand">
        <span>IOL</span>
      </div>
      <ul className="nav-links">
        <li><a href="#projects" class="nav-link">Projects</a></li>
        <li><a href="#skills" class="nav-link">Capabilities</a></li>
        <li><a href="#sandbox" class="nav-link">Playground</a></li>
        <li><a href="#contact" class="nav-link">Contact</a></li>
      </ul>
      <div class="nav-actions">
        <button 
          @click="toggleTheme" 
          class="theme-btn" 
          aria-label="Toggle layout theme"
          title="Toggle Layout Theme"
        >
          <template v-if="theme === 'light'">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"></path>
            </svg>
          </template>
          <template v-else>
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m0 13.5V21M4.978 4.978l1.591 1.591m10.862 10.862l1.591 1.591M3 12h2.25m13.5 0H21M4.978 19.022l1.591-1.591m10.862-10.862l1.591-1.591M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z"></path>
            </svg>
          </template>
        </button>
        <a href="#contact" class="cta-btn" style="text-decoration: none;">Get in Touch</a>
      </div>
    </nav>

    <!-- Main Container -->
    <main class="main-content">
      
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="hero-badge-pulse"></span>
            <span>Available for Creative Engineering projects</span>
          </div>
          <h1 class="hero-title">
            Crafting premium digital experiences through <span>code & design</span>
          </h1>
          <p class="hero-description">
            Welcome to IOL. We create clean, fast, high-performance web applications using robust structures, curated typography, and fluid micro-interactions.
          </p>
          <div class="hero-actions">
            <a href="#projects" class="cta-btn" style="text-decoration: none;">View Showcase</a>
            <a href="#sandbox" class="btn-secondary" style="text-decoration: none;">Enter Playground</a>
          </div>
        </div>
        
        <!-- Interactive Sandbox Card -->
        <div class="hero-visualizer" id="sandbox">
          <div class="visualizer-card">
            <div class="visualizer-header">
              <div class="dot-indicators">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
              </div>
              <span class="visualizer-title">chroma-mesh.config</span>
            </div>
            
            <div class="visualizer-preview">
              <div 
                class="interactive-mesh"
                :style="{
                  borderRadius: `${borderRadius}%`,
                  transform: `rotate(${rotation}deg) scale(${scale})`,
                  background: `linear-gradient(135deg, hsl(${hue}, 85%, 65%), hsl(${(hue + 60) % 360}, 85%, 55%))`,
                  boxShadow: `0 10px 30px hsla(${hue}, 85%, 65%, 0.3)`
                }"
              ></div>
            </div>

            <div class="control-panel">
              <div class="control-row">
                <div class="control-label">
                  <span>Morph Radius</span>
                  <span>{{ borderRadius }}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="50" 
                  v-model="borderRadius" 
                  class="slider"
                />
              </div>

              <div class="control-row">
                <div class="control-label">
                  <span>Rotation Angle</span>
                  <span>{{ rotation }}°</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  v-model="rotation" 
                  class="slider"
                />
              </div>

              <div class="control-row">
                <div class="control-label">
                  <span>Color Spectrum Hue</span>
                  <span>{{ hue }}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  v-model="hue" 
                  class="slider"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Grid Section -->
      <section class="section" id="projects">
        <div class="section-header">
          <span class="section-tag">Case Studies</span>
          <h2 class="section-title">Selected Projects</h2>
          <p class="section-description">A collection of custom applications designed with a focus on polished interface transitions and scalable foundations.</p>
        </div>

        <div class="filters">
          <button :class="['filter-btn', { active: activeFilter === 'all' }]" @click="handleFilterChange('all')">All</button>
          <button :class="['filter-btn', { active: activeFilter === 'vue' }]" @click="handleFilterChange('vue')">Vue Components</button>
          <button :class="['filter-btn', { active: activeFilter === 'creative' }]" @click="handleFilterChange('creative')">Creative Tech</button>
          <button :class="['filter-btn', { active: activeFilter === 'node' }]" @click="handleFilterChange('node')">Node Engines</button>
        </div>

        <div class="projects-grid">
          <article class="project-card" v-for="project in filteredProjects" :key="project.id">
            <div class="project-banner">
              <span>{{ project.emoji }}</span>
              <span class="project-tag">{{ project.category }}</span>
            </div>
            <div class="project-details">
              <h3 class="project-name">{{ project.name }}</h3>
              <p class="project-desc">{{ project.description }}</p>
              <div class="project-tech">
                <span class="tech-tag" v-for="(t, idx) in project.tech" :key="idx">{{ t }}</span>
              </div>
              <div class="project-footer">
                <a :href="project.link" class="project-link">
                  Launch app
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Technical Capabilities Section -->
      <section class="section" id="skills">
        <div class="section-header">
          <span class="section-tag">Stack & Skills</span>
          <h2 class="section-title">Core Competencies</h2>
          <p class="section-description">Our specialized engineering toolkit designed for building performant modern web solutions.</p>
        </div>

        <div class="skills-grid">
          <div class="skill-card" v-for="(skill, index) in skills" :key="index">
            <h3 class="skill-name">{{ skill.name }}</h3>
            <p class="skill-desc">{{ skill.desc }}</p>
            <div class="skill-bar-container">
              <div class="skill-bar-fill" :style="{ width: `${skill.level}%` }"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="section contact-section" id="contact">
        <div class="section-header">
          <span class="section-tag">Collaboration</span>
          <h2 class="section-title">Let's build something</h2>
          <p class="section-description">Get in touch to discuss creative engineering ideas, contract development, or visual system design.</p>
        </div>

        <div class="contact-card">
          <form @submit.prevent="handleFormSubmit" class="contact-form">
            <div class="form-group">
              <label class="form-label" for="user-name">Your Name</label>
              <input 
                type="text" 
                id="user-name" 
                class="form-input" 
                placeholder="Enter name"
                v-model="nameInput"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label" for="user-email">Email Address</label>
              <input 
                type="email" 
                id="user-email" 
                class="form-input" 
                placeholder="Enter email address"
                v-model="emailInput"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label" for="user-message">Project Brief / Message</label>
              <textarea 
                id="user-message" 
                class="form-input form-textarea" 
                placeholder="Tell us about your project timeline and requirements..."
                v-model="messageInput"
                required
              ></textarea>
            </div>
            <button type="submit" class="submit-btn" :disabled="submitStatus === 'sending'">
              {{ submitStatus === 'sending' ? 'Dispatching Message...' : 'Submit Inquiry' }}
            </button>
            <div v-if="submitStatus === 'success'" class="form-status" role="status">
              Thank you! Your message has been sent successfully. We'll be in touch soon.
            </div>
          </form>
        </div>
      </section>

    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-socials">
          <a href="https://github.com" class="social-link" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com" class="social-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://twitter.com" class="social-link" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
        <p class="footer-text">
          &copy; {{ new Date().getFullYear() }} IOL Creative Development Lab. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
