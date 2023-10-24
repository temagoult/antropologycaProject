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
      <div></div>

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
      >
        <Swiper-slide
          v-for="(article,index) in newArticles"
          :key="index"
          class="md:!w-[25%] sm:!w-[35%] !w-[100%]"
        >
          <div class="partArticleOne md:p-4 p-2 text-start md:!w-[100%] w-[100%]">
            <div
              class="cardArticle p-2 rounded-[25px] border border-solid border-gray-300 flex flex-col md:gap-1 sm:gap-[3px] gap-[2px]"
            >
              <img
                :src="article.phtotArticle.src"
                class="w-[100%] lg:h-[300px] md:h-[250px] sm:h-[200px] h-[150px] rounded-t-[12px] cursor-pointer p-2"
              />
              <div
                class="dateP lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-[#0d6efd]"
              >
                <span>عنوان المقال :</span>
                {{ article.title }}
              </div>
              <p
                class="text-gray-500 leading-4 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] lg:h-[70px] md:h-[60px] sm:h-[50px] h-[40px] py-[7px]"
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
                <div class="icons flex cursor-pointer !max-w-[50%]">
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
import { Scrollbar, Mousewheel, Navigation, Autoplay } from "swiper";
import { SwiperCore, Swiper, SwiperSlide } from "swiper-vue2";
import Login from "@/components/Login.vue";
import "swiper/swiper-bundle.css";
SwiperCore.use([Scrollbar, Mousewheel, Navigation, Autoplay]);
export default {
  data() {
    return {
      showLoginDialog: false,
      dialoglogin: false,
      numwords: { type: Number, value: 15 },
      swiper: null,
      nextActif: false,
      prevActif: false,
      newArticles: [
        {
          title: " انتروبولوجيا المدبنة",
          phtotArticle: {
            src: require("../../../assets/images/article.jpeg")
          },
          brefContent:
            "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفي نشر المقالات وتصفحها تصفحهامختص في نشر المقالات  ا تصفحها",
          nbrDownolad: 0,
          nbrView: 0,
          nbrShare: 5,
          publishedOn: "2023 / 07 / 02",
          whritenby: "احمد امين"
        },
        {
          title: " انتروبولوجيا المدبنة",
          phtotArticle: {
            src: require("../../../assets/images/article2.jpg")
          },
          brefContent:
            "ذا الموقع مختص في نشر المقالاتفحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر مختص في نشر المقالات وتصفحها تصفحها وتصفحها تصفحها تصفحها",
          nbrDownolad: 20,
          nbrView: 30,
          nbrShare: 52,
          publishedOn: "2023 / 07 / 02",
          whritenby: "خالدي وليد"
        },
        {
          title: " انتروبولوجيا المدبنة",
          phtotArticle: {
            src: require("../../../assets/images/article3.jpeg")
          },
          brefContent:
            "ذا الموقع مختص في نشر المقالات وتصفحها تصفحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحها وتصفحها تصفحهالموقع مختص فيموقع مختص في نشر المقالات وتصفحها تصفحها وتصفحها تصفحها",
          nbrDownolad: 35,
          nbrView: 43,
          nbrShare: 3,
          publishedOn: "2023 / 07 / 02",
          whritenby: "سمير اتين"
        },
        {
          title: " انتروبولوجيا المدبنة",
          phtotArticle: {
            src: require("../../../assets/images/article4.jpeg")
          },
          brefContent:
            "ذا الموقع مختص في نشر المقالات وتصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مخحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحها تصفحها  تصفحها",
          nbrDownolad: 29,
          nbrView: 50,
          nbrShare: 15,
          publishedOn: "2023 / 07 / 02",
          whritenby: "محمد  تماقولت"
        }
      ],
      swiperOptions: {
        slidesPerView: "auto",
        spaceBetween: 0,
        freeMode: true,
        scrollbar: true,
        mousewheel: true,

        paginationClickable: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: true,
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
    },
    getRef(swiper) {
      this.swiper = swiper;
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