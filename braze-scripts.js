/**
 * Braze Custom Scripts
 * This script checks if the Braze SDK is loaded and displays a slide-up message
 * Designed to work with Shopify's Braze integration
 */

(function() {
    'use strict';
    
    /**
     * Check if Braze SDK is loaded and available
     * @returns {boolean} True if Braze SDK is available
     */
    function isBrazeSDKLoaded() {
        return typeof braze !== 'undefined' && 
               typeof braze.SlideUpMessage !== 'undefined' && 
               typeof braze.showInAppMessage !== 'undefined' &&
               typeof braze.InAppMessage !== 'undefined';
    }
    
    /**
     * Wait for Braze SDK to load with timeout
     * @param {number} timeout - Maximum time to wait in milliseconds
     * @returns {Promise} Promise that resolves when SDK is loaded or rejects on timeout
     */
    function waitForBrazeSDK(timeout = 10000) {
        return new Promise((resolve, reject) => {
            if (isBrazeSDKLoaded()) {
                resolve();
                return;
            }
            
            const startTime = Date.now();
            const checkInterval = setInterval(() => {
                if (isBrazeSDKLoaded()) {
                    clearInterval(checkInterval);
                    resolve();
                } else if (Date.now() - startTime > timeout) {
                    clearInterval(checkInterval);
                    reject(new Error('Braze SDK failed to load within timeout period'));
                }
            }, 100);
        });
    }
    
    /**
     * Display the slide-up message
     */
    function displaySlideUpMessage() {
        try {
            var message = new braze.SlideUpMessage("Good news! The Braze SDK is running from the Shopify Integration, and your custom scripts are now starting to run.");
            message.slideFrom = braze.InAppMessage.SlideFrom.TOP;
            braze.showInAppMessage(message);
            
            console.log('Braze slide-up message displayed successfully');
        } catch (error) {
            console.error('Error displaying Braze slide-up message:', error);
        }
    }
    
    /**
     * Initialize Braze custom scripts
     */
    function initializeBrazeScripts() {
        console.log('Initializing Braze custom scripts...');
        
        waitForBrazeSDK()
            .then(() => {
                console.log('Braze SDK detected and loaded');
                displaySlideUpMessage();
            })
            .catch((error) => {
                console.error('Braze SDK not available:', error.message);
                console.log('Retrying in 2 seconds...');
                
                // Retry once after a delay
                setTimeout(() => {
                    if (isBrazeSDKLoaded()) {
                        console.log('Braze SDK detected on retry');
                        displaySlideUpMessage();
                    } else {
                        console.error('Braze SDK still not available after retry');
                    }
                }, 2000);
            });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeBrazeScripts);
    } else {
        initializeBrazeScripts();
    }
    
    // Also try to initialize after a short delay to catch late-loading SDKs
    setTimeout(initializeBrazeScripts, 1000);
    
})();