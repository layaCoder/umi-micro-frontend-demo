import Page1 from "@/views/Page1.vue";
import Page2 from "@/views/Page2.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: [
    // { path: "/", redirect: "page1" },
    { path: "/page1", component: Page1 },
    { path: "/page2", component: Page2 },
  ],
});

export default router;
