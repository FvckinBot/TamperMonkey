// ==User Script==
// @name         FvckinBot for Goated
// @version      1.0
// @description  A draggable popup for FvckinBot
// @author       FvckinBot
// @match        *://goated.com/*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @connect      api.allorigins.win
// ==/User Script==

(function() {
    'use strict';

    const newBody = `<body>
      <div class="text-white fixed top-[50px] left-[50px] w-md rounded-2xl shadow-lg z-[9999] overflow-hidden  backdrop-blur-xl hidden"
           id="draggablePopup">
            <div class="flex justify-between items-center rounded-b-2xl border-b border-[#D9E66B]/75 backdrop-blur-sm cursor-move px-4 py-2" id="popupHeader">
                <div class="flex items-center ">
                <h1 id="popupTitle" class="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D9E66B] text-base font-bold font-mono tracking-tighter">
                <span id="botName">FvckinBot™ </span> <span class="text-xs align-end" id="versionBot">v2.1.3</span>
                </h1>
            </div>
            <button class="bg-transparent border-none text-white text-xl cursor-pointer px-2" id="popupCloseBtn">&times;</button>
        </div>
        <main id="mainContent" class="space-y-3 p-6 gap-6 transition-all duration-300">
            <section id="user-Login" class ='space-y-3 w-full' >
                <div id="accountInfo" class="flex justify-between text-xs items-center border-b border-[#D9E66B] mb-3">
                    <p class="text-base font-semibold  flex items-center gap-1">
                        <span class="material-icons text-white ">account_circle</span>    
                        <span id="user-name" class='text-[#D9E66B] items-center '>Username123</span>    
                    </p>
                </div>
            </section>
            <section id="content-redeem" class="w-full ">
                <div class="">
                    <div id="redeemForm" class="flex gap-3 flex-wrap">
                        <label>Manual </label>
                        <input type="text" id="redeemCodeInput" placeholder="Enter Redeem Code" class="flex-grow min-w-[250px] rounded-md px-2 py-1 text-xs bg-gray-900 text-white font-mono outline-none" required />
                        <button id="dropClaimBtn" type="button" class="bg-[#D9E66B] text-gray-950 px-2 py-1 rounded-md text-xs font-semibold hover:bg-[#D9E66B]/75 transition cursor-pointer">Claim</button>
                    </div>
                    <p id="redeemErrorMsg" class="text-red-500 text-xs mt-2 hidden text-center"></p>
                    <p id="redeemSuccessMsg" class="text-green-500 text-xs mt-2 hidden text-center"></p>
                </div>
            </section>
            <section id="content-logs"  wrap="off" class="font-mono text-xs rounded-md outline-none resize-none overflow-x-auto">
                <h2 id="status" class="text-[#D9E66B] cursor-pointer transition ">Status: Loading...</h2>
                <div id="logs" class="p-4 overflow-auto max-h-80 text-xs" aria-live="polite"></div>
            </section>
        </main>
      </div>
      
      <!-- Button to show/hide popup -->
        <button class="flex justify-between items-center rounded-full border border-[#D9E66B]/75 backdrop-blur-xl cursor-move px-4 py-2 fixed bottom-5 right-5  w-[100px] h-[50px] text-xl cursor-move shadow-lg z-[9998]"
          id="showPopupBtn">
            <h1 class="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D9E66B] text-base font-bold font-mono tracking-tighter">
            <span>FvckinBot™ </span>
            </h1>
          </button>
    </body>`;

    function addCss(src, cb) {
        var s = document.createElement('link');
        s.rel = 'stylesheet';
        s.href = src;
        s.onload = cb;
        document.head.appendChild(s);
    }

    function addJs(src, cb) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = src;
        s.onload = cb;
        document.head.appendChild(s);
    }

    addCss('https://fonts.googleapis.com/icon?family=Material+Icons', () => {});
    addJs('https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4', () => { 
        document.body.insertAdjacentHTML("beforebegin", newBody);	
        
        function parseChannel(htmlContent) {
            const doc = document.createElement('div');
            doc.innerHTML = htmlContent;
            const messageElements = doc.querySelectorAll('.tgme_widget_message');
            
            if (messageElements.length) {
                const lastMessage = messageElements[messageElements.length - 1];
                const messageText = lastMessage.querySelector('.tgme_widget_message_text').textContent;
                return messageText.replace(/[^\x00-\x7F]/g, ' ').trim() || null;
            }
            
            return null;
        }

        async function getDataByAllowOrigins(url){
            try {
                const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                console.error('Error:', error);
            }
        }

        async function getCode(){
            const htmlContent = await getDataByAllowOrigins("https://t.me/s/goateddrops");
            console.log(htmlContent);
        }

        getCode();

        const draggablePopup = document.getElementById('draggablePopup');
        const popupHeader = document.getElementById('popupHeader');
        const popupCloseBtn = document.getElementById('popupCloseBtn');
        const showPopupBtn = document.getElementById('showPopupBtn');
        
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        
        // Initialize popup position
        draggablePopup.style.top = '50px';
        draggablePopup.style.left = '50px';
        
        // Show/hide popup
        showPopupBtn.addEventListener('click', function() {
            draggablePopup.style.display = 'block';
            showPopupBtn.style.display = 'none';
        });
        
        // Close popup
        popupCloseBtn.addEventListener('click', function() {
            draggablePopup.style.display = 'none';
            showPopupBtn.style.display = 'block';
        });

        // Drag functionality
        popupHeader.addEventListener('mousedown', function(e) {
            isDragging = true;
            offsetX = e.clientX - draggablePopup.getBoundingClientRect().left;
            offsetY = e.clientY - draggablePopup.getBoundingClientRect().top;
            draggablePopup.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            
            // Constrain to viewport
            const maxX = window.innerWidth - draggablePopup.offsetWidth;
            const maxY = window.innerHeight - draggablePopup.offsetHeight;
            
            draggablePopup.style.left = `${Math.max(0, Math.min(newX, maxX))}px`;
            draggablePopup.style.top = `${Math.max(0, Math.min(newY, maxY))}px`;
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
            draggablePopup.style.cursor = '';
        });

        // Prevent interference with host page events
        draggablePopup.addEventListener('mousedown', function(e) {
            e.stopPropagation();
        });
        
        draggablePopup.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
})();
