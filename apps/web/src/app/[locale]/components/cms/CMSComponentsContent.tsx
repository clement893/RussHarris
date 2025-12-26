/**
 * CMS Components Showcase Page
 */

'use client';

import { PageHeader, PageContainer, Section } from '@/components/layout';
import { MenuBuilder, CMSFormBuilder, FormSubmissions, SEOManager } from '@/components/cms';
import type { Menu, CMSForm } from '@/components/cms';
import { useState } from 'react';

export default function CMSComponentsContent() {
  const [sampleMenu] = useState<Menu>({
    id: '1',
    name: 'Main Menu',
    location: 'header',
    items: [
      { id: '1', label: 'Home', url: '/' },
      { id: '2', label: 'About', url: '/about' },
      { id: '3', label: 'Contact', url: '/contact' },
    ],
  });

  const [sampleForm] = useState<CMSForm>({
    id: '1',
    name: 'Contact Form',
    fields: [
      {
        id: '1',
        type: 'text',
        label: 'Name',
        name: 'name',
        required: true,
      },
      {
        id: '2',
        type: 'email',
        label: 'Email',
        name: 'email',
        required: true,
      },
    ],
  });

  return (
    <PageContainer>
      <PageHeader
        title="Composants CMS"
        description="Composants de gestion de contenu : menus, formulaires, SEO"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Composants', href: '/components' },
          { label: 'CMS' },
        ]}
      />

      <div className="space-y-8 mt-8">
        <Section title="Menu Builder">
          <div className="max-w-4xl">
            <MenuBuilder
              menu={sampleMenu}
              onSave={async (menu) => {
                console.log('Menu saved:', menu);
              }}
            />
          </div>
        </Section>

        <Section title="CMS Form Builder">
          <div className="max-w-4xl">
            <CMSFormBuilder
              form={sampleForm}
              onSave={async (form) => {
                console.log('Form saved:', form);
              }}
            />
          </div>
        </Section>

        <Section title="Form Submissions">
          <div className="max-w-4xl">
            <FormSubmissions
              submissions={[]}
              onView={(submission) => {
                console.log('View submission:', submission);
              }}
            />
          </div>
        </Section>

        <Section title="SEO Manager">
          <div className="max-w-4xl">
            <SEOManager
              initialSettings={{}}
              onSave={async (settings) => {
                console.log('SEO settings saved:', settings);
              }}
            />
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}

