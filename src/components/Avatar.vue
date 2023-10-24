<template>
  <v-app class="!h-0 !m-0 !p-0">
    <v-container fluid class="!p-2 md:!p-3">
      <v-row justify="center">
        <v-menu bottom :min-width="hight" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on">
              <v-avatar color="#0d6efd" :size="size">
                <span
                  class="white--text lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
                >{{ user.initials }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar color="#0d6efd">
                  <span
                    class="white--text lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
                  >{{ user.initials }}</span>
                </v-avatar>
                <h3>{{ user.fullName }}</h3>
                <p class="text-caption mt-1">{{ user.email }}</p>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  depressed
                  rounded
                  text
                  class="lg:!text-[18px] md:!text-[16px] sm:!text-[14px] !text-[12px]"
                >المعلومات الشخصية</v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  depressed
                  rounded
                  text
                  class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px]"
                >تسجيل الخروج</v-btn>
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
  data: () => ({
    user: {
      initials: "JD",
      fullName: "John Doe",
      email: "john.doe@doe.com"
    }
  }),
  methods: {},

  computed: {
    // eslint-disable-next-line
    hight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 150;
        case "sm":
          return 150;
        case "md":
          return 150;
        case "lg":
          return 200;
        case "xl":
          return 200;
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
