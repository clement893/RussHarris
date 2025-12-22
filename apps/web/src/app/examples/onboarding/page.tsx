/**
 * Onboarding Example
 * Exemple de flow d'onboarding SaaS avec Stepper
 */

'use client';

import { useState } from 'react';
import { Stepper, Button, Input, Select, Card } from '@/components/ui';
import type { Step } from '@/components/ui';
import { PageHeader, PageContainer, Section } from '@/components/layout';

const steps: Step[] = [
  { id: '1', label: 'Informations de base', description: 'Vos informations personnelles' },
  { id: '2', label: 'Entreprise', description: 'Informations sur votre entreprise' },
  { id: '3', label: 'Préférences', description: 'Configurez vos préférences' },
  { id: '4', label: 'Confirmation', description: 'Vérifiez vos informations' },
];

export default function OnboardingExample() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    plan: 'basic',
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <Input
              label="Nom complet"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <Input
              label="Nom de l'entreprise"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Ma Société"
            />
            <Select
              label="Rôle"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              options={[
                { label: 'CEO', value: 'ceo' },
                { label: 'CTO', value: 'cto' },
                { label: 'Développeur', value: 'developer' },
              ]}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Select
              label="Plan"
              value={formData.plan}
              onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
              options={[
                { label: 'Basique', value: 'basic' },
                { label: 'Pro', value: 'pro' },
                { label: 'Enterprise', value: 'enterprise' },
              ]}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <Card>
              <div className="space-y-2">
                <p><strong>Nom:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Entreprise:</strong> {formData.company}</p>
                <p><strong>Rôle:</strong> {formData.role}</p>
                <p><strong>Plan:</strong> {formData.plan}</p>
              </div>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Onboarding"
        description="Exemple de flow d'onboarding"
        breadcrumbs={[{ label: 'Exemples', href: '/examples' }, { label: 'Onboarding' }]}
      />

      <div className="space-y-8">
        <Section title="Configuration de votre compte">
          <Stepper
            steps={steps}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            allowNavigation
          />
        </Section>

        <Card title={steps[currentStep]?.label} className="min-h-[300px]">
          {renderStepContent()}
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Précédent
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
          >
            {currentStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}

