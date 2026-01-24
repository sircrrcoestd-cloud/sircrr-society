// ============= load-components.js =============
// This script loads header.html and footer.html into your pages
// Place this file in: js/load-components.js

/**
 * Load external HTML files (header.html and footer.html)
 * Include this script in your page BEFORE </body> tag
 * 
 * Usage:
 * <div id="header-container"></div>
 * <div id="footer-container"></div>
 * <script src="js/load-components.js"></script>
 */

// Function to load HTML file
function loadComponent(containerId, filePath) {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = html;
                console.log(`✓ ${filePath} loaded successfully`);
            } else {
                console.error(`Container with id "${containerId}" not found`);
            }
        })
        .catch(error => {
            console.error(`Error loading ${filePath}:`, error);
        });
}

// Load both header and footer
document.addEventListener('DOMContentLoaded', function() {
    // Adjust paths based on your folder structure
    // If your page is in root folder:
    loadComponent('header-container', 'components/header.html');
    loadComponent('footer-container', 'components/footer.html');
    
    // If your page is in a subfolder (e.g., pages/about.html):
    // loadComponent('header-container', '../components/header.html');
    // loadComponent('footer-container', '../components/footer.html');
});


// ============= ALTERNATIVE: More Advanced Function =============
// Use this if you need better path handling

function loadComponents(config = {}) {
    const defaults = {
        headerId: 'header-container',
        footerId: 'footer-container',
        headerPath: 'components/header.html',
        footerPath: 'components/footer.html',
        debug: false
    };
    
    const settings = { ...defaults, ...config };
    
    const promises = [
        loadComponent(settings.headerId, settings.headerPath),
        loadComponent(settings.footerId, settings.footerPath)
    ];
    
    Promise.all(promises).then(() => {
        if (settings.debug) {
            console.log('✓ All components loaded successfully');
        }
    }).catch(error => {
        console.error('Error loading components:', error);
    });
}

// If you prefer to call it manually:
// loadComponents({
//     headerPath: '../components/header.html',
//     footerPath: '../components/footer.html',
//     debug: true
// });