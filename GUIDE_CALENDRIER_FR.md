# Guide de mise à jour du calendrier

Ce site lit automatiquement les événements depuis le fichier `data/events.txt`.

## Ce qu’il faut modifier

Ouvrez le fichier `data/events.txt` et ajoutez, modifiez ou supprimez des lignes.

Chaque ligne correspond à un événement, avec ce format :

```text
YYYY-MM-DD|HH:MM|HH:MM|Lieu|Titre|Notes
```

Exemple :

```text
2026-09-05|14:00|17:00|Centre Guynemer, 2 rue Guynemer, 92320 Châtillon|Repair Café de rentrée|Inscription sur place à 14h. 1 objet par personne.
```

## Règles importantes

- Garder une seule ligne par événement.
- Respecter le séparateur `|`.
- Utiliser le format de date `AAAA-MM-JJ`.
- Utiliser le format d’heure `HH:MM`.
- Ne pas supprimer la ligne de commentaire d’exemple si elle vous aide, mais ce n’est pas obligatoire.

## Mise à jour automatique du prochain événement

Le site compare la date de chaque ligne avec la date du jour.

- Si un événement est déjà passé, il n’est plus affiché comme “prochain atelier”.
- Le site met automatiquement en avant la prochaine date à venir.
- Le calendrier complet reste visible plus bas dans la page.

Vous n’avez donc pas besoin de modifier manuellement la zone “Prochain atelier” dans la page.

## Publication sur GitHub Pages

Après avoir modifié `data/events.txt` :

1. Enregistrez le fichier.
2. Validez les changements dans le dépôt GitHub.
3. Poussez les changements sur la branche publiée.
4. GitHub Pages mettra le site à jour automatiquement.

## Important à savoir

Sur un site 100 % statique, le fichier `data/events.txt` peut être lu publiquement par le navigateur, mais il ne peut pas être modifié par les visiteurs.

- Les visiteurs voient les dates.
- Seules les personnes ayant accès au dépôt GitHub peuvent changer le fichier.

Si vous voulez un calendrier totalement non visible côté public, il faudra ajouter un back-office ou un service externe.
