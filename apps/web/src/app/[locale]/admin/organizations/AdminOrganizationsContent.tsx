'use client';

import { useEffect, useState } from 'react';
import { PageHeader, PageContainer } from '@/components/layout';
import { getErrorMessage, getErrorDetail } from '@/lib/errors';
import { Button, Card, Badge, Alert, Input, Textarea, Loading, Modal, DataTable } from '@/components/ui';
import type { Column } from '@/components/ui/DataTable';

interface TeamSettings {
  email?: string;
  phone?: string;
  website?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  timezone?: string;
  locale?: string;
}

interface Team extends Record<string, unknown> {
  id: string;
  name: string;
  slug: string;
  description?: string;
  member_count: number;
  organization_id?: string;
  created_at: string;
  settings?: TeamSettings | string;
  owner?: {
    id: number;
    email: string;
    first_name?: string;
    last_name?: string;
  };
}

export default function AdminOrganizationsContent() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDescription, setNewTeamDescription] = useState('');

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const { teamsAPI } = await import('@/lib/api/teams');
      const response = await teamsAPI.list();
      
      if (response.data) {
        // Backend returns { teams: [...], total: ... }
        const teamsData = response.data.teams || response.data;
        interface BackendTeam {
          id: number | string;
          name: string;
          slug?: string;
          description?: string;
          member_count?: number;
          organization_id?: string;
          created_at: string;
          settings?: TeamSettings | string;
          owner?: {
            id: number;
            email: string;
            first_name?: string;
            last_name?: string;
          };
        }
        
        setTeams((Array.isArray(teamsData) ? teamsData : []).map((team: BackendTeam) => {
          // Parse settings if it's a string
          let settings: TeamSettings | undefined;
          if (team.settings) {
            if (typeof team.settings === 'string') {
              try {
                settings = JSON.parse(team.settings);
              } catch (e) {
                // Ignore parse errors
              }
            } else {
              settings = team.settings as TeamSettings;
            }
          }
          
          return {
            id: String(team.id),
            name: team.name,
            slug: team.slug || '',
            description: team.description,
            member_count: team.member_count || 0,
            organization_id: team.organization_id || '',
            created_at: team.created_at,
            settings: settings,
            owner: team.owner,
          };
        }));
      }
    } catch (err: unknown) {
      if (getErrorDetail(err)?.includes('404') || getErrorDetail(err)?.includes('not found')) {
        setTeams([]);
      } else {
        setError(getErrorDetail(err) || getErrorMessage(err, 'Erreur lors du chargement des organisations'));
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper function to generate slug from name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .normalize('NFD') // Normalize to decomposed form for handling accents
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  };

  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) {
      setError('Le nom de l\'organisation est requis');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Generate slug from name
      const slug = generateSlug(newTeamName);
      
      if (!slug) {
        setError('Le nom doit contenir au moins un caractère alphanumérique');
        return;
      }

      const { teamsAPI } = await import('@/lib/api/teams');
      await teamsAPI.create({
        name: newTeamName.trim(),
        slug: slug,
        description: newTeamDescription.trim() || undefined,
      } as Parameters<typeof teamsAPI.create>[0]);
      await loadTeams();
      setShowCreateModal(false);
      setNewTeamName('');
      setNewTeamDescription('');
    } catch (err: unknown) {
      const errorDetail = getErrorDetail(err);
      const errorMessage = getErrorMessage(err, 'Erreur lors de la création de l\'organisation');
      
      // Check if error is about slug already existing
      if (errorDetail?.includes('slug') || errorDetail?.includes('already exists')) {
        setError('Une organisation avec ce nom existe déjà. Veuillez choisir un autre nom.');
      } else {
        setError(errorDetail || errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: Column<Team>[] = [
    {
      key: 'name',
      label: 'Nom',
      render: (_value, team) => {
        const settings = typeof team.settings === 'string' 
          ? (() => { try { return JSON.parse(team.settings); } catch { return null; } })()
          : team.settings;
        
        return (
          <div>
            <div className="font-medium text-foreground">{team.name}</div>
            {team.description && (
              <div className="text-sm text-muted-foreground mt-1">{team.description}</div>
            )}
            {settings?.email && (
              <div className="text-xs text-muted-foreground mt-1">📧 {settings.email}</div>
            )}
            {settings?.phone && (
              <div className="text-xs text-muted-foreground">📞 {settings.phone}</div>
            )}
            {settings?.website && (
              <div className="text-xs text-muted-foreground">
                🌐 <a href={settings.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {settings.website}
                </a>
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: 'owner',
      label: 'Propriétaire',
      render: (_value, team) => (
        <div className="text-sm">
          {team.owner ? (
            <div>
              <div className="font-medium">{team.owner.email}</div>
              {(team.owner.first_name || team.owner.last_name) && (
                <div className="text-muted-foreground">
                  {[team.owner.first_name, team.owner.last_name].filter(Boolean).join(' ')}
                </div>
              )}
            </div>
          ) : (
            <span className="text-muted-foreground">-</span>
          )}
        </div>
      ),
    },
    {
      key: 'member_count',
      label: 'Membres',
      render: (_value, team) => (
        <Badge variant="default">{team.member_count}</Badge>
      ),
    },
    {
      key: 'created_at',
      label: 'Créé le',
      render: (_value, team) => (
        <span className="text-sm text-muted-foreground">
          {new Date(team.created_at).toLocaleDateString('fr-FR')}
        </span>
      ),
    },
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Organisations" 
        description="Gérer les organisations et leurs paramètres"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Administration', href: '/admin' },
          { label: 'Organisations' }
        ]} 
      />

      {error && (
        <Alert variant="error" className="mb-4">
          {error}
        </Alert>
      )}

      <div className="mt-6 flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Rechercher une organisation..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <Button onClick={() => setShowCreateModal(true)}>
          Créer une organisation
        </Button>
      </div>

      {loading ? (
        <Card>
          <div className="py-12 text-center">
            <Loading />
          </div>
        </Card>
      ) : (
        <Card>
          <DataTable<Team>
            data={filteredTeams}
            columns={columns}
            emptyMessage="Aucune organisation trouvée"
          />
        </Card>
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setNewTeamName('');
          setNewTeamDescription('');
        }}
        title="Créer une nouvelle organisation"
        size="md"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateModal(false);
                setNewTeamName('');
                setNewTeamDescription('');
              }}
            >
              Annuler
            </Button>
            <Button onClick={handleCreateTeam} disabled={loading}>
              Créer
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Nom de l'organisation *"
            type="text"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            placeholder="Ex: Organisation Marketing"
            fullWidth
          />
          <Textarea
            label="Description"
            value={newTeamDescription}
            onChange={(e) => setNewTeamDescription(e.target.value)}
            rows={3}
            placeholder="Description de l'organisation..."
            fullWidth
          />
        </div>
      </Modal>
    </PageContainer>
  );
}

