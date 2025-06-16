<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SkorChat 🦁 - מערכת צ'אט חכמה על שם אליאב סקורניק</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Heebo', sans-serif;
      background: linear-gradient(135deg, #1f2937, #111827);
      color: white;
    }
    .chat-container {
      height: 60vh;
      overflow-y: auto;
      scroll-behavior: smooth;
    }
    .user-message {
      background: linear-gradient(135deg, #facc15, #fbbf24);
      border-radius: 0 15px 15px 15px;
      padding: 10px;
      margin-bottom: 10px;
      color: black;
    }
    .bot-message {
      background: linear-gradient(135deg, #e5e7eb, #d1d5db);
      border-radius: 15px 0 15px 15px;
      padding: 10px;
      margin-bottom: 10px;
      color: black;
    }
    .gold-button {
      background: linear-gradient(135deg, #facc15, #fbbf24);
      color: black;
      font-weight: bold;
      padding: 10px 20px;
      border-radius: 10px;
    }
  </style>
</head>
<body class="min-h-screen p-4">
  <div class="max-w-3xl mx-auto">
    <h1 class="text-4xl font-bold text-yellow-400 mb-2">SkorChat 🦁</h1>
    <p class="mb-6">מערכת צ'אט חכמה על שם אליאב סקורניק</p>

    <div class="bg-white bg-opacity-10 p-4 rounded-lg shadow-lg">
      <div id="chat-container" class="chat-container mb-4"></div>
      <div class="flex gap-2">
        <input id="user-input" type="text" placeholder="כתוב כאן את מה שאתה רוצה לשאול..."
          class="flex-1 bg-white bg-opacity-20 rounded px-4 py-2" />
        <button id="send-button" class="gold-button">שלח</button>
      </div>
    </div>

    <div id="api-key-modal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div class="bg-white text-black p-6 rounded-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">הזן את מפתח ה-API של OpenAI</h2>
        <p class="mb-2">כדי להשתמש ב-SkorChat, אנא הזן את מפתח ה-API שלך מ-OpenAI.</p>
        <input id="api-key-input" type="text" placeholder="...sk-" class="w-full border p-2 mb-4" />
        <button id="save-api-key" class="gold-button w-full">שמור</button>
      </div>
    </div>

    <p class="text-center mt-10 text-sm text-gray-400">SkorChat - Powered by Skornick © 2025</p>
  </div>

  <script>
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const apiKeyModal = document.getElementById('api-key-modal');
    const apiKeyInput = document.getElementById('api-key-input');
    const saveApiKeyButton = document.getElementById('save-api-key');

    let apiKey = localStorage.getItem('openai_api_key');

    const addMessageToUI = (sender, text) => {
      const messageDiv = document.createElement('div');
      messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
      messageDiv.textContent = text;
      chatContainer.appendChild(messageDiv);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    const sendMessage = async () => {
      const message = userInput.value.trim();
      if (!message) return;

      addMessageToUI('user', message);
      userInput.value = '';
      sendButton.disabled = true;
      sendButton.textContent = '...חושב';

      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }]
          }),
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "שגיאה בתגובה.";
        addMessageToUI('bot', reply);
      } catch (error) {
        addMessageToUI('bot', "שגיאה בשליחת הבקשה. ודא שה-API Key תקין.");
      } finally {
        sendButton.disabled = false;
        sendButton.textContent = 'שלח';
      }
    };

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    saveApiKeyButton.addEventListener('click', () => {
      const key = apiKeyInput.value.trim();
      if (key) {
        localStorage.setItem('openai_api_key', key);
        apiKey = key;
        apiKeyModal.style.display = 'none';
      }
    });

    if (!apiKey) {
      apiKeyModal.style.display = 'flex';
    } else {
      apiKeyModal.style.display = 'none';
    }
  </script>
</body>
</html>
