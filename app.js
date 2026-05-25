/* ==========================================
    Mohanapriyanka's Interactive Portfolio Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbarScroll();
  initSkillFilters();
  initProjectToggles();
  initDnsSimulator();
});

/* 1. Theme Selector (Dark/Light Mode Toggle) */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = themeToggle.querySelector('.sun-icon');
  const moonIcon = themeToggle.querySelector('.moon-icon');

  // Check saved theme or default to dark
  const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  if (currentTheme === 'light') {
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }

  themeToggle.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    let targetTheme = 'dark';
    
    if (activeTheme === 'dark') {
      targetTheme = 'light';
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    } else {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }

    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('portfolio-theme', targetTheme);
  });
}

/* 2. Highlight Active Link on Scroll */
function initNavbarScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY || document.documentElement.scrollTop;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* 3. Skill Matrices Dynamic Filtering */
function initSkillFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('fade-out');
          // Simple visual pop animation
          card.style.transform = 'scale(0.8)';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transform = 'scale(1)';
            card.style.opacity = '1';
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
          }, 50);
        } else {
          card.classList.add('fade-out');
        }
      });
    });
  });
}

/* 4. Project Detail Expandable Cards */
function initProjectToggles() {
  const toggleButtons = document.querySelectorAll('.toggle-details');

  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const detailsDiv = document.getElementById(targetId);

      if (detailsDiv.classList.contains('hidden')) {
        detailsDiv.classList.remove('hidden');
        button.textContent = 'Hide Details';
        detailsDiv.style.maxHeight = '0px';
        detailsDiv.style.overflow = 'hidden';
        detailsDiv.style.transition = 'max-height 0.5s ease-out';
        
        // Dynamic slide down
        setTimeout(() => {
          detailsDiv.style.maxHeight = '800px';
        }, 10);
      } else {
        detailsDiv.style.maxHeight = '0px';
        button.textContent = 'View System Architecture & Results';
        
        setTimeout(() => {
          detailsDiv.classList.add('hidden');
        }, 500);
      }
    });
  });
}

/* 5. DoS Attack & Mitigation Live Simulator */
function initDnsSimulator() {
  const simulateBtn = document.getElementById('simulate-attack-btn');
  const threatLabel = document.getElementById('threat-lbl');
  const alertBox = document.getElementById('iptables-alert');
  const bars = document.querySelectorAll('.traffic-bars .bar');

  let isSimulating = false;

  simulateBtn.addEventListener('click', () => {
    if (isSimulating) return;
    isSimulating = true;
    simulateBtn.disabled = true;
    simulateBtn.textContent = 'Attack Running...';

    // Step 1: Spike Traffic Bars and update label to Danger
    threatLabel.textContent = 'ATTACK: SYN FLOOD IN PROGRESS';
    threatLabel.className = 'threat-status danger';
    
    bars.forEach(bar => {
      bar.style.backgroundColor = 'var(--danger)';
      bar.style.height = `${Math.floor(Math.random() * 15) + 85}%`;
    });

    // Step 2: Show alert box representing iptables activation after 3.5 seconds
    setTimeout(() => {
      alertBox.textContent = 'MITIGATION ACTIVE: Auto-injected iptables drop rules';
      alertBox.classList.add('show');
      
      // Flash threat label to secure blue
      threatLabel.textContent = 'MITIGATING ATTACK...';
      threatLabel.className = 'threat-status safe';
    }, 3500);

    // Step 3: Mitigation kicks in, drop bars to safe minimum and update status to secured
    setTimeout(() => {
      threatLabel.textContent = 'SECURED: SYN FLOOD FILTERED';
      threatLabel.className = 'threat-status normal';
      
      bars.forEach(bar => {
        bar.style.backgroundColor = 'var(--success)';
        bar.style.height = `${Math.floor(Math.random() * 10) + 5}%`;
      });
    }, 6000);

    // Step 4: Reset simulator controls
    setTimeout(() => {
      alertBox.classList.remove('show');
      
      bars.forEach(bar => {
        bar.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        // Reset to original heights in markup
        if (bar.classList.contains('animate-spike')) {
          bar.style.height = 'auto';
        } else {
          bar.style.height = bar.style.getPropertyValue('--h');
        }
      });
      
      threatLabel.textContent = 'NORMAL TRAFFIC';
      threatLabel.className = 'threat-status normal';
      simulateBtn.disabled = false;
      simulateBtn.textContent = 'Simulate SYN Flood Attack';
      isSimulating = false;
    }, 10000);
  });
}
