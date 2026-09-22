/**
 * Subhash Chandra - AI/ML Developer Portfolio
 * Interactive Canvas, Terminal Emulator & Event Handlers
 */

// ==========================================
// 1. NEURAL NETWORK CANVAS ANIMATION
// ==========================================
const canvas = document.getElementById('neural-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let width = 0;
let height = 0;
let particles = [];
let mouse = { x: null, y: null, radius: 120 };

function resizeCanvas() {
  if (!canvas) return;
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initParticles();
}

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.radius = Math.random() * 2 + 1.2;
    this.baseAlpha = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx = -this.vx;
    if (this.y < 0 || this.y > height) this.vy = -this.vy;

    // Mouse interaction
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.x -= (dx / dist) * force * 2;
        this.y -= (dy / dist) * force * 2;
      }
    }
  }

  draw() {
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(6, 182, 212, ${this.baseAlpha})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.min(Math.floor((width * height) / 14000), 85);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  if (!ctx) return;
  const maxDistance = 120;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDistance) {
        const alpha = (1 - dist / maxDistance) * 0.25;
        ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateCanvas() {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  connectParticles();
  requestAnimationFrame(animateCanvas);
}

if (canvas) {
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
  resizeCanvas();
  animateCanvas();
}

// ==========================================
// 2. CLIPBOARD & TOAST NOTIFICATION
// ==========================================
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 2800);
}

function copyEmail() {
  const email = 'bishnoisub0@gmail.com';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => {
      showToast('Copied: ' + email);
    }).catch(() => {
      fallbackCopy(email);
    });
  } else {
    fallbackCopy(email);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showToast('Copied: ' + text);
  } catch (err) {
    showToast('Email: ' + text);
  }
  document.body.removeChild(textarea);
}

// ==========================================
// 3. MOBILE MENU TOGGLE
// ==========================================
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// ==========================================
// 4. PROJECT FILTER SYSTEM
// ==========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => {
      b.classList.remove('active');
      b.classList.add('text-slate-400');
    });
    btn.classList.add('active');
    btn.classList.remove('text-slate-400');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 200);
      }
    });
  });
});

// ==========================================
// 5. INTERACTIVE TERMINAL EMULATOR
// ==========================================
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

const COMMANDS = {
  help: `Available commands:
  - <span class="text-cyan-400">skills</span>         : List technical competencies & toolsets
  - <span class="text-cyan-400">projects</span>       : View highlight ML & AI systems
  - <span class="text-cyan-400">experience</span>     : View Outlier.ai ML freelancer background
  - <span class="text-cyan-400">education</span>      : Academic degree & university information
  - <span class="text-cyan-400">certifications</span> : Verified AWS, edX, and IIT-M credentials
  - <span class="text-cyan-400">contact</span>        : Display email, phone, and links
  - <span class="text-cyan-400">resume</span>         : Open resume PDF
  - <span class="text-cyan-400">whoami</span>         : Current session context
  - <span class="text-cyan-400">clear</span>          : Clean the terminal window`,

  skills: `Technical Skills Matrix:
  • <span class="text-cyan-300">Languages:</span> Python (Advanced), SQL, Java, JavaScript, C
  • <span class="text-cyan-300">ML/AI:</span> Deep Q-Learning (DQN), CNNs, RNNs, RAG, Transformers, YOLO
  • <span class="text-cyan-300">Frameworks:</span> PyTorch, TensorFlow, LangChain, FastAPI, OpenCV, Scikit-learn
  • <span class="text-cyan-300">MLOps & Tools:</span> Docker, MLflow, Git/GitHub, Linux, MySQL, Render Cloud`,

  projects: `Featured Engineered Systems:
  1. <span class="text-white font-bold">YouTube Comment Analyzer</span> [RAG, FastAPI, Docker, MLflow]
     -> Semantic retrieval & sentiment insights from video comments.
  2. <span class="text-white font-bold">Autonomous Snake Game</span> [Deep Q-Learning, TensorFlow, Pygame]
     -> DQN agent achieving 10x higher score (35.67 avg) vs tabular Q-learning.
  3. <span class="text-white font-bold">Gym Injury Risk Predictor</span> [FastAPI, Render, MLOps]
     -> Microservice predicting injury probabilities from biometrics.`,

  experience: `Professional Experience:
  <span class="text-emerald-400 font-bold">Machine Learning Freelancer @ Outlier.ai</span> (2024 - Present | Remote)
  • RLHF evaluation & alignment of 50+ complex LLM prompt-response pairs.
  • Preprocessed 100K+ data records with Pandas/NumPy for model ingestion.
  • Performed stratified cross-validation and ROC-AUC benchmarking.`,

  education: `Academic Credentials:
  <span class="text-cyan-400 font-bold">D.Y. Patil Deemed to be University</span> (July 2023 - June 2027)
  • B.Tech in Computer Science & Engineering (AI & ML) - Navi Mumbai, India
  • CGPA: 7.42 / 10.0`,

  certifications: `Accreditations:
  • AWS Academy Graduate - Machine Learning Foundations (Credly)
  • AWS Academy Graduate - Cloud Foundations (Credly)
  • Generative AI & LLMs on AWS (edX / SageMaker)
  • Data Science for Engineers (IIT Madras via NPTEL)`,

  contact: `Direct Contact Channels:
  • Email   : <a href="mailto:bishnoisub0@gmail.com" class="text-cyan-400 hover:underline">bishnoisub0@gmail.com</a>
  • Phone   : +91 95871 19902
  • GitHub  : <a href="https://github.com/subhbishnoi" target="_blank" class="text-cyan-400 hover:underline">github.com/subhbishnoi</a>
  • Location: Ghatkopar East, Mumbai, Maharashtra`,

  whoami: `guest@recruiter ~ exploring Subhash Chandra's engineering portfolio.`,

  sudo: `<span class="text-amber-400">Nice try! Subhash has already granted you read & interview privileges.</span>`,

  resume: `Opening resume... (click below if popup blocked)
  -> <a href="assets/resume.pdf" target="_blank" class="text-cyan-400 underline">View assets/resume.pdf</a>`
};

function printToTerminal(htmlContent, isCommand = false) {
  if (!terminalOutput) return;
  const line = document.createElement('div');
  line.className = isCommand ? 'text-cyan-400 font-semibold' : 'text-slate-300 text-xs sm:text-sm pl-2';
  line.innerHTML = htmlContent;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function runCommand(rawCmd) {
  const cmd = (rawCmd || '').trim().toLowerCase();
  if (!cmd) return;

  printToTerminal(`$ ${cmd}`, true);

  if (cmd === 'clear') {
    terminalOutput.innerHTML = `
      <div class="text-cyan-400 font-semibold">Terminal screen cleared.</div>
      <div class="text-slate-400 text-xs">Type <span class="text-white font-bold">help</span> to view commands.</div>
    `;
    return;
  }

  if (COMMANDS[cmd]) {
    printToTerminal(COMMANDS[cmd]);
    if (cmd === 'resume') {
      window.open('assets/resume.pdf', '_blank');
    }
  } else {
    printToTerminal(`<span class="text-rose-400">Command not recognized: '${cmd}'. Type 'help' for available commands.</span>`);
  }
}

if (terminalInput) {
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      runCommand(val);
    }
  });
}

// ==========================================
// 6. CONTACT FORM SUBMIT HANDLER
// ==========================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name')?.value || 'Friend';
    const email = document.getElementById('form-email')?.value || '';
    const subject = document.getElementById('form-subject')?.value || '';
    const message = document.getElementById('form-message')?.value || '';

    // Create mailto link as fallback so user can send immediately
    const mailtoUri = `mailto:bishnoisub0@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
    window.location.href = mailtoUri;

    showToast('Opening your email client to send to Subhash...');
    contactForm.reset();
  });
}
