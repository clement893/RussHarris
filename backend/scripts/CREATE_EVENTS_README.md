# Guide de Création des Événements de la Tournée Canadienne 2026

## 📋 Événements à créer

1. **MONTRÉAL** - 24-25 mai 2026 - Palais des Congrès - 200 places
2. **CALGARY** - 31 mai - 1 juin 2026 - Calgary Convention Centre - 200 places
3. **VANCOUVER** - 7-8 juin 2026 - Vancouver Convention Centre - 200 places
4. **TORONTO** - 14-15 juin 2026 - Metro Toronto Convention Centre - 200 places

## 🚀 Méthodes d'exécution

### Option 1 : Script SQL (Recommandé)

Si vous avez accès à `psql` :

```powershell
# Définir la variable d'environnement DATABASE_URL
$env:DATABASE_URL = "postgresql://user:password@host:port/database"

# Exécuter le script
cd backend
psql $env:DATABASE_URL -f scripts/create_canadian_tour_events.sql
```

### Option 2 : Script PowerShell

```powershell
cd backend
.\scripts\create_canadian_tour_events.ps1
```

Ou avec DATABASE_URL en argument :
```powershell
.\scripts\create_canadian_tour_events.ps1 "postgresql://user:password@host:port/database"
```

### Option 3 : Via Docker

Si vous utilisez Docker Compose :

```powershell
docker-compose exec postgres psql -U postgres -d modele_db -f /path/to/create_canadian_tour_events.sql
```

### Option 4 : Via l'interface Admin

1. Se connecter à l'interface admin
2. Aller dans la section Masterclass
3. Créer manuellement les 4 événements avec les informations ci-dessus

## ✅ Vérification

Après l'exécution, vérifiez que les événements sont créés :

```sql
SELECT 
    c.name_en as city,
    ce.start_date,
    ce.end_date,
    v.name as venue,
    ce.total_capacity as capacity,
    ce.status
FROM city_events ce
JOIN cities c ON ce.city_id = c.id
JOIN venues v ON ce.venue_id = v.id
WHERE ce.start_date >= '2026-05-01'::DATE
ORDER BY ce.start_date;
```

## 📝 Notes

- Le script crée automatiquement les villes et venues s'ils n'existent pas
- Les événements existants seront mis à jour avec les nouvelles dates
- Capacité : 200 places par événement
- Prix : 1200 CAD (prix régulier), 960 CAD (early bird)
- Statut : PUBLISHED (publié)
