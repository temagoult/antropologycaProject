<template>
  <div>
    <v-dialog v-model="subsvalue" class="p-2" width="auto" @click:outside="close">
      <v-sheet class="mx-auto pa-8 pb-8 md:w-[600px] sm:w-[400px]" elevation="8" rounded="lg">
        <div class="flex items-center justify-end">
          <v-btn color="#0d6efd" icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <form @submit.prevent="submit" autocomplete="on">
          <v-btn
            class="signWithgoogle text-center justify-center gap-2 items-center flex !bg-[#0d6efd] !text-white mx-auto !my-3"
            block
            size="large"
            variant="tonal"
          >
            <div class="p-2">التسجيل باستخدام غوغل</div>
            <i class="fa-brands fa-google p-2 md:text-[23px] sm:text-[20px] text-[18px]"></i>
          </v-btn>
          <!-- <v-text-field
            v-model="newProfile.id"
            :counter="15"
            label=" رقم التسحيل"
            name="id"
            v-validate="'required|numeric'"
            :error-messages="errors.first('id')"
            reverse
          ></v-text-field>-->

          <v-text-field
            v-model="newUser.name"
            :counter="15"
            label=" الاسم و اللقب"
            name="fullName"
            v-validate="'required|alpha_spaces'"
            :error-messages="errors.first('fullName')"
            reverse
          ></v-text-field>

          <!-- <v-text-field
            v-model="newUser.phone"
            reverse
            label="الهاتف "
            name="phone"
            v-validate="'required|phone'"
            :error-messages="errors.first('phone')"
          ></v-text-field>-->

          <v-text-field
            v-model="newUser.email"
            reverse
            label="الايميل"
            name="email"
            v-validate="'required|email'"
            :error-messages="errors.first('email')"
          ></v-text-field>
          <v-text-field
            v-model="newUser.password"
            :error-messages="errors.first('password')||this.errorMessages"
            label="كلمة السر"
            reverse
            v-validate="'required'"
            name="password"
            ref="$password"
            :prepend-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            variant="outlined"
            @click:prepend-inner="visible = !visible"
          ></v-text-field>
          <v-text-field
            :error-messages="errors.first('password_confirmation')"
            label=" تاكيد كلمة السر"
            reverse
            v-validate="'required|confirmed:$password'"
            name="password_confirmation"
            :prepend-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            variant="outlined"
            @click:prepend-inner="visible = !visible"
            v-model="newUser.passwordConfirm"
          ></v-text-field>

          <!-- <v-file-input
            :counter="1"
            type="file"
            :show-size="1000"
            @change="getFile"
            reverse
            label="شهادة الثسجيل "
            name="inscription"
            accept="image/*"
            v-validate="''"
            :error-messages="errors.first('inscription')"
          ></v-file-input>
          <v-checkbox
            v-model="checkBox"
            v-validate="'required'"
            :error-messages="errors.first('checkbox')"
            name="checkbox"
            class="pb-5"
            color="secondary"
            label="ساتقدم بطلب والانتظار لقبولي  في مجموعة دكاترة علم الانتروبولوجيا"
          ></v-checkbox>-->

          <v-btn class="me-4 !text-white" color="#0d6efd" type="submit">انشاء حساب</v-btn>

          <v-btn @click="reset" class="me-4">اعادة التعيين</v-btn>
        </form>
      </v-sheet>
    </v-dialog>

    <v-dialog v-model="dialogError" max-width="500px">
      <v-card>
        <v-card-title
          class="text-center p-2 md:!text-lg sm:!text-base !text-sm m-2"
        >يجب ملا الاستمارة بطريقة صحيحة</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogError=false">متفهم</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      error: "",
      errorMessages: "",
      newSubscribes: [],
      checkBox: null,
      dialogError: false,
      confirmPass: "",
      visible: false,
      dialogDelete: false,
      newUser: {
        name: "moh",
        // phone: "0555545161",
        email: "m@gmail.com",
        password: "aaa",

        passwordConfirm: ""
      }
    };
  },
  props: {
    showDialogSubs: { type: Boolean }
  },
  methods: {
    close() {
      this.subsvalue = false;
    },
    getFile(file) {
      console.log(file);
      this.newProfile.photo = file;
    },
    submit() {
      this.$validator.validateAll().then(result => {
        this.errorMessages = "";
        if (result) {
          axios
            .post(
              "https://anthropologyca.onrender.com/api/v1/users/signup",

              this.newUser,

              {
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              }
            )
            .then(res => {
              if (res.status === 200) {
                console.log(res);
              }
            })
            .catch(e => {
              this.error = e;
              console.log(e.response.data.message);
              this.errorMessages = e.response.data.message;
            })
            .finally(() => console.log(this.newUser));
          this.errorMessages = "";

          // this.subsvalue = false;
          // this.dialogDelete = true;
          this.$emit("newProfile", this.newUser);
        } else {
          this.dialogError = true;
        }
      });
    },
    reset() {
      this.$nextTick(() => {
        this.newUser = {
          id: "",
          fullName: "",
          phone: "",
          email: "",
          password: "",
          photo: {
            src: ""
          }
        };
      });
    },
    confirm() {
      this.dialogDelete = false;
    }
  },
  computed: {
    subsvalue: {
      get() {
        console.log("hello" + this.showDialogSubs);
        return this.showDialogSubs;
      },
      set(newValue) {
        this.$emit("updatedSubslValue", newValue);
      }
    }
  }
};
</script>
