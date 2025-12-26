/**
 * AI Components Showcase Page
 */

'use client';

import { PageHeader, PageContainer, Section } from '@/components/layout';
import { AIChat } from '@/components/ai';

export default function AIComponentsContent() {
  return (
    <PageContainer>
      <PageHeader
        title="Composants IA"
        description="Composants d'intelligence artificielle et chat conversationnel"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Composants', href: '/components' },
          { label: 'IA' },
        ]}
      />

      <div className="space-y-8 mt-8">
        <Section title="AI Chat">
          <div className="max-w-4xl">
            <AIChat
              systemPrompt="You are a helpful AI assistant."
              provider="auto"
            />
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}

