<template>
  <div
    class="overflow-x-hidden relative lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4 myContainer"
  >
    <div class="firstPart p-2 md:gap-9 flex">
      <div class="img p-2">
        <v-avatar color="#0d6efd" :size="size">
          <v-img
            v-if="showAltImage == false"
            :src="imgUrl"
            v-on:error="onImgError"
          ></v-img>
          <span
            v-else
            class="white--text lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
            >{{ user.data.user.name.charAt(0) }}</span
          >
        </v-avatar>
      </div>

      <div class="aboutUser p-2">
        <div class="firstLine p-2 flex md:gap-6 items-center gap-2">
          <div
            class="fullName font-extrabold lg:text-[27px] md:text-[25px] sm:text-[16px] text-[17px]"
          >
            {{ user.data.user.name }}
          </div>
        </div>

        <div class="p-2 secondLine">
          <div
            class="bio lg:text-[20px] md:text-[18px] sm:text-[16px] text-[12px]"
          >
            {{ user.data.user.bio }}
          </div>
        </div>
        <div class="thirdLine p-2 flex md:gap-6 gap-2">
          <div
            class="nbrPost lg:text-[22px] md:text-[18px] sm:text-[16px] xs:text-[12px] text-[12px]"
          >
            <span
              class="font-extrabold lg:text-[22px] md:text-[20px] sm:text-[16px] text-[12px]"
              >عدد المقالات المنشوورة :</span
            >
            4
          </div>
          <div
            class="nbrLikeOfhisPosts lg:text-[20px] md:text-[18px] sm:text-[16px] text-[12px]"
          >
            <span
              class="font-extrabold lg:text-[20px] md:text-[20px] sm:text-[16px] text-[12px]"
              >عدد التفاعل على المنشوور:</span
            >
            2
          </div>
        </div>
        <div class="forthLine p-2">
          <div
            class="createdAt lg:text-[20px] md:text-[18px] sm:text-[16px] text-[12px]"
          >
            <span
              class="font-extrabold lg:text-[20px] md:text-[20px] sm:text-[16px] text-[12px]"
              >انضم الى المدونة في :</span
            >
            {{ user.data.user.bio }}
          </div>
        </div>
        <div
          class="fiveLine lg:text-[20px] md:text-[20px] sm:text-[16px] text-[12px] p-2"
        >
          <span> نوع الحساب : </span>
          {{ user.data.user.role }}
        </div>
      </div>
    </div>
    <div
      class="partTwo grid grid-cols-2 border border-solid border-b-gray-100 border-x-transparent border-t-transparent p-2"
    >
      <div
        @click="handlePublishedActif"
        :class="
          publishedActif
            ? ' p-2 text-center border border-solid border-b-[#0d6efd] border-x-transparent border-t-transparent cursor-pointer'
            : 'p-2 border-none text-center cursor-pointer'
        "
      >
        المقالات المنشورة
      </div>
      <div
        @click="handleActifVavourite"
        :class="
          favouriteActif
            ? ' p-2 text-center border border-solid border-b-[#0d6efd] border-x-transparent border-t-transparent cursor-pointer'
            : 'p-2 border-none text-center cursor-pointer'
        "
      >
        favoriteArticle
      </div>
    </div>
    <div class="partThree text-center p-2" v-if="publishedActif">
      <div
        v-if="loadingPage"
        class="flex items-center justify-center font-bold lg:text-[22px] md:text-[20px] sm:text-[16px] text-[14px]"
      >
        جاري التحميل ...
      </div>
      <div
        v-else
        class="article grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-2"
      >
        <div
          class="cursor-pointer cardSousArticle border border-solid border-gray-300 flex md:flex-col md:p-3 p-2 justify-between gap-1 rounded-[25px]"
          v-for="(e, index) in myBlogs"
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
    <div v-else class="text-center p-2">
      <div
        v-if="loadingPage"
        class="flex items-center justify-center font-bold lg:text-[22px] md:text-[20px] sm:text-[16px] text-[14px]"
      >
        جاري التحميل ...
      </div>
      <div
        v-else
        class="article grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-2"
      >
        <div
          class="cursor-pointer cardSousArticle border border-solid border-gray-300 flex md:flex-col md:p-3 p-2 justify-between gap-1 rounded-[25px]"
          v-for="(e, index) in favoriteBlog"
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
  </div>
</template>
<script>
import axios from "axios";
import router from "@/router";
export default {
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    size() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 80;
        case "sm":
          return 80;
        case "md":
          return 40;
        case "lg":
          return 150;
        case "xl":
          return 48;
      }
    },
  },
  mounted() {
    let $vm = this;
    $vm.getFavorite();
    $vm.getMyBlogs();
    $vm.getImage();
  },
  components: {},
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      loadingPage: true,
      favouriteActif: false,
      publishedActif: true,
      showAltImage: false,
      imgUrl: null,
      numwords2: { type: Number, value: 20 },
      myBlogs: null,
      favoriteBlog: null,
    };
  },
  methods: {
    getBlog(article) {
      localStorage.setItem("postSelected", JSON.stringify(article));
      this.$emit("postSelected", article);
      router.push({ path: "/Post" });
    },
    async getMyBlogs() {
      let $vm = this;
      axios
        .get("users/my-posts", {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "Bearer " + this.user.token,
          },
        })
        .then((response) => {
          $vm.loadingPage = false;
          this.myBlogs = response.data.data;
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
          this.favoriteBlog = response.data.data;
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
    getImage() {
      axios
        .get(
          "users/user-photo/" + this.user.data.user.photo,
          { responseType: "arraybuffer" },

          {
            headers: {
              Authorization: "Bearer " + this.user.token,
            },
          }
        )
        .then((res) => {
          this.imgUrl = URL.createObjectURL(
            new Blob([res.data], { tyoe: "image/jpg" })
          );
          console.log(this.imgUrl);

          console.log(new Blob([this.userAvatar.image], { type: "image/jpg" }));
        })
        .catch((e) => {
          console.log(e.data);
        });
    },
    onImgError() {
      this.showAltImage = true;
    },
    handleActifVavourite() {
      this.publishedActif = false;
      this.favouriteActif = true;
    },
    handlePublishedActif() {
      this.favouriteActif = false;

      this.publishedActif = true;
    },
  },
};
</script>
