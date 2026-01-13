'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { PageHeader, PageContainer } from '@/components/layout';
import { getErrorMessage } from '@/lib/errors';
import { Button, Card, Alert, Input, Loading, Modal, DataTable } from '@/components/ui';
import type { Column } from '@/components/ui/DataTable';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { masterclassAPI, type City } from '@/lib/api/masterclass';
import { logger } from '@/lib/logger';

function CitiesManagementContent() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name_en: '',
    name_fr: '',
    province: '',
    country: 'Canada',
    timezone: 'America/Toronto',
    image_url: '',
  });

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await masterclassAPI.listAllCities();
      logger.debug('[CitiesManagement] Loaded cities', { count: data.length });
      setCities(data);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Erreur lors du chargement des villes');
      logger.error('[CitiesManagement] Error loading cities', err instanceof Error ? err : new Error(String(err)));
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedCity(null);
    setFormData({
      name_en: '',
      name_fr: '',
      province: '',
      country: 'Canada',
      timezone: 'America/Toronto',
      image_url: '',
    });
    setModalOpen(true);
  };

  const handleEdit = (city: City) => {
    setSelectedCity(city);
    setFormData({
      name_en: city.name_en,
      name_fr: city.name_fr,
      province: city.province || '',
      country: city.country || 'Canada',
      timezone: city.timezone || 'America/Toronto',
      image_url: city.image_url || '',
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      setError(null);
      if (selectedCity) {
        await masterclassAPI.updateCity(selectedCity.id, formData);
        logger.info('[CitiesManagement] City updated', { id: selectedCity.id });
      } else {
        await masterclassAPI.createCity(formData);
        logger.info('[CitiesManagement] City created');
      }
      setModalOpen(false);
      setSelectedCity(null);
      await loadCities();
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Erreur lors de la sauvegarde de la ville');
      logger.error('[CitiesManagement] Error saving city', err instanceof Error ? err : new Error(String(err)));
      setError(errorMessage);
    }
  };

  const handleDelete = async () => {
    if (!selectedCity) return;

    try {
      setError(null);
      await masterclassAPI.deleteCity(selectedCity.id);
      logger.info('[CitiesManagement] City deleted', { id: selectedCity.id });
      setCities(cities.filter((c) => c.id !== selectedCity.id));
      setDeleteModalOpen(false);
      setSelectedCity(null);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Erreur lors de la suppression de la ville');
      logger.error('[CitiesManagement] Error deleting city', err instanceof Error ? err : new Error(String(err)));
      setError(errorMessage);
    }
  };

  const filteredCities = cities.filter(
    (city) =>
      city.name_fr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.name_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.province?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: Column<City>[] = [
    {
      key: 'name',
      label: 'Ville',
      render: (_value, city) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{city.name_fr || city.name_en}</span>
          {city.name_en !== city.name_fr && (
            <span className="text-sm text-muted-foreground">{city.name_en}</span>
          )}
        </div>
      ),
    },
    {
      key: 'province',
      label: 'Province',
      render: (_value, city) => <span className="text-sm text-foreground">{city.province || 'N/A'}</span>,
    },
    {
      key: 'country',
      label: 'Pays',
      render: (_value, city) => <span className="text-sm text-foreground">{city.country || 'Canada'}</span>,
    },
    {
      key: 'timezone',
      label: 'Fuseau horaire',
      render: (_value, city) => <span className="text-sm text-foreground">{city.timezone || 'N/A'}</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_value, city) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(city)}
            aria-label="Modifier la ville"
            title="Modifier la ville"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedCity(city);
              setDeleteModalOpen(true);
            }}
            aria-label="Supprimer la ville"
            title="Supprimer la ville"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <PageContainer>
        <PageHeader
          title="Gestion des Villes"
          description="Gérer les villes disponibles pour les événements masterclass"
          breadcrumbs={[
            { label: 'Accueil', href: '/' },
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Villes' },
          ]}
        />
        <Loading />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Gestion des Villes"
        description="Gérer les villes disponibles pour les événements masterclass"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Villes' },
        ]}
      />

      {error && (
        <Alert variant="error" className="mb-6">
          {error}
        </Alert>
      )}

      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Rechercher une ville..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="primary" onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une ville
          </Button>
        </div>

        <DataTable
          columns={columns as unknown as Column<Record<string, unknown>>[]}
          data={filteredCities as unknown as Record<string, unknown>[]}
          emptyMessage="Aucune ville trouvée"
        />
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedCity(null);
        }}
        title={selectedCity ? 'Modifier la ville' : 'Ajouter une ville'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom (Anglais) *</label>
            <Input
              value={formData.name_en}
              onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
              placeholder="Toronto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nom (Français) *</label>
            <Input
              value={formData.name_fr}
              onChange={(e) => setFormData({ ...formData, name_fr: e.target.value })}
              placeholder="Toronto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Province</label>
            <Input
              value={formData.province}
              onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              placeholder="Ontario"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pays</label>
            <Input
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="Canada"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fuseau horaire</label>
            <Input
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              placeholder="America/Toronto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL de l'image</label>
            <Input
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="/images/cities/toronto.jpg"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                setModalOpen(false);
                setSelectedCity(null);
              }}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={!formData.name_en || !formData.name_fr}
            >
              {selectedCity ? 'Modifier' : 'Créer'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedCity(null);
        }}
        title="Supprimer la ville"
      >
        <div className="space-y-4">
          <p>
            Êtes-vous sûr de vouloir supprimer cette ville ? Cette action est irréversible
            et supprimera également tous les lieux et événements associés.
          </p>
          {selectedCity && (
            <div className="p-4 bg-muted rounded">
              <p className="font-medium">{selectedCity.name_fr || selectedCity.name_en}</p>
              <p className="text-sm text-muted-foreground">
                {selectedCity.province && `${selectedCity.province}, `}
                {selectedCity.country || 'Canada'}
              </p>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setDeleteModalOpen(false);
                setSelectedCity(null);
              }}
            >
              Annuler
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Supprimer
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}

export default function CitiesManagementPage() {
  return (
    <ProtectedRoute requireAdmin>
      <CitiesManagementContent />
    </ProtectedRoute>
  );
}
