<template>
  <div
    class="bg-stone-50 navBar lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4"
  >
    <div class="myContainer grid grid-flow-col">
      <div class="md:hidden flex p-2">
        <div v-if="displayBar">
          <div @click="onDisplayBar" class="flex items-start">
            <i class="fa-solid fa-xmark cursor-pointer text-[24px] w-[30px]"></i>
          </div>
        </div>

        <div v-else class>
          <div @click="onDisplayBar" class="flex items-start">
            <i class="fa-solid fa-bars cursor-pointer text-[24px] w-[30px]"></i>
          </div>
        </div>
      </div>

      <div class="flex md:justify-start justify-center gap-6">
        <div
          class="logo lg:text-[34px] md:text-3xl sm:text-2xl text-xl p-2 cursor-pointer"
        >انتروبولوجيكا</div>
        <div class="listeNav md:flex hidden p-2">
          <ul
            class="list-none flex lg:gap-5 md:gap-4 sm:gap-3 lg:text-3xl md:text-2xl sm:text-xl text-gray-500"
          >
            <li @click="onclick1" :class="actif1?'activ':''">الرئيسية</li>
            <li @click="onclick2" :class="actif2?'activ':''">المقالات</li>
            <li @click="onclick3" :class="actif3?'activ':''">فريق العمل</li>
            <li @click="onclick4" :class="actif4?'activ':''">اتصل بنا</li>
          </ul>
        </div>
      </div>

      <div class="flex gap-6 justify-end">
        <v-list class="md:flex hidden p-2">
          <v-list-item
            class="lg:!text-[18px] md:!text-[21px] sm:!text-[15px] !text-[12px]"
            to="/Search"
          >
            <v-list-item-content>
              <i class="fa-solid fa-magnifying-glass p-1 cursor-pointer self-center text-black"></i>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <div
          :class="isLogin==false? 'lightMode p-2 self-center md:block hidden':'lightMode p-2 self-center '"
        >
          <div v-if="displayMode">
            <div @click="ondisplayMode" class="flex">
              <i
                class="fa-solid fa-sun cursor-pointer w-[30px] text-[24px] md:text-[34px] text-gray-800"
              ></i>
            </div>
          </div>

          <div v-else class>
            <div @click="ondisplayMode" class="flex">
              <i
                class="fa-solid fa-moon cursor-pointer w-[30px] text-[24px] md:text-[34px] text-gray-800"
              ></i>
            </div>
          </div>
        </div>
        <div v-if="isLogin==false">
          <Avatar class></Avatar>
        </div>
      </div>
    </div>

    <div :class="this.displayBar?'sm:flex flex-col   justify-center ':'hidden'">
      <ul
        class="list-none flex flex-col lg:gap-5 md:gap-4 sm:gap-3 gap-2 lg:text-2xl md:text-xl sm:text-lg text-gray-500 items-center"
      >
        <li @click="onclick1" :class="actif1?'activ':''">الرئيسية</li>
        <li @click="onclick2" :class="actif2?'activ':''">المقالات</li>
        <li @click="onclick3" :class="actif3?'activ':''">فريق العمل</li>
        <li @click="onclick4" :class="actif4?'activ':''">اتصل بنا</li>
        <div @click="action">
          <v-list-item
            class="lg:!text-[18px] md:!text-[21px] sm:!text-[15px] !text-[12px]"
            to="/Search"
          >
            <v-list-item-content class="!p-0 !m-0">
              <i class="fa-solid fa-magnifying-glass p-1 cursor-pointer self-center text-black"></i>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-if="isLogin==false" class="lightMode self-cener md:hidden block">
          <div v-if="displayMode">
            <div @click="ondisplayMode" class="flex">
              <i
                class="fa-solid fa-sun cursor-pointer w-[30px] text-[24px] md:text-[34px] text-gray-800"
              ></i>
            </div>
          </div>

          <div v-else class>
            <div @click="ondisplayMode" class="flex">
              <i
                class="fa-solid fa-moon cursor-pointer w-[30px] text-[24px] md:text-[34px] text-gray-800"
              ></i>
            </div>
          </div>
        </div>
      </ul>
    </div>
    <Login class="absolute" :showLoginDialog="showLoginDialog" @updatemodelValue="updatemodelValue"></Login>

    <v-dialog v-model="dialoglogin" max-width="300px">
      <v-card>
        <v-card-title
          class="p-2 md:!text-lg sm:!text-base !text-sm m-2 justify-center"
        >يجب عليك تسجيل الدخول اولا</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogMustlogin">متفهم</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import Login from "@/components/Login.vue";
import Avatar from "@/components/Avatar.vue";

export default {
  data() {
    return {
      showSearchDialog: false,
      showLoginDialog: false,
      dialoglogin: false,
      displayMode: false,
      displayBar: false,
      actif1: true,
      actif2: false,
      actif3: false,
      actif4: false,
      showDialog: false
    };
  },
  components: {
    Login,
    Avatar
  },
  name: "navBar",
  props: {
    isLogin: { type: Boolean }
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
      } else {
        this.showSearchDialog = true;
      }
    },
    displayDialog() {
      this.showDialog = true;
      console.log(this.showDialog);
      this.$emit("showDialogVal", this.showDialog);
    },
    onDisplayBar() {
      this.displayBar = !this.displayBar;
    },
    ondisplayMode() {
      this.displayMode = !this.displayMode;
    },
    onclick1() {
      if (this.isLogin == true) {
        this.dialoglogin = true;
      } else {
        this.actif1 = true;
        this.actif2 = false;
        this.actif3 = false;
        this.actif4 = false;
      }
    },
    onclick2() {
      if (this.isLogin == true) {
        this.dialoglogin = true;
      } else {
        this.actif2 = true;
        this.actif1 = false;
        this.actif3 = false;
        this.actif4 = false;
      }
    },
    onclick3() {
      if (this.isLogin == true) {
        this.dialoglogin = true;
      } else {
        this.actif3 = true;
        this.actif2 = false;
        this.actif1 = false;
        this.actif4 = false;
      }
    },
    onclick4() {
      if (this.isLogin == true) {
        this.dialoglogin = true;
      } else {
        this.actif4 = true;
        this.actif2 = false;
        this.actif3 = false;
        this.actif1 = false;
      }
    }
  }
};
</script>