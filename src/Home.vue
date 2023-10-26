<template>
  <div>
    <navBar :isLogin="isLogin" @logOut="logOut"></navBar>
    <MainPage :isLogin="isLogin" @isloged="isloged"></MainPage>
    <ArticleSection :isLogin="isLogin"></ArticleSection>
    <ArticleAvailaible :isLogin="isLogin"></ArticleAvailaible>
    <Profile :isLogin="isLogin"></Profile>
    <contactUs :isLogin="isLogin"></contactUs>
  </div>
</template>
  <script>
import "./styles/style.css";
import navBar from "./views/sections/sectionOne/NavBar.vue";
import MainPage from "./views/sections/sectionTwo/MainPage.vue";
import ArticleSection from "./views/sections/sectionThree/ArticleSection.vue";
import ArticleAvailaible from "./views/sections/sectionFoor/ََArticleAvailaible.vue";
import Profile from "./views/sections/sectionFive/Profile.vue";
import contactUs from "./views/sections/sectionSix/contactUs.vue";

export default {
  data() {
    return {};
  },
  name: "Home",
  props: {
    isLogin: { type: Boolean }
  },

  components: {
    navBar,
    MainPage,
    ArticleSection,
    ArticleAvailaible,
    Profile,
    contactUs
  },
  methods: {
    logOut() {
      this.$emit("logOut");
    },
    isloged(e) {
      console.log(e + "hhhhh");
      this.$emit("isloged");
    }
  }
};
</script>