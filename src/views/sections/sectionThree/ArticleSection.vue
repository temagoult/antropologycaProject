<template>
  <div
    class="overflow-x-hidden relative lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4"
  >
    <div class="myContainer flex flex-col items-center justify-start">
      <div
        class="text-[#0d6efd] md:text-start text-center sousTitre flex md:p-2 p-[3px] md:justify-start justify-center gap-2 items-center relative w-[100%]"
      >
        <i
          class="fa-regular fa-clock animate-bounce lg:text-[40px] md:text-[35px] sm:text-[25px] text-[20px] bg-white md:mr-[100px] m-0 pr-1"
        ></i>
        <div
          class="lg:text-[40px] animate-bounce md:text-[35px] sm:text-[25px] text-[20px] bg-white p-2 mr-[-8px]"
        >اضيف مؤخرا</div>
        <div class="w-[100%] bg-[#0d6efd] h-[1px] absolute z-[-1]"></div>
      </div>

      <Swiper
        class="sm:!w-[120%] sm!!w-[115%] !w-[100%] md:!p-0 !p-2"
        @swiper="getRef"
        ref="mySwiper"
        slidesPerView="auto"
        freeMode
        mousewheel
        autoplay
        loop
        :reversedirection="true"
        observer
        :disableOnInteraction="true"
        observeParents
      >
        <Swiper-slide
          v-for="(article,index) in posts"
          :key="index"
          class="md:!w-[25%] sm:!w-[35%] !w-[100%]"
        >
          <div class="partArticleOne md:p-4 p-2 text-start md:!w-[100%] w-[100%]">
            <div
              class="cardArticle p-2 rounded-[25px] border border-solid border-gray-300 flex flex-col md:gap-1 sm:gap-[3px] gap-[2px]"
            >
              <img
                :src="photo.src"
                class="w-[100%] lg:h-[300px] md:h-[250px] sm:h-[200px] h-[150px] rounded-t-[12px] cursor-pointer p-2"
              />
              <div
                class="dateP lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
              >
                <span>عنوان المقال :</span>
                {{ article.title.split(" ")
                .slice(0, numwords2.value)
                .join(" ") + "..." }}
              </div>
              <p
                class="text-gray-500 leading-4 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] lg:h-[70px] md:h-[60px] sm:h-[50px] h-[40px] py-[7px]"
              >
                {{ article.summary.split(" ")
                .slice(0, numwords.value)
                .join(" ") + "..." }}
              </p>
              <div
                class="dateP lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
              >
                <span>كاتب المقال :</span>
                {{ article.author.name }}
              </div>
              <div
                class="whriter flex justify-between lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
              >
                <div>
                  <span class>اضيف في :</span>
                  {{getFormattedDate( article.createdAt )}}
                </div>
              </div>
              <div class="sousCard flex justify-between py-2 text-[#0d6efd] w-[100%]">
                <div class="icons !flex !justify-between w-[100%] items-center">
                  <v-btn
                    disabled
                    icon
                    class="!shrink-0 !grow-0 comment !flex !items-center !gap-2 !lg:text-[20px] !md:text-[18px] !sm:text-[16px] !text-[14px] !text-[#0d6efd] !px-4"
                  >
                    <i
                      class="fa-regular fa-comment cursor-pointer lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
                    ></i>
                    <div
                      class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
                    >{{ article.commentsCounter }}</div>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    disabled
                    icon
                    class="!px-4 !shrink-0 !grow-0 download !flex !items-center !gap-2 !lg:text-[20px] !md:text-[18px] !sm:text-[16px] !text-[14px] !text-[#0d6efd]"
                  >
                    <i
                      class="fa-solid fa-download cursor-pointers lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
                    ></i>
                    <div
                      class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
                    >{{ article.downloadCounter }}</div>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    disabled
                    icon
                    class="!px-4 !shrink-0 !grow-0 !view !flex !items-center !gap-2 !lg:text-[20px] !md:text-[18px] !sm:text-[16px] !text-[14px] !text-[#0d6efd]"
                  >
                    <i
                      class="fa-regular fa-eye lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
                    ></i>
                    <div
                      class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
                    >{{ article.viewsCounter }}</div>
                  </v-btn>
                  <div class="flex items-center gap-2">
                    <v-spacer></v-spacer>
                    <v-btn
                      disabled
                      icon
                      class="!shrink-0 !grow-0 !px-4 !flex !items-center !gap-2 !lg:text-[20px] !md:text-[18px] !sm:text-[16px] !text-[14px] !text-[#0d6efd]"
                    >
                      <i
                        class="fa-regular fa-heart lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] cursor-pointer !text-[#0d6efd]"
                      >mdi-heart</i>

                      <div
                        class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] !text-[#0d6efd]"
                      >{{ article.likesCounter }}</div>
                    </v-btn>
                    <v-spacer></v-spacer>
                  </div>
                </div>

                <v-btn
                  :disabled="isLogin"
                  @click="action(article)"
                  class="!text-[#0d6efd] cursor-pointer !lg:text-[20px] !md:text-[18px] !sm:text-[16px] !text-[14px] !self-end"
                >اقرا المزيد</v-btn>
              </div>
            </div>
          </div>
        </Swiper-slide>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </Swiper>

      <div
        class="nextPrev p-2 flex md:w-[10%] w-[15%] gap-4 justify-center text-center items-center"
      >
        <div
          :class=" this.prevActif?'actif nextButt flex items-center justify-center p-2 cursor-pointer rounded-[50%] ':'nextButt flex items-center justify-center cursor-pointer p-2 rounded-[50%]'"
          @click="onPrevious"
        >
          <i
            class="fa-solid fa-arrow-right lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
          ></i>
        </div>
        <div
          :class="this.nextActif?'actif previousButt flex items-center justify-center p-2  cursor-pointer rounded-[50%]':'previousButt flex items-center justify-center cursor-pointer p-2 rounded-[50%]'"
          @click="onNext"
        >
          <i
            class="fa-solid fa-arrow-left lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
          ></i>
        </div>
      </div>
    </div>
    <Login
      @islogedSignUp="islogedSignUp"
      class="absolute"
      :showLoginDialog="showLoginDialog"
      @updatemodelValue="updatemodelValue "
      @isloged="isloged"
    ></Login>
    <v-dialog v-model="dialoglogin" max-width="300px">
      <v-card>
        <v-card-title
          class="!text-center p-2 md:!text-lg sm:!text-base !text-sm m-2 justify-center"
        >يجب عليك تسجيل الدخول اولا</v-card-title>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialogMustlogin">متفهم</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { Scrollbar, Mousewheel, Navigation, Autoplay } from "swiper";
import { SwiperCore, Swiper, SwiperSlide } from "swiper-vue2";
import Login from "@/components/Login.vue";
import "swiper/swiper-bundle.css";
import axios from "axios";
import router from "../../../router";
import moment from "moment";
SwiperCore.use([Scrollbar, Mousewheel, Navigation, Autoplay]);
export default {
  created() {
    this.getBlogs();
    console.log(this.posts);
  },
  data() {
    return {
      favouritePosts: null,
      isLiked: null,
      posts: [
        {
          title: "",
          summary: "",
          viewsCounter: "",
          likesCounter: "",
          commentsCounter: "",
          author: {}
        },
        {
          title: "",
          summary: "",
          viewsCounter: "",
          likesCounter: "",
          commentsCounter: "",
          author: {}
        },
        {
          title: "",
          summary: "",
          viewsCounter: "",
          likesCounter: "",
          commentsCounter: "",
          author: {}
        },
        {
          title: "",
          summary: "",
          viewsCounter: "",
          likesCounter: "",
          commentsCounter: "",
          author: {}
        },
        {
          title: "",
          summary: "",
          viewsCounter: "",
          likesCounter: "",
          commentsCounter: "",
          author: {}
        },
        {
          title: "",
          summary: "",
          viewsCounter: "",
          likesCounter: "",
          commentsCounter: "",
          author: {}
        }
      ],
      photo: {
        src: require("../../../assets/images/article3.jpeg")
      },

      showLoginDialog: false,
      dialoglogin: false,
      numwords2: { type: Number, value: 2 },
      numwords: { type: Number, value: 15 },
      swiper: null,
      nextActif: false,
      prevActif: false,
      observer: true,
      observeParents: true,

      swiperOptions: {
        slidesPerView: "auto",
        spaceBetween: 0,
        freeMode: true,
        scrollbar: true,
        mousewheel: true,

        paginationClickable: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  methods: {
    like() {
      this.isLiked = true;
      axios
        .post(
          "https://anthropologyca.onrender.com/api/v1/posts/" +
            this.post.id +
            "/likes",
          {
            objectComment: {
              post: this.post.id,
              user: this.user.data.user._id
            }
          },

          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: "Bearer " + this.user.token
            }
          }
        )
        .then(res => {
          if (res.status === 200) {
            console.log(res.data);
            // console.log(res);
          }
        })
        .catch(e => {
          console.log(e.response.data.message);
        })
        .finally(() => {});
    },
    unLike() {
      this.isLiked = false;
      axios
        .delete(
          "https://anthropologyca.onrender.com/api/v1/posts/" +
            this.post.id +
            "/likes/",

          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Authorization: "Bearer " + this.user.token
            }
          }
        )
        .then(res => {
          if (res.status === 200) {
            console.log(res.data);
            // console.log(res);
          }
        })
        .catch(e => {
          console.log(e.response.data.message);
        })
        .finally(() => {});
    },
    getFormattedDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    async getBlogs() {
      await axios
        .get("https://anthropologyca.onrender.com/api/v1/posts/", {
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then(response => {
          console.log(response.data);

          this.posts = response.data.data.docs;
          console.log(this.posts);
        })
        .catch(function(error) {
          console.log(error.response);
        })
        .finally(function() {
          // always executed
        });
    },
    dialogMustlogin() {
      this.dialoglogin = false;
      this.showLoginDialog = true;
    },
    updatemodelValue(val) {
      this.showLoginDialog = val;
    },
    action(article) {
      if (this.isLogin == true) {
        this.dialoglogin = true;
      } else {
        localStorage.setItem("postSelected", JSON.stringify(article));
        this.$emit("postSelected", article);
        router.push({ path: "/Post" });
      }
    },
    getRef(s) {
      this.swiper = s;
    },

    onNext() {
      this.swiper.slideNext();
      this.nextActif = true;
      this.prevActif = false;
    },
    onPrevious() {
      this.swiper.slidePrev();
      this.nextActif = false;
      this.prevActif = true;
    },
    isloged() {
      this.$emit("isloged");
    },
    islogedSignUp() {
      this.$emit("islogedSignUp");
    },

    toggleIsPlaying() {
      this.isPlaying = !this.isPlaying;
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    Login
  },
  props: {
    isLogin: { type: Boolean }
  }
};
</script>
<style scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 330px;
}
</style>