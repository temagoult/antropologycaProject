<template>
  <div
    v-if="isLogin==false"
    class="lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4"
  >
    <div class="myContainer flex flex-col gap-4 md:w-[70%] md:mx-auto">
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
            >اضيف في: {{getFormattedDate(post.updatedAt) }}</div>
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
              @click="scrollToComments"
              class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
            >{{ post.commentsCounter }}</div>
          </div>

          <div class="flex items-center gap-2">
            <v-btn icon @click="toggleIsPlaying">
              <v-icon
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] cursor-pointer"
                v-if="isPlaying"
              >mdi-heart</v-icon>
              <v-icon
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] cursor-pointer"
                v-else
              >mdi-heart-outline</v-icon>
              <div
                class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
              >{{ post.likesCounter }}</div>
            </v-btn>
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
          <div class="view flex items-center gap-2">
            <i
              class="fa-regular fa-eye lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
            ></i>
            <div
              class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
            >{{ post.viewsCounter }}</div>
          </div>
        </div>
      </div>
      <div class="imgBlog p-2 w-[100%] h-[400px] flex">
        <img src="../assets/images/article.jpeg" class="h-[100%] w-[100%]" />
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
              @click="focusComment"
              class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
            >{{ post.commentsCounter }}</div>
          </div>

          <div class="flex items-center gap-2">
            <v-btn icon @click="toggleIsPlaying">
              <v-icon
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] cursor-pointer"
                v-if="isPlaying"
                color="red"
                @click="Like"
              >mdi-heart</v-icon>
              <v-icon
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] cursor-pointer"
                v-else
                @click="unLike"
              >mdi-heart-outline</v-icon>
              <div
                class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
              >{{ post.likesCounter }}</div>
            </v-btn>
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
          <div class="view flex items-center gap-2">
            <i
              class="fa-regular fa-eye lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
            ></i>
            <div
              class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-gray-500"
            >{{ post.viewsCounter }}</div>
          </div>
        </div>
      </div>

      <div class="comments p-2">
        <v-app>
          <v-textarea
            id="commentField"
            outlined
            reverse
            label=" التعليق على المقال "
            auto-grow
            persistent-placeholder
            rows="4"
            v-model="comment"
          ></v-textarea>
          <v-btn
            class="!text-white !w-[30%] lg:!text-[18px] md:!text-[16px] sm:!text-[14px] !text-[12px] !p-2"
            :color="success? 'success' : '#0d6efd' "
            type="submit"
            :loading="loading"
            @click="addComment"
          >
            <slot v-if="!success" />
            <template v-else>
              <span>
                <v-icon>mdi-check</v-icon>
              </span>
            </template>
            <span v-if="!success">التعليق</span>
          </v-btn>
        </v-app>

        <div class="p-2 text-[25px] font-bold" id="comments">التعليقات</div>
        <v-divider class="my-1"></v-divider>
        <div
          v-for="(comment,index) in post.comments.slice(0,number)"
          :key="index"
          class="flex flex-col"
        >
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
                class="p-2 white--text lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px] rounded-[50%] border border-solid border-gray-500 w-[50px] h-[50px]"
              >{{comment.user.name.charAt(0)}}</span>
            </div>
            <div class="publisher text-gray-500">
              <div
                class="flex flex-row gap-3 items-center text-[12px] sm:text-[16px] md:text-[20px]"
              >
                <div
                  class="namePubliser text-[12px] sm:text-[16px] md:text-[20px]"
                >{{ comment.user.name }}@</div>

                <div
                  class="publishedAt text-[12px] sm:text-[16px] md:text-[20px]"
                >اضيف في: {{ getFormattedDate(comment.createdAt) }}</div>
              </div>
            </div>
          </div>
          <div class="comments text-[12px] sm:text-[16px] md:text-[20px]">{{comment.comment}}</div>
          <v-divider class="my-2"></v-divider>
        </div>
      </div>
      <div
        class="ShowMore underline text-blue-500 text-center cursor-pointer"
        @click="handleShowMoreComment"
        v-if="showLess"
      >عرض المزيد</div>
      <div
        v-else
        @click="handleShowLessComment"
        class="ShowLess underline text-blue-500 text-center cursor-pointer"
      >عرض القليل</div>
    </div>
  </div>
  <div class="div text-center" v-else>please LogIn</div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import moment from "moment";

axios.create({
  paramsSerializer: params => qs.stringify(params, { encode: false })
});
export default {
  name: "Post",
  data() {
    return {
      isPlaying: false,
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

      number: 0,
      showLess: true,
      success: false,
      token: "",
      objectComment: {
        post: "",

        user: ""
      },
      post: {},

      canComment: false,
      getComments: {},
      loading: false,
      comment: null,
      numwords2: { type: Number, value: 20 },

      showAltImage: false,
      title:
        "أي-جيوب-أدنى-يبق-واستمرت-الفرنسي-بها-كل-هو-قام-الصعداء-والكوري-ببسثبقثثثثثثثثثثثثثثثثثثثثثثثثث"
    };
  },
  methods: {
    toggleIsPlaying() {
      this.isPlaying = !this.isPlaying;
    },
    getFormattedDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    onImgError() {
      this.showAltImage = true;
    },
    getAllComments() {},
    async addComment() {
      this.loading = true;

      await axios
        .post(
          "https://anthropologyca.onrender.com/api/v1/posts/" +
            this.post.id +
            "/comments/",
          {
            objectComment: {
              post: this.post.id,
              user: this.user.data.user._id
            },
            comment: this.comment
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
            this.loading = false;
            this.success = true;

            console.log(res.data);
          }
        })
        .catch(e => console.log(e))
        .finally(() => {
          console.log("cest fait");
          this.loading = false;
          setTimeout(() => {
            this.success = false;
            this.$nextTick(() => {
              this.comment = "";
            });
          }, 3000);
        });
    },
    handleShowMoreComment() {
      this.showLess = false;
      this.number = this.post.comments.lengh;
      console.log(this.showLess);
    },
    handleShowLessComment() {
      this.showLess = true;
      this.number = 5;
    },
    scrollToComments() {
      const element = document.getElementById("comments");
      element.scrollIntoView({ behavior: "smooth" });
    },
    focusComment() {
      const element = document.getElementById("commentField");
      element.focus();
    },
    Like() {
      console.log("jaime");
    },
    unLike() {
      console.log("notJaime");
    }
  },

  mounted() {
    console.log("!" + this.isLogin);

    this.post = JSON.parse(localStorage.getItem("postSelected"));
    console.log("down");
    console.log(this.post);
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
        console.log(this.post.comments);
        this.lenghPost = this.post;
        if (this.showLess == false) {
          this.number = this.post.comments.lengh;
        } else {
          this.number = 5;
        }
      })
      .catch(function(error) {
        console.log(error.response);
      })
      .finally(function() {});
  },

  props: {
    user: { type: Object },
    currentPost: {
      type: Object
    },
    isLogin: {
      type: Boolean
    }
  }
};
</script>