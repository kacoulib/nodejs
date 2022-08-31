## 04 Exercice auth token

Vous allez "simuler" une authentification en partant du modèle Express **04_auth_token**. Nous aurons 3 routes

- `/getToken`
- `/clear`
- `/securedRoute`

Toutes les routes se géreront en JSON uniquement. Pas de vue. Nous souhaitons tester ici l'authentification.

1. Définissez dans les variables d'environnement une clé secrète APP_SECRET qui servira à générer et vérifier les tokens.

2. Écrivez la route `/getToken` pour créer un nouveau token et mettez-le en session (vous utiliserez `express-session` **sans** MongoDB), puis renvoyez ce token au client.
   Le token doit contenir les informations suivantes : - Un `userId` (vous pouvez le générer en vous servant de la date du jour) - Un `email` (celui que vous voulez) - Un `role` avec la valeur `Admin`

3. Écrivez la route `/clear` qui effacera la session (et donc le token) et qui renverra un message de confirmation à l'utilisateur. Renseignez-vous sur la documentation d'**express-connect** pour savoir comment effacer une session.

4. Écrivez un middleware (que vous placerez ensuite sur `/securedRoute`). Le middleware devra vérifier 2 choses :
   - Si la session existe et qu'il y a un token dedans
   - Si le token dans la session est bel et bien valide
