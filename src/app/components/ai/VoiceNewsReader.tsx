import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { PlayArrow, Stop, VolumeUp } from '@mui/icons-material';
import { getFunctions, httpsCallable } from 'firebase/functions';

interface VoiceNewsReaderProps {
  text: string;
  title?: string;
}

export const VoiceNewsReader: React.FC<VoiceNewsReaderProps> = ({ text, title }) => {
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);

  const handlePlay = async () => {
    if (audioObj) {
      audioObj.play();
      setPlaying(true);
      return;
    }

    setLoading(true);
    try {
      const functions = getFunctions();
      const ttsFn = httpsCallable(functions, 'sarvamTTS');
      const newsContent = `${title ? title + '. ' : ''}${text}`;
      
      const res = await ttsFn({ text: newsContent, speaker: 'meera', language: 'hi-IN' });
      const audioBase64 = (res.data as any).audioBase64;
      
      const newAudio = new Audio(`data:audio/wav;base64,${audioBase64}`);
      
      newAudio.onended = () => setPlaying(false);
      
      setAudioObj(newAudio);
      newAudio.play();
      setPlaying(true);
    } catch (error) {
      console.error("Sarvam TTS Voice Error:", error);
      alert("Awaaz generate nahi ho payi. Kripya baad mein prayas karein.");
    } finally {
      setLoading(false);
    }
  };

  const handleStop = () => {
    if (audioObj) {
      audioObj.pause();
      audioObj.currentTime = 0;
      setPlaying(false);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-red-50 p-3 rounded-lg border border-red-100 my-4 shadow-sm">
      <div className="bg-red-500 rounded-full p-2 text-white shadow-md flex items-center justify-center">
        <VolumeUp />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-red-800 text-sm">Sunye Aaj Ki Taza Khabar</h4>
        <p className="text-xs text-red-600">Sarvam AI dwara sanchalit</p>
      </div>
      <div>
        {!playing ? (
          <Button 
            variant="contained" 
            color="error" 
            onClick={handlePlay} 
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <PlayArrow />}
            className="!rounded-full !capitalize !px-4"
          >
            {loading ? 'Tyari...' : 'Sune'}
          </Button>
        ) : (
          <Button 
            variant="outlined" 
            color="error" 
            onClick={handleStop}
            startIcon={<Stop />}
            className="!rounded-full !capitalize !px-4"
          >
            Roken
          </Button>
        )}
      </div>
    </div>
  );
};
