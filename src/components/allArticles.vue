<template>
  <div
    class="lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4 lg:min-h-[67vh] md:min-h-[46vh] min-h-[65vh]"
  >
    <div class="myContainer">
      <div class="md:w-[100%] mx-auto placeholder:text-[#0d6efd] p-2">
        <v-text-field
          class="!self-center !m-0 !rounded"
          type="text"
          clearable
          outlined
          append-inner-icon="mdi-magnify"
          v-model="search"
          placeholder="  بحث في المدونة   (عنوان المقال)"
        ></v-text-field>
      </div>

      <div class="articles p-2 myContainer flex flex-col">
        <div class="mainArticle p-2 grid md:grid-cols-3 sm:grid-cols-2 gap-4 content-center">
          <div
            v-for="(blog,index) in filterBlog"
            :key="index"
            class="cardArticle p-2 rounded-[25px] border border-solid border-gray-300 flex flex-col md:gap-1 sm:gap-[3px] gap-[2px]"
          >
            <img
              :src="photoArticle.src"
              class="md:w-[100%] w-fit h-fit lg:h-[300px] md:h-[250px] sm:h-[200px] rounded-t-[12px] cursor-pointer"
            />
            <div
              class="dateP lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
            >
              <span>عنوان المقال :</span>
              {{ blog.title.split(" ")
              .slice(0, numwords2.value)
              .join(" ") + "..." }} }}
            </div>
            <p
              class="text-gray-500 leading-4 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[12px] py-[7px]"
            >
              {{ blog.summary.split(" ")
              .slice(0, numwords.value)
              .join(" ") + "..." }}
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
                {{getFormattedDate( blog.updatedAt) }}
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
                  >{{ blog.commentsCounter }}</div>
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
                  >{{ blog.downloadCounter }}</div>
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
                  >{{ blog.viewsCounter }}</div>
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
                    >{{ allArticles[index].likesCounter }}</div>
                  </v-btn>
                  <v-spacer></v-spacer>
                </div>
              </div>

              <v-btn
                class="!text-[#0d6efd] !cursor-pointer !lg:text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] !self-end"
                @click="action(blog)"
              >اقرا المزيد</v-btn>
            </div>
          </div>
        </div>
        <v-app>
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
  </div>
</template>
  <script>
import axios from "axios";
import moment from "moment";

export default {
  components: {},
  data() {
    return {
      calcPerPgae: 0,
      search: "",
      loadingPage: null,
      pageCount: 0,
      page: 1,
      perPage: 6,
      records: [],
      recordsLength: 0,

      showLoginDialog: false,
      dialoglogin: false,
      numwords: { type: Number, value: 20 },
      numwords2: { type: Number, value: 2 },
      photoArticle: {
        src: require("../assets/images/article2.jpg")
      },

      allArticles: [
        {
          title: "",
          summary: "",
          viewsCounter: "",
          likesCounter: "",
          commentsCounter: "",
          author: {}
        }
      ],
      currentEditableBlog: {}
    };
  },
  created() {
    this.getBlogs(this.page);
  },
  computed: {
    filterBlog() {
      let Search = this.search;
      return this.records.filter(function(article) {
        return article.title.match(Search);
      });
    }
  },
  methods: {
    getBlogs(page) {
      axios
        .get("https://anthropologyca.onrender.com/api/v1/posts/", {
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then(response => {
          console.log(response.data);

          this.allArticles = response.data.data.docs;
          this.records = [];
          const startIndex = this.perPage * (page - 1) + 1;
          this.calcPerPgae = this.allArticles.length;
          this.calcPerPgae = this.calcPerPgae - 1;
          console.log(this.calcPerPgae);

          const endIndex = startIndex + this.perPage - 1;

          for (let i = startIndex; i <= endIndex; i++) {
            this.records.push(this.allArticles[i]);
          }
          if (this.allArticles.length - endIndex < 6) {
            this.perPage = this.allArticles.length - endIndex;
          } else {
            this.perPage = 6;
          }
          console.log(this.allArticles.length - endIndex);

          this.recordsLength = this.allArticles.length;

          this.pageCount = Math.ceil(this.recordsLength / 6);
        })
        .catch(function(error) {
          console.log(error.response);
        })
        .finally(function() {
          // always executed
        });
    },

    deletMyBlog() {},
    getFormattedDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    action(article) {
      if (this.isLogin == true) {
        this.dialoglogin = true;
        console.log("hello" + this.showLoginDialog);
      } else {
        this.$router.push({ path: "/Post" });
        this.$emit("postSelected", article);
      }
    }
  }
};
</script>
