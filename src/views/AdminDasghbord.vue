<template>
  <div class="adminDasbord grid grid-cols-3 lg:min-h-[67vh] md:min-h-[46vh] min-h-[65vh]">
    <div class="navDrawer">
      <v-app-bar app dark flat clipped-right class="!bg-stone-100">
        <v-app-bar-title class="!text-center !flex justify-center !w-[17%]">
          <v-btn
            depressed
            rounded
            text
            class="lg:!text-[25px] md:!text-[23px] sm:!text-[22px] !text-[20px] !font-extrabold !text-black !p-2"
          >انتروبولوجيكا</v-btn>
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon class="!text-black">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon class="!bg-transparent !text-black">
          <v-icon>mdi-gmail</v-icon>
        </v-btn>

        <v-btn icon>
          <v-app class="!bg-transparent">
            <v-menu bottom :min-width="widht" offset-y>
              <template v-slot:activator="{ on }">
                <v-btn class="!text-black font-semibold" icon plain stacked v-on="on" depressed>
                  <div class="flex flex-shrink-0">
                    <span
                      :class="notifications.length>0?'font-bold text-red-500 text-[15px]':'font-bold text-black text-[15px]'"
                    >{{ notifications.length }}</span>

                    <v-icon>mdi-bell-outline</v-icon>
                  </div>
                </v-btn>
              </template>
              <v-card>
                <v-list-item-content
                  class="justify-center"
                  v-for="(e,index)
                  in
                  notifications"
                  :key="index"
                >
                  <div class="mx-auto text-center">
                    <v-btn
                      depressed
                      rounded
                      text
                      class="lg:!text-[18px] md:!text-[16px] sm:!text-[14px] !text-[12px]"
                    >
                      {{e}}
                      <v-icon
                        class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] !p-1"
                      >mdi-bell-outline</v-icon>
                    </v-btn>
                    <v-divider class="my-3"></v-divider>
                  </div>
                </v-list-item-content>
              </v-card>
            </v-menu>
          </v-app>
        </v-btn>
        <v-btn icon>
          <v-app>
            <v-row justify="center">
              <v-menu bottom offset-y :min-width="widht">
                <template v-slot:activator="{ on }">
                  <v-btn icon x-large v-on="on" clas>
                    <v-avatar color="#0d6efd" :size="size">
                      <v-img
                        v-if="showAltImage==false"
                        src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                        v-on:error="onImgError"
                      ></v-img>
                      <span
                        v-else
                        class="white--text lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
                      >{{user.data.user.name.charAt(0)}}</span>
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
                        >{{user.data.user.name.charAt(0)}}</span>
                      </v-avatar>
                      <h3
                        class="lg:!text-[20px] md:!text-[25px] sm:!text-[20px] !text-[18px]"
                      >{{ user.data.user.name}}</h3>

                      <p
                        class="text-caption mt-1 lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
                      >{{user.data.user.email}}</p>
                      <div class="flex justify-center items-center mb-[2px]">
                        <p
                          class="text-caption mt-1 md:w-[60%] w-[40%] !mx-auto lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
                        >{{user.data.user.bio}}</p>
                      </div>
                      <span
                        class="text-caption mt-1 md:w-[60%] w-[40%] !mx-auto lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px] !font-extrabold"
                      >admin</span>
                    </div>
                  </v-list-item-content>
                </v-card>
              </v-menu>
            </v-row>
          </v-app>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer
        app
        reverse
        right
        isLtR
        clipped
        class="!bg-stone-100 navigationDrawer reverse"
      >
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <div>
              <h3
                class="lg:!text-[20px] md:!text-[25px] sm:!text-[20px] !text-[18px]"
              >{{ user.data.user.name}}</h3>

              <span
                class="text-caption mt-1 md:w-[60%] w-[40%] !mx-auto lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px] !font-extrabold"
              >admin</span>
            </div>

            <v-divider class="my-3"></v-divider>

            <div class="flex justify-center">
              <v-icon
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[20px] !text-[18px] !p-1"
              >mdi-logout</v-icon>

              <v-btn
                depressed
                rounded
                text
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[20px] !text-[18px]"
              >تسجيل الخروج</v-btn>
            </div>
          </div>
        </v-list-item-content>
      </v-navigation-drawer>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      notifications: ["notification1", "notification2", "notification3"],
      user: {
        erified: true,
        data: {
          user: {
            name: "mohamed Temagoult",
            email: "a@gmail.com",
            bio: "hello"
          }
        }
      },
      showAltImage: false,
      drawer: true,
      rail: true
    };
  },
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
    }
  },

  methods: {
    onImgError() {
      this.showAltImage = true;
    }
  }
};
</script>
<style scoped>
::v-deep ::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
