import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../Views/Home.vue"),
  },
  {
    path: "/users",
    name: "users",
    beforeEnter(to, from, next) {
      if (to.params.userId && to.params.userId !== "") {
        next();
      } else {
        router.replace("/");
      }
    },
    children: [
      {
        path: ":userId",
        component: () => import("../components/EmptyView.vue"),
        children: [
          {
            path: "todo",
            name: "todo",
            component: () => import("../Views/Todo.vue"),
          },
          {
            path: "albums",
            name: "albumsview",
            component: () => import("../components/EmptyView.vue"),
            redirect: { name: "albums" },
            children: [
              {
                path: "",
                name: "albums",
                component: () => import("../Views/Album.vue"),
              },
              {
                path: ":albumId",
                name: "photos",
                component: () => import("../Views/Gallery.vue"),
              },
            ],
          },
          {
            path: "posts",
            name: "posts",
            component: () => import("../Views/Posts.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
