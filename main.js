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