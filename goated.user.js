// ==UserScript==
// @name         Goated FvckinBot™
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Claimer For Goated
// @author       FvckinBot™
// @match        https://www.goated.com/redeem
// @run-at       document-end
// @require      https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  	const newContent = `
	<body>  
	<div class="bg-gradient-to-tr from-[#D9E66B] to-gray-950 pt-20 sm:pt-24 min-h-screen ">  
		<div class="flex justify-between items-center rounded-b-2xl border-b border-[#D9E66B]/75 fixed w-full top-0 z-50 p-5 backdrop-blur-sm">
			<div class="flex items-center space-x-2 sm:space-x-4">
				<h1 id="popupTitle" class="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D9E66B] text-base font-bold font-mono tracking-tighter">
					<span id="botName">FvckinBot™ </span> <span class="text-base align-end" id="versionBot">Claimer</span>
				</h1>
			</div>
			
			<div id="casinoSite" class="flex items-center space-x-2">
				<span class="hidden sm:inline text-gray-400 text-xs">Connected to:</span>
				<div class="relative">
					<div class="site-badge px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-gray-950-900 to-[#D9E66B]/25 text-white flex items-center space-x-2">
						<div class="w-2 h-2 rounded-full bg-[#D9E66B] animate-pulse"></div>
						<span id="mirrorSite">Stake.com</span>
					</div>
				</div>
			</div>
		</div>
		<main id="mainContent" class="bg-gray-950 p-6 gap-6 shadow-[0px_0px_0px_rgba(0,_0,_0,_1),_0_10px_20px_rgba(0,_0,_0,_1)] rounded-2xl max-w-4xl mx-auto min-h-auto flex-col space-y-3 transition-all duration-300">
				
		<section id="accountInfo" class="flex justify-between text-xs items-center mb-3">
						<p class="text-base font-semibold  flex items-center gap-1">
							<span class="material-icons text-white ">account_circle</span>
							<span id="user-name" class='text-[#D9E66B] items-center '>Username123</span>
						</p>
						<div class="">
							<button id="startBtn" type="button" class="bg-[#D9E66B] text-gray-950 px-2 py-1 rounded-md text-xs font-semibold hover:bg-[#D9E66B]/75 transition cursor-pointer">Start</button>
							<button id="stopBtn" type="button" class=" hidden bg-[#D9E66B] text-gray-950 px-2 py-1 rounded-md text-xs font-semibold hover:bg-[#D9E66B]/75 transition cursor-pointer">Stop</button>
						</div>
		</section>
		<section id="widget-container" class="hidden max-w-[72px]"></section>
		<section id="history" class="items-center rounded-lg shadow-md flex justify-between outline-none overflow-auto max-h-72">
						<table >
							<thead>
								<tr>
									<th class="px-2 py-1 text-center text-xs font-medium text-[#D9E66B] uppercase tracking-wider">Date</th>
									<th class="px-2 py-1 text-center text-xs font-medium text-[#D9E66B] uppercase tracking-wider">Detail</th>
								</tr>
							</thead>
							<tbody id="tableBody" class="basis-full ">
								<!-- Table rows will be added here dynamically -->
							</tbody>
						</table>
		</section>
    </main>
		<footer class="flex-none mb-12 mt-6 ">
		<div class="mx-auto flex flex-col items-center justify-center md:flex-row w-full">
			<p class=" text-xs font-bold text-gray-950 ">Copyright © <!-- -->2025<!-- --> FvckinBot™. All rights reserved.</p>
			</div>
		</footer>
</div>
</body>
`
// Write the combined content
	const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    link.rel = 'stylesheet';
	document.body.innerHTML = newContent
	document.title = "Goated Claim by FvckinBot™";

    document.head.appendChild(link);
	const scCf = document.createElement('script')
	scCf.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"

	scCf.onload = () => {


			const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
			let lastCode = null
			let intervalId = null;
			let connectAccounts = {};
			let bearerToken = localStorage?.g3_token.replace(/"/g, '');
			async function addLocal(){
				const username = await getUsername(bearerToken)
				if(username){
					connectAccounts= { 
						isLocal: true, 
						bearerToken, 
						username , 
						turnstile : false, 
						widgetId : false
					}
					addTurnstileWidget(connectAccounts.length-1)
					renderUsername()
				}
			}
				if(bearerToken && bearerToken != "undefined" ){
					addLocal()
				}
			const draggablePopup = document.getElementById('draggablePopup');
			const popupHeader = document.getElementById('popupHeader');
			const popupCloseBtn = document.getElementById('popupCloseBtn');

			const startBtn = document.getElementById('startBtn');
			const stopBtn = document.getElementById('stopBtn');
			const turnstileContainers = document.getElementById('widget-container');
			const widgetContent = document.getElementById('widgetContent');
			const connectTo = document.getElementById('mirrorSite');
			connectTo.textContent = window.location.hostname
			async function getDataByAllowOrigins(url) {
				try {
					const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,{cache: 'force-cache'});
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					return await response.json();
				} catch (error) {
					console.error('Error:', error);
				}
			}
			async function fetchGoated(bearerToken,addUrl,payload = null) {
				const options = {
					method : payload ? "POST":"GET",
					headers: {
						'Authorization': 'Bearer ' + bearerToken,
						'Content-Type': 'application/json',
					},
					cache: 'force-cache',
				}
				if(payload) options.body = JSON.stringify(payload);
				const response = await fetch(`https://apis.goated.com`+addUrl, options);
				if (!response.ok) {
					throw new Error(response.status+'Client Error: '+response.statusText);
				}
				return response.json()
			}
			async function getUsername(bearerToken) {
				const response = await fetchGoated(bearerToken,`/user/`)
				if(response && response.success){
					return response.data.name
				}
			}
			async function claimCode(bearerToken,turnstileToken,code) {
				try {
					const payloads = {
						code: code,
						turnstileToken: turnstileToken
					};
					const response = await fetchGoated(bearerToken,`/user/redeem-code/tqsq3`, payloads)
					console.log(response)
					if(response.success){
						return response.data;
					}else{
						return response.error;
					}
				} catch (err) {
					console.log(err);
					return 'unknownError';
				}
			}
			function renderUsername(){
				document.getElementById('user-name').textContent = connectAccounts.username
			}
			async function renderClaim(code){
				const available = await claimCode(connectAccounts.bearerToken,connectAccounts.turnstile,code)
				turnstile.reset(connectAccounts.widgetId)
				if(available){
					addLogEntry(`CLAIM DROP [${code}]: ${available}`)
				}
			}
			async function getLastMessage(url) {
				const htmlContent = await getDataByAllowOrigins(url);
				if (htmlContent) {
					// Parse the HTML content
					const parser = new DOMParser();
					const doc = parser.parseFromString(htmlContent.contents, 'text/html');
					const messages = doc.querySelectorAll('.tgme_widget_message_text'); // Adjust the selector as needed
					if (messages.length > 0) {
						return messages[messages.length - 1].innerText; // Get the last message text
					}
				}
			}
			async function getCode() {
				let message = await getLastMessage("https://t.me/s/goateddrops")
				if(message){
					message = message.replace(/[^\x00-\x7F]/g, ' ').trim()

					const code = message.split('$')[0].trim().split(/\s+/).pop()
					const value = message.split('$')[1].trim().split(/\s+/).shift()
					const require = message.split('$')[2].trim().split(/\s+/).shift()
					if(lastCode !== code){
						lastCode = code
						return {code,value,require}
					}

				}

			}
			
			function startInterval() {
				lastCode = null
				renderUsername()
				//status.textContent = 'Running'
				if (intervalId !== null) {
					clearInterval(intervalId);
				}
				intervalId = setInterval(async () => {
					let isExecuting = false
					try {
						if (!isExecuting && connectAccounts.turnstile) {
							isExecuting = true; // Set the flag to true
							const newCode = await getCode()
							if(newCode){
								await renderClaim(newCode.code)
							}
							isExecuting = false; // Reset the flag after completion
						}
					} catch (err) {
						console.log(err)
					}
				}, 1000);


				// Start new interval


				// Update button states
				startBtn.classList.add('hidden') 
				stopBtn.classList.remove('hidden') 
			}
			function stopInterval() {

				//status.textContent = 'Stoped'
				if (intervalId !== null) {
					clearInterval(intervalId);
					intervalId = null;
				}

				// Update button states
				startBtn.classList.remove('hidden') 
				stopBtn.classList.add('hidden') 
			}
			function addLogEntry(message) {
				const tableBody = document.getElementById('tableBody');
				const row = document.createElement('tr');
				row.className = `text-[#D9E66B]`;
				// Create the cells
				const dateCell = document.createElement('td');
				dateCell.className = "px-2 py-1 text-left text-xs whitespace-nowrap";
				dateCell.textContent = new Date().toLocaleString();
				const messageCell = document.createElement('td');
				messageCell.className = "px-2 py-1 text-left text-xs whitespace-nowrap";
				messageCell.textContent = message;
				// Append cells to the row
				row.appendChild(dateCell);
				row.appendChild(messageCell);
				tableBody.prepend(row); // Add the new row at the top

			}


			function addTurnstileWidget(){
				const turnstile = document.createElement('div');
				turnstile.id = `widgetFor`;
				turnstile.className = 'cf-turnstile';
				turnstileContainers.appendChild(turnstile);
				renderResultTurnstile()
			}


			function renderResultTurnstile(){
				let widgetContainers = document.querySelectorAll('.cf-turnstile');
				widgetContainers.forEach((container) => {
					if (container.turnstileWidgetId !== undefined) {
						const expired = turnstile.isExpired(container.turnstileWidgetId)
						if(expired){
							console.log(`turnstile`, expired)
							turnstile.reset(container.turnstileWidgetId);

						}
						console.log(container.turnstileWidgetId)
					} else {
						container.innerHTML = ''
						container.turnstileWidgetId = turnstile.render(container, {
							sitekey: '0x4AAAAAABGyzPbUyMRLthAB',
							callback: (token) => {
								
								connectAccounts.turnstile = token
								connectAccounts.widgetId = container.turnstileWidgetId
							},
							'error-callback': () => {}
						});
					}

				});
			}
		  // Action button functionality
			startBtn.addEventListener('click', function() {
				startInterval()
			});
			stopBtn.addEventListener('click', function() {
				stopInterval()
			});




}
	document.head.appendChild(scCf)

})();
