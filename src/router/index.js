import { createRouter, createWebHistory } from "vue-router";
const routes = [
  { path: "/", name: "home", component: () => import("@/views/Home.vue") },
  {
    path: "/protected",
    name: "protected",
    component: () => import("@/views/Protected.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    beforeEnter(to, from) {
      if (window.user) {
        router.push({ name: "protected" });
      }
    },
  },
  {
    path: "/invoices",
    name: "invoices",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/Invoices.vue"),
  },
  {
    path: "/destination/:id/:slug",
    name: "destination.show",
    component: () => import("@/views/DestinationShow.vue"),
    props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
    async beforeEnter(to, from) {
      const res = await fetch(
        `https://travel-dummy-api.netlify.app/${to.params.slug}`
      );
      if (!(res.status >= 200 && res.status < 300)) {
        return {
          name: "NotFound",
          params: {
            pathMatch: to.path.split("/").splice(1),
          },
          query: to.query,
          hash: to.hash,
        };
      }
    },
    children: [
      {
        path: ":experienceSlug",
        name: "experience.show",
        component: () => import("@/views/ExperienceShow.vue"),
        props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "router-link-active", // default link active class name
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !window.user) {
    return { name: "login", query: to.query };
  }
});

export default router;
