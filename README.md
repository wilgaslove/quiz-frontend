# quiz-frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```










# 🧠 Quiz App — Plan de développement complet (Vue.js + Node.js + Express + MongoDB)

## 🎯 Objectif
Construire une application de quiz complète avec :
- Authentification
- Jeu de quiz avec timer
- Résultats et classement
- Sécurité anti-triche

---

# 🗺️ PHASE 1 — BACKEND (BASE SOLIDE)

## 1. Setup serveur
- Installer Express
- Connecter MongoDB
- Configurer CORS
- Structure dossiers (routes, controllers, models, middlewares)

## 2. Authentification
Routes :
- POST /api/auth/register
- POST /api/auth/login

À faire :
- Hash password (bcrypt)
- Générer JWT
- Middleware protect

✔ Résultat :
Utilisateur peut se connecter et recevoir un token

---

## 3. Modèle Quiz
Structure :
- title
- description
- duration
- questions[]
  - question
  - options[]
  - correctAnswer

---

## 4. API Quiz
Routes :
- GET /api/quiz
- GET /api/quiz/:id

✔ Résultat :
Les quiz s'affichent côté frontend

---

# 🟡 PHASE 2 — GAMEPLAY QUIZ

## 5. Démarrer un quiz
Route :
POST /api/results/quiz/:id/start

Action :
- Créer une session Result
- Ajouter startedAt

✔ Résultat :
Session de quiz créée

---

## 6. Jouer un quiz (Frontend)
Dans QuizPlay.vue :
- Charger quiz
- Afficher questions
- Gérer réponses
- Ajouter timer

✔ Résultat :
Utilisateur peut répondre aux questions

---

## 7. Soumettre un quiz
Route :
POST /api/results/quiz/:id/submit

Backend :
- Comparer réponses
- Calculer score
- Sauvegarder résultat

✔ Résultat :
Score affiché

---

# 🔵 PHASE 3 — RÉSULTATS

## 8. Page "Mes résultats"
Route :
GET /api/results/me

Frontend :
Créer MyResults.vue

Afficher :
- Score
- Total
- Date
- Quiz

---

## 9. Leaderboard
Routes :
- GET /api/results/quiz/:quizId
- GET /api/results/leaderboard/global

Frontend :
Créer Leaderboard.vue

Afficher :
- Classement des utilisateurs

---

# 🔴 PHASE 4 — AMÉLIORATIONS PRO

## 10. Timer sécurisé (ANTI-TRICHE)
Problème :
Refresh → reset timer

Solution :
Calculer temps avec startedAt côté backend

---

## 11. UX/UI
- Loader
- Message fin quiz
- Désactiver bouton après soumission

---

## 12. Protection routes frontend
- Vérifier token
- Redirection si non connecté

---

# 🟣 PHASE 5 — BONUS

## 13. Dashboard utilisateur
- Nombre de quiz joués
- Score moyen

## 14. Animations
- Timer visuel
- Animation score

## 15. Design
- Utiliser Tailwind CSS

---

# 🚀 MÉTHODE DE TRAVAIL

Toujours suivre :

1. Backend route
2. Test Postman
3. Frontend call
4. Affichage

---

# ✅ CHECKLIST

- [ ] Auth fonctionne
- [ ] Quiz affiché
- [ ] Start quiz OK
- [ ] Submit quiz OK
- [ ] Score affiché
- [ ] Mes résultats
- [ ] Leaderboard
- [ ] Timer sécurisé
- [ ] UX améliorée
- [ ] Projet prêt portfolio
