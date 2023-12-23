<template>
  <div
    class="overflow-x-hidden lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4"
  >
    <div class="myContainer">
      <div
        class="text-[#0d6efd] md:text-start text-center sousTitre flex md:p-2 p-[3px] md:justify-start justify-center gap-2 items-center relative w-[100%]"
      >
        <i
          class="fa-solid fa-user-plus animate-bounce lg:text-[40px] md:text-[35px] sm:text-[25px] text-[20px] bg-white md:mr-[100px] m-0 pr-1"
        ></i>
        <div
          class="lg:text-[40px] md:text-[35px] animate-bounce sm:text-[25px] text-[20px] bg-white p-2 mr-[-8px]"
        >
          تواصل معنا
        </div>
        <div class="w-[100%] bg-[#0d6efd] h-[1px] absolute z-[-1]"></div>
      </div>
      <div class="p-2">
        <v-card class="!w-[100%] !text-[#0d6efd] !p-2">
          <form class="pa-4 pt-6" @submit.prevent="submit">
            <v-text-field
              class="!text-[#0d6efd] lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] placeholder:!text-[40px]"
              color="#0d6efd"
              v-model="newMessage.fullName"
              :counter="15"
              label=" الاسم و اللقب"
              name=" الاسم و اللقب"
              v-validate="'required|alpha'"
              :error-messages="errors.first(' الاسم و اللقب')"
              reverse
            ></v-text-field>
            <v-text-field
              class="!text-[#0d6efd] lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px]"
              color="#0d6efd"
              v-model="newMessage.email"
              reverse
              label="الايميل"
              name="الايميل"
              v-validate="'required|email'"
              :error-messages="errors.first('الايميل')"
            ></v-text-field>
            <v-textarea
              v-model="newMessage.messsage"
              color="red"
              class="!text-[#0d6efd] lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] placeholder:!text-[0d6efd]"
              auto-grow
              variant="filled"
              label="الرسالة"
              reverse
              rows="4"
              name="الرسالة"
              v-validate="'required'"
              :error-messages="errors.first('الرسالة')"
            ></v-textarea>

            <v-card-actions>
              <v-btn
                @click="submit"
                :disabled="enable"
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px]"
                color="deep-purple-accent-4"
                >ارسال</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn
                variant="text"
                class="lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px]"
                @click="reset"
                >اعادة التعيين</v-btn
              >
            </v-card-actions>
          </form>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "contactUs",
  data() {
    return {
      isDisabled: true,
      newMessage: {
        fullName: "",
        email: "",
        messsage: "",
      },
    };
  },

  methods: {
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          console.log(this.newMessage);
          this.subsvalue = false;
          this.dialogDelete = true;
        } else {
          this.dialogError = true;
        }
      });
    },
    reset() {
      this.$nextTick(() => {
        this.newMessage = {
          id: "",
          fullName: "",
          phone: "",
          email: "",
          password: "",
          photo: {
            src: "",
          },
        };
      });
    },
  },
  computed: {
    enable() {
      if (
        this.newMessage.fullName == "" ||
        this.newMessage.email == "" ||
        this.newMessage.messsage == ""
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
