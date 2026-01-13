'use client';

import { useEffect, useState } from 'react';
import { PageHeader, PageContainer } from '@/components/layout';
import { getErrorMessage } from '@/lib/errors';
import { Button, Card, Badge, Alert, Input, Loading, Modal, DataTable, Tabs, TabList, Tab, TabPanels, TabPanel } from '@/components/ui';
import type { Column } from '@/components/ui/DataTable';
import { Edit2, Trash2, Plus, Calendar, MapPin, Building } from 'lucide-react';
import { masterclassAPI, type CityEvent, type City } from '@/lib/api/masterclass';
import { logger } from '@/lib/logger';

export default function AdminMasterclassContent() {
  const [activeTab, setActiveTab] = useState<'cities' | 'venues' | 'events'>('cities');
  
  // Cities state
  const [cities, setCities] = useState<City[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(true);
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const [cityDeleteModalOpen, setCityDeleteModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cityFormData, setCityFormData] = useState({
    name_en: '',
    name_fr: '',
    province: '',
    country: 'Canada',
    timezone: 'America/Toronto',
    image_url: '',
  });

  // City Events state
  const [cityEvents, setCityEvents] = useState<CityEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCityEvent, setSelectedCityEvent] = useState<CityEvent | null>(null);
  
  // Common error state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 'cities') {
      loadCities();
    } else if (activeTab === 'events') {
      loadCityEvents();
    }
  }, [activeTab]);

  const loadCities = async () => {
    try {
      setCitiesLoading(true);
      setError(null);
      const data = await masterclassAPI.listAllCities();
      logger.debug('[AdminMasterclass] Loaded cities', { count: data.length });
      setCities(data);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Erreur lors du chargement des villes');
      logger.error('[AdminMasterclass] Error loading cities', err instanceof Error ? err : new Error(String(err)));
      setError(errorMessage);
    } finally {
      setCitiesLoading(false);
    }
  };

  const loadCityEvents = async () => {
    try {
      setEventsLoading(true);
      setError(null);
      const result = await masterclassAPI.listAllCityEvents(0, 100);
      logger.debug('[AdminMasterclass] Loaded city events', { count: result.city_events.length });
      setCityEvents(result.city_events);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Erreur lors du chargement des événements');
      logger.error('[AdminMasterclass] Error loading city events', err instanceof Error ? err : new Error(String(err)));
      setError(errorMessage);
    } finally {
      setEventsLoading(false);
    }
  };

  const handleCreateCity = () => {
    setSelectedCity(null);
    setCityFormData({
      name_en: '',
      name_fr: '',
      province: '',
      country: 'Canada',
      timezone: 'America/Toronto',
      image_url: '',
    });
    setCityModalOpen(true);
  };

  const handleEditCity = (city: City) => {
    setSelectedCity(city);
    setCityFormData({
      name_en: city.name_en,
      name_fr: city.name_fr,
      province: city.province || '',
      country: city.country || 'Canada',
      timezone: city.timezone || 'America/Toronto',
      image_url: city.image_url || '',
    });
    setCityModalOpen(true);
  };

  const handleSaveCity = async () => {
    try {
      setError(null);
      if (selectedCity) {
        // Update existing city
        await masterclassAPI.updateCity(selectedCity.id, cityFormData);
        logger.info('[AdminMasterclass] City updated', { id: selectedCity.id });
      } else {
        // Create new city
        await masterclassAPI.createCity(cityFormData);
        logger.info('[AdminMasterclass] City created');
      }
      setCityModalOpen(false);
      setSelectedCity(null);
      await loadCities();
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Erreur lors de la sauvegarde de la ville');
      logger.error('[AdminMasterclass] Error saving city', err instanceof Error ? err : new Error(String(err)));
      setError(errorMessage);
    }
  };

  const handleDeleteCity = async () => {
    if (!selectedCity) return;

    try {
      setError(null);
      await masterclassAPI.deleteCity(selectedCity.id);
      logger.info('[AdminMasterclass] City deleted', { id: selectedCity.id });
      setCities(cities.filter((c) => c.id !== selectedCity.id));
      setCityDeleteModalOpen(false);
      setSelectedCity(null);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Erreur lors de la suppression de la ville');
      logger.error('[AdminMasterclass] Error deleting city', err instanceof Error ? err : new Error(String(err)));
      setError(errorMessage);
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

  const filteredCities = cities.filter((city) =>
    city.name_fr?.toLowerCase().includes(citySearchTerm.toLowerCase()) ||
    city.name_en?.toLowerCase().includes(citySearchTerm.toLowerCase()) ||
    city.province?.toLowerCase().includes(citySearchTerm.toLowerCase())
  );

  const filteredCityEvents = cityEvents.filter((ce) =>
    ce.city?.name_fr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ce.city?.name_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ce.event?.title_fr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ce.event?.title_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ce.venue?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cityColumns: Column<City>[] = [
    {
      key: 'name',
      label: 'Ville',
      render: (_value, city) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{city.name_fr || city.name_en}</span>
          <span className="text-sm text-muted-foreground">{city.name_en !== city.name_fr ? city.name_en : ''}</span>
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
            onClick={() => handleEditCity(city)}
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
              setCityDeleteModalOpen(true);
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

  if (citiesLoading && activeTab === 'cities') {
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

  if (eventsLoading && activeTab === 'events') {
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

      <Tabs defaultTab="cities" onChange={(tab) => setActiveTab(tab as 'cities' | 'venues' | 'events')}>
        <TabList>
          <Tab value="cities">Villes</Tab>
          <Tab value="venues">Lieux</Tab>
          <Tab value="events">Événements</Tab>
        </TabList>

        <TabPanels>
          {/* Cities Tab */}
          <TabPanel value="cities">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1 max-w-md">
                  <Input
                    type="text"
                    placeholder="Rechercher une ville..."
                    value={citySearchTerm}
                    onChange={(e) => setCitySearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="primary" onClick={handleCreateCity}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une ville
                </Button>
              </div>

              <DataTable
                columns={cityColumns as unknown as Column<Record<string, unknown>>[]}
                data={filteredCities as unknown as Record<string, unknown>[]}
                emptyMessage="Aucune ville trouvée"
              />
            </Card>
          </TabPanel>

          {/* Venues Tab */}
          <TabPanel value="venues">
            <Card>
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">Gestion des lieux - À venir</p>
                <p className="text-sm text-gray-500 mt-2">Cette fonctionnalité sera disponible prochainement</p>
              </div>
            </Card>
          </TabPanel>

          {/* Events Tab */}
          <TabPanel value="events">
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
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* City Create/Edit Modal */}
      <Modal
        isOpen={cityModalOpen}
        onClose={() => {
          setCityModalOpen(false);
          setSelectedCity(null);
        }}
        title={selectedCity ? 'Modifier la ville' : 'Ajouter une ville'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom (Anglais) *</label>
            <Input
              value={cityFormData.name_en}
              onChange={(e) => setCityFormData({ ...cityFormData, name_en: e.target.value })}
              placeholder="Toronto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nom (Français) *</label>
            <Input
              value={cityFormData.name_fr}
              onChange={(e) => setCityFormData({ ...cityFormData, name_fr: e.target.value })}
              placeholder="Toronto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Province</label>
            <Input
              value={cityFormData.province}
              onChange={(e) => setCityFormData({ ...cityFormData, province: e.target.value })}
              placeholder="Ontario"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pays</label>
            <Input
              value={cityFormData.country}
              onChange={(e) => setCityFormData({ ...cityFormData, country: e.target.value })}
              placeholder="Canada"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fuseau horaire</label>
            <Input
              value={cityFormData.timezone}
              onChange={(e) => setCityFormData({ ...cityFormData, timezone: e.target.value })}
              placeholder="America/Toronto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL de l'image</label>
            <Input
              value={cityFormData.image_url}
              onChange={(e) => setCityFormData({ ...cityFormData, image_url: e.target.value })}
              placeholder="/images/cities/toronto.jpg"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                setCityModalOpen(false);
                setSelectedCity(null);
              }}
            >
              Annuler
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSaveCity}
              disabled={!cityFormData.name_en || !cityFormData.name_fr}
            >
              {selectedCity ? 'Modifier' : 'Créer'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* City Delete Confirmation Modal */}
      <Modal
        isOpen={cityDeleteModalOpen}
        onClose={() => {
          setCityDeleteModalOpen(false);
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
                {selectedCity.province && `${selectedCity.province}, `}{selectedCity.country || 'Canada'}
              </p>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setCityDeleteModalOpen(false);
                setSelectedCity(null);
              }}
            >
              Annuler
            </Button>
            <Button variant="danger" onClick={handleDeleteCity}>
              Supprimer
            </Button>
          </div>
        </div>
      </Modal>

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
            <Button variant="danger" onClick={handleDelete}>
              Supprimer
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}
