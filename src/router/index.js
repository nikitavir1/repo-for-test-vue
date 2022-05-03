import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import References from "@/views/References.vue";
import ModalWindow from "@/views/ModalWindow.vue";
import Auto from "@/views/Auto.vue";
import CheckJQuery from "@/views/CheckJQuery.vue";
import Schedule from "@/views/Schedule.vue";

import AllItemsList from "@/views/items/AllItemsList.vue";
import AllItemsRender from "@/views/items/AllItemsRender.vue";
import GeneralPage from "@/views/items/GeneralPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/references",
    name: "References",
    component: References,
  },
  {
    path: "/modal",
    name: "ModalWindow",
    component: ModalWindow,
  },
  {
    path: "/auto",
    name: "Auto",
    component: Auto,
  },
  {
    path: "/jquery",
    name: "CheckJQuery",
    component: CheckJQuery,
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: Schedule,
  },

  {
    path: "/items",
    name: "AllItemsList",
    component: AllItemsList,
  },
  {
    path: "/items/:id",
    name: "AllItemsRender",
    component: AllItemsRender,
    props: (route) => {
      const id = Number.parseInt(route.params.id, 10);
      if (Number.isNaN(id)) {
        return 1;
      }
      return {
        id,
      };
    },
    children: [
      // when /meetings/:id is matched
      {
        path: "main",
        component: GeneralPage,
        name: "GeneralPage",
      },
    ],
  },

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
