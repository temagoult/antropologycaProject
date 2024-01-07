<template>
  <div
    class="bg-stone-50 !navBar !lg:mb-[30px] !md:mb-[25px] !sm:mb-[15px] !mb-[10px] !lg:p-8 !md:p-7 !sm:p-5 !p-4"
  >
    <div class="myContainer flex justify-between shrink-0 grow-0">
      <v-navigation-drawer
        v-if="user.data.user.role == 'admin'"
        expand-on-hover
        rail
        app
        right
        class="!bg-stone-50 py-4 px-2"
      >
        <v-list-item class="p-2 !text-black">
          <v-list-item-avatar>
            <v-img
              crossorigin="anonymous"
              v-if="showAltImage == false"
              :src="imgUrl"
              v-on:error="onImgError"
            ></v-img>
            <span
              v-else
              class="white--text text-white lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
              >{{ user.data.user.name.charAt(0).toUpperCase() }}</span
            >
          </v-list-item-avatar>
          <div>
            <v-list-item-title class="!px-2 !text-black">{{
              user.data.user.name
            }}</v-list-item-title>
            <v-list-item-subtitle class="!px-2 !text-black">{{
              user.data.user.email
            }}</v-list-item-subtitle>
          </div>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense class="!text-black">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            class="!p-2 !text-black"
          >
            <v-btn
              depressed
              plain
              active="false"
              class="!p-0 !m-0"
              :to="item.path"
            >
              <v-list-item-icon class="py-2">
                <v-icon class="py-2"> {{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content class="!p-2 !text-black">
                <v-list-item-title
                  class="lg:!text-[23px] md:!text-[21px] sm:!text-[19px] !text-[17px] p-2"
                  >{{ item.title }}</v-list-item-title
                >
              </v-list-item-content>
            </v-btn>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <div class="md:hidden flex p-2 shrink-0 grow-0">
        <!-- <div>
          <div @click="onDisplayBar" class="flex items-start">
            <i class="fa-solid fa-xmark cursor-pointer text-[24px] w-[30px]"></i>
          </div>
        </div>-->

        <div v-if="displayBar == false" class>
          <v-btn icon>
            <div @click="onDisplayBar" class="flex items-start shrink-0 grow-0">
              <i
                class="fa-solid fa-bars cursor-pointer text-[24px] w-[30px]"
              ></i>
            </div>
          </v-btn>
        </div>
      </div>

      <div class="md:flex hidden md:justify-start justify-end gap-6">
        <div
          class="logo lg:text-[34px] md:text-3xl sm:text-2xl text-xl p-2 cursor-pointer"
        >
          انتروبولوجيكا
        </div>

        <div class="listeNav md:flex hidden p-2">
          <ul
            class="list-none flex lg:gap-5 md:gap-4 sm:gap-3 lg:text-3xl md:text-2xl sm:text-xl text-gray-500"
          >
            <router-link to="/">
              <li @click="onclick1" :class="actif1 ? 'activ' : ''">الرئيسية</li>
            </router-link>
            <li @click="onclick2" :class="actif2 ? 'activ' : ''">المقالات</li>
            <li @click="onclick3" :class="actif3 ? 'activ' : ''">فريق العمل</li>
            <li @click="onclick4" :class="actif4 ? 'activ' : ''">اتصل بنا</li>
          </ul>
        </div>
      </div>

      <div class="gap-3 justify-end self-end flex">
        <div class="!px-3">
          <v-btn
            icon
            class="lg:!text-[18px] md:!text-[21px] sm:!text-[15px] !text-[12px]"
            @click="toggleSearchDisplay"
            v-if="notDisplaySearch"
          >
            <v-icon> mdi-magnify </v-icon>
          </v-btn>
        </div>

        <div v-if="isLogin == false" class="px-2">
          <v-btn icon>
            <v-menu bottom :min-width="widht" offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="!text-black font-semibold"
                  plain
                  stacked
                  v-on="on"
                  depressed
                >
                  <div class="flex flex-shrink-0">
                    <span
                      :class="
                        notifications.length > 0
                          ? 'font-bold text-red-500 text-[15px]'
                          : 'font-bold text-black text-[15px]'
                      "
                      >{{ notifications.length }}</span
                    >

                    <v-icon>mdi-bell-outline</v-icon>
                  </div>
                </v-btn>
              </template>
              <v-card>
                <v-list-item-content
                  class="justify-center"
                  v-for="(e, index) in notifications"
                  :key="index"
                >
                  <div class="mx-auto text-center">
                    <v-btn
                      depressed
                      rounded
                      text
                      class="lg:!text-[18px] md:!text-[16px] sm:!text-[14px] !text-[12px]"
                    >
                      {{ e }}
                      <v-icon
                        class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] !p-1"
                        >mdi-bell-outline</v-icon
                      >
                    </v-btn>
                    <v-divider class="my-3"></v-divider>
                  </div>
                </v-list-item-content>
              </v-card>
            </v-menu>
          </v-btn>
        </div>

        <div v-if="isLogin == false" class="md:flex hidden px-2">
          <v-btn icon>
            <v-app class="!p-0 !m-0">
              <Avatar :user="user" @logOut="logOut"></Avatar>
            </v-app>
          </v-btn>
        </div>
      </div>
    </div>
    <div
      class="myContainer !px-5 !p-2 relative"
      v-if="notDisplaySearch == false"
    >
      <div class="flex">
        <v-text-field
          class="placeholder:text-[#0d6efd] !p-2"
          placeholder="  بحث في المدونة   (عنوان المقال)"
          v-model="search"
        ></v-text-field>
        <v-icon class="!p-2" @click="toggleSearchDisplay">mdi-close</v-icon>
      </div>
      <div
        class="absolute md:w-[95%] w-[90%] z-[999] flex flex-col items-center"
      >
        <div
          v-if="search.length > 0 && filterBlog.length == 0"
          class="text-[#0d6efd] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px]"
        >
          لا يوجد مقالات متعلقة ببحثك
        </div>
        <div
          v-if="search.length > 0"
          class="sousArticles flex flex-col gap-1 w-[100%] p-2 mt-[-30px]"
        >
          <div
            class="cardSousArticle border border-solid border-gray-300 flex items-start md:p-3 p-2 gap-1 rounded-[25px] hover:bg-slate-100 cursor-pointer"
            v-for="(e, index) in filterBlog"
            :key="index"
            @click="doAFterChooseArticle(e)"
          >
            <img
              crossorigin="anonymous"
              :src="
                'https://anthropologyca.onrender.com/api/v1/posts/post-image/' +
                e.coverImage
              "
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
                {{
                  e.summary.split(" ").slice(0, numwords.value).join(" ") +
                  "..."
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 
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
      </ul>
    </div>-->

    <v-navigation-drawer
      v-model="displayBar"
      elevation="0"
      fixed
      class="md:!hidden"
    >
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <v-btn
            v-if="isLogin"
            depressed
            rounded
            text
            class="lg:!text-[18px] md:!text-[16px] sm:!text-[22px] !text-[20px] !font-extrabold"
            >انتروبولوجيكا</v-btn
          >

          <div v-if="isLogin == false">
            <v-avatar color="#0d6efd" @click="toMyProfile">
              <v-img
                crossorigin="anonymous"
                v-if="showAltImage == false"
                :src="imgUrl"
                v-on:error="onImgError"
              ></v-img>
              <span
                v-else
                class="white--text text-white lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
                >{{ user.data.user.name.charAt(0).toUpperCase() }}</span
              >
            </v-avatar>
            <h3
              @click="toMyProfile"
              class="lg:!text-[20px] md:!text-[25px] sm:!text-[20px] !text-[18px]"
            >
              {{ user.data.user.name }}
            </h3>

            <p
              class="text-caption mt-1 lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
            >
              {{ user.data.user.email }}
            </p>
            <div
              class="flex justify-center items-center mb-[2px]"
              v-if="isLogin == false"
            >
              <p
                class="text-caption mt-1 md:w-[60%] w-[40%] !mx-auto lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
              >
                {{ user.data.user.bio }}
              </p>
            </div>

            <span
              v-if="user.verified"
              class="text-caption mt-1 md:w-[60%] w-[40%] !mx-auto lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px] !font-extrabold"
              >الحساب :مفعل</span
            >
            <span
              class="text-caption mt-1 md:w-[60%] w-[40%] !mx-auto lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px] !font-extrabold"
              v-else
              >الحساب : غير مفعل</span
            >
          </div>

          <v-divider class="my-3"></v-divider>
          <v-btn
            to="/"
            depressed
            rounded
            text
            class="lg:!text-[18px] md:!text-[16px] sm:!text-[20px] !text-[18px] !font-extrabold"
            >الرئيسية</v-btn
          >
          <v-divider class="my-3"></v-divider>
          <v-btn
            depressed
            rounded
            text
            class="lg:!text-[18px] md:!text-[16px] sm:!text-[20px] !text-[18px] !font-extrabold"
            >المقالات</v-btn
          >
          <v-divider class="my-3"></v-divider>
          <v-btn
            depressed
            rounded
            text
            class="lg:!text-[18px] md:!text-[16px] sm:!text-[20px] !text-[18px] !font-extrabold"
            >فريق العمل</v-btn
          >
          <v-divider class="my-3"></v-divider>
          <v-btn
            depressed
            rounded
            text
            class="lg:!text-[18px] md:!text-[16px] sm:!text-[20px] !text-[18px] !font-extrabold"
            >اتصل بنا</v-btn
          >
          <v-divider class="my-3"></v-divider>
          <v-btn
            v-if="isLogin"
            depressed
            rounded
            text
            color
            @click="dialogMustlogin"
            class="lg:!text-[18px] md:!text-[16px] sm:!text-[20px] !text-[18px] !font-extrabold !bg-[#0d6efd]"
            >تسجيل الدخول</v-btn
          >
          <v-divider class="my-3"></v-divider>
          <div v-if="isLogin == false">
            <v-btn
              depressed
              rounded
              text
              class="lg:!text-[18px] md:!text-[16px] sm:!text-[20px] !text-[18px]"
              v-if="user.data.user.role == 'user'"
            >
              تفعييل الحساب
              <v-icon
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[20px] !text-[18px] !p-1"
                >mdi-arrow-up-bold</v-icon
              >
            </v-btn>
            <v-divider
              v-if="user.data.user.role == 'user'"
              class="my-3"
            ></v-divider>

            <v-btn
              to="/gestionArticles"
              depressed
              rounded
              text
              class="lg:!text-[18px] md:!text-[16px] sm:!text-[20px] !text-[18px]"
              v-if="user.data.user.role != 'user'"
            >
              ادارة مقالاتي
              <v-icon
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[20px] !text-[18px] !p-1"
                >mdi-text-box-plus</v-icon
              >
            </v-btn>

            <v-divider
              v-if="user.data.user.role != 'user'"
              class="my-3"
            ></v-divider>
            <v-btn
              depressed
              to="/favouritPost"
              rounded
              text
              class="lg:!text-[18px] md:!text-[16px] sm:!text-[20px] !text-[18px]"
            >
              مقالاتي المفضلة
              <v-icon
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[20px] !text-[18px] !p-1"
                >mdi-star</v-icon
              >
            </v-btn>

            <v-divider class="my-3"></v-divider>

            <v-btn
              depressed
              rounded
              text
              to="/EditProfile"
              class="lg:!text-[18px] md:!text-[16px] sm:!text-[20px] !text-[18px]"
            >
              معلومات الحساب
              <v-icon
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[20px] !text-[18px] !p-1"
                >mdi-account-cog</v-icon
              >
            </v-btn>

            <v-divider class="my-3"></v-divider>
            <v-btn
              depressed
              rounded
              text
              class="lg:!text-[20px] md:!text-[18px] sm:!text-[20px] !text-[18px]"
              @click="logOut"
            >
              تسجيل الخروج
              <v-icon
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[20px] !text-[18px] !p-1"
                >mdi-logout</v-icon
              >
            </v-btn>
          </div>
        </div>
      </v-list-item-content>
    </v-navigation-drawer>

    <Login
      class="absolute"
      :showLoginDialog="showLoginDialog"
      @updatemodelValue="updatemodelValue"
      @isloged="isloged"
      @islogedSignUp="islogedSignUp"
    ></Login>

    <v-dialog v-model="dialoglogin" max-width="300px">
      <v-card>
        <v-card-title
          class="p-2 md:!text-lg sm:!text-base !text-sm m-2 justify-center"
          >يجب عليك تسجيل الدخول اولا</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogMustlogin"
            >متفهم</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import Avatar from "@/components/Avatar.vue";
import axios from "axios";
import router from "@/router";

export default {
  mounted() {
    this.userAvatar = Object.assign({}, this.user);
    axios
      .get("posts/", {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then((response) => {
        this.allArticles = response.data.data.docs;
      })
      .catch(function (error) {
        console.log(error.response);
      })
      .finally(function () {
        // always executed
      });
    if (
      this.user.data.user.photo != null ||
      this.user.data.user.photo == "default.jpg"
    ) {
      this.getImage();
    } else {
      this.showAltImage = true;
    }
  },
  data() {
    return {
      drawer: true,
      items: [
        {
          title: " ادارة مقالاتي",
          icon: "mdi-text-box-plus",
          path: "/gestionArticles",
        },
        {
          title: "مقالاتي المفضلة",
          icon: "mdi-star",
          path: "/favouritPost",
        },
        { title: "المشاركات", icon: "mdi-text-box", path: "/getAllUserAdmin" },
        { title: "التعليقات", icon: "mdi-comment", path: "/getAllComments" },
        {
          title: "قائمة المستخدمين",
          icon: "mdi-account-group",
          path: "/getAllUserAdmin",
        },
        {
          title: "الاحصائيات",
          icon: "mdi-chart-bar",
          path: "/getAllUserAdmin",
        },
        {
          title: " معلومات الحساب",
          icon: "mdi-account-cog",
          path: "/EditProfile",
        },
        { title: "الاعدادات", icon: "mdi-cog", path: "/getAllUserAdmin" },
      ],
      mini: true,
      numwords: { type: Number, value: 10 },
      showLoginDialog: false,
      dialoglogin: false,
      allArticles: [],
      search: "",
      data: "",
      imgUrl: null,
      notDisplaySearch: true,
      userAvatar: { name: "", email: "", bio: "" },
      showAltImage: false,
      showSearchDialog: false,
      notifications: ["notification1", "notification2", "notification3"],

      displayMode: false,
      displayBar: false,
      actif1: true,
      actif2: false,
      actif3: false,
      actif4: false,
      showDialog: false,
    };
  },
  components: {
    Login,
    Avatar,
  },
  name: "navBar",
  props: {
    isLogin: { type: Boolean },
    user: {
      type: Object,
    },
  },
  methods: {
    toMyProfile() {
      if (this.$route.name != "me") {
        router.push({
          path: "/me",
        });
      }
    },
    getImage() {
      axios
        .get(
          "users/user-photo/" + this.user.data.user.photo,
          { responseType: "arraybuffer" },

          {
            headers: {
              Authorization: "Bearer " + this.user.token,
            },
          }
        )
        .then((res) => {
          this.imgUrl = URL.createObjectURL(
            new Blob([res.data], { tyoe: "image/jpg" })
          );
          console.log(this.imgUrl);

          console.log(new Blob([this.userAvatar.image], { type: "image/jpg" }));
          this.showAltImage = false;
        })
        .catch((e) => {
          console.log(e.data);
          this.showAltImage = true;
        });
    },
    inisilise() {
      this.userAvatar = this.user;
    },

    toggleSearchDisplay() {
      this.notDisplaySearch = !this.notDisplaySearch;
    },
    onImgError() {
      this.showAltImage = true;
    },

    logOut() {
      this.$emit("logOut");
    },
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
      this.userAvatar = this.user;
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
        this.$emit("scrollToTeamWork");
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
    },
    isloged() {
      this.$emit("isloged");
    },
    islogedSignUp() {
      this.$emit("islogedSignUp");
    },
    scrollToTeamWork() {},
    doAFterChooseArticle(article) {
      if (this.isLogin == true) {
        this.dialoglogin = true;

        console.log("hello" + this.showLoginDialog);
      } else {
        this.notDisplaySearch = true;
        localStorage.setItem("postSelected", JSON.stringify(article));

        this.$emit("postSelected", article);
        this.$router.push({ path: "/Post" });
      }
    },
  },

  computed: {
    filterBlog() {
      let Search = this.search;
      return this.allArticles.filter(function (article) {
        return article.title.match(Search);
      });
    },
    // eslint-disable-next-line
    widht() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 180;
        case "sm":
          return 200;
        case "md":
          return 200;
        case "lg":
          return 250;
        case "xl":
          return 280;
      }
    },
  },
};
</script>
<style>
.v-navigation-drawer--mini-variant,
.v-navigation-drawer {
  overflow: visible !important;
}
::v-deep ::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
