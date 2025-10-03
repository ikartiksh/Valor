import { useState } from 'react';

function VoiceAgent({ text }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = async () => {
    setIsPlaying(true);
    try {
      const res = await fetch('https://api.cartesia.ai/tts/bytes', {
        method: 'POST',
        headers: {
          'Cartesia-Version': '2024-06-10',
          'X-API-Key': 'YOUR_CARTESIA_KEY', // Replace with your key or proxy via backend
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: text,
          model_id: 'sonic-english-v2',
          voice: { mode: 'id', id: '79a125e8-cd45-4c13-8a67-188112f4dd22' }, // Example voice
          output_format: { container: 'wav', encoding: 'pcm_s16le', sample_rate: 44100 },
        }),
      });
      if (!res.ok) throw new Error('TTS failed');
      const arrayBuffer = await res.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: 'audio/wav' });
      const audio = new Audio(URL.createObjectURL(blob));
      audio.play();
      audio.onended = () => setIsPlaying(false);
    } catch (err) {
      console.error(err);
      setIsPlaying(false);
    }
  };

  return (
    <button onClick={playAudio} disabled={isPlaying} className="mt-2 bg-green-500 text-white p-2 rounded">
      {isPlaying ? 'Playing...' : 'Listen to Summary'}
    </button>
  );
}

export default VoiceAgent;