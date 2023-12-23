<template>
  <div
    class="lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4 myContainer"
  >
    <v-app>
      <v-card
        class="mx-auto pa-12 pb-8 md:w-[600px] sm:w-[400px]"
        elevation="8"
        rounded="lg"
      >
        <div class="p-2">
          <h3>نسيت كلمة السر؟</h3>
          <p
            class="lg:!text-[18px] md:!text-[16px] sm:!text-[14px] !text-[12px]"
          >
            لاسترجاع كلمة السر يرجى منك ادخال الايميل الخاص بك سيصلك رابط خاص
            باسترجاع كلمة السر
          </p>
        </div>

        <v-form
          fast-fail
          class="text-right"
          autocomplete="on"
          @submit.prevent="sendForgotEmail"
        >
          <v-text-field
            class="textfield"
            v-model="email"
            label="الايميل"
            reverse
            persistent-placeholder
            name="email"
            v-validate="'required|email'"
            :error-messages="errors.first('email')"
            autocomplete="on"
            outlined
          ></v-text-field>

          <v-btn
            class="!mb-7 !text-white !w-[100%]"
            type="submit"
            :loading="loading"
            :color="succes ? 'success' : '#0d6efd'"
          >
            <slot v-if="!succes" />
            <template v-else>
              <span
                class="lg:!text-[18px] md:!text-[16px] sm:!text-[14px] !text-[8px]"
              >
                تم ارسال الايميل بنجاح يمكنك تفحص الايميل الخاص بك
                <v-icon>mdi-check</v-icon>
              </span>
            </template>
            <span v-if="!succes"> ارسال الايميل </span></v-btn
          >
        </v-form>
      </v-card>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return { email: "", loading: null, succes: null };
  },
  mounted() {},
  methods: {
    sendForgotEmail() {
      this.loading = true;
      axios
        .post(
          "users/forgotPassword",
          { email: this.email },
          {
            Headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          }
        )
        .then((res) => {
          this.loading = false;
          this.succes = true;
          console.log(res);
        })
        .catch((error) => {
          this.loading = false;

          console.log(error);
        })

        .finally(() => {
          this.loading = false;
          setTimeout(() => {
            this.succes = false;
            this.$nextTick(() => {
              this.email = "";
            });
          }, 5000);
        });
    },
  },
};
</script>
