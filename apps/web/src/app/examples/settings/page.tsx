/**
 * Settings Page Example
 * Exemple complet de page de paramètres SaaS
 */

'use client';

import { useState } from 'react';
import { Card, Input, Select, Switch, Button, Tabs, TabList, Tab, TabPanels, TabPanel, Alert } from '@/components/ui';
import { ThemeManager } from '@/components/theme/ThemeManager';
import { PageHeader, PageContainer, Section } from '@/components/layout';

export default function SettingsExample() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <PageContainer>
      <PageHeader
        title="Paramètres"
        description="Gérez vos préférences et paramètres"
        breadcrumbs={[{ label: 'Exemples', href: '/examples' }, { label: 'Paramètres' }]}
      />

      <div className="space-y-8">
        <Tabs>
          <TabList>
            <Tab value="profile">Profil</Tab>
            <Tab value="notifications">Notifications</Tab>
            <Tab value="appearance">Apparence</Tab>
            <Tab value="security">Sécurité</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="profile">
              <Card title="Informations du profil" className="space-y-4">
                <Input label="Nom complet" placeholder="John Doe" />
                <Input label="Email" type="email" placeholder="john@example.com" />
                <Input label="Téléphone" type="tel" placeholder="+33 6 12 34 56 78" />
                <Button variant="primary">Enregistrer les modifications</Button>
              </Card>
            </TabPanel>

            <TabPanel value="notifications">
              <Card title="Préférences de notification" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notifications par email</h4>
                    <p className="text-sm text-gray-500">Recevoir des notifications par email</p>
                  </div>
                  <Switch checked={notifications} onChange={setNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Emails marketing</h4>
                    <p className="text-sm text-gray-500">Recevoir des offres et nouveautés</p>
                  </div>
                  <Switch checked={marketing} onChange={setMarketing} />
                </div>
              </Card>
            </TabPanel>

            <TabPanel value="appearance">
              <Card title="Apparence" className="space-y-6">
                <ThemeManager />
              </Card>
            </TabPanel>

            <TabPanel value="security">
              <Card title="Sécurité" className="space-y-4">
                <Alert variant="info" title="Conseil de sécurité">
                  Activez l'authentification à deux facteurs pour renforcer la sécurité de votre compte.
                </Alert>
                <Input label="Mot de passe actuel" type="password" />
                <Input label="Nouveau mot de passe" type="password" />
                <Input label="Confirmer le mot de passe" type="password" />
                <Button variant="primary">Changer le mot de passe</Button>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </PageContainer>
  );
}

