# La Châtillonnerie

Landing page statique en français pour un site one-page moderne, pensée pour GitHub Pages.

## Fichiers principaux

- `index.html` : structure de la page
- `styles.css` : design responsive
- `main.js` : chargement du calendrier et sélection automatique du prochain événement
- `data/events.txt` : calendrier éditable séparément
- `GUIDE_CALENDRIER_FR.md` : guide de maintenance en français
- `SOURCES.md` : résumé des sources textuelles et graphiques récupérées

## Calendrier

La source utilisée par le site est `data/events.txt`.

Le fichier `data/events.json` présent dans le dossier `data/` peut servir de brouillon ou d’archive, mais il n’est pas lu par la page actuelle.

## Aperçu local

Le fichier `data/events.txt` est chargé via `fetch()`. Pour un test local, il faut servir le dossier avec un petit serveur HTTP.

Exemple :

```powershell
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Déploiement GitHub Pages

Le projet peut être publié tel quel sur GitHub Pages.

## Sources de contenu utilisées

- Site public indexé de La Châtillonnerie
- Page HelloAsso de l’association
- Page Repair Café du Centre Guynemer
- Fiche annuaire Ville de Châtillon
