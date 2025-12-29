import { notFound } from 'next/navigation';
import DesignStyleContent from './DesignStyleContent';

const validStyles = ['modern-minimal', 'glassmorphism', 'neon-cyberpunk', 'corporate-professional', 'playful-colorful'];

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default function DesignStylePage({ params }: { params: { style: string } }) {
  if (!validStyles.includes(params.style)) {
    notFound();
  }

  return <DesignStyleContent style={params.style} />;
}
