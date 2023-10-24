<template>
  <div
    class="bg-stone-50 navBar lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4 lg:min-h-[67vh] md:min-h-[46vh] min-h-[65vh]"
  >
    <div class="flex flex-col items-center myContainer p-1">
      <div class="w-[100%] flex justify-between !items-center p-2">
        <div class="profile p-2">
          <img
            src="@/assets/images/profile1.jpeg"
            class="md:w-[40px] md:h-[40px] sm:w-[30px] sm:h-[30px] w-[30px] h-[30px] rounded-[50%]"
            alt
          />
        </div>
        <div class="md:w-[80%] sm:w-[70%] w-[70%] placeholder:text-[#0d6efd]">
          <v-text-field
            class="!self-center !m-0"
            type="text"
            clearable
            v-model="search"
            placeholder="  بحث في المدونة   (عنوان المقال)"
          ></v-text-field>
        </div>
        <div class="p-2 self-end">
          <v-list-item class="lg:!text-[18px] md:!text-[21px] sm:!text-[15px] !text-[12px]" to="/">
            <v-list-item-content>
              <i
                class="fa-solid fa-arrow-left md:text-[25px] sm:text-[20px] text-[15px] text-black"
              ></i>
            </v-list-item-content>
          </v-list-item>
        </div>
      </div>

      <div
        v-if="search.length>0&&filterBlog.length==0"
        class="text-[#0d6efd] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px]"
      >لا يوجد مقالات متعلقة ببحثك</div>
      <div
        v-if="search.length>0"
        class="sousArticles flex flex-col gap-1 md:w-[80%] w-[70%] p-2 mt-[-30px]"
      >
        <div
          class="cardSousArticle border border-solid border-gray-300 flex items-start md:p-3 p-2 gap-1 rounded-[25px] hover:bg-slate-100 cursor-pointer"
          v-for="(e,index) in filterBlog "
          :key="index"
          @click="action"
        >
          <img
            :src="e.phtotArticle.src"
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
              {{ e.brefContent.split(" ")
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
export default {
  data() {
    return {
      numwords: { type: Number, value: 10 },
      showLoginDialog: false,
      dialoglogin: false,
      allArticles: [],
      search: ""
    };
  },
  components: {
    Login
  },
  props: {
    isLogin: { type: Boolean }
  },
  created() {
    this.allArticles = [
      {
        title: " انتروبولوجيا المدبنة",
        phtotArticle: {
          src: require("@/assets/images/sousArticle1.jpeg")
        },
        brefContent:
          "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقالات وتصفيحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقصفحهامختص في نشر المقالات  ا تصفحها"
      },
      {
        title: " منهج البحث ",
        phtotArticle: {
          src: require("@/assets/images/article3.jpeg")
        },
        brefContent:
          "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقالات وتصفيحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقصفحهامختص في نشر المقالات  ا تصفحها"
      },
      {
        title: " انتروبولوجيا المقاهي",
        phtotArticle: {
          src: require("@/assets/images/sousArticle3.jpeg")
        },
        brefContent:
          "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقالات وتصفيحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقصفحهامختص في نشر المقالات  ا تصفحها"
      },
      {
        title: "  العصر الحجري",
        phtotArticle: {
          src: require("@/assets/images/article.jpeg")
        },
        brefContent:
          "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقالات وتصفيحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقصفحهامختص في نشر المقالات  ا تصفحها"
      }
    ];
  },
  computed: {
    filterBlog() {
      let Search = this.search;
      return this.allArticles.filter(function(article) {
        return article.title.match(Search);
      });
    }
  },
  methods: {
    dialogMustlogin() {
      this.dialoglogin = false;
      this.showLoginDialog = true;
    },
    updatemodelValue(val) {
      this.showLoginDialog = val;
    },
    action() {
      if (this.isLogin == true) {
        this.dialoglogin = true;
        console.log("hello" + this.showLoginDialog);
      }
    }
  }
};
</script>