import { GrainGradient } from '@paper-design/shaders-react';

interface ShaderBackgroundProps {
  colorBack?: string;
  colors?: [string, string, string];
}

export default function ShaderBackground({
  colorBack = '#1C1A1F',
  colors = ['#F7FF9E', '#F7FF9E', '#F7FF9E'],
}: ShaderBackgroundProps) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -10,
        overflow: 'hidden',
      }}
    >
      <GrainGradient
        style={{ height: '100%', width: '100%' }}
        colorBack={colorBack}
        softness={0.76}
        intensity={0.45}
        noise={0}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={0.25}
        colors={colors}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 45% 50%, rgba(28,26,31,0.95) 0%, rgba(28,26,31,0.93) 20%, rgba(28,26,31,0.88) 32%, rgba(28,26,31,0.82) 42%, rgba(28,26,31,0.72) 52%, rgba(28,26,31,0.6) 62%, rgba(28,26,31,0.44) 72%, rgba(28,26,31,0.26) 82%, rgba(28,26,31,0.1) 90%, transparent 98%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
