// projects.js — Project data + PDF modal viewer

export const projectsData = [
  {
    id: 'riskon',
    name: 'RISKON',
    domain: 'Finance',
    tag: 'AI Credit Intelligence',
    summary: 'An AI engine that doesn\'t just score risk — it understands borrower behavior. Now adopted by Bank of India.',
    problem: '350 million Indians remain underbanked. Traditional credit models rely on static data and miss the gig workers, rural populations, and first-time borrowers who need access most.',
    approach: 'Built an end-to-end credit risk engine with automated feature pipelines and high-frequency behavioral modeling. Combined hybrid state-dynamics with interpretable ML to improve predictive performance by 14%.',
    outcome: 'Won FinShield Hackathon (Bank of India) — ₹5L prize. Platform adopted for real credit decisioning.',
    pdf: '/projects/riskon.pdf',
    icon: 'account_balance',
    gradient: 'linear-gradient(135deg, #2F241C 0%, #5F472F 50%, #8B6F47 100%)',
  },
  {
    id: 'adapt',
    name: 'ADAPT',
    domain: 'Finance',
    tag: 'Smart Indexing',
    summary: 'A market index that actually adapts. Regime-switching, behavioral guardrails, and built for real retail investors.',
    problem: 'Current indices use static rebalancing that collapses during volatility — the S&P "Conservative" index fell 34.2% in 2020. Meanwhile, emotional trading costs retail investors ~2.9% annually.',
    approach: 'Designed a regime-switching multi-asset index with Bayesian volatility filters, macro-conditioned risk allocation, and behavioral guardrails that prevent panic selling.',
    outcome: 'Finalist at Vittarth Pan-India Finance Competition, IIT Kharagpur. Framework validated across bull, bear, and sideways regimes.',
    pdf: '/projects/adapt.pdf',
    icon: 'show_chart',
    gradient: 'linear-gradient(135deg, #3d2e1f 0%, #6B5234 50%, #9A7B5A 100%)',
  },
  {
    id: 'orchestra',
    name: 'ORCHESTRA',
    domain: 'Finance',
    tag: 'Quant Risk Engine',
    summary: 'When markets shift regimes, most models break. This one was built to thrive in the chaos.',
    problem: 'Traditional risk models treat market behavior as stationary — a dangerous assumption that fails during regime transitions, flash crashes, and liquidity crises.',
    approach: 'Engineered a Regime-Conditioned Hamiltonian Engine that uses physics-inspired dynamics to model non-linear market transitions and stress scenarios.',
    outcome: 'Selected for HackStack (Economic Times). Novel approach to regime-aware quantitative risk attribution.',
    pdf: '/projects/orchestra.pdf',
    icon: 'waterfall_chart',
    gradient: 'linear-gradient(135deg, #1a1510 0%, #4a3828 50%, #7a6040 100%)',
  },
  {
    id: 'ather-energy',
    name: 'Ather Energy',
    domain: 'Strategy',
    tag: 'Business Consulting',
    summary: 'How do you scale an EV manufacturer without burning capital? We built the playbook.',
    problem: 'Ather Energy was growing fast but bleeding on unit economics. Manufacturing utilization was low, margins were thin, and geographic expansion carried serious execution risk.',
    approach: 'Developed a comprehensive strategy covering capacity utilization optimization, profitability levers, and a risk-mitigated expansion framework with city-tier prioritization.',
    outcome: 'Presented at Indian Case Challenge 2026. The kind of problem I live for — messy, high-stakes, and deeply operational.',
    pdf: '/projects/ather-energy.pdf',
    icon: 'bolt',
    gradient: 'linear-gradient(135deg, #2a201a 0%, #5a4530 50%, #8a6a46 100%)',
  },
  {
    id: 'polaris',
    name: 'POLARIS',
    domain: 'AI/ML',
    tag: 'Political Intelligence',
    summary: 'Real-time political sentiment across 22 Indian languages — because English captures only 11% of what voters think.',
    problem: 'Public opinion scales to 1M impressions in 47 minutes, but political response takes 6-8 days. The narrative window closes before anyone can act. And 80% of voter expression is in languages current tools can\'t read.',
    approach: 'Built a multi-lingual NLP pipeline with semantic drift adaptation, causal identification, and real-time narrative tracking that actually works across India\'s linguistic diversity.',
    outcome: 'India Innovates National Finale. Addresses the intelligence gap that makes or breaks elections and policy rollouts.',
    pdf: '/projects/polaris.pdf',
    icon: 'language',
    gradient: 'linear-gradient(135deg, #1e1815 0%, #4e3d2f 50%, #7e6249 100%)',
  },
  {
    id: 'hydrocarbon-ai',
    name: 'AI Exploration',
    domain: 'Engineering',
    tag: 'AI + Energy',
    summary: 'Teaching neural networks to find oil. Physics-informed AI that reads seismic data like a geologist — but faster.',
    problem: 'Traditional exploration relies on siloed data analysis — geologists look at seismic data, engineers look at well logs, and nobody integrates satellite imagery. The result? Expensive dry wells.',
    approach: 'Developed Physics-Informed Neural Networks (PINNs) that integrate seismic, satellite, and well-log data simultaneously, respecting geological constraints while learning hidden patterns.',
    outcome: 'Faculty-mentored research at IIPE under Prof. Narender Pendkar. Novel application of constrained deep learning to upstream energy exploration.',
    pdf: '/projects/hydrocarbon-ai.pdf',
    icon: 'oil_barrel',
    gradient: 'linear-gradient(135deg, #241c14 0%, #543f28 50%, #84623c 100%)',
  },
  {
    id: 'wobia',
    name: 'WOBIA',
    domain: 'AI/ML',
    tag: 'Urban Intelligence',
    summary: 'Indian traffic isn\'t random — it\'s a complex system. We built the AI to decode it.',
    problem: 'Indian metros average 30+ minutes per 10km. A moderate rain event drops speeds by 25-30%. And 1,72,890 people died on Indian roads in 2023. The data exists; the intelligence doesn\'t.',
    approach: 'Designed an AI system that integrates real-time weather, event data, and historical traffic patterns to predict non-cyclical congestion before it happens — not after.',
    outcome: 'D3CODE 2025 India Edition. Corridor-level policy recommendations for Bangalore, Delhi, and Mumbai.',
    pdf: '/projects/wobia.pdf',
    icon: 'map',
    gradient: 'linear-gradient(135deg, #201a15 0%, #50402d 50%, #806645 100%)',
  },
];

const domains = ['All', ...new Set(projectsData.map(p => p.domain))];

// Render filter tabs
export function renderFilters() {
  const container = document.getElementById('filterTabs');
  if (!container) return;
  container.innerHTML = domains.map((d, i) =>
    `<button class="btn-ghost ${i === 0 ? 'active' : ''}" data-filter="${d}">${d}</button>`
  ).join('');

  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });
}

// Render project cards
export function renderProjects(filter = 'All') {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  const filtered = filter === 'All' ? projectsData : projectsData.filter(p => p.domain === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="project-card reveal-scale" data-project="${p.id}" onclick="window.openPDF('${p.id}')">
      <div class="project-thumb">
        <div class="project-thumb-inner" style="background:${p.gradient};">
          <span class="material-symbols-outlined" style="font-size:4rem;opacity:0.3;">${p.icon}</span>
        </div>
        <div class="project-overlay">
          <span class="project-domain">${p.tag}</span>
          <h3>${p.name}</h3>
          <p class="project-desc">${p.summary}</p>
          <span class="project-cta">View Deck <span class="material-symbols-outlined" style="font-size:16px;">arrow_forward</span></span>
        </div>
      </div>
    </div>
  `).join('');

  // Re-trigger GSAP for new elements
  if (window.gsap && window.ScrollTrigger) {
    gsap.utils.toArray('.project-card.reveal-scale').forEach(el => {
      gsap.fromTo(el, { opacity: 0, scale: 0.95 }, {
        opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
      });
    });
  }
}

// PDF Modal
let currentPdf = null;
let currentPage = 1;
let totalPages = 0;
let pdfDoc = null;

window.openPDF = async function(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project || !window.pdfjsLib) return;

  const modal = document.getElementById('pdfModal');
  const title = document.getElementById('pdfTitle');
  const canvas = document.getElementById('pdfCanvas');

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  title.textContent = project.name;
  currentPage = 1;

  try {
    pdfDoc = await pdfjsLib.getDocument(project.pdf).promise;
    totalPages = pdfDoc.numPages;
    renderPage(currentPage);
  } catch (err) {
    console.error('PDF load error:', err);
    title.textContent = project.name + ' — Error loading PDF';
  }
};

async function renderPage(pageNum) {
  if (!pdfDoc) return;
  const page = await pdfDoc.getPage(pageNum);
  const canvas = document.getElementById('pdfCanvas');
  const ctx = canvas.getContext('2d');

  // Scale to fit viewport
  const viewportHeight = window.innerHeight * 0.75;
  const viewportWidth = window.innerWidth * 0.8;
  const unscaledViewport = page.getViewport({ scale: 1 });
  const scaleH = viewportHeight / unscaledViewport.height;
  const scaleW = viewportWidth / unscaledViewport.width;
  const scale = Math.min(scaleH, scaleW) * (window.devicePixelRatio > 1 ? 1.5 : 1.2);

  const viewport = page.getViewport({ scale });
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  canvas.style.width = viewport.width / (window.devicePixelRatio > 1 ? 1.5 : 1.2) + 'px';
  canvas.style.height = viewport.height / (window.devicePixelRatio > 1 ? 1.5 : 1.2) + 'px';

  await page.render({ canvasContext: ctx, viewport }).promise;

  document.getElementById('pdfPageInfo').textContent = `${pageNum} / ${totalPages}`;
  document.getElementById('pdfPrev').style.opacity = pageNum <= 1 ? '0.3' : '1';
  document.getElementById('pdfNext').style.opacity = pageNum >= totalPages ? '0.3' : '1';
}

function closePDF() {
  document.getElementById('pdfModal').classList.remove('open');
  document.body.style.overflow = '';
  pdfDoc = null;
}

// PDF navigation event listeners
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('pdfClose')?.addEventListener('click', closePDF);
  document.getElementById('pdfPrev')?.addEventListener('click', () => {
    if (currentPage > 1) { currentPage--; renderPage(currentPage); }
  });
  document.getElementById('pdfNext')?.addEventListener('click', () => {
    if (currentPage < totalPages) { currentPage++; renderPage(currentPage); }
  });
  document.getElementById('pdfModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'pdfModal') closePDF();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('pdfModal')?.classList.contains('open')) return;
    if (e.key === 'Escape') closePDF();
    if (e.key === 'ArrowLeft' && currentPage > 1) { currentPage--; renderPage(currentPage); }
    if (e.key === 'ArrowRight' && currentPage < totalPages) { currentPage++; renderPage(currentPage); }
  });

  // Touch swipe
  let touchStartX = 0;
  const modal = document.getElementById('pdfModal');
  modal?.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
  modal?.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentPage < totalPages) { currentPage++; renderPage(currentPage); }
      if (diff < 0 && currentPage > 1) { currentPage--; renderPage(currentPage); }
    }
  });

  // Initialize
  renderFilters();
  renderProjects();
});
