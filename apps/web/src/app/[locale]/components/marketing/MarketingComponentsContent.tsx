/**
 * Marketing Components Showcase Page
 */

'use client';

import { PageHeader, PageContainer, Section } from '@/components/layout';
import { logger } from '@/lib/logger';
import { NewsletterSignup, LeadCaptureForm } from '@/components/marketing';

export default function MarketingComponentsContent() {
  return (
    <PageContainer>
      <PageHeader
        title="Composants Marketing"
        description="Composants pour le marketing et la capture de leads"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Composants', href: '/components' },
          { label: 'Marketing' },
        ]}
      />

      <div className="space-y-8 mt-8">
        <Section title="Newsletter Signup">
          <div className="max-w-md">
            <NewsletterSignup
              placeholder="Entrez votre email"
              buttonText="S'abonner"
              showNameFields={false}
              onSuccess={() => {
                logger.log('Newsletter signup successful');
              }}
              onError={(error) => {
                logger.error('', 'Newsletter signup error:', error);
              }}
            />
          </div>
        </Section>

        <Section title="Newsletter Signup with Name Fields">
          <div className="max-w-md">
            <NewsletterSignup
              placeholder="Entrez votre email"
              buttonText="S'abonner"
              showNameFields={true}
              onSuccess={() => {
                logger.log('Newsletter signup successful');
              }}
            />
          </div>
        </Section>

        <Section title="Lead Capture Form">
          <div className="max-w-2xl">
            <LeadCaptureForm
              onSubmit={async (data) => {
                logger.log('Lead captured:', data);
              }}
            />
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}

