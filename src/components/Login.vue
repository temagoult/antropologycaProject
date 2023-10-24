<template>
  <div>
    <v-app>
      <v-dialog v-model="localModelValue" class="p-2" width="auto" reverse>
        <v-card class="mx-auto pa-12 pb-8 md:w-[600px] sm:w-[400px]" elevation="8" rounded="lg">
          <v-form fast-fail @submit.prevent="login" class="text-right" autocomplete="on">
            <v-btn
              class="signWithgoogle text-center justify-center gap-2 items-center flex !bg-red-500 p-2 !text-white mx-auto !my-3"
              color="#0d6efd"
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
            <router-link to="#" class="text-body-2 font-weight-regular" aria-required>نسيت كلمة السر</router-link>

            <v-btn
              @click="login"
              class="mb-8 !text-white"
              color="#0d6efd"
              type="submit"
              block
              size="large"
              variant="tonal"
            >تسجيل الدخول</v-btn>
          </v-form>
          <v-card-text class="text-center">
            <a
              class="text-blue text-decoration-none"
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

    <Subscribe
      class="absolute"
      :showDialogSubs="showDialogSubs"
      @updatedSubslValue="updatedSubslValue"
      @newProfile="newProfile"
    ></Subscribe>
  </div>
</template>
<script>
import Subscribe from "./Subscribe.vue";
export default {
  data() {
    return {
      isLoged: false,
      selectedUser: {
        id: "",
        fullName: "",
        phone: "",
        email: "",
        password: "",
        photo: {
          src: ""
        }
      },
      users: [],
      dialogSucess: false,
      dialogtrue: false,
      dialogErro: false,
      showdialog: false,
      showDialogSubs: false,
      visible: false,
      user: {
        email: "M@GMAIL.COM",
        password: "aaa"
      }
    };
  },
  created() {
    this.users = [
      {
        id: "1134",
        fullName: "brahim",
        phone: "0555545161",
        email: "b@GMAIL.COM",
        password: "aaa",
        photo: {
          src: ""
        }
      },
      {
        id: "11",
        fullName: "samir",
        phone: "0555545161",
        email: "s@GMAIL.COM",
        password: "aaa",
        photo: {
          src: ""
        }
      },
      {
        id: "121",
        fullName: "mohamed Temagoult",
        phone: "0555545161",
        email: "M@GMAIL.COM",
        password: "aaa",
        photo: {
          src: ""
        }
      }
    ];
  },
  components: {
    Subscribe
  },
  props: {
    showLoginDialog: { value: true, type: Boolean },
    isLogin: { type: Boolean }
  },
  computed: {
    filterLogin() {
      let UserLogin = this.user;
      return this.users.filter(function(user) {
        return (
          user.email.match(UserLogin.email) &&
          user.password.match(UserLogin.password)
        );
      });
    },
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
    newProfile(val) {
      this.users.push(val);
      console.log(this.users);
    },
    shwoSubs() {
      this.localModelValue = false;

      this.showDialogSubs = true;
      console.log(this.showDialogSubs);
    },
    updatedSubslValue(v) {
      this.showDialogSubs = v;
    },

    login() {
      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.filterLogin.length > 0) {
            this.$emit("isloged");
            this.dialogSucess = true;
            this.localModelValue = false;
            this.selectedUser = this.filterLogin[0];
            this.isLoged = false;
          } else {
            this.dialogtrue = true;
          }
        } else {
          this.dialogErro = true;
        }
      });
    }
  }
};
</script>