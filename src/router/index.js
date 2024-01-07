import Vue from "vue";
import VueRouter from "vue-router";
import Search from "@/components/Search.vue";
import Home from "@/Home.vue";
import EditProfile from "../components/EditProfile";
import AddPost from "../components/AddPost";
import Post from "../components/Post";
import FavouritePost from "../components/FavouritPost";
import GestionArticles from "../components/GestionArticles";
import EditBlog from "../components/EditBlog";
import me from "@/views/me";
import allArticles from "../components/allArticles";
import forgotPassword from "../components/forgotPassword";
import getAllUserAdmin from "../components/getAllUserAdmin";
import getAllComments from "../components/getAllComments";
Vue.use(VueRouter);

const routes = [
  {
    path: "/getAllComments",
    name: "getAllComments",
    component: getAllComments,
  },
  {
    path: "/getAllUserAdmin",
    name: "getAllUserAdmin",
    component: getAllUserAdmin,
  },
  {
    path: "/forgotPassword",
    name: "forgotPassword",
    component: forgotPassword,
  },
  {
    path: "/me",
    name: "me",
    component: me,
  },
  {
    path: "/allArticles",
    name: "allArticles",
    component: allArticles,
  },
  {
    path: "/favouritPost",
    name: "favouritPost",
    component: FavouritePost,
  },
  {
    path: "/EditBlog",
    name: "EditBlog",
    component: EditBlog,
  },
  {
    path: "/gestionArticles",
    name: "gestionArticles",
    component: GestionArticles,
  },
  {
    path: "/Search",
    name: "Search",
    component: Search,
  },
  {
    path: "/Post",
    name: "Post",
    component: Post,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/EditProfile",
    component: EditProfile,
    name: "EditProfile",
  },
  {
    path: "/AddPost",
    component: AddPost,
    name: "AddPost",
  },
  // },

  //   {
  //     path: '/about',
  //     name: 'about',
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //   }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
