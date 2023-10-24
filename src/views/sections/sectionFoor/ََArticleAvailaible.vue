<template>
  <div
    class="overflow-x-hidden relative lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4"
  >
    <div class="myContainer flex flex-col justify-start">
      <div
        class="text-[#0d6efd] md:text-start text-center sousTitre flex md:p-2 p-[3px] md:justify-start justify-center gap-2 items-center relative w-[100%]"
      >
        <i
          class="animate-bounce fa-solid fa-paperclip lg:text-[40px] md:text-[35px] sm:text-[25px] text-[20px] bg-white md:mr-[100px] m-0 pr-1"
        ></i>
        <div
          class="lg:text-[40px] md:text-[35px] sm:text-[25px] text-[20px] bg-white p-2 mr-[-8px] animate-bounce"
        >مقالات قد تعجبك</div>
        <div class="w-[100%] bg-[#0d6efd] h-[1px] absolute z-[-1]"></div>
      </div>

      <div class="grid md:grid-cols-12 md:gap-x-5 gap-3 p-2">
        <div class="sousArticles flex flex-col gap-1 md:col-span-4 md:order-1 order-2 p-2">
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
                @click="action"
              >اقرا المزيد</a>
            </div>
          </div>
        </div>
        <div
          class="mainArticle md:col-span-8 md:order-2 order-1 p-2"
          v-for="(article,index) in mainArticle"
          :key="index"
        >
          <div
            class="cardArticle p-2 rounded-[25px] border border-solid border-gray-300 flex flex-col md:gap-1 sm:gap-[3px] gap-[2px]"
          >
            <img
              :src="article.phtotArticle.src"
              class="w-[100%] lg:h-[300px] md:h-[250px] sm:h-[200px] h-[150px] rounded-t-[12px] cursor-pointer"
            />
            <div
              class="dateP lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
            >
              <span>عنوان المقال :</span>
              {{ article.title }}
            </div>
            <p
              class="text-gray-500 leading-4 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] py-[7px]"
            >
              {{ article.brefContent.split(" ")
              .slice(0, numwords.value)
              .join(" ") + "..." }}
            </p>
            <div
              class="dateP lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
            >
              <span>كاتب المقال :</span>
              {{ article.whritenby }}
            </div>
            <div
              class="whriter flex justify-between lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
            >
              <div>
                <span class>اضيف في :</span>
                {{ article.publishedOn }}
              </div>
            </div>
            <div class="sousCard flex justify-between py-2 text-[#0d6efd]">
              <div class="icons flex justify-start cursor-pointer sm:!max-w-[30%] !max-w-[50%]">
                <div class="share flex items-center gap-2">
                  <i
                    class="fa-solid fa-share-nodes cursor-pointer lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
                  ></i>
                  <div
                    class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
                  >{{ article.nbrShare }}</div>
                </div>
                <div
                  class="download flex items-center gap-2 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
                >
                  <i
                    class="fa-solid fa-download cursor-pointers lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
                  ></i>
                  <div
                    class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
                  >{{ article.nbrDownolad }}</div>
                </div>
                <div class="view flex items-center gap-2">
                  <i
                    class="fa-regular fa-eye lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
                  ></i>
                  <div
                    class="number lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
                  >{{ article.nbrView }}</div>
                </div>
              </div>
              <a
                class="underline text-[#0d6efd] cursor-pointer lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px]"
                @click="action"
              >اقرا المزيد</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Login class="absolute" :showLoginDialog="showLoginDialog" @updatemodelValue="updatemodelValue"></Login>
    <v-dialog v-model="dialoglogin" max-width="300px">
      <v-card>
        <v-spacer></v-spacer>
        <v-card-title
          class="!text-center p-2 md:!text-lg sm:!text-base !text-sm m-2 justify-center"
        >يجب عليك تسجيل الدخول اولا</v-card-title>
        <v-spacer></v-spacer>
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
  components: {
    Login
  },
  props: {
    isLogin: { type: Boolean }
  },
  data() {
    return {
      showLoginDialog: false,
      dialoglogin: false,
      numwords: { type: Number, value: 20 },
      numwords2: { type: Number, value: 10 },

      newArticles: [
        {
          title: " انتروبولوجيا المدبنة",
          phtotArticle: {
            src: require("../../../assets/images/sousArticle1.jpeg")
          },
          brefContent:
            "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقالات وتصفيحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقصفحهامختص في نشر المقالات  ا تصفحها"
        },
        {
          title: " انتروبولوجيا المدبنة",
          phtotArticle: {
            src: require("../../../assets/images/sousArticle2.webp")
          },
          brefContent:
            "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقالات وتصفيحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقصفحهامختص في نشر المقالات  ا تصفحها"
        },
        {
          title: " انتروبولوجيا المدبنة",
          phtotArticle: {
            src: require("../../../assets/images/sousArticle3.jpeg")
          },
          brefContent:
            "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقالات وتصفيحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقصفحهامختص في نشر المقالات  ا تصفحها"
        }
      ],

      mainArticle: [
        {
          title: " انتروبولوجيا المدبنة",
          phtotArticle: {
            src: require("../../../assets/images/mainArticle2.jpeg")
          },
          brefContent:
            "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقالات وتصفيحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقصفحهامختص في نشر المقالات  ا تصفحها",
          nbrDownolad: 0,
          nbrView: 0,
          nbrShare: 5,
          publishedOn: "2023 / 07 / 02",
          whritenby: "احمد امين"
        }
      ]
    };
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