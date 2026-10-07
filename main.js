// SIDE BAR & TOGGLE// 

const SITE_ROOT = document.currentScript
    ? new URL('./', document.currentScript.src).href
    : new URL('./', window.location.href).href;

document.addEventListener('DOMContentLoaded', () => {
    const sidebarContainer = document.getElementById('sidebar-container');
    const content = document.querySelector('.content');
    const openBtn = document.getElementById('sidebar-open-btn');

    function toggleSidebar() {
        if (!sidebarContainer) return;
        const isCollapsed = sidebarContainer.classList.toggle('collapsed');
        if (content) content.classList.toggle('expanded');
        if (openBtn) openBtn.classList.toggle('hidden', !isCollapsed);
    }

    if (openBtn) {
        openBtn.addEventListener('click', toggleSidebar);
    }

    if (sidebarContainer) {
        fetch(SITE_ROOT + 'sidebar.html')
            .then(res => {
                if (!res.ok) throw new Error('Sidebar file not found');
                return res.text();
            })
            .then(html => {
                sidebarContainer.innerHTML = html;

                // sidebar.html is written with "../" paths; point them at the site root
                sidebarContainer.querySelectorAll('[href^="../"], [src^="../"]').forEach(el => {
                    const attr = el.hasAttribute('href') ? 'href' : 'src';
                    el.setAttribute(attr, SITE_ROOT + el.getAttribute(attr).slice(3));
                });

                const toggleBtn = document.getElementById('sidebar-toggle-btn');
                if (toggleBtn) {
                    toggleBtn.addEventListener('click', toggleSidebar);
                }

                highlightActiveNav();
            })
            .catch(err => console.error(err));
    }
});

// Helper to highlight the active menu item based on current URL
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const linkMap = {
        'index.html': 'nav-dashboard',
        'about.html': 'nav-about',
        'techtronics.html': 'nav-techtronics',
        'shellfund.html': 'nav-shellfund',
        'simulator.html': 'nav-simulator'
    };

    const targetId = linkMap[currentPage];
    if (targetId) {
        const activeLink = document.getElementById(targetId);
        if (activeLink) activeLink.classList.add('active');
    }
}

// --------------------------

// SHELLFUND VIDEO TOGGLE

// --------------------------

const video = document.getElementById('myVideo');

if (video) {
  function playVideo() {
    video.play();
  }

  function pauseVideo() {
    video.pause();
  }

  video.addEventListener('ended', () => {
    alert('Thanks for watching! Feel free to subscribe.');
  });
  
  video.volume = 0.5;
}

document.addEventListener('DOMContentLoaded', () => {
  const greenRobot = document.getElementById('greenRobot');

  if (greenRobot) {
    greenRobot.addEventListener('click', () => {
      greenRobot.style.animation = 'none';

      greenRobot.classList.remove('user-click-bounce');
      
      void greenRobot.offsetWidth; 
      
      greenRobot.classList.add('user-click-bounce');
    });
  }
});

// --------------------------

// TECHTRONICS ACCORDION TOOGLE

// --------------------------

function toggleAccordion(headerElement) {
    const accordionItem = headerElement.parentElement;
    
    accordionItem.classList.toggle('is-open');
}

function openSlot(slotId) {
  document.querySelectorAll('.menu-item').forEach(button => {
    button.classList.remove('active');
  });
  
  event.currentTarget.classList.add('active');
  
  console.log("Opening slot: " + slotId);
}

// _____________________

// SHELLFUND MENU ITEMS

// ---------------------

function openSlot(slotId) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });

    const clickedButton = document.querySelector(`[onclick="openSlot('${slotId}')"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }

    const contentBlocks = document.querySelectorAll('.menu-tab-content');
    contentBlocks.forEach(block => {
        block.classList.remove('active');
    });

    const targetBlock = document.getElementById(slotId);
    if (targetBlock) {
        targetBlock.classList.add('active');
    }
}

// ______________________________________

// TECHTRONICS INFO ARCHIETECTURE TOGGLE

// --------------------------------------

function switchGraph(view) {
    const btnDesktop = document.getElementById('btn-desktop');
    const btnMobile = document.getElementById('btn-mobile');
    const slideDesktop = document.getElementById('slide-desktop');
    const slideMobile = document.getElementById('slide-mobile');

    if (view === 'mobile') {
        btnMobile.classList.add('active');
        btnDesktop.classList.remove('active');
        slideMobile.classList.add('active');
        slideDesktop.classList.remove('active');
    } else {
        btnDesktop.classList.add('active');
        btnMobile.classList.remove('active');
        slideDesktop.classList.add('active');
        slideMobile.classList.remove('active');
    }
}

function openGraphModal() {
    const activeImg = document.querySelector('.graph-slide.active .graph-img');
    const modal = document.getElementById('graphModal');
    const modalImg = document.getElementById('modalImg');

    if (activeImg) {
        modalImg.src = activeImg.src;
        modal.classList.add('is-open');
    }
}

function closeGraphModal(event) {
    const modal = document.getElementById('graphModal');
    
    // If triggered by click, prevent closing when clicking the image itself
    if (event && event.target === document.getElementById('modalImg')) {
        return;
    }
    
    modal.classList.remove('is-open');
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
        const modal = document.getElementById('graphModal');
        if (modal && modal.classList.contains('is-open')) {
            modal.classList.remove('is-open');
        }
    }
});

// TECHTRONICS Animations

document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,       /* Uses the viewport */
    rootMargin: '0px',
    threshold: 0.15   /* Triggers when 15% of the element is visible */
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  // Target all elements you want to animate
  const animateElements = document.querySelectorAll('.reveal-right');
  animateElements.forEach(el => observer.observe(el));
});