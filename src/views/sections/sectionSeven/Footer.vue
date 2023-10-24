<template>
  <div class="overflow-x-hidden bg-[#0d6efd] lg:p-8 md:p-7 sm:p-5 p-4">
    <div class="myContainer grid md:grid-flow-col md:gap-x-[150px]">
      <div class="logoFooter flex md:flex-col flex-row md:justify-center justify-between p-2">
        <div
          class="titleFooter lg:text-[77px] md:text-[61px] sm:text-[42px] text-[30px] p-2 text-white cursor-pointer"
        >انتروبولوجيكا</div>
        <div class="reseauxSocieaux md:w-[60%] text-white px-2">
          <v-list class="flex gap-2 sm:gap-3 md:gap-4">
            <v-list-item>
              <v-list-item-content>
                <i
                  class="fa-brands fa-facebook facebook lg:text-[18px] md:text-[16px] sm:text-[16px] text-[12px]"
                ></i>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <i
                  class="fa-brands fa-twitter twitter lg:text-[18px] md:text-[16px] sm:text-[16px] text-[12px]"
                ></i>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <i
                  class="fa-brands fa-linkedin linkedin lg:text-[18px] md:text-[16px] sm:text-[16px] text-[12px]"
                ></i>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <i
                  class="fa-solid fa-envelope lg:text-[18px] md:text-[16px] sm:text-[16px] text-[12px]"
                ></i>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </div>
      <div
        class="classFooter flex justify-between md:border-none border-gray border-solid border-b border-x-transparent border-t-transparent p-2"
      >
        <div class="p-2">
          <v-list class="flex flex-col !list-none !bg-transparent !text-white !p-2">
            <v-list-item
              name
              class="lg:!text-[30px] md:!text-[26px] sm:!text-[18px] !text-[16px] font-bold"
            >اقسام</v-list-item>
            <div v-if="isNoteHide1" class="flex flex-col gap-[1px]">
              <v-list-item class="lg:!text-[18px] md:!text-[16px] sm:!text-[15px] !text-[12px]">
                <v-list-item-content>كتب في الانتروبولوجيا</v-list-item-content>
              </v-list-item>
              <v-list-item class="lg:!text-[18px] md:!text-[16px] sm:!text-[15px] !text-[12px]">
                <v-list-item-content>مقالات انتروبولوجية</v-list-item-content>
              </v-list-item>
              <v-list-item class="lg:!text-[18px] md:!text-[16px] sm:!text-[15px] !text-[12px]">
                <v-list-item-content>نظريات الانتروبولوجيا</v-list-item-content>
              </v-list-item>
              <v-list-item class="lg:!text-[18px] md:!text-[16px] sm:!text-[15px] !text-[12px]">
                <v-list-item-content>منهجية البحث الانتروبولوجي</v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </div>
        <div
          @click="hideIt1"
          v-text="this.message1"
          class="md:hidden block font-bold text-white sm:text-[25px] text-[20px]"
        ></div>
      </div>
      <div
        class="contactSection flex justify-between md:border-none border-gray border-solid border-b border-x-transparent border-t-transparent p-2"
      >
        <div class="p-2">
          <v-list class="flex flex-col !list-none !p-2">
            <v-list-item-subtitle
              name
              class="lg:!text-[30px] md:!text-[26px] sm:!text-[18px] !text-[16px] font-bold"
            >اتصل بنا</v-list-item-subtitle>
            <div v-if="isNoteHide2" class>
              <v-list-item class="lg:!text-[18px] md:!text-[16px] sm:!text-[15px] !text-[12px]">
                <v-list-item-content>الابلاغ عن اساءة الاستخدام</v-list-item-content>
              </v-list-item>
              <v-list-item class="lg:!text-[18px] md:!text-[16px] sm:!text-[15px] !text-[12px]">
                <v-list-item-content>سياسة الخصوصية</v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </div>
        <div
          @click="hideIt2"
          v-text="this.message2"
          class="md:hidden block font-bold text-white sm:text-[25px] text-[20px]"
        ></div>
      </div>
      <div class="copyright flex items-end justify-end p-2">
        <v-list class>
          <v-list-item class="lg:!text-[18px] md:!text-[16px] sm:!text-[16px] !text-[12px]">
            <v-list-item-content>
              <div class="flex items-center gap-1">
                <div>كل الحقوق محفوظة</div>
                <i class="fa-regular fa-copyright text-end"></i>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isNoteHide1: true,
      isNoteHide2: true,
      message1: "-",
      message2: "-",
      politiqueAndConfidentialite: {
        path: ""
      }
    };
  },
  methods: {
    hideIt1() {
      this.isNoteHide1 = !this.isNoteHide1;
      if (this.isNoteHide1 == true) {
        return (this.message1 = "-");
      } else {
        return (this.message1 = "+");
      }
    },
    hideIt2() {
      this.isNoteHide2 = !this.isNoteHide2;
      if (this.isNoteHide2 == true) {
        return (this.message2 = "-");
      } else {
        return (this.message2 = "+");
      }
    }
  }
};
</script>