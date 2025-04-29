// pages/api/image.tsx
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const textRaw = searchParams.get('text') || '';
  const text = textRaw.replace(/_/g, ' ');

  const imageUrl = 'https://i.ibb.co/qF3hJjRL/world.png'; // <- Replace with your image

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontFamily: 'Courier New, monospace',
            color: 'black',
            textAlign: 'center',
            marginTop: 48,
            marginLeft: 200,
            width: '100%',
          }}
        >
          {text}
        </div>
      </div>
    ),
    {
      width: 626,
      height: 351,
    }
  );
}
