<template>
  <div
    class="lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4 lg:min-h-[67vh] md:min-h-[46vh] min-h-[65vh]"
  >
    <div class="myContainer">
      <div class="addArticle p-2 text-center">
        <v-btn
          to="/addPost"
          class="!p-2 md:!text-[25px] !text-[15px] !text-white"
          color="#0d6efd"
          >اضافة مقالة جديدة +</v-btn
        >
      </div>
      <div
        class="text-[#0d6efd] md:text-start text-center sousTitre flex md:p-2 p-[3px] md:justify-start justify-center gap-2 items-center relative w-[100%]"
      >
        <i
          class="fa-solid fa-paperclip lg:text-[40px] md:text-[35px] sm:text-[25px] text-[20px] bg-white md:mr-[100px] m-0 pr-1"
        ></i>
        <div
          class="lg:text-[40px] md:text-[35px] sm:text-[25px] text-[20px] bg-white p-2 mr-[-8px]"
        >
          مقالاتي
        </div>
        <div class="w-[100%] bg-[#0d6efd] h-[1px] absolute z-[-1]"></div>
      </div>

      <div class="articles p-2 myContainer">
        <div
          v-if="loadingPage"
          class="flex items-center justify-center font-bold lg:text-[22px] md:text-[20px] sm:text-[16px] text-[14px]"
        >
          جاري التحميل ...
        </div>
        <div
          class="article grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-2"
          v-else
        >
          <div
            class="cursor-pointer cardSousArticle border border-solid border-gray-300 flex md:flex-col md:p-3 p-2 justify-between gap-1 rounded-[25px]"
            v-for="(e, index) in newArticles"
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
            <div class="flex flex-col">
              <div
                @click="getBlog(e)"
                class="dateP lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd] overflow-hidden"
              >
                <span>عنوان المقال :</span>
                {{ e.title }}
              </div>
              <p
                @click="getBlog(e)"
                class="text-gray-500 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] leading-4 overflow-hidden"
              >
                {{
                  e.summary.split(" ").slice(0, numwords2.value).join(" ") +
                  "..."
                }}
              </p>
              <div class="actionArticle self-end !p-2">
                <v-btn icon @click="editMyBlog(e)">
                  <v-icon class="!text-[12px] sm:!text-[16px] md:!text-[20px]"
                    >mdi-pencil</v-icon
                  >
                </v-btn>
                <v-btn icon @click="deletMyBlog(e)">
                  <v-icon class="!text-[12px] sm:!text-[16px] md:!text-[20px]"
                    >mdi-delete</v-icon
                  >
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router";
export default {
  mounted() {
    this.getMyBlogs();
  },
  data() {
    return {
      loadingPage: null,
      numwords2: { type: Number, value: 20 },
      newArticles: [],
      currentEditableBlog: {},
    };
  },
  methods: {
    editMyBlog(element) {
      console.log("downhere");

      this.currentEditableBlog = Object.assign({}, element);
      console.log(this.currentEditableBlog);
      this.$emit("currentEditableBlog", this.currentEditableBlog);
      this.$router.push({ path: "/EditBlog" });
    },
    deletMyBlog() {},
    getBlog(article) {
      localStorage.setItem("postSelected", JSON.stringify(article));
      this.$emit("postSelected", article);
      router.push({ path: "/Post" });
    },
    getMyBlogs() {
      axios
        .get("https://anthropologyca.onrender.com/api/v1/users/my-posts", {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "Bearer " + this.user.token,
          },
        })
        .then((response) => {
          this.newArticles = response.data.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error.response);
        })
        .finally(function () {
          // always executed
        });
    },
  },
  computed: {
    returnFlowValue() {
      if (this.newArticles.lenght == 2 || this.newArticles.length == 1) {
        return true;
      } else {
        return false;
      }
    },
  },
  props: {
    user: {
      type: Object,
    },
  },
};
</script>
