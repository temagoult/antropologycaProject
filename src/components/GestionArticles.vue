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
            <div class="flex flex-col justify-between">
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
                  e.summary.split(" ").slice(0, numwords2.value).join(" ") +
                  "..."
                }}
              </p>
              <div
                class="actionArticle md:!p-2 flex justify-between items-center"
                :key="myKey"
              >
                <div>
                  <div
                    v-if="e.state == 'approved'"
                    class="text-green-800 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px]"
                  >
                    موافق عليه
                    <v-icon>mdi-check</v-icon>
                  </div>
                  <div
                    v-else
                    class="text-red-500 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px]"
                  >
                    قيد الانتظار
                  </div>
                </div>
                <div class="flex shrink-0 grow-0">
                  <v-btn
                    icon
                    @click="editMyBlog(e)"
                    class="!text-[12px] sm:!text-[16px] md:!text-[20px] !shrink-0 !grow-0 sm:!w-[auto] !w-[20px]"
                  >
                    <v-icon
                      class="!text-[12px] sm:!text-[16px] md:!text-[20px] !shrink-0 !grow-0"
                      >mdi-pencil</v-icon
                    >
                  </v-btn>
                  <v-btn
                    icon
                    @click="openDialogDelet(e)"
                    class="!shrink-0 !grow-0 sm:!w-[auto] !w-[20px]"
                  >
                    <v-icon
                      class="!text-[12px] sm:!text-[16px] md:!text-[20px] !shrink-0 !grow-0"
                      >mdi-delete</v-icon
                    >
                  </v-btn>
                </div>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >هل متاكد من حذف المقال</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        @click="deletMyBlog(e)"
                        :loading="loading"
                        :color="success ? 'success' : 'blue darken-1'"
                      >
                        <slot v-if="!success" />
                        <template v-else>
                          <span>
                            تم حذف المقال بنجاح
                            <v-icon>mdi-check</v-icon>
                          </span>
                        </template>
                        <span v-if="!success"> نعم</span>
                      </v-btn>

                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >لا</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
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
    let $vm = this;
    $vm.getMyBlogs();
  },
  data() {
    return {
      success: null,
      dialogDelete: null,
      myKey: null,
      loadingPage: true,
      numwords2: { type: Number, value: 20 },
      newArticles: [],
      currentEditableBlog: {},
      loading: false,
    };
  },
  methods: {
    closeDelete() {
      this.dialogDelete = false;
    },
    openDialogDelet() {
      this.dialogDelete = true;
    },
    editMyBlog(element) {
      console.log("downhere");

      this.currentEditableBlog = Object.assign({}, element);
      console.log(this.currentEditableBlog);
      this.$emit("currentEditableBlog", this.currentEditableBlog);
      this.$router.push({ path: "/EditBlog" });
    },
    deletMyBlog(article) {
      this.loading = true;
      axios
        .delete("posts/post/" + article.id, {
          headers: {
            Authorization: "Bearer " + this.user.token,
          },
        })
        .then((res) => {
          console.log(res);

          this.loading = false;
          this.success = true;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;

          setTimeout(() => {
            this.success = false;
            this.$emit("forceUpdate");
            this.dialogDelete = false;
          }, 3000);
        });
    },
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
          this.newArticles = response.data.data;
          console.log(response);
          console.log(this.newArticles);
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
