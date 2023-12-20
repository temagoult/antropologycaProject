<template>
  <div
    class="lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4 myContainer"
  >
    <div
      class="text-[#0d6efd] md:text-start text-center sousTitre flex md:p-2 p-[3px] md:justify-start justify-center gap-2 items-center relative w-[100%]"
    >
      <i
        class="fa-solid fa-paperclip lg:text-[40px] md:text-[35px] sm:text-[25px] text-[20px] bg-white md:mr-[100px] m-0 pr-1"
      ></i>
      <div
        class="lg:text-[40px] md:text-[35px] sm:text-[25px] text-[20px] bg-white p-2 mr-[-8px]"
      >
        مقالاتي المفضلة
      </div>
      <div class="w-[100%] bg-[#0d6efd] h-[1px] absolute z-[-1]"></div>
    </div>
    <div
      v-if="loadingPage"
      class="flex items-center justify-center font-bold lg:text-[22px] md:text-[20px] sm:text-[16px] text-[14px]"
    >
      جاري التحميل ...
    </div>
    <div v-else class="article grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-2">
      <div
        class="cursor-pointer cardSousArticle border border-solid border-gray-300 flex md:flex-col md:p-3 p-2 justify-between gap-1 rounded-[25px]"
        v-for="(e, index) in myFaouritePosts"
        :key="index"
      >
        <img
          @click="getBlog(e)"
          crossorigin="anonymous"
          :src="
            'https://anthropologyca.onrender.com/api/v1/posts/post-image/' +
            e.coverImage
          "
          class="w-[140px] md:w-[100%] lg-h-[250px] md:h-[200px] sm:h-[150px] h-[140px] p-1"
        />
        <div class="flex flex-col items-start">
          <div
            @click="getBlog(e)"
            class="dateP lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd] overflow-hidden p-2"
          >
            <span>عنوان المقال :</span>
            {{ e.title }}
          </div>
          <p
            @click="getBlog(e)"
            class="text-gray-500 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] leading-4 overflow-hidden p-2"
          >
            {{
              e.summary.split(" ").slice(0, numwords2.value).join(" ") + "..."
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "favouritePost",
  mounted() {
    let $vm = this;
    $vm.getFavorite();
  },
  data() {
    return {
      numwords2: { type: Number, value: 20 },
      loadingPage: true,
      posts: [],
      myFaouritePosts: null,
    };
  },
  methods: {
    async getFavorite() {
      let $vm = this;
      axios
        .get("users/my-favorite-posts", {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "Bearer " + this.user.token,
          },
        })
        .then((response) => {
          $vm.loadingPage = false;
          this.myFaouritePosts = response.data.data;
          console.log(response);
        })
        .catch(function (error) {
          $vm.loadingPage = false;
          console.log(error.response);
        })
        .finally(function () {
          $vm.loadingPage = false;
          // always executed
        });
    },
  },
  props: {
    user: { type: Object },
  },
};
</script>
