import React, { useState } from 'react';
import { Button, TextField, CircularProgress, Card, CardContent, Typography } from '@mui/material';
import { AutoAwesome, Translate } from '@mui/icons-material';
import { getFunctions, httpsCallable } from 'firebase/functions';

interface AutoNewsWriterProps {
  onNewsGenerated: (title: string, content: string) => void;
}

export const AutoNewsWriter: React.FC<AutoNewsWriterProps> = ({ onNewsGenerated }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateTranslate = async () => {
    if (!topic.trim()) return;
    setLoading(true);

    try {
      const functions = getFunctions();
      const translateFn = httpsCallable(functions, 'sarvamTranslate');
      
      // We will pretend to prompt it to translate to Hindi formatting as news
      const payload = { text: "Breaking News: " + topic, source: "en-IN", target: "hi-IN" };
      const response = await translateFn(payload);
      
      const hindiNews = (response.data as any)?.translatedText || "";
      
      if (hindiNews) {
        onNewsGenerated("ताज़ा खबर / Update", hindiNews);
        setTopic('');
      } else {
        alert("Failed to generate content.");
      }
    } catch (error) {
      console.error("Auto News Gen Error:", error);
      alert("AI Dwara news generate karne mein error aayi, kripya baad mein try kare.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6 border border-orange-200 shadow-sm bg-orange-50/30">
      <CardContent>
        <Typography variant="h6" className="text-orange-800 font-bold flex items-center gap-2 mb-3">
          <AutoAwesome className="text-orange-500" />
          Sarvam AI Auto News Writer
        </Typography>
        <p className="text-sm text-gray-600 mb-4">
          English mein topic likhein, Sarvam AI isse shudh Hindi news mein translate aur format karega.
        </p>

        <div className="flex gap-3">
          <TextField 
            fullWidth 
            size="medium"
            placeholder="E.g. Lakhara Samaj organizes a massive blood donation camp in Jaipur..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Button 
            variant="contained" 
            color="warning" 
            className="!bg-orange-600 !px-6 !shrink-0"
            onClick={handleGenerateTranslate}
            disabled={loading || !topic.trim()}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Translate />}
          >
            {loading ? 'Tyari...' : 'Write in Hindi'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
