<template>
  <div class="overflow-x-hidden">
    <MainPage :isLogin="isLogin" @isloged="isloged" @islogedSignUp="islogedSignUp"></MainPage>
    <ArticleSection @postSelected="postSelected" @isloged="isloged" :isLogin="isLogin"></ArticleSection>
    <ArticleAvailaible :isLogin="isLogin" @isloged="isloged"></ArticleAvailaible>
    <Profile :isLogin="isLogin" @isloged="isloged"></Profile>
    <contactUs :isLogin="isLogin" @isloged="isloged"></contactUs>
  </div>
</template>
  <script>
import "./styles/style.css";

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
    isLogin: { type: Boolean },
    user: { type: Object }
  },

  components: {
    MainPage,
    ArticleSection,
    ArticleAvailaible,
    Profile,
    contactUs
  },
  methods: {
    postSelected(post) {
      this.$emit("postSelected", post);
    },
    logOut() {
      this.$emit("logOut");
    },
    isloged(e) {
      console.log(e + "hhhhh");
      this.$emit("isloged");
      console.log(this.user);
    },
    islogedSignUp() {
      this.$emit("islogedSignUp");
    }
  }
};
</script>