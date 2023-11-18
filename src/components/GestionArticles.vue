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
        >اضافة مقالة جديدة +</v-btn>
      </div>
      <div
        class="text-[#0d6efd] md:text-start text-center sousTitre flex md:p-2 p-[3px] md:justify-start justify-center gap-2 items-center relative w-[100%]"
      >
        <i
          class="fa-solid fa-paperclip lg:text-[40px] md:text-[35px] sm:text-[25px] text-[20px] bg-white md:mr-[100px] m-0 pr-1"
        ></i>
        <div
          class="lg:text-[40px] md:text-[35px] sm:text-[25px] text-[20px] bg-white p-2 mr-[-8px]"
        >مقالاتي</div>
        <div class="w-[100%] bg-[#0d6efd] h-[1px] absolute z-[-1]"></div>
      </div>
      <div class="articles p-2 myContainer">
        <div class="article grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-2">
          <div
            class="cardSousArticle border border-solid border-gray-300 flex md:flex-col items-center md:p-3 p-2 justify-between gap-1 rounded-[25px]"
            v-for="(e,index) in newArticles "
            :key="index"
          >
            <img
              :src="e.coverImage.src"
              class="w-[140px] md:w-[100%] lg-h-[250px] md:h-[200px] sm:h-[150px] h-[140px] p-1"
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
                {{ e.summary.split(" ")
                .slice(0, numwords2.value)
                .join(" ") + "..." }}
              </p>
              <div class="actionArticle self-end !p-2">
                <v-btn icon @click="editMyBlog(e)">
                  <v-icon class="!text-[12px] sm:!text-[16px] md:!text-[20px]">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deletMyBlog(e)">
                  <v-icon class="!text-[12px] sm:!text-[16px] md:!text-[20px]">mdi-delete</v-icon>
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
export default {
  data() {
    return {
      numwords2: { type: Number, value: 20 },
      newArticles: [
        {
          title: " انتروبولوجيا المدبنة",
          coverImage: {
            src: require("../assets/images/sousArticle1.jpeg")
          },
          body:
            "hhhhhhhhhhhhhhdqksldqskldhqs:chsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsdchsqklcnsd,;cvdfbnvnvd;nvdnv;:;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;vdfvd,",
          summary:
            "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقالات وتصفيحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقصفحهامختص في نشر المقالات  ا تصفحها"
        },
        {
          title: " انتروبولوجيا المدبنة",
          coverImage: {
            src: require("../assets/images/sousArticle2.webp")
          },
          summary:
            "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقالات وتصفيحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقصفحهامختص في نشر المقالات  ا تصفحها"
        },
        {
          title: " انتروبولوجيا المدبنة",
          coverImage: {
            src: require("../assets/images/sousArticle3.jpeg")
          },
          summary:
            "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقالات وتصفيحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقصفحهامختص في نشر المقالات  ا تصفحها"
        },
        {
          title: " انتروبولوجيا المدبنة",
          coverImage: {
            src: require("../assets/images/sousArticle1.jpeg")
          },
          summary:
            "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقالات وتصفيحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقصفحهامختص في نشر المقالات  ا تصفحها"
        },
        {
          title: " انتروبولوجيا المدبنة",
          coverImage: {
            src: require("../assets/images/sousArticle1.jpeg")
          },
          summary:
            "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقالات وتصفيحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقصفحهامختص في نشر المقالات  ا تصفحها"
        },
        {
          title: " انتروبولوجيا المدبنة",
          coverImage: {
            src: require("../assets/images/sousArticle1.jpeg")
          },
          summary:
            "  تصفحها تصفحهاذا الموقع  فحها وتصفحها تصفحهالموقع مختص في نشر المقالات وتصفحها تصفحهافحها وتصفحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقالات وتصفيحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقحها تصفحهالموقع مختص في نشر المقصفحهامختص في نشر المقالات  ا تصفحها"
        }
      ],
      currentEditableBlog: {}
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
    deletMyBlog() {}
  }
};
</script>