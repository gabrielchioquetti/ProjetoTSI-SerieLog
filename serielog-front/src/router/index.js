import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NovaSerieView from "../views/NovaSerieView.vue";
import DetalheSerieView from "../views/DetalheSerieView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/series/nova", component: NovaSerieView },
  { path: "/series/:id", component: DetalheSerieView},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;