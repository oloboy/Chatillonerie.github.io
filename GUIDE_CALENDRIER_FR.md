# Guide de mise Ã  jour du calendrier

Ce site lit automatiquement les Ã©vÃ©nements depuis le fichier `data/events.txt`.

## Ce quâil faut modifier

Ouvrez le fichier `data/events.txt` et ajoutez, modifiez ou supprimez des lignes.

Chaque ligne correspond Ã  un Ã©vÃ©nement, avec ce format :

```text
YYYY-MM-DD|HH:MM|HH:MM|Lieu|Titre|Notes
```

Exemple :

```text
2026-09-05|14:00|17:00|Centre Guynemer, 2 rue Guynemer, 92320 ChÃ¢tillon|Repair CafÃ© de rentrÃ©e|Inscription sur place Ã  14h. 1 objet par personne.
```

## RÃ¨gles importantes

- Garder une seule ligne par Ã©vÃ©nement.
- Respecter le sÃ©parateur `|`.
- Utiliser le format de date `AAAA-MM-JJ`.
- Utiliser le format dâheure `HH:MM`.
- Ne pas supprimer la ligne de commentaire dâexemple si elle vous aide, mais ce nâest pas obligatoire.

## Mise Ã  jour automatique du prochain Ã©vÃ©nement

Le site compare la date de chaque ligne avec la date du jour.

- Si un Ã©vÃ©nement est dÃ©jÃ  passÃ©, il nâest plus affichÃ© comme âprochain atelierâ.
- Le site met automatiquement en avant la prochaine date Ã  venir.
- Le calendrier complet reste visible plus bas dans la page.

Vous nâavez donc pas besoin de modifier manuellement la zone âProchain atelierâ dans la page.

## Publication sur GitHub Pages

AprÃ¨s avoir modifiÃ© `data/events.txt` :

1. Enregistrez le fichier.
2. Validez les changements dans le dÃ©pÃ´t GitHub.
3. Poussez les changements sur la branche publiÃ©e.
4. GitHub Pages mettra le site Ã  jour automatiquement.

## Important Ã  savoir

Sur un site 100 % statique, le fichier `data/events.txt` peut Ãªtre lu publiquement par le navigateur, mais il ne peut pas Ãªtre modifiÃ© par les visiteurs.

- Les visiteurs voient les dates.
- Seules les personnes ayant accÃ¨s au dÃ©pÃ´t GitHub peuvent changer le fichier.

Si vous voulez un calendrier totalement non visible cÃ´tÃ© public, il faudra ajouter un back-office ou un service externe.
