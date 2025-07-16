// ==UserScript==
// @name         Stylish Popup Example
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Demonstrates injecting a professional popup into any page
// @author       YourName
// @match        *://*/*
// @grant        GM_addStyle
// @copyright    2025, FvckinBot (https://openuserjs.org/users/FvckinBot)
// @license      GPL-2.0-only
// ==/UserScript==
(function() {
    'use strict';

    // Add our base styles
    GM_addStyle(`
        .popup-overlay-custom {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 999999;
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(5px);
        }
        
        .popup-container-custom {
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 420px;
            overflow: hidden;
            animation: fadeInScale 0.3s ease-out forwards;
            transform-origin: center;
        }
        
        .popup-header-custom {
            background: linear-gradient(135deg, #4361ee 0%, #3f37c9 100%);
            color: white;
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .popup-title-custom {
            font-size: 18px;
            font-weight: 600;
        }
        
        .popup-close-btn-custom {
            background: none;
            border: none;
            color: white;
            font-size: 22px;
            cursor: pointer;
            padding: 0 6px;
            transition: transform 0.2s ease;
        }
        
        .popup-close-btn-custom:hover {
            transform: scale(1.2);
        }
        
        .popup-content-custom {
            padding: 20px;
            max-height: 60vh;
            overflow-y: auto;
        }
        
        .popup-message-custom {
            margin-bottom: 20px;
            line-height: 1.5;
            color: #333;
        }
        
        .popup-footer-custom {
            padding: 16px 20px;
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            border-top: 1px solid #eee;
        }
        
        .popup-btn-custom {
            padding: 10px 16px;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
        }
        
        .popup-btn-primary-custom {
            background-color: #4361ee;
            color: white;
        }
        
        .popup-btn-primary-custom:hover {
            background-color: #3a56d4;
        }
        
        .popup-btn-secondary-custom {
            background-color: #f1f3f5;
            color: #333;
        }
        
        .popup-btn-secondary-custom:hover {
            background-color: #e9ecef;
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        /* Responsive adjustments */
        @media (max-width: 480px) {
            .popup-container-custom {
                width: 95%;
            }
            
            .popup-content-custom {
                padding: 15px;
            }
        }
    `);

    // Create popup elements
    function createPopup(title, message, dismissable = true) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay-custom';
        
        // Create popup container
        const popup = document.createElement('div');
        popup.className = 'popup-container-custom';
        
        // Create header
        const header = document.createElement('div');
        header.className = 'popup-header-custom';
        
        const titleElement = document.createElement('div');
        titleElement.className = 'popup-title-custom';
        titleElement.textContent = title;
        
        header.appendChild(titleElement);
        
        if (dismissable) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'popup-close-btn-custom';
            closeBtn.innerHTML = '&times;';
            closeBtn.addEventListener('click', () => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 300);
            });
            header.appendChild(closeBtn);
        }
        
        // Create content
        const content = document.createElement('div');
        content.className = 'popup-content-custom';
        
        const messageElement = document.createElement('div');
        messageElement.className = 'popup-message-custom';
        messageElement.innerHTML = message;
        
        content.appendChild(messageElement);
        
        // Create footer with buttons
        const footer = document.createElement('div');
        footer.className = 'popup-footer-custom';
        
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'popup-btn-custom popup-btn-secondary-custom';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.addEventListener('click', () => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        });
        
        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'popup-btn-custom popup-btn-primary-custom';
        confirmBtn.textContent = 'Confirm';
        confirmBtn.addEventListener('click', () => {
            alert('Action confirmed!');
            overlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        });
        
        footer.appendChild(cancelBtn);
        footer.appendChild(confirmBtn);
        
        // Assemble popup
        popup.appendChild(header);
        popup.appendChild(content);
        popup.appendChild(footer);
        
        overlay.appendChild(popup);
        document.body.appendChild(overlay);
        
        // Close when clicking outside (only if dismissable)
        if (dismissable) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(overlay);
                    }, 300);
                }
            });
        }
        
        return overlay;
    }

    // Example usage - could be triggered by some event
    setTimeout(() => {
        createPopup(
            'Important Notice', 
            '<p>This is an example of a professional popup injected via Tampermonkey.</p>' +
            '<p>Features:</p>' +
            '<ul>' +
            '<li>Smooth animations</li>' +
            '<li>Responsive design</li>' +
            '<li>Custom styling</li>' +
            '<li>Accessibility considerations</li>' +
            '</ul>'
        );
    }, 1000);

})();
