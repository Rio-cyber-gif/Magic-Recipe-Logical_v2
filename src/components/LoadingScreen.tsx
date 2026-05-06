import { useEffect, useState } from 'react';

const MESSAGES = [
  '食材を解析中...',
  'レシピをコンパイル中...',
  'Build Successful ✦',
];

export function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [started, setStarted] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => setStarted(true));
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const timers = MESSAGES.slice(1).flatMap((_, i) => [
      setTimeout(() => setVisible(false), (i + 1) * 2500 - 300),
      setTimeout(() => {
        setMessageIndex(i + 1);
        setVisible(true);
      }, (i + 1) * 2500),
    ]);
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setPulse(p => !p), 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-8">
      <img
        src="/fb.png"
        alt="Magic Recipe Logical"
        className="w-24 h-24 object-contain"
      />

      <p
        className="text-base tracking-[0.3em] text-primary font-medium"
        style={{ opacity: pulse ? 0.9 : 0.25, transition: 'opacity 1.1s ease' }}
      >
        もう、美味しい予感しかしていません
      </p>

      <div className="space-y-6 w-full">
        <div className="text-center space-y-2">
          <p className="text-xs text-muted-foreground tracking-widest uppercase">錬成中</p>
          <p
            className="text-sm text-foreground font-mono h-5"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease' }}
          >
            {MESSAGES[messageIndex]}
          </p>
        </div>
        <div className="w-full max-w-xs mx-auto h-0.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full"
            style={{
              width: started ? '100%' : '0%',
              transition: 'width 7.3s linear',
            }}
          />
        </div>
      </div>
    </div>
  );
}
