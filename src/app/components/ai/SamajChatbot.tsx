import React, { useState } from 'react';
import { Button, TextField, CircularProgress, IconButton } from '@mui/material';
import { Send, VolumeUp, Mic } from '@mui/icons-material';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { motion } from 'framer-motion';

export const SamajChatbot: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Namaste! Main Samaj ki sahayata ke liye yahan hoon. Aapko kya jaana hai?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const functions = getFunctions();
      // Dummy logic: We can hook this up to Gemini for brain + Sarvam for translation/voice
      // For now we will echo back using Sarvam Translate (English to Hindi) or mock response
      const translateFn = httpsCallable(functions, 'sarvamTranslate');
      const response = await translateFn({ text: userMsg, source: "en-IN", target: "hi-IN" });
      const botReply = (response.data as any)?.translatedText || "Main samajhne ki koshish kar raha hoon.";
      
      setMessages(prev => [...prev, { role: 'bot', text: `(Translated): ${botReply}` }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Maaf karein, network error hai." }]);
    } finally {
      setLoading(false);
    }
  };

  const playVoice = async (text: string) => {
    setAudioLoading(true);
    try {
      const functions = getFunctions();
      const ttsFn = httpsCallable(functions, 'sarvamTTS');
      const res = await ttsFn({ text, speaker: 'meera', language: 'hi-IN' });
      const audioBase64 = (res.data as any).audioBase64;
      
      const audio = new Audio(`data:audio/wav;base64,${audioBase64}`);
      audio.play();
    } catch (error) {
      console.error("TTS Error:", error);
      alert("Awaaz play karne mein error hui.");
    } finally {
      setAudioLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-80 h-96 bg-white shadow-2xl rounded-2xl flex flex-col border border-orange-200 overflow-hidden"
      >
        <div className="bg-orange-600 text-white p-3 font-bold flex justify-between items-center">
          <span>🚩 Samaj AI Sahayak</span>
          <Mic className="text-white opacity-80" />
        </div>
        
        <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-orange-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-2 px-3 rounded-lg max-w-[80%] ${m.role === 'user' ? 'bg-orange-500 text-white rounded-br-none' : 'bg-white border rounded-bl-none shadow-sm'}`}>
                {m.text}
                {m.role === 'bot' && (
                  <IconButton size="small" onClick={() => playVoice(m.text)} disabled={audioLoading}>
                    <VolumeUp fontSize="small" className="text-orange-500" />
                  </IconButton>
                )}
              </div>
            </div>
          ))}
          {loading && <div className="text-sm text-gray-500 ml-2">Type kar raha hai...</div>}
        </div>

        <div className="p-2 bg-white border-t flex gap-2">
          <TextField 
            fullWidth 
            size="small" 
            placeholder="Kuch puchiye..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button variant="contained" color="warning" className="!bg-orange-600" onClick={handleSend} disabled={loading}>
            {loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
