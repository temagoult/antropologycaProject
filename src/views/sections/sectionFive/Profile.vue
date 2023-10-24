<template>
  <div
    class="overflow-x-hidden lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4"
  >
    <div class="myContainer flex flex-col justify-start">
      <div
        class="text-[#0d6efd] md:text-start text-center sousTitre flex md:p-2 p-[3px] md:justify-start justify-center gap-2 items-center relative w-[100%]"
      >
        <i
          class="fa-solid fa-user-plus animate-bounce lg:text-[40px] md:text-[35px] sm:text-[25px] text-[20px] bg-white md:mr-[100px] m-0 pr-1"
        ></i>
        <div
          class="lg:text-[40px] md:text-[35px] animate-bounce sm:text-[25px] text-[20px] bg-white p-2 mr-[-8px]"
        >فريق العمل</div>
        <div class="w-[100%] bg-[#0d6efd] h-[1px] absolute z-[-1]"></div>
      </div>

      <div class="profiles flex flex-wrap justify-between p-2">
        <div
          class="sousProfile flex flex-col items-center"
          v-for="(profile,index) in profiles"
          :key="index"
          :value="profile"
        >
          <img
            @click="action(profile)"
            :src="profile.photoProfile.src"
            alt
            class="md:w-[150px] md:h-[150px] sm:w-[100px] sm:h-[100px] w-[70px] h-[70px] rounded-[50%] photoSectionProfile cursor-pointer photoProfile"
          />
          <span
            class="fullName underline text-[#0d6efd] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] cursor-pointer"
            @click="action(profile)"
          >{{`${profile.Firstname} ${ profile.lastName} ` }}</span>
          <div
            class="specialite text-gray-500 lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px]"
          >{{ profile.specialite }}</div>
        </div>
      </div>
    </div>
    <CurrentProfile :current="current" :profileDialogShow="profileDialogShow" @close="close"></CurrentProfile>
    <Login class="absolute" :showLoginDialog="showLoginDialog" @updatemodelValue="updatemodelValue"></Login>
    <v-dialog v-model="dialoglogin" width="auto">
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
import CurrentProfile from "@/components/CurrentProfile.vue";
export default {
  components: {
    CurrentProfile,
    Login
  },
  data() {
    return {
      profileDialogShow: false,
      showLoginDialog: false,
      dialoglogin: false,
      chosenObject: {},

      indexProfile: -1,
      current: "",
      profiles: [
        {
          photoProfile: {
            src: require("../../../assets/images/profile1.jpeg")
          },
          lastName: " بن مهيدي ",
          Firstname: "العربي",
          specialite: " دكتور في الانتروبولوجيا",
          email: "a@gmail.com",
          phone: +213555545161
        },
        {
          photoProfile: {
            src: require("../../../assets/images/profile2.jpeg")
          },
          lastName: " بن عمار ",
          Firstname: "صليحة",
          specialite: " دكتور في الانتروبولوجيا",
          email: "a@gmail.com",
          phone: +213555545161
        },
        {
          photoProfile: {
            src: require("../../../assets/images/profile3.jpeg")
          },
          lastName: " بن عطية ",
          Firstname: "سميرة",
          specialite: " دكتور في الانتروبولوجيا",
          email: "a@gmail.com",
          phone: "+213555545161"
        }
      ]
    };
  },
  methods: {
    close() {
      this.profileDialogShow = false;
    },
    dialogMustlogin() {
      this.dialoglogin = false;
      this.showLoginDialog = true;
    },
    updatemodelValue(val) {
      this.showLoginDialog = val;
    },
    action(e) {
      if (this.isLogin == true) {
        this.dialoglogin = true;
        console.log("hello" + this.showLoginDialog);
      } else {
        this.indexProfile = this.profiles.indexOf(e);
        this.current = this.profiles[this.indexProfile];
        console.log(this.current.fullName);
        this.profileDialogShow = true;
      }
    }
  },
  props: {
    isLogin: { type: Boolean }
  }
};
</script>