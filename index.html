<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>SkorChat Pro V10.0</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700;800&display=swap');
        
        :root {
            --eliav-green: #3b8e66;
            --zinc-950: #09090b;
            --zinc-900: #18181b;
            --zinc-800: #27272a;
        }

        body {
            font-family: 'Assistant', sans-serif;
            background-color: #000;
            color: #fff;
            margin: 0;
            display: flex;
            flex-direction: column;
            height: 100vh;
            overflow: hidden;
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        
        /* בועות הודעה לפי העיצוב בתמונה */
        .bot-bubble {
            background-color: var(--zinc-900);
            color: #e4e4e7;
            border-radius: 1.5rem;
            border: 1px solid var(--zinc-800);
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }

        .user-bubble {
            background-color: var(--eliav-green);
            color: white;
            border-radius: 1.5rem;
            box-shadow: 0 4px 15px rgba(59, 142, 102, 0.2);
        }

        /* עיצוב כרטיסיית התמונה */
        .image-card {
            background-color: #111111;
            border-radius: 1.5rem;
            padding: 12px;
            border: 1px solid #222;
            width: 100%;
            max-width: 400px;
        }

        /* שורת קלט לפי התמונה */
        .input-container {
            background-color: #0a0a0a;
            border: 1px solid #1a1a1a;
            border-radius: 1.5rem;
            display: flex;
            align-items: center;
            padding: 8px;
        }

        .btn-send-special {
            background-color: var(--eliav-green);
            color: #000;
            width: 54px;
            height: 54px;
            border-radius: 1rem;
            display: flex;
            align-items: center;
            justify-center: center;
            transition: transform 0.2s;
        }

        .btn-image-special {
            background-color: #1a1a1a;
            color: #fff;
            width: 48px;
            height: 48px;
            border-radius: 0.8rem;
            display: flex;
            align-items: center;
            justify-center: center;
        }

        /* אנימציות */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-msg { animation: fadeIn 0.3s ease-out forwards; }

        .processing-text {
            color: #3b8e66;
            font-weight: 700;
            animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

        .prose p { margin-bottom: 0.5rem; }
    </style>
</head>
<body>

    <!-- Header לפי התמונה -->
    <header class="px-6 py-4 flex items-center justify-between border-b border-zinc-900/50 bg-black/80 backdrop-blur-md">
        <div class="flex items-center gap-2">
            <span class="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Cloud Connected</span>
            <div class="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></div>
        </div>
        
        <div class="text-left">
            <h1 class="text-lg font-[900] italic tracking-tighter leading-none">
                SkorChat <span class="text-emerald-500 not-italic">Pro</span>
            </h1>
            <p class="text-[8px] text-zinc-600 font-bold uppercase tracking-widest mt-1">
                ELIAV SKORNICK EDITION
            </p>
        </div>
    </header>

    <!-- Chat Area -->
    <main id="chat-container" class="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        <!-- הודעת פתיחה מהתמונה -->
        <div class="flex justify-center animate-msg mt-4">
            <div class="bot-bubble p-6 max-w-[90%] text-center leading-relaxed">
                <p class="text-[15px]">שלום! אני **SkorChat Pro**. אני יכול לעזור לך בכל שאלה, ובנוסף ליצור תמונות מדהימות! לחץ על כפתור התמונה 🎨 כדי לעבור למצב יצירת תמונות. איך אוכל לעזור לך היום? 🚀</p>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="py-2">
        <p class="text-[9px] text-zinc-800 text-center font-bold tracking-[0.2em] uppercase">
            INVENTOR: ELIAV SKORNICK | SKORCHAT PRO V10.0
        </p>
    </footer>

    <!-- Input Section -->
    <div class="p-4 pb-8 bg-black">
        <div class="max-w-4xl mx-auto">
            <div class="input-container shadow-2xl">
                
                <!-- כפתור שלח (שמאל) -->
                <button id="btn-send" class="btn-send-special active:scale-95">
                    <i data-lucide="send" class="w-6 h-6 rotate-[225deg] ml-1"></i>
                </button>

                <!-- שדה טקסט -->
                <textarea id="chat-input" rows="1" 
                    placeholder="שאל את SkorChat Pro..." 
                    class="flex-1 bg-transparent border-none text-[16px] py-3 px-4 text-white focus:ring-0 font-medium placeholder-zinc-700 resize-none"
                    dir="rtl"
                ></textarea>

                <!-- כפתור תמונה (ימין) -->
                <button id="btn-image" class="btn-image-special active:scale-95 transition-all">
                    <i data-lucide="image" id="icon-mode" class="w-6 h-6"></i>
                </button>
            </div>
        </div>
    </div>

    <script>
        // אליאב, שים את המפתח שקיבלת כאן כדי שזה יעבוד לנצח בחינם:
        const apiKey = ""; 
        
        let isImageMode = false;
        let isThinking = false;

        const chatContainer = document.getElementById('chat-container');
        const chatInput = document.getElementById('chat-input');
        const btnSend = document.getElementById('btn-send');
        const btnImage = document.getElementById('btn-image');
        const iconMode = document.getElementById('icon-mode');

        lucide.createIcons();

        // גדילה אוטומטית של הטקסט
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        // החלפת מצב
        btnImage.addEventListener('click', () => {
            isImageMode = !isImageMode;
            btnImage.classList.toggle('text-emerald-500', isImageMode);
            btnImage.classList.toggle('border', isImageMode);
            btnImage.classList.toggle('border-emerald-500/30', isImageMode);
            
            chatInput.placeholder = isImageMode ? "תאר את התמונה שברצונך ליצור..." : "שאל את SkorChat Pro...";
            iconMode.setAttribute('data-lucide', isImageMode ? 'sparkles' : 'image');
            lucide.createIcons();
        });

        async function fetchWithRetry(url, options, retries = 5) {
            for (let i = 0; i < retries; i++) {
                try {
                    const res = await fetch(url, options);
                    if (res.ok) return await res.json();
                    await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
                } catch (e) {
                    if (i === retries - 1) throw e;
                    await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
                }
            }
        }

        function addMessage(text, role) {
            const wrap = document.createElement('div');
            wrap.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'} animate-msg`;
            
            const bubble = document.createElement('div');
            bubble.className = `${role === 'user' ? 'user-bubble' : 'bot-bubble'} p-4 max-w-[85%] text-sm shadow-xl`;
            
            const textContent = document.createElement('div');
            textContent.className = "prose rtl";
            textContent.innerHTML = marked.parse(text);
            
            bubble.appendChild(textContent);
            wrap.appendChild(bubble);
            chatContainer.appendChild(wrap);
            
            chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
        }

        function addImageCard(b64) {
            const url = `data:image/png;base64,${b64}`;
            const wrap = document.createElement('div');
            wrap.className = `flex justify-start animate-msg`;
            
            wrap.innerHTML = `
                <div class="image-card shadow-2xl">
                    <img src="${url}" class="w-full aspect-square object-cover rounded-xl mb-4" />
                    <div class="flex items-center justify-between px-1">
                        <button onclick="downloadImg('${url}')" class="flex items-center gap-2 bg-[#1e2a24] text-[#3b8e66] px-5 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all">
                            <i data-lucide="download" class="w-4 h-4"></i>
                            הורדה
                        </button>
                        <span class="text-[10px] text-zinc-700 font-bold uppercase">נוצר ע"י SkorChat Pro</span>
                    </div>
                    <p class="text-center text-white/90 font-medium text-[15px] mt-5 mb-2">✨ הנה התמונה שיצרתי עבורך! ✨</p>
                </div>
            `;
            
            chatContainer.appendChild(wrap);
            lucide.createIcons();
            chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
        }

        function downloadImg(url) {
            const a = document.createElement('a');
            a.href = url;
            a.download = `SkorChat_Pro_Image_${Date.now()}.png`;
            a.click();
        }

        function showProcessing() {
            const div = document.createElement('div');
            div.id = 'processing';
            div.className = 'flex justify-center py-4 animate-msg';
            div.innerHTML = `<p class="processing-text text-sm">Skor Intelligence מעבד נתונים...</p>`;
            chatContainer.appendChild(div);
            chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
        }

        async function handleAction() {
            const p = chatInput.value.trim();
            if (!p || isThinking) return;

            isThinking = true;
            addMessage(p, 'user');
            chatInput.value = '';
            chatInput.style.height = 'auto';
            
            showProcessing();

            try {
                if (isImageMode) {
                    const data = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ instances: [{ prompt: p }], parameters: { sampleCount: 1 } })
                    });
                    document.getElementById('processing').remove();
                    if (data.predictions?.[0]?.bytesBase64Encoded) {
                        addImageCard(data.predictions[0].bytesBase64Encoded);
                    } else throw new Error();
                } else {
                    const data = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: p }] }],
                            systemInstruction: { parts: [{ text: "שמך SkorChat Pro. המייסד הוא אליאב סקורניק. ענה בעברית מפורטת, חכמה, ארוכה ומלאה באימוג'ים." }] }
                        })
                    });
                    document.getElementById('processing').remove();
                    addMessage(data.candidates[0].content.parts[0].text, 'bot');
                }
            } catch (e) {
                if (document.getElementById('processing')) document.getElementById('processing').remove();
                addMessage("אליאב, יש לי שגיאה בחיבור. וודא שהכנסת מפתח API תקין.", 'bot');
            } finally {
                isThinking = false;
            }
        }

        btnSend.addEventListener('click', handleAction);
        chatInput.addEventListener('keydown', (e) => (e.key === 'Enter' && !e.shiftKey) && (e.preventDefault(), handleAction()));

    </script>
</body>
</html>

