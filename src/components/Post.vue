<template>
  <div
    class="md:w-[70%] md:mx-auto myContainer lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4 flex flex-col gap-4"
  >
    <h1 class="ttileBlog md:text-[32px] text-[25px] font-extrabold p-2">{{ post.title }}</h1>
    <div class="profileWriter flex gap-3 items-center p-2">
      <div>
        <v-img
          class="md:!w-[50px] w-[30px] h-[30px] md:!h-[50px] rounded-[50%]"
          v-if="showAltImage==false"
          :src="'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg'"
          v-on:error="onImgError"
        ></v-img>

        <span
          v-else
          class="white--text lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
        >{{post.author.name.charAt(0)}}</span>
      </div>
      <div class="publisher text-gray-500">
        <div class="namePubliser text-[12px] sm:text-[16px] md:text-[20px]">{{ post.author.name }}</div>
        <div class="flex flex-row gap-3 items-center text-[12px] sm:text-[16px] md:text-[20px]">
          <div class="email text-[12px] sm:text-[16px] md:text-[20px]">{{ post.author.email }}</div>
          <div
            class="publishedAt text-[12px] sm:text-[16px] md:text-[20px]"
          >اضيف في: {{ post.updatedAt }}</div>
        </div>
      </div>
    </div>
    <div
      class="detailsActionBlog border border-solid border-x-transparent border-y-gray-400 p-2 flex justify-between shrink-0 grow-0"
    >
      <div class="commentsAndLikes flex !shrink-0 grow-0 gap-3">
        <div class="flex items-center gap-2">
          <i
            class="fa-regular fa-comment cursor-pointer lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
          ></i>
          <div
            class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
          >{{ post.commentsCounter }}</div>
        </div>

        <div class="flex items-center gap-2">
          <i
            class="fa-regular fa-heart lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500 text-red-700"
          ></i>
          <div
            class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
          >{{ post.likesCounter }}</div>
        </div>
      </div>

      <div class="saveAndShare flex !shrink-0 grow-0 gap-3">
        <div
          class="download cursor-pointer flex items-center gap-2 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
        >
          <i
            class="fa-solid fa-download cursor-pointers lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
          ></i>
          <div
            class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
          >{{ post.downloadCounter }}</div>
        </div>
        <div
          class="share shrink-0 flex items-center gap-2 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
        >
          <i
            class="fa-solid fa-share cursor-pointers lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
          ></i>
          <div
            class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
          >{{ post.downloadCounter }}</div>
        </div>
      </div>
    </div>
    <div class="imgBlog p-2 w-[100%] h-[100px] flex">
      <v-img src="../assets/images/article3.jpeg" />
    </div>
    <div class="contentBlog md:text-[25px] p-2">{{ post.body }}</div>
    <div class="relatedBlog p-2">
      <div class="titleRelated md:text-[25px] text-[20px] font-bold p-2">مقالات ذات صلة</div>
      <div class="flex flex-col gap-2">
        <div
          class="cardSousArticle border border-solid border-gray-300 flex items-center md:p-3 p-2 justify-between gap-1 rounded-[25px]"
          v-for="(e,index) in newArticles "
          :key="index"
        >
          <img
            :src="e.phtotArticle.src"
            class="w-[140px] lg-h-[100px] md:h-[84px] sm:h-[65px] h-[50px] p-1"
          />
          <div class="flex flex-col">
            <div
              class="dateP lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
            >
              <span>عنوان المقال :</span>
              {{ e.title }}
            </div>
            <p
              class="text-gray-500 self-center lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] leading-4"
            >
              {{ e.brefContent.split(" ")
              .slice(0, numwords2.value)
              .join(" ") + "..." }}
            </p>
            <a
              class="underline text-[#0d6efd] leading-3 cursor-pointer lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] self-end md:leading-3"
            >اقرا المزيد</a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="detailsActionBlog border border-solid border-x-transparent border-y-gray-400 p-2 flex justify-between shrink-0 grow-0"
    >
      <div class="commentsAndLikes flex !shrink-0 grow-0 gap-3">
        <div class="flex items-center gap-2">
          <i
            class="fa-regular fa-comment cursor-pointer lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
          ></i>
          <div
            class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
          >{{ post.commentsCounter }}</div>
        </div>

        <div class="flex items-center gap-2">
          <i
            class="fa-regular fa-heart lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
          ></i>
          <div
            class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
          >{{ post.likesCounter }}</div>
        </div>
      </div>

      <div class="saveAndShare flex !shrink-0 grow-0 gap-3">
        <div
          class="download flex items-center gap-2 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
        >
          <i
            class="fa-solid fa-download cursor-pointers lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
          ></i>
          <div
            class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
          >{{ post.downloadCounter }}</div>
        </div>
        <div
          class="share shrink-0 flex items-center gap-2 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
        >
          <i
            class="fa-solid fa-share cursor-pointers lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
          ></i>
          <div
            class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
          >{{ post.downloadCounter }}</div>
        </div>
      </div>
    </div>

    <div class="comments p-2">
      <v-app>
        <v-textarea
          outlined
          reverse
          label=" التعليق على المقال "
          auto-grow
          persistent-placeholder
          rows="4"
        ></v-textarea>
        <v-btn class="!text-white !w-[30%]" color="#0d6efd" type="submit" :loading="loading">التعليق</v-btn>
      </v-app>
    </div>
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
      numwords2: { type: Number, value: 20 },
      newArticles: [
        {
          title: " انتروبولوجيا المدبنة",
          phtotArticle: {
            src: require("../assets/images/sousArticle1.jpeg")
          },
          brefContent:
            "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقالات وتصفيحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقصفحهامختص في نشر المقالات  ا تصفحها"
        },
        {
          title: " انتروبولوجيا المدبنة",
          phtotArticle: {
            src: require("../assets/images/sousArticle2.webp")
          },
          brefContent:
            "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقالات وتصفيحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقصفحهامختص في نشر المقالات  ا تصفحها"
        },
        {
          title: " انتروبولوجيا المدبنة",
          phtotArticle: {
            src: require("../assets/images/sousArticle3.jpeg")
          },
          brefContent:
            "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقالات وتصفيحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقصفحهامختص في نشر المقالات  ا تصفحها"
        }
      ],

      showAltImage: false,
      title:
        "أي-جيوب-أدنى-يبق-واستمرت-الفرنسي-بها-كل-هو-قام-الصعداء-والكوري-ببسثبقثثثثثثثثثثثثثثثثثثثثثثثثث",
      post: {}
    };
  },
  methods: {
    onImgError() {
      this.showAltImage = true;
    }
  },
  created() {
    this.post = JSON.parse(localStorage.getItem("postSelected"));
    axios
      .get(
        "https://anthropologyca.onrender.com/api/v1/posts/" +
          this.currentPost.slug,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "Bearer " + this.user.token
          }
        }
      )
      .then(response => {
        this.post = response.data.data.data;
        console.log(this.post);
      })
      .catch(function(error) {
        console.log(error.response);
      })
      .finally(function() {
        // always executed
      });
  },

  props: {
    user: { type: Object },
    currentPost: {
      type: Object
    }
  }
};
</script>