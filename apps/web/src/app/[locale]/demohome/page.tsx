/**
 * Demo Home Page
 * Demo page for testing
 */

'use client';

import { Container, Card } from '@/components/ui';

export default function DemoHomePage() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Page Demo Home
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Bienvenue sur la page de démonstration.
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h2 className="text-2xl font-semibold mb-2 text-foreground">
                Contenu de démonstration
              </h2>
              <p className="text-muted-foreground">
                Cette page est accessible à l&apos;adresse /fr/demohome
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}
