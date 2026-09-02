// Wrap code in a DOMContentLoaded event to guarantee the simulator HTML has fully loaded first
document.addEventListener('DOMContentLoaded', () => {
    
    // Select all the clickable navigation headings and the tab content panels
    const tabButtons = document.querySelectorAll('.tab-toggle-btn');
    const tabPanels = document.querySelectorAll('.sub-tab-panel');

    // Only run the logic if these tab elements actually exist on the current page
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                
                // 1. Remove the active highlighting class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // 2. Hide all content panels
                tabPanels.forEach(panel => panel.classList.remove('active-panel'));

                // 3. Add the active class to the clicked button
                button.classList.add('active');

                // 4. Find the matching content panel using the data-tab-target attribute and show it
                const targetId = button.getAttribute('data-tab-target');
                const targetPanel = document.getElementById(targetId);
                
                if (targetPanel) {
                    targetPanel.classList.add('active-panel');
                }
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-toggle-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove 'active' class from all buttons
            tabButtons.forEach(btn => btn.classList.remove("active"));
            
            // Add 'active' class to the clicked button
            button.classList.add("active");

            // Hide all tab content elements
            tabContents.forEach(content => content.classList.remove("active-content"));

            // Safely map "models-view" to "models-content" to match your HTML IDs
            const targetAttr = button.getAttribute("data-tab-target");
            if (targetAttr) {
                const targetId = targetAttr.replace("-view", "-content");
                const targetContent = document.getElementById(targetId);
                
                if (targetContent) {
                    targetContent.classList.add("active-content");
                }
            }
        });
    });
});