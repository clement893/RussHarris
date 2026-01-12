# Créer les Événements sur Railway

## Méthode 1 : Via Railway CLI (Recommandé)

Si vous avez Railway CLI installé :

```bash
# Se connecter à Railway
railway login

# Lier le projet
railway link

# Exécuter le script SQL
railway run psql -f backend/scripts/create_canadian_tour_events.sql
```

## Méthode 2 : Via Railway Dashboard

1. Aller sur https://railway.app
2. Sélectionner votre projet
3. Aller dans l'onglet "Data" ou "Postgres"
4. Cliquer sur "Query" ou "Connect"
5. Copier-coller le contenu de `backend/scripts/create_canadian_tour_events.sql`
6. Exécuter le script

## Méthode 3 : Via l'API Backend

Si le backend est en cours d'exécution, vous pouvez utiliser l'API :

```bash
# Définir les variables d'environnement
export API_URL="https://votre-backend.railway.app"
export API_KEY="votre-clé-api-admin"

# Exécuter le script Node.js
node backend/scripts/create_events_via_api.js
```

## Vérification

Après création, vérifiez les événements :

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
