<template>
  <div class="lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4">
    <div v-if="loadingPage">...</div>
    <div v-else>h</div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "favouritePost",
  created() {
    axios
      .get(
        "https://anthropologyca.onrender.com/api/v1/users/my-favorite-posts",
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "Bearer " + this.user.token
          }
        }
      )
      .then(response => {
        console.log(response.data.data);
        this.myFaouritePosts = response.data.data;
      })
      .catch(function(error) {
        console.log(error.response);
        this.loadingPage = false;
      })
      .finally(() => {
        this.loadingPage = false;
      });
  },
  data() {
    return {
      loadingPage: false,
      posts: [],
      myFaouritePosts: null
    };
  },
  props: {
    user: { type: Object }
  }
};
</script>