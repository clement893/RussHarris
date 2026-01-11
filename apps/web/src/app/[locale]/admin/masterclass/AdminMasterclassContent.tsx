'use client';

import { useEffect, useState } from 'react';
import { PageHeader, PageContainer } from '@/components/layout';
import { getErrorMessage } from '@/lib/errors';
import { Button, Card, Badge, Alert, Input, Loading, Modal, DataTable } from '@/components/ui';
import type { Column } from '@/components/ui/DataTable';
import { Edit2, Trash2, Plus, Calendar, MapPin, Building } from 'lucide-react';
import { masterclassAPI, type CityEvent } from '@/lib/api/masterclass';
import { logger } from '@/lib/logger';

export default function AdminMasterclassContent() {
  const [cityEvents, setCityEvents] = useState<CityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCityEvent, setSelectedCityEvent] = useState<CityEvent | null>(null);

  useEffect(() => {
    loadCityEvents();
  }, []);

  const loadCityEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await masterclassAPI.listAllCityEvents(0, 100);
      logger.debug('[AdminMasterclass] Loaded city events', { count: result.city_events.length });
      setCityEvents(result.city_events);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Erreur lors du chargement des événements');
      logger.error('[AdminMasterclass] Error loading city events', err instanceof Error ? err : new Error(String(err)));
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCityEvent) return;

    try {
      setError(null);
      await masterclassAPI.deleteCityEvent(selectedCityEvent.id);
      logger.info('[AdminMasterclass] City event deleted', { id: selectedCityEvent.id });
      setCityEvents(cityEvents.filter((ce) => ce.id !== selectedCityEvent.id));
      setDeleteModalOpen(false);
      setSelectedCityEvent(null);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Erreur lors de la suppression de l\'événement');
      logger.error('[AdminMasterclass] Error deleting city event', err instanceof Error ? err : new Error(String(err)));
      setError(errorMessage);
    }
  };

  const handleEdit = (cityEvent: CityEvent) => {
    // TODO: Navigate to edit page or open modal
    logger.info('[AdminMasterclass] Edit city event', { id: cityEvent.id });
  };

  const handleCreate = () => {
    // TODO: Navigate to create page or open modal
    logger.info('[AdminMasterclass] Create city event');
  };

  const filteredCityEvents = cityEvents.filter((ce) =>
    ce.city?.name_fr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ce.city?.name_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ce.event?.title_fr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ce.event?.title_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ce.venue?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeVariant = (status?: string): 'default' | 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'warning';
      case 'sold_out':
        return 'default';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const columns: Column<CityEvent>[] = [
    {
      key: 'event',
      label: 'Événement',
      render: (_value, ce) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{ce.event?.title_fr || ce.event?.title_en || 'N/A'}</span>
          {ce.city && (
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {ce.city.name_fr || ce.city.name_en}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      render: (_value, ce) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {ce.start_date ? formatDate(ce.start_date) : 'N/A'}
          </span>
          {ce.venue && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Building className="w-3 h-3" />
              {ce.venue.name}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'capacity',
      label: 'Capacité',
      render: (_value, ce) => (
        <div className="flex flex-col">
          <span className="text-sm text-foreground">
            {ce.current_attendees || 0} / {ce.max_attendees || ce.total_capacity || 0}
          </span>
          <span className="text-xs text-muted-foreground">
            {ce.available_spots || 0} places disponibles
          </span>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Prix',
      render: (_value, ce) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            {ce.regular_price || ce.price || 0} {ce.currency || 'EUR'}
          </span>
          {ce.early_bird_price && (
            <span className="text-xs text-muted-foreground">
              Early bird: {ce.early_bird_price} {ce.currency || 'EUR'}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Statut',
      render: (_value, ce) => (
        <Badge variant={getStatusBadgeVariant(ce.status)}>
          {ce.status === 'published' ? 'Publié' : 
           ce.status === 'draft' ? 'Brouillon' : 
           ce.status === 'sold_out' ? 'Complet' : 
           ce.status === 'cancelled' ? 'Annulé' : 
           ce.status || 'N/A'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_value, ce) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(ce)}
            aria-label="Modifier l'événement"
            title="Modifier l'événement"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedCityEvent(ce);
              setDeleteModalOpen(true);
            }}
            aria-label="Supprimer l'événement"
            title="Supprimer l'événement"
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
          title="Gestion Masterclass" 
          description="Gérer les événements masterclass, villes et lieux"
          breadcrumbs={[
            { label: 'Accueil', href: '/' },
            { label: 'Administration', href: '/admin' },
            { label: 'Masterclass' }
          ]} 
        />
        <Loading />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader 
        title="Gestion Masterclass" 
        description="Gérer les événements masterclass, villes et lieux"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Administration', href: '/admin' },
          { label: 'Masterclass' }
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
              placeholder="Rechercher par ville, événement ou lieu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="primary" onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Nouvel événement
          </Button>
        </div>

        <DataTable
          columns={columns as unknown as Column<Record<string, unknown>>[]}
          data={filteredCityEvents as unknown as Record<string, unknown>[]}
          emptyMessage="Aucun événement trouvé"
        />
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedCityEvent(null);
        }}
        title="Supprimer l'événement"
      >
        <div className="space-y-4">
          <p>
            Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible
            et supprimera également toutes les réservations associées.
          </p>
          {selectedCityEvent && (
            <div className="p-4 bg-muted rounded">
              <p className="font-medium">{selectedCityEvent.event?.title_fr || selectedCityEvent.event?.title_en}</p>
              <p className="text-sm text-muted-foreground">
                {selectedCityEvent.city?.name_fr || selectedCityEvent.city?.name_en} - {selectedCityEvent.start_date ? formatDate(selectedCityEvent.start_date) : ''}
              </p>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setDeleteModalOpen(false);
                setSelectedCityEvent(null);
              }}
            >
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}
