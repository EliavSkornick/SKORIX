import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Image as ImageIcon, 
  X, 
  Loader2, 
  Zap, 
  Cloud, 
  User, 
  Cpu 
} from 'lucide-react';

/**
 * SkorChat Pro - Vision Edition
 * Inventor: Eliav Skornick
 * Powered by Gemini 2.5 Flash
 */

const apiKey = ""; // Runtime provided key

const SkorChatPro = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "שלום אליאב! אני SkorChat Pro. המערכת מוכנה לפקודתך. איך אבא שלי רוצה להתקדם היום? 🚀" }
  ]);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // API Call with Exponential Backoff
  const callGeminiVision = async (prompt, base64Image) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [{
        role: "user",
        parts: [
          { text: prompt || "תאר מה אתה רואה בתמונה הזו בפירוט." },
          { 
            inlineData: { 
              mimeType: "image/png", 
              data: base64Image.split(',')[1] 
            } 
          }
        ]
      }]
    };

    let delay = 1000;
    for (let i = 0; i < 5; i++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
      } catch (err) {
        if (i === 4) throw err;
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const currentInput = input;
    const currentImage = selectedImage;
    
    // Add user message to UI
    const userMsg = { role: 'user', text: currentInput, image: currentImage };
    setMessages(prev => [...prev, userMsg]);
    
    setInput("");
    setSelectedImage(null);
    setIsAnalyzing(true);

    try {
      let responseText;
      if (currentImage) {
        // Image Analysis Path
        responseText = await callGeminiVision(currentInput, currentImage);
      } else {
        // Pure Text Path (simplified for this version)
        const textUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
        const res = await fetch(textUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: currentInput }] }] })
        });
        const data = await res.json();
        responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      }

      setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: "מצטער אליאב, קרתה שגיאה בחיבור למערכת. נסה שוב." }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      
      {/* Header - Based on Screenshot */}
      <header className="flex justify-between items-center p-6 border-b border-white/5 bg-black/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse shadow-[0_0_8px_#4ade80]" />
          <span className="text-[10px] tracking-widest uppercase font-bold text-gray-400">Cloud Connected</span>
        </div>
        <div className="text-right">
          <h1 className="text-xl font-black tracking-tighter">SkorChat <span className="text-[#4ade80]">Pro</span></h1>
          <p className="text-[8px] tracking-[0.3em] uppercase text-gray-500">Eliav Skornick Edition</p>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6 flex flex-col items-center">
        <div className="w-full max-w-2xl space-y-6 pb-20">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2`}>
              <div className={`group relative max-w-[85%] md:max-w-[75%] p-4 rounded-2xl ${
                m.role === 'user' 
                ? 'bg-[#1a1a1a] text-white border border-white/10' 
                : 'bg-[#111] text-gray-200 border border-white/5 shadow-xl'
              }`}>
                {m.image && (
                  <img src={m.image} alt="Upload" className="w-full h-auto rounded-lg mb-3 border border-white/10" />
                )}
                <p className="text-sm leading-relaxed text-right dir-rtl">{m.text}</p>
                
                {/* Visual Label for Assistant */}
                {m.role === 'assistant' && (
                  <div className="absolute -bottom-5 right-2 text-[8px] uppercase tracking-widest text-gray-600 font-bold">
                    Skor System Response
                  </div>
                )}
              </div>
            </div>
          ))}
          {isAnalyzing && (
            <div className="flex items-center gap-3 text-gray-500 text-xs animate-pulse p-4">
              <Loader2 className="animate-spin w-4 h-4" />
              <span>מנתח נתונים ב-Sector 42...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </main>

      {/* Input Section - Based on Screenshot */}
      <footer className="p-6 bg-gradient-to-t from-black via-black to-transparent">
        <div className="max-w-2xl mx-auto relative group">
          
          {/* Image Preview Thumbnail */}
          {selectedImage && (
            <div className="absolute -top-24 left-0 p-2 bg-[#1a1a1a] border border-white/10 rounded-xl animate-in zoom-in-95">
              <img src={selectedImage} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X size={10} />
              </button>
            </div>
          )}

          <div className="flex items-center gap-3 bg-[#111] border border-white/10 rounded-3xl p-2 px-4 focus-within:border-[#4ade80]/50 transition-all shadow-2xl">
            <button 
              onClick={() => fileInputRef.current.click()}
              className="p-3 text-gray-400 hover:text-[#4ade80] transition-colors rounded-full hover:bg-white/5"
            >
              <ImageIcon size={20} />
            </button>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImageChange}
            />
            
            <input 
              type="text"
              placeholder="...SkorChat Pro שאל את"
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 text-right dir-rtl placeholder:text-gray-600"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />

            <button 
              onClick={handleSend}
              disabled={isAnalyzing}
              className={`p-3 rounded-2xl transition-all ${
                (input.trim() || selectedImage) && !isAnalyzing
                ? 'bg-[#4ade80] text-black shadow-[0_0_15px_#4ade8088]' 
                : 'bg-white/5 text-gray-600'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
        
        <div className="text-center mt-6 text-[9px] tracking-[0.2em] text-gray-600 font-bold uppercase">
          Inventor: Eliav Skornick | SkorChat Pro V10.0
        </div>
      </footer>

      <style>{`
        .dir-rtl { direction: rtl; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default SkorChatPro;

