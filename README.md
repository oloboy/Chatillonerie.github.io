# La ChÃ¢tillonnerie

Landing page statique en franÃ§ais pour un site one-page moderne, pensÃ©e pour GitHub Pages.

## Fichiers principaux

- `index.html` : structure de la page
- `styles.css` : design responsive
- `main.js` : chargement du calendrier et sÃ©lection automatique du prochain Ã©vÃ©nement
- `data/events.txt` : calendrier Ã©ditable sÃ©parÃ©ment
- `GUIDE_CALENDRIER_FR.md` : guide de maintenance en franÃ§ais
- `SOURCES.md` : rÃ©sumÃ© des sources textuelles et graphiques rÃ©cupÃ©rÃ©es

## Calendrier

La source utilisÃ©e par le site est `data/events.txt`.

Le fichier `data/events.json` prÃ©sent dans le dossier `data/` peut servir de brouillon ou dâarchive, mais il nâest pas lu par la page actuelle.

## AperÃ§u local

Le fichier `data/events.txt` est chargÃ© via `fetch()`. Pour un test local, il faut servir le dossier avec un petit serveur HTTP.

Exemple :

```powershell
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## DÃ©ploiement GitHub Pages

Le projet peut Ãªtre publiÃ© tel quel sur GitHub Pages.

## Sources de contenu utilisÃ©es

- Site public indexÃ© de La ChÃ¢tillonnerie
- Page HelloAsso de lâassociation
- Page Repair CafÃ© du Centre Guynemer
- Fiche annuaire Ville de ChÃ¢tillon
