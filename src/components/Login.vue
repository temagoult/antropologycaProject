<template>
  <div>
    <v-app>
      <v-dialog v-model="localModelValue" class="p-2" width="auto" reverse>
        <v-card class="mx-auto pa-12 pb-8 md:w-[600px] sm:w-[400px]" elevation="8" rounded="lg">
          <div class="flex items-center justify-end">
            <v-btn color="#0d6efd" icon @click="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <v-form fast-fail class="text-right" autocomplete="on" @submit.prevent="login">
            <v-btn
              class="signWithgoogle text-center justify-center gap-2 items-center flex !bg-[#0d6efd] p-2 !text-white mx-auto !my-3 lg:!text-[18px] md:!text-[16px] sm:!text-[14px] !text-[12px]"
              block
              size="large"
              variant="tonal"
            >
              <div class="p-2">الدخول باستخدام غوغل</div>
              <i class="fa-brands fa-google p-2 md:text-[23px] sm:text-[20px] text-[18px]"></i>
            </v-btn>
            <v-text-field
              class="textfield"
              v-model="user.email"
              label="الايميل"
              reverse
              name="email"
              v-validate="'required|email'"
              :error-messages="errors.first('email')"
              autocomplete="on"
            ></v-text-field>

            <v-text-field
              :error-messages="errors.first('password')"
              :prepend-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              variant="outlined"
              @click:prepend-inner="visible = !visible"
              v-model="user.password"
              label="كلمة السر"
              reverse
              v-validate="'required'"
              name="password"
              :class="{'is-danger': errors.has('password')}"
              ref="password"
              autocomplete="on"
            ></v-text-field>
            <v-btn to="#" class="text-body-2 font-weight-regular">نسيت كلمة السر</v-btn>

            <v-btn
              type="submit"
              class="mb-8 !text-white !w-[30%] lg:!text-[18px] md:!text-[16px] sm:!text-[14px] !text-[12px]"
              color="#0d6efd"
              block
              size="large"
              variant="tonal"
              :loading="loading"
            >تسجيل الدخول</v-btn>
          </v-form>
          <v-card-text class="text-center">
            <a
              class="text-blue text-decoration-none lg:!text-[18px] md:!text-[16px] sm:!text-[14px] !text-[12px]"
              href="#"
              rel="noopener noreferrer"
              @click="shwoSubs"
            >
              حساب جديد
              <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-app>
    <v-dialog v-model="dialogtrue" max-width="500px">
      <v-card>
        <v-card-title
          class="text-center p-2 md:!text-lg sm:!text-base !text-sm m-2"
        >مستخدم غير موحود</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogtrue=false">اعادة المحاولة</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogErro" max-width="500px">
      <v-card>
        <v-card-title
          class="text-center p-2 md:!text-lg sm:!text-base !text-sm m-2"
        >يجب ملا الاستمارة بطريقة صحيحة</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogErro=false">متفهم</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <SignUp
      class="absolute"
      :showDialogSubs="showDialogSubs"
      @updatedSubslValue="updatedSubslValue"
      @newUser="newUser"
      @islogedSignUp="islogedSignUp"
    ></SignUp>
  </div>
</template>
<script>
import SignUp from "./SignUp.vue";
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      logedFromSignUp: false,

      dialogSucess: false,
      dialogtrue: false,
      dialogErro: false,
      showdialog: false,
      showDialogSubs: false,
      visible: false,
      user: {
        email: "mohamed@gmail.com",
        password: "aaaaaaaaa"
      }
    };
  },

  components: {
    SignUp
  },
  props: {
    showLoginDialog: { value: true, type: Boolean },
    isLogin: { type: Boolean }
  },
  computed: {
    localModelValue: {
      get() {
        return this.showLoginDialog;
      },
      set(newValue) {
        this.$emit("updatemodelValue", newValue);
      }
    }
  },
  methods: {
    close() {
      this.localModelValue = false;
    },
    islogedSignUp() {
      this.$emit("islogedSignUp");
      console.log("signUp");
    },
    newUser(val) {
      console.log(val);
    },
    shwoSubs() {
      this.localModelValue = false;

      this.showDialogSubs = true;
      console.log(this.showDialogSubs);
    },
    updatedSubslValue(v) {
      this.showDialogSubs = v;
    },

    async login() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.loading = true;
          axios
            .post(
              "https://anthropologyca.onrender.com/api/v1/users/login/",
              this.user,
              {
                headers: {
                  "Content-Type": "application/json "
                }
              }
            )
            .then(res => {
              this.loading = false;
              if (res.status === 200) {
                localStorage.setItem("user", JSON.stringify(res.data));
                console.log(res.data);

                this.$emit("isloged");

                this.localModelValue = false;
              }
            })
            .catch(e => {
              this.loading = false;
              this.error = e;

              console.log(e.response.data.message);
              this.dialogtrue = true;
            })
            .finally(() => (this.loading = false));
        } else {
          this.dialogErro = true;
        }
      });
    }
  }
};
</script>