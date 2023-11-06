<template>
  <div class="overflow-x-hidden">
    <navBar :isLogin="isLogin" @logOut="logOut" :user="user"></navBar>
    <router-view
      @postSelected="postSelected"
      :isLogin.sync="isLogin"
      :user="user"
      :currentPost="currentPost"
      @islogedSignUp="islogedSignUp"
      @isloged="isloged"
      @logOut="logOut"
    ></router-view>
    <Footer :isLogin.sync="isLogin "></Footer>
  </div>
</template>
  <script>
import "./styles/style.css";
import Footer from "./views/sections/sectionSeven/Footer.vue";
import navBar from "./views/sections/sectionOne/NavBar.vue";
import router from "./router";

export default {
  data() {
    return {
      currentPost: {},
      isLogin: "",
      user: {
        data: {
          user: {}
        }
      }
    };
  },
  mounted() {
    if (localStorage.getItem("user") !== null) {
      this.isLogin = false;
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.isLogin = true;
    }
    console.log("isLogin in this case" + this.isLogin);
    console.log(this.user);
  },

  name: "App",
  components: {
    navBar,
    Footer
  },
  methods: {
    postSelected(post) {
      this.currentPost = post;
    },
    islogedSignUp() {
      this.isLogin = false;
      this.user = JSON.parse(localStorage.getItem("user"));
    },
    logOut() {
      this.isLogin = true;
      localStorage.removeItem("user");
      console.log(this.currentPost);
      if (this.$route.name != "Home") {
        router.push({
          path: "/"
        });
      }
    },
    isloged() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.user !== undefined) this.isLogin = false;
    }
  }
};
</script>
  <style >
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