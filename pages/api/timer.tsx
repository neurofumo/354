// pages/api/timer.tsx
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

function getNextTargetTimestamp(month: number, day: number, hour: number, minute: number, second: number): number {
  const now = new Date();
  const currentYear = now.getFullYear();
  let target = new Date(currentYear, month - 1, day, hour, minute, second);
  if (target.getTime() <= now.getTime()) {
    target = new Date(currentYear + 1, month - 1, day, hour, minute, second);
  }
  return Math.floor(target.getTime() / 1000);
}

function formatTime(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'neuro';
  const protocol = req.headers.get('host')?.includes('localhost') ? 'http' : 'https';

  // Default (neuro)
  let target = {
    month: 12,
    day: 20,
    hour: 12,
    minute: 0,
    second: 0,
  };
  let imageUrl = `${protocol}://${req.headers.get('host')}/images/neurosbirthday.png`;

  // If type is 'evil', override config
  if (type === 'evil') {
    target = {
      month: 7,
      day: 28,
      hour: 0,
      minute: 0,
      second: 0,
    };
    imageUrl = `${protocol}://${req.headers.get('host')}/images/evilsbirthday.png`; // <- Update to your evil background
  }

  const now = Math.floor(Date.now() / 1000);
  const targetTimestamp = getNextTargetTimestamp(
    target.month,
    target.day,
    target.hour,
    target.minute,
    target.second
  );
  const timeLeft = targetTimestamp - now;

  const days = Math.floor(timeLeft / 86400);
  const hours = Math.floor((timeLeft % 86400) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const boxStyle = {
    fontSize: 128,
    color: 'white',
    width: 90,
    height: 90,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"First Coffee", monospace',
  } as const;

  return new ImageResponse(
  (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Days Text Box */}
      <div
        style={{
          position: 'absolute',
          left: 271,
          top: 393,
          width: 200, // 471 - 271
          height: 202, // 595 - 393
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 128,
          color: 'white',
          fontFamily: '"First Coffee", monospace',
        }}
      >
        {formatTime(days)}
      </div>

      {/* Hours Text Box */}
      <div
        style={{
          position: 'absolute',
          left: 552,
          top: 386,
          width: 204, // 756 - 552
          height: 212, // 598 - 386
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 128,
          color: 'white',
          fontFamily: '"First Coffee", monospace',
        }}
      >
        {formatTime(hours)}
      </div>

      {/* Minutes Text Box */}
      <div
        style={{
          position: 'absolute',
          left: 842,
          top: 391,
          width: 203, // 1045 - 842
          height: 204, // 595 - 391
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 128,
          color: 'white',
          fontFamily: '"First Coffee", monospace',
        }}
      >
        {formatTime(minutes)}
      </div>

      {/* Seconds Text Box */}
      <div
        style={{
          position: 'absolute',
          left: 1128,
          top: 386,
          width: 203, // 1331 - 1128
          height: 208, // 594 - 386
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 128,
          color: 'white',
          fontFamily: '"First Coffee", monospace',
        }}
      >
        {formatTime(seconds)}
      </div>
    </div>
  ),
  {
    width: 1600,
    height: 900,
    fonts: [
      {
        name: 'First Coffee',
        data: await fetch(
          new URL('../../public/fonts/FirstCoffee.ttf', import.meta.url)
        ).then(res => res.arrayBuffer()),
        style: 'normal',
        weight: 400,
      },
    ],
  }
);

}
