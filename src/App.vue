<template>
  <div>
    <!-- <AdminDashbord :user="user" /> -->
    <navBar :isLogin="isLogin" @logOut="logOut" :user="user"></navBar>
    <router-view
      class="lg:min-h-[67vh] md:min-h-[46vh] min-h-[65vh]"
      @forceUpdate="forceUpdate"
      :key="updatingKey"
      :callBack="scrollToTeamWork"
      @postSelected="postSelected"
      :isLogin.sync="isLogin"
      :user="user"
      :currentPost="currentPost"
      @islogedSignUp="islogedSignUp"
      @isloged="isloged"
      @logOut="logOut"
      @currentEditableBlog="currentEditableBlog"
      :editableBlog="editableBlog"
    ></router-view>
    <Footer :isLogin.sync="isLogin"></Footer>
  </div>
</template>
<script>
import "./styles/style.css";
// import AdminDashbord from "./views/AdminDasghbord.vue";
import Footer from "./views/sections/sectionSeven/Footer.vue";
import navBar from "./views/sections/sectionOne/NavBar.vue";
import router from "./router";
import axios from "axios";
// import axios from "axios";

export default {
  data() {
    return {
      currentPost: {},
      isLogin: true,
      user: {},
      editableBlog: {},
      updatingKey: null,
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (JSON.parse(localStorage.getItem("user") != null)) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  },

  name: "App",
  components: {
    Footer,
    navBar,
  },
  methods: {
    forceUpdate() {
      this.$forceUpdate();
      this.updatingKey += 1;
    },
    scrollToTeamWork() {
      this.$emit("scrollToTeamWork");
    },
    currentEditableBlog(element) {
      this.editableBlog = Object.assign({}, element);
    },

    postSelected(post) {
      this.currentPost = post;
    },
    islogedSignUp() {
      this.isLogin = false;
      this.user = JSON.parse(localStorage.getItem("user"));
    },
    logOut() {
      axios
        .get("users/logout", {
          headers: {
            Authorization: "Bearer " + this.user.token,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.isLogin = true;
          localStorage.removeItem("user");

          if (this.$route.name != "Home") {
            router.push({
              path: "/",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finaly(() => {});
      //
    },
    isloged() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.user !== undefined) this.isLogin = false;
    },
  },
};
</script>
<style>
@import url("https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css");
@import url("https://fonts.googleapis.com/css2?family=Hind+Vadodara:wght@300;400;500;600;700&family=Lateef:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap");
</style>
<style>
.v-application--wrap {
  min-height: 0vh !important;
}
:host #discipline-qe .ql-container {
  height: 250px;
}
</style>
