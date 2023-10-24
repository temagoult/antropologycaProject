<template>
  <div class>
    <router-view :isLogin.sync="isLogin" @isloged="isloged"></router-view>
    <Footer :isLogin.sync="isLogin "></Footer>
  </div>
</template>
  <script>
import "./styles/style.css";
import Footer from "./views/sections/sectionSeven/Footer.vue";

export default {
  data() {
    return {
      isLogin: true
    };
  },
  name: "App",
  components: {
    Footer
  },
  methods: {
    isloged() {
      this.isLogin = false;
    }
  }
};
</script>
  <style >
@import url("https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css");
@import url("https://fonts.googleapis.com/css2?family=Hind+Vadodara:wght@300;400;500;600;700&family=Lateef:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap");
</style>
  