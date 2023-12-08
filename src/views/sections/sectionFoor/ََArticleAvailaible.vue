<template>
  <div
    class="overflow-x-hidden relative lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4"
  >
    <div class="myContainer flex flex-col justify-start">
      <div
        class="text-[#0d6efd] md:text-start text-center sousTitre flex md:p-2 p-[3px] md:justify-start justify-center gap-2 items-center relative w-[100%]"
      >
        <i
          class="fa-solid fa-paperclip lg:text-[40px] md:text-[35px] sm:text-[25px] text-[20px] bg-white md:mr-[100px] m-0 pr-1"
        ></i>
        <div
          class="lg:text-[40px] md:text-[35px] sm:text-[25px] text-[20px] bg-white p-2 mr-[-8px]"
        >
          مقالات قد تعجبك
        </div>
        <div class="w-[100%] bg-[#0d6efd] h-[1px] absolute z-[-1]"></div>
      </div>
      <div
        v-if="loadingPage"
        class="flex items-center justify-center font-bold lg:text-[22px] md:text-[20px] sm:text-[16px] text-[14px]"
      >
        جاري التحميل ...
      </div>
      <div class="flex flex-col gap-8 justify-center" v-else>
        <!-- <div class="sousArticles flex flex-col gap-1 md:col-span-4 md:order-1 order-2 p-2">
          <div
            class="cardSousArticle border border-solid border-gray-300 flex items-center md:p-3 p-2 justify-between gap-1 rounded-[25px]"
            v-for="(e,index) in newArticles.slice(0,number)"
            :key="index"
          >
            <img
              :src="photoArticle.src"
              class="w-[140px] lg-h-[00px] md:h-[104px] sm:h-[65px] h-[50px] p-1"
            />
            <div class="flex flex-col">
              <div
                class="dateP lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
              >
                <span>عنوان المقال :</span>
                {{ e.title.split(" ")
                .slice(0, numwords2.value)
                .join(" ") + "..." }}
              </div>
              <p
                class="text-gray-500 self-center lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] leading-4"
              >
                {{ e.summary.split(" ")
                .slice(0, numwords2.value)
                .join(" ") + "..." }}
              </p>
              <a
                class="underline text-[#0d6efd] leading-3 cursor-pointer lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] self-end md:leading-3"
                @click="action"
              >اقرا المزيد</a>
            </div>
          </div>
        </div>-->
        <div
          :class="
            allowFlowGrid
              ? 'mainArticle p-2 grid grid-flow-col gap-4 justify-items-center items-center'
              : 'mainArticle p-2 grid md:grid-cols-3 grid-cols-1 gap-4'
          "
        >
          <div
            v-for="(blog, index) in newArticles"
            :key="index"
            class="cardArticle p-2 rounded-[25px] border border-solid border-gray-300 flex flex-col md:gap-1 sm:gap-[3px] gap-[2px]"
          >
            <img
              crossorigin="anonymous"
              :src="
                'https://anthropologyca.onrender.com/api/v1/posts/post-image/' +
                blog.coverImage
              "
              class="md:w-[100%] w-fit h-fit lg:h-[300px] md:h-[250px] sm:h-[200px] rounded-t-[12px] cursor-pointer"
            />
            <div
              class="dateP lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
            >
              <span>عنوان المقال :</span>
              {{
                blog.title.split(" ").slice(0, numwords2.value).join(" ") +
                "..."
              }}
              }}
            </div>
            <p
              class="text-gray-500 leading-4 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[12px] py-[7px]"
            >
              {{
                blog.summary.split(" ").slice(0, numwords.value).join(" ") +
                "..."
              }}
            </p>
            <div
              class="dateP lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
            >
              <span>كاتب المقال :</span>
              {{ blog.author.name }}
            </div>
            <div
              class="whriter flex justify-between lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
            >
              <div>
                <span class>اضيف في :</span>
                {{ getFormattedDate(blog.publishedAt) }}
              </div>
            </div>
            <div class="sousCard flex justify-between py-2 text-[#0d6efd]">
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
                  >
                    {{ blog.commentsCounter }}
                  </div>
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
                  >
                    {{ blog.downloadCounter }}
                  </div>
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
                  >
                    {{ blog.viewsCounter }}
                  </div>
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
                      >mdi-heart</i
                    >

                    <div
                      class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] !text-[#0d6efd]"
                    >
                      {{ newArticles[index].likesCounter }}
                    </div>
                  </v-btn>
                  <v-spacer></v-spacer>
                </div>
              </div>

              <v-btn
                class="!text-[#0d6efd] !cursor-pointer !lg:text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] !self-end"
                @click="action(blog)"
                >اقرا المزيد</v-btn
              >
            </div>
          </div>
        </div>
        <v-app v-if="newArticles.length > 3">
          <v-pagination
            v-model="page"
            active-color="red"
            light
            circle
            :length="pageCount"
            next-icon="mdi-arrow-left"
            prev-icon="mdi-arrow-right"
            @input="getBlogs"
          ></v-pagination>
        </v-app>
      </div>
    </div>
    <Login
      class="absolute"
      :showLoginDialog="showLoginDialog"
      @updatemodelValue="updatemodelValue"
      @isloged="isloged"
      @islogedSignUp="islogedSignUp"
    ></Login>
    <v-dialog v-model="dialoglogin" max-width="300px">
      <v-card>
        <v-spacer></v-spacer>
        <v-card-title
          class="!text-center p-2 md:!text-lg sm:!text-base !text-sm m-2 justify-center"
          >يجب عليك تسجيل الدخول اولا</v-card-title
        >
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialogMustlogin"
            >متفهم</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Login from "@/components/Login.vue";
import axios from "axios";

import moment from "moment";
import router from "../../../router";

export default {
  components: {
    Login,
  },
  props: {
    isLogin: { type: Boolean },
  },
  mounted() {
    this.getBlogs();
  },
  data() {
    return {
      allowFlowGrid: null,
      loadingPage: true,
      pageCount: 0,
      page: 1,
      perPage: 3,
      records: [],
      recordsLength: 0,

      showLoginDialog: false,
      dialoglogin: false,
      numwords: { type: Number, value: 20 },
      numwords2: { type: Number, value: 2 },

      newArticles: [],
    };
  },

  methods: {
    getBlogs() {
      this.loadingPage = true;
      axios
        .get("https://anthropologyca.onrender.com/api/v1/posts/", {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then((response) => {
          if (this.loadingPage != undefined) {
            this.loadingPage = false;
          }

          this.newArticles = response.data.data.docs;
          if (this.newArticles.length == 1) {
            this.allowFlowGrid = true;
          } else {
            this.allowFlowGrid = false;
          }

          this.recordsLength = this.newArticles.length;

          this.pageCount = Math.floor(this.recordsLength / 3);
          console.log(this.pageCount);
        })
        .catch(function (error) {
          console.log(error.response);
        })
        .finally(function () {
          // always executed
          // if (this.loadingPage) {
          //   this.loadingPage = false;
          // }
        });
      this.loadingPage = false;
    },

    callback: function (page) {
      console.log(`Page ${page} was selected. Do something about it`);
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
        console.log("hello" + this.showLoginDialog);
      } else {
        router.push({ path: "/Post" });
        this.$emit("postSelected", article);
        localStorage.setItem("postSelected", JSON.stringify(article));
      }
    },
    isloged() {
      this.$emit("isloged");
    },
    islogedSignUp() {
      this.$emit("islogedSignUp");
    },
    getFormattedDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
  },
};
</script>
