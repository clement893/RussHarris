/**
 * Profile Components Showcase Page
 */

'use client';

import { PageHeader, PageContainer, Section } from '@/components/layout';
import { ProfileCard, ProfileForm } from '@/components/profile';
import { logger } from '@/lib/logger';
import { useState } from 'react';

export default function ProfileComponentsContent() {
  const [profileData, setProfileData] = useState({
    id: '1',
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    avatar: '/images/avatars/john.jpg',
  });

  return (
    <PageContainer>
      <PageHeader
        title="Composants Profil"
        description="Composants de profil utilisateur avec carte et formulaire"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Composants', href: '/components' },
          { label: 'Profil' },
        ]}
      />

      <div className="space-y-8 mt-8">
        <Section title="Profile Card">
          <div className="max-w-md">
            <ProfileCard
              user={profileData}
              onEdit={() => {
                logger.info('Edit profile');
              }}
            />
          </div>
        </Section>

        <Section title="Profile Form">
          <div className="max-w-2xl">
            <ProfileForm
              user={profileData}
              onSubmit={async (data) => {
                logger.info('Profile updated:', { data });
                setProfileData({ ...profileData, ...data });
              }}
            />
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}

