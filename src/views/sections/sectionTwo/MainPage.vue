<template>
  <div class="lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4 relative">
    <div class="myContainer grid md:grid-cols-2 grid-cols-1 md:gap-5 items-center">
      <div
        class="partOne p-2 flex flex-col lg:gap-7 md:gap-6 sm:gap-4 gap-3 md:text-start text-center md:items-start items-center transition-all delay-[6s]"
      >
        <div
          class="mainTitle lg:text-[87px] md:text-[71px] sm:text-[42px] text-[29px] p-2"
        >انتروبولوجيكا</div>
        <p
          class="text-gray-800 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] md:text-start text-center px-[8px] py-1"
        >هذا الموقع مختص في نشر المقالات وتصفحها تصفحها هذا الموقع مختص في نشر المقالات وتصفحها تصفحها هذا الموقع مختص في نشر المقالات وتصفحها تصفحها هذا الموقع مختص في نشر المقالات وتصفحها تصفحها هذا الموقع مختص في نشر المقالات وتصفحها تصفحها</p>
        <div
          v-if="isLogin"
          @click="displayDialog"
          class="text-white cursor-pointer p-2 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] inputfield bg-[#0d6efd] lg:w-[207px] md:w-[144px] sm:w-[120px] w-[109px] flex justify-center items-center rounded-[10px]"
        >تسجيل الدخول</div>
      </div>
      <div class="partTwo md:flex hidden p-2">
        <img src="../../../assets/images/mainImage.png" alt />
      </div>
    </div>
    <Login
      class="absolute"
      :showLoginDialog="showLoginDialog"
      @updatemodelValue="updatemodelValue "
      @isloged="isloged"
    ></Login>
  </div>
</template>
<script>
import Login from "@/components/Login.vue";
export default {
  data() {
    return {
      showLoginDialog: false
    };
  },
  components: {
    Login
  },
  props: {
    isLogin: { type: Boolean }
  },

  methods: {
    isloged() {
      this.$emit("isloged");
    },
    displayDialog() {
      this.showLoginDialog = true;
    },
    updatemodelValue(val) {
      this.showLoginDialog = val;
    }
  }
};
</script>