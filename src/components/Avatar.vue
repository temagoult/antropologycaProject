<template>
  <v-app class="!h-0 !m-0 !p-0">
    <v-container fluid class="!p-2 md:!p-3">
      <v-row justify="center">
        <v-menu buttom :min-width="widht" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on">
              <v-avatar color="#0d6efd" :size="size">
                <v-img
                  v-if="showAltImage==false"
                  src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                  v-on:error="onImgError"
                ></v-img>
                <span
                  v-else
                  class="white--text lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
                >{{userAvatar.data.user.name.charAt(0)}}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar color="#0d6efd">
                  <v-img
                    v-if="showAltImage==false"
                    src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                    v-on:error="onImgError"
                  ></v-img>
                  <span
                    v-else
                    class="white--text lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
                  >{{userAvatar.data.user.name.charAt(0)}}</span>
                </v-avatar>
                <h3
                  class="lg:!text-[20px] md:!text-[25px] sm:!text-[20px] !text-[18px]"
                >{{ userAvatar.data.user.name}}</h3>

                <p
                  class="text-caption mt-1 lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
                >{{userAvatar.data.user.email}}</p>
                <div class="flex justify-center items-center mb-[2px]">
                  <p
                    class="text-caption mt-1 md:w-[60%] w-[40%] !mx-auto lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
                  >{{userAvatar.data.user.bio}}</p>
                </div>
                <span
                  class="text-caption mt-1 md:w-[60%] w-[40%] !mx-auto lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px] !font-extrabold"
                  v-if="userAvatar.data.user.verified"
                >الحساب :مفعل</span>
                <span
                  class="text-caption mt-1 md:w-[60%] w-[40%] !mx-auto lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px] !font-extrabold"
                  v-else
                >الحساب : غير مفعل</span>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  depressed
                  rounded
                  text
                  class="lg:!text-[18px] md:!text-[16px] sm:!text-[14px] !text-[12px]"
                >
                  تفعييل الحساب
                  <v-icon
                    class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] !p-1"
                  >mdi-arrow-up-bold</v-icon>
                </v-btn>
                <v-divider class="my-3"></v-divider>

                <v-btn
                  to="/AddPost"
                  depressed
                  rounded
                  text
                  class="lg:!text-[18px] md:!text-[16px] sm:!text-[14px] !text-[12px]"
                >
                  اضافة مقالة جدبدة
                  <v-icon
                    class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] !p-1"
                  >mdi-text-box-plus</v-icon>
                </v-btn>

                <v-divider class="my-3"></v-divider>
                <v-btn
                  depressed
                  rounded
                  text
                  class="lg:!text-[18px] md:!text-[16px] sm:!text-[14px] !text-[12px]"
                >
                  مقالاتي المفضلة
                  <v-icon
                    class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] !p-1"
                  >mdi-star</v-icon>
                </v-btn>

                <v-divider class="my-3"></v-divider>

                <v-btn
                  to="/EditProfile"
                  depressed
                  rounded
                  text
                  class="lg:!text-[18px] md:!text-[16px] sm:!text-[14px] !text-[12px]"
                >
                  معلومات الحساب
                  <v-icon
                    class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] !p-1"
                  >mdi-account-cog</v-icon>
                </v-btn>

                <v-divider class="my-3"></v-divider>
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
                  >mdi-logout</v-icon>
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  created() {
    this.userAvatar = this.user;
    console.log(this.user);
  },
  data: () => ({
    userAvatar: {},
    showAltImage: false
  }),
  methods: {
    logOut() {
      this.$emit("logOut");
    },
    onImgError() {
      this.showAltImage = true;
    }
  },
  props: {
    user: {
      type: Object
    }
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
    }
  }
};
</script>
