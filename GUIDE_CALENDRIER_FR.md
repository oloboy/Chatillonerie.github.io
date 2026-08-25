# Guide de mise Ã  jour du calendrier

Ce site lit automatiquement les événements depuis le fichier `data/events.txt`.

## Ce quâil faut modifier

Ouvrez le fichier `data/events.txt` et ajoutez, modifiez ou supprimez des lignes.

Chaque ligne correspond Ã  un événement, avec ce format :

```text
YYYY-MM-DD|HH:MM|HH:MM|Lieu|Titre|Notes
```

Exemple :

```text
2026-09-05|14:00|17:00|Centre Guynemer, 2 rue Guynemer, 92320 Châtillon|Repair Café de rentrée|Inscription sur place Ã  14h. 1 objet par personne.
```

## Règles importantes

- Garder une seule ligne par événement.
- Respecter le séparateur `|`.
- Utiliser le format de date `AAAA-MM-JJ`.
- Utiliser le format dâheure `HH:MM`.
- Ne pas supprimer la ligne de commentaire dâexemple si elle vous aide, mais ce nâest pas obligatoire.

## Mise Ã  jour automatique du prochain événement

Le site compare la date de chaque ligne avec la date du jour.

- Si un événement est déjÃ  passé, il nâest plus affiché comme âprochain atelierâ.
- Le site met automatiquement en avant la prochaine date Ã  venir.
- Le calendrier complet reste visible plus bas dans la page.

Vous nâavez donc pas besoin de modifier manuellement la zone âProchain atelierâ dans la page.

## Publication sur GitHub Pages

Après avoir modifié `data/events.txt` :

1. Enregistrez le fichier.
2. Validez les changements dans le dépôt GitHub.
3. Poussez les changements sur la branche publiée.
4. GitHub Pages mettra le site Ã  jour automatiquement.

## Important Ã  savoir

Sur un site 100 % statique, le fichier `data/events.txt` peut être lu publiquement par le navigateur, mais il ne peut pas être modifié par les visiteurs.

- Les visiteurs voient les dates.
- Seules les personnes ayant accès au dépôt GitHub peuvent changer le fichier.

Si vous voulez un calendrier totalement non visible côté public, il faudra ajouter un back-office ou un service externe.
