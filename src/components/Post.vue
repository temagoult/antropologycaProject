<template>
  <div>
    <div class="ttileBlog"></div>
    <div class="profileWriter"></div>
    <div class="detailsActionBlog"></div>
    <div class="imgBlog"></div>
    <div class="contentBlog"></div>
    <div class="actionBlog"></div>
    <div class="relatedBlog"></div>
    <div class="comments"></div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

axios.create({
  paramsSerializer: params => qs.stringify(params, { encode: false })
});
export default {
  name: "Post",
  data() {
    return {
      title:
        "أي-جيوب-أدنى-يبق-واستمرت-الفرنسي-بها-كل-هو-قام-الصعداء-والكوري-ببسثبقثثثثثثثثثثثثثثثثثثثثثثثثث",
      post: {}
    };
  },
  created() {
    axios
      .get("https://anthropologyca.onrender.com/api/v1/posts/" + this.title, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + this.user.token
        }
      })
      .then(response => {
        console.log(response.data);
        this.post = response.data;
        console.log(this.post);
      })
      .catch(function(error) {
        console.log(error.response);
      })
      .finally(function() {
        // always executed
      });
  },
  method: {},
  props: {
    user: { type: Object }
  }
};
</script>