<template>
  <div
    class="bg-stone-50 navBar lg:p-8 md:p-7 sm:p-5 p-4 lg:min-h-[67vh] md:min-h-[46vh] min-h-[65vh] mt-[-17px]"
  >
    <div class="flex flex-col items-center myContainer p-1">
      <div class="w-[100%] flex justify-center p-2">
        <!-- <div class="p-2">
          <v-list-item class="lg:!text-[18px] md:!text-[21px] sm:!text-[15px] !text-[12px]" to="/">
            <v-list-item-content>
              <i
                class="fa-solid fa-arrow-right md:text-[25px] sm:text-[20px] text-[15px] text-black"
              ></i>
            </v-list-item-content>
          </v-list-item>
        </div>-->

        <div class="mt-[-90px] md:w-[100%] sm:w-[70%] w-[70%] placeholder:text-[#0d6efd]">
          <v-text-field
            class="!self-center !m-0"
            type="text"
            clearable
            v-model="search"
            placeholder="  بحث في المدونة   (عنوان المقال)"
          ></v-text-field>
        </div>
        <!-- <v-btn icon x-large @click="showDialog=true" class="!p-2" v-if="isLogin==false">
          <v-avatar color="#0d6efd" :size="size">
            <v-img
              v-if="showAltImage==false"
              src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
              v-on:error="onImgError"
            ></v-img>
            <span
              v-else
              class="white--text lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
            >{{user.data.user.name.charAt(0)}}</span>
          </v-avatar>
        </v-btn>-->
      </div>

      <div
        v-if="search.length>0&&filterBlog.length==0"
        class="text-[#0d6efd] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px]"
      >لا يوجد مقالات متعلقة ببحثك</div>
      <div
        v-if="search.length>0"
        class="sousArticles flex flex-col gap-1 md:w-[100%] sm:w-[70%] w-[70%] p-2 mt-[-30px]"
      >
        <div
          class="cardSousArticle border border-solid border-gray-300 flex items-start md:p-3 p-2 gap-1 rounded-[25px] hover:bg-slate-100 cursor-pointer"
          v-for="(e,index) in filterBlog "
          :key="index"
          @click="action(e)"
        >
          <img
            crossorigin="anonymous"
            alt="img"
            class="w-[140px] lg-h-[100px] md:h-[84px] sm:h-[65px] h-[60px] p-1"
          />
          <div class="flex flex-col">
            <div
              class="dateP lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
            >
              <span>عنوان المقال :</span>
              {{ e.title }}
            </div>
            <p
              class="text-gray-500 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] leading-4"
            >
              {{ e.summary.split(" ")
              .slice(0, numwords.value)
              .join(" ") + "..." }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <Login class="absolute" :showLoginDialog="showLoginDialog" @updatemodelValue="updatemodelValue"></Login>
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
import Login from "@/components/Login.vue";
import axios from "axios";
export default {
  data() {
    return {
      numwords: { type: Number, value: 10 },
      showLoginDialog: false,
      dialoglogin: false,
      allArticles: [],
      search: "",
      data: "",
      showAltImage: false
    };
  },
  components: {
    Login
  },
  props: {
    isLogin: { type: Boolean },
    user: { type: Object }
  },
  created() {
    axios
      .get("https://anthropologyca.onrender.com/api/v1/posts/", {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then(response => {
        this.allArticles = response.data.data.docs;
        console.log(this.user.data.user._id);
      })
      .catch(function(error) {
        console.log(error.response);
      })
      .finally(function() {
        // always executed
      });
  },
  computed: {
    filterBlog() {
      let Search = this.search;
      return this.allArticles.filter(function(article) {
        return article.title.match(Search);
      });
    },
    // eslint-disable-next-line
    size() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 30;
        case "sm":
          return 30;
        case "md":
          return 40;
        case "lg":
          return 40;
        case "xl":
          return 40;
      }
    }
  },

  methods: {
    onImgError() {
      this.showAltImage = true;
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
        localStorage.setItem("postSelected", JSON.stringify(article));
        this.$emit("postSelected", article);
        this.$router.push({ path: "/Post" });
      }
    }
  }
};
</script>