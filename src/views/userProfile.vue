<template>
  <div
    class="overflow-x-hidden relative lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4 myContainer"
  >
    <div class="firstPart p-2 md:gap-9 flex">
      <div class="img p-2">
        <v-avatar color="#0d6efd" :size="size">
          <v-img
            v-if="showAltImage == false"
            src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
            v-on:error="onImgError"
          ></v-img>
          <span
            v-else
            class="white--text lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
            >s</span
          >
        </v-avatar>
      </div>

      <div class="aboutUser p-2">
        <div class="firstLine p-2 flex md:gap-6 items-center gap-2">
          <div
            class="fullName font-extrabold lg:text-[27px] md:text-[25px] sm:text-[16px] text-[17px]"
          >
            mohamed temagoult
          </div>
          <div class="contactHim md:!block hidden">
            <v-btn color="#0d6efd" class="!text-white"> اتصل </v-btn>
          </div>
        </div>

        <div class="p-2 secondLine">
          <div
            class="bio lg:text-[20px] md:text-[18px] sm:text-[16px] text-[12px]"
          >
            this is bio
          </div>
        </div>
        <div class="thirdLine p-2 flex md:gap-6 gap-2">
          <div
            class="nbrPost lg:text-[22px] md:text-[18px] sm:text-[16px] xs:text-[12px] text-[12px]"
          >
            <span
              class="font-extrabold lg:text-[22px] md:text-[20px] sm:text-[16px] text-[12px]"
              >عدد المقالات المنشوورة :</span
            >
            4
          </div>
          <div
            class="nbrLikeOfhisPosts lg:text-[20px] md:text-[18px] sm:text-[16px] text-[12px]"
          >
            <span
              class="font-extrabold lg:text-[20px] md:text-[20px] sm:text-[16px] text-[12px]"
              >عدد التفاعل على المنشوور:</span
            >
            2
          </div>
        </div>
        <div class="forthLine p-2">
          <div
            class="createdAt lg:text-[20px] md:text-[18px] sm:text-[16px] text-[12px]"
          >
            <span
              class="font-extrabold lg:text-[20px] md:text-[20px] sm:text-[16px] text-[12px]"
              >انضم الى المدونة في :</span
            >
            12/12/2020
          </div>
        </div>
        <div
          class="fiveLine lg:text-[20px] md:text-[20px] sm:text-[16px] text-[12px] p-2"
        >
          <span> نوع الحساب : </span>
          admin
        </div>
      </div>
    </div>
    <div
      class="partTwo grid grid-cols-2 border border-solid border-b-gray-100 border-x-transparent border-t-transparent p-2"
    >
      <div
        @click="handlePublishedActif"
        :class="
          publishedActif
            ? ' p-2 text-center border border-solid border-b-[#0d6efd] border-x-transparent border-t-transparent cursor-pointer'
            : 'p-2 border-none text-center cursor-pointer'
        "
      >
        publisedArticle
      </div>
      <div
        @click="handleActifVavourite"
        :class="
          favouriteActif
            ? ' p-2 text-center border border-solid border-b-[#0d6efd] border-x-transparent border-t-transparent cursor-pointer'
            : 'p-2 border-none text-center cursor-pointer'
        "
      >
        favoriteArticle
      </div>
    </div>
    <div class="partThree text-center" v-if="publishedActif">
      hello from the publishedPart
    </div>
    <div v-else class="text-center">helmlo from the favoutite part</div>
  </div>
</template>
<script>
export default {
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    size() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 80;
        case "sm":
          return 80;
        case "md":
          return 40;
        case "lg":
          return 150;
        case "xl":
          return 48;
      }
    },
  },
  created() {},
  components: {},
  props: {},
  data() {
    return {
      favouriteActif: false,
      publishedActif: true,
      showAltImage: false,
    };
  },
  methods: {
    onImgError() {
      this.showAltImage = true;
    },
    handleActifVavourite() {
      this.publishedActif = false;
      this.favouriteActif = true;
    },
    handlePublishedActif() {
      this.favouriteActif = false;

      this.publishedActif = true;
    },
  },
};
</script>
