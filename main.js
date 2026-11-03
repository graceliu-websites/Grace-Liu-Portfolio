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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Slide in when any part is on screen, reset once fully off screen
      entry.target.classList.toggle('active', entry.isIntersecting);
    });
  }, {
    root: null,
    threshold: 0,
    rootMargin: '0px 0px -10% 0px' /* waits until the item is slightly inside the viewport */
  });

  document.querySelectorAll('.reveal-right').forEach(el => observer.observe(el));
});

  document.addEventListener('DOMContentLoaded', function () {
(function () {
    var section = document.querySelector('.holo-section');
    if (!section) return;

    var ring = section.querySelector('.holo-ring');
    var cards = Array.prototype.slice.call(ring.querySelectorAll('.holo-card'));
    var dots = Array.prototype.slice.call(section.querySelectorAll('.holo-dot-btn'));
    var prevBtn = section.querySelector('#holo-prev');
    var nextBtn = section.querySelector('#holo-next');
    var playBtn = section.querySelector('#holo-play');
    var counter = section.querySelector('#holo-count');
    var stage = section.querySelector('.holo-stage');

    var count = cards.length;
    var index = 0;
    var timer = null;
    var visible = true;
    var hovering = false;
    var userPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function mod(n, m) { return ((n % m) + m) % m; }
    function pad(n) { return (n < 10 ? '0' : '') + n; }

    function render() {
        ring.style.setProperty('--turn', index);
        cards.forEach(function (card, i) {
            card.setAttribute('data-pos', mod(i - index, count));
        });
        var active = mod(index, count);
        dots.forEach(function (d, i) {
            d.setAttribute('aria-current', i === active ? 'true' : 'false');
        });
        counter.textContent = pad(active + 1) + ' / ' + pad(count);
    }

    function go(delta) { index += delta; render(); }

    function goTo(target) {
        // take the shortest way round the ring
        go(mod(target - index + count / 2, count) - count / 2);
    }

    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function start() {
        stop();
        if (!userPaused && !hovering && visible) {
            timer = setInterval(function () { go(1); }, 6000);
        }
    }

    function syncPlayButton() {
        playBtn.innerHTML = userPaused
            ? '<i class="fa-solid fa-play" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-pause" aria-hidden="true"></i>';
        playBtn.setAttribute('aria-label', userPaused ? 'Start automatic rotation' : 'Pause automatic rotation');
        counter.setAttribute('aria-live', userPaused ? 'polite' : 'off');
    }

    prevBtn.addEventListener('click', function () { go(-1); start(); });
    nextBtn.addEventListener('click', function () { go(1); start(); });
    dots.forEach(function (d, i) {
        d.addEventListener('click', function () { goTo(i); start(); });
    });
    cards.forEach(function (card, i) {
        card.addEventListener('click', function () {
            if (card.getAttribute('data-pos') !== '0') { goTo(i); start(); }
        });
    });
    playBtn.addEventListener('click', function () {
        userPaused = !userPaused;
        syncPlayButton();
        start();
    });

    // pause while the pointer or keyboard focus is inside the section
    stage.addEventListener('mouseenter', function () { hovering = true; stop(); });
    stage.addEventListener('mouseleave', function () { hovering = false; start(); });
    section.addEventListener('focusin', function () { hovering = true; stop(); });
    section.addEventListener('focusout', function () { hovering = false; start(); });

    section.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { go(-1); start(); }
        if (e.key === 'ArrowRight') { go(1); start(); }
    });

    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
            visible = entries[0].isIntersecting;
            if (visible) { start(); } else { stop(); }
        }).observe(section);
    }

    syncPlayButton();
    render();
    start();
})();

  });

/* ===== HOLOGRAPHIC STORYBOARD ===== */

(function () {
    var section = document.querySelector('.holo-section');
    if (!section) return;

    var ring = section.querySelector('.holo-ring');
    var cards = Array.prototype.slice.call(ring.querySelectorAll('.holo-card'));
    var dots = Array.prototype.slice.call(section.querySelectorAll('.holo-dot-btn'));
    var prevBtn = section.querySelector('#holo-prev');
    var nextBtn = section.querySelector('#holo-next');
    var playBtn = section.querySelector('#holo-play');
    var counter = section.querySelector('#holo-count');
    var stage = section.querySelector('.holo-stage');

    var count = cards.length;
    var index = 0;
    var timer = null;
    var visible = true;
    var hovering = false;
    var userPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function mod(n, m) { return ((n % m) + m) % m; }
    function pad(n) { return (n < 10 ? '0' : '') + n; }

    function render() {
        ring.style.setProperty('--turn', index);
        cards.forEach(function (card, i) {
            card.setAttribute('data-pos', mod(i - index, count));
        });
        var active = mod(index, count);
        dots.forEach(function (d, i) {
            d.setAttribute('aria-current', i === active ? 'true' : 'false');
        });
        counter.textContent = pad(active + 1) + ' / ' + pad(count);
    }

    function go(delta) { index += delta; render(); }

    function goTo(target) {
        // take the shortest way round the ring
        go(mod(target - index + count / 2, count) - count / 2);
    }

    function stop() {
        if (timer) { clearInterval(timer); timer = null; }
    }

    function start() {
        stop();
        if (!userPaused && !hovering && visible) {
            timer = setInterval(function () { go(1); }, 6000);
        }
    }

    function syncPlayButton() {
        playBtn.innerHTML = userPaused
            ? '<i class="fa-solid fa-play" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-pause" aria-hidden="true"></i>';
        playBtn.setAttribute('aria-label', userPaused ? 'Start automatic rotation' : 'Pause automatic rotation');
        counter.setAttribute('aria-live', userPaused ? 'polite' : 'off');
    }

    prevBtn.addEventListener('click', function () { go(-1); start(); });
    nextBtn.addEventListener('click', function () { go(1); start(); });

    dots.forEach(function (d, i) {
        d.addEventListener('click', function () { goTo(i); start(); });
    });

    cards.forEach(function (card, i) {
        card.addEventListener('click', function () {
            if (card.getAttribute('data-pos') !== '0') { goTo(i); start(); }
        });
    });

    playBtn.addEventListener('click', function () {
        userPaused = !userPaused;
        syncPlayButton();
        start();
    });

    // pause while the pointer or keyboard focus is inside the section
    stage.addEventListener('mouseenter', function () { hovering = true; stop(); });
    stage.addEventListener('mouseleave', function () { hovering = false; start(); });
    section.addEventListener('focusin', function () { hovering = true; stop(); });
    section.addEventListener('focusout', function () { hovering = false; start(); });

    section.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { go(-1); start(); }
        if (e.key === 'ArrowRight') { go(1); start(); }
    });

    // only rotate while the section is on screen
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
            visible = entries[0].isIntersecting;
            if (visible) { start(); } else { stop(); }
        }).observe(section);
    }

    syncPlayButton();
    render();
    start();
})();