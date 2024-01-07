<template>
  <v-row justify="center">
    <v-menu offset-y :min-width="widht">
      <template v-slot:activator="{ on }">
        <v-btn icon x-large v-on="on">
          <v-avatar color="#0d6efd" :size="size">
            <v-img
              v-if="showAltImage == false"
              :src="imgUrl"
              v-on:error="onImgError"
            ></v-img>
            <span
              v-else
              class="white--text lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
              >{{ user.data.user.name.charAt(0) }}</span
            >
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar color="#0d6efd" @click="toMyProfile">
              <v-img
                v-if="showAltImage == false"
                crossorigin="anonymous"
                :src="imgUrl"
                v-on:error="onImgError"
              ></v-img>
              <span
                v-else
                class="white--text lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
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
            <div class="flex justify-center items-center mb-[2px]">
              <p
                class="text-caption mt-1 md:w-[60%] w-[40%] !mx-auto lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
              >
                {{ user.data.user.bio }}
              </p>
            </div>
            <span
              class="text-caption mt-1 md:w-[60%] w-[40%] !mx-auto lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px] !font-extrabold"
              v-if="user.data.user.active"
              >الحساب :مفعل</span
            >
            <span
              class="text-caption mt-1 md:w-[60%] w-[40%] !mx-auto lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px] !font-extrabold"
              v-else
              >الحساب : غير مفعل</span
            >
            <v-divider class="my-3"></v-divider>
            <v-
              v-if="user.data.user.role == 'user'"
              depressed
              rounded
              text
              class="lg:!text-[18px] md:!text-[16px] sm:!text-[14px] !text-[12px]"
            >
              تفعييل الحساب
              <v-icon
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] !p-1"
                >mdi-arrow-up-bold</v-icon
              >
            </v->
            <v-divider
              v-if="user.data.user.role == 'user'"
              class="my-3"
            ></v-divider>

            <v-btn
              to="/gestionArticles"
              depressed
              rounded
              text
              class="lg:!text-[18px] md:!text-[16px] sm:!text-[14px] !text-[12px]"
              v-if="user.data.user.role == 'moderator'"
            >
              ادارة مقالاتي
              <v-icon
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] !p-1"
                >mdi-text-box-plus</v-icon
              >
            </v-btn>

            <v-divider
              v-if="user.data.user.role == 'moderator'"
              class="my-3"
            ></v-divider>
            <v-btn
              to="/favouritPost"
              depressed
              rounded
              text
              v-if="user.data.user.role != 'admin'"
              class="lg:!text-[18px] md:!text-[16px] sm:!text-[14px] !text-[12px]"
            >
              مقالاتي المفضلة
              <v-icon
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] !p-1"
                >mdi-star</v-icon
              >
            </v-btn>

            <v-divider
              v-if="user.data.user.role != 'admin'"
              class="my-3"
            ></v-divider>

            <v-btn
              to="/EditProfile"
              depressed
              rounded
              text
              class="lg:!text-[18px] md:!text-[16px] sm:!text-[14px] !text-[12px]"
              v-if="user.data.user.role != 'admin'"
            >
              معلومات الحساب
              <v-icon
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] !p-1"
                >mdi-account-cog</v-icon
              >
            </v-btn>

            <v-divider
              v-if="user.data.user.role != 'admin'"
              class="my-3"
            ></v-divider>
            <v-btn
              depressed
              rounded
              text
              class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px]"
              @click="logOut"
            >
              تسجيل الخروج
              <v-icon
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] !p-1"
                >mdi-logout</v-icon
              >
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </v-row>
</template>
<script>
import axios from "axios";
import router from "../router";
export default {
  mounted() {
    this.userAvatar = Object.assign({}, this.user);
    if (this.user.data.user.photo != null) {
      this.getImage();
    } else {
      this.showAltImage = true;
    }
  },
  data: () => ({
    userAvatar: {},
    showAltImage: false,
    imgUrl: null,
  }),
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
    logOut() {
      this.$emit("logOut");
    },
    onImgError() {
      this.showAltImage = true;
    },
  },
  props: {
    user: {
      type: Object,
    },
  },
  components: {},

  computed: {
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
    // eslint-disable-next-line
    size() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 36;
        case "sm":
          return 36;
        case "md":
          return 40;
        case "lg":
          return 48;
        case "xl":
          return 48;
      }
    },
  },
};
</script>
