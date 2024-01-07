<template>
  <div
    class="lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4 myContainer"
    :key="inputKey"
  >
    <!-- <div class="flex items-center justify-between md:hidden">
      <div class="p-2">
        <v-list-item class="lg:!text-[18px] md:!text-[21px] sm:!text-[15px] !text-[12px]" to="/">
          <v-list-item-content>
            <i class="fa-solid fa-arrow-right md:text-[25px] sm:text-[20px] text-[15px] text-black"></i>
          </v-list-item-content>
        </v-list-item>
      </div>
      <v-btn icon x-large @click="showDialog=true" class="!p-2">
        <v-avatar color="#0d6efd" :size="size">
          <v-img
            v-if="showAltImage==false"
            src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
            v-on:error="onImgError"
          ></v-img>
          <span
            v-else
            class="white--text lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
          >{{userBeforeUpdate.name.charAt(0)}}</span>
        </v-avatar>
      </v-btn>
    </div>-->
    <div class="editProfile">
      <v-app class="!min-h-[0px]">
        <v-card
          class="!p-2 md:gap-5 gap-2 grid md:grid-cols-3 grid-cols-1 grid-rows-1"
        >
          <div
            class="photoProfileEdit flex items-center justify-center flex-col gap-3"
          >
            <div class="imgPart cursor-pointer">
              <v-hover>
                <div v-if="hover" slot-scope="{ hover }" class="relative">
                  <v-img
                    crossorigin="anonymous"
                    class="md:!w-[200px] w-[150px] h-[150px] md:!h-[200px] rounded-[50%] md:opacity-[0.5]"
                    :src="imgUrl"
                    v-on:error="onImgError"
                  ></v-img>
                  <v-file-input
                    prepend-icon="mdi-camera"
                    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    @change="onFileChange"
                    hide-input
                  ></v-file-input>
                </div>
                <div v-else class="relative">
                  <v-img
                    crossorigin="anonymous"
                    class="md:!w-[200px] w-[150px] h-[150px] md:!h-[200px] rounded-[50%]"
                    :src="imgUrl"
                    v-on:error="onImgError"
                    v-model="imgUrl"
                  ></v-img>
                </div>
              </v-hover>
            </div>
            <v-label class>{{ userBeforeUpdate.name }}</v-label>
          </div>

          <div class="px-5 md:h p-2">
            <v-form @submit.prevent="updatePersoData" name="form1">
              <v-text-field
                class="lg:!text-[40px] md:!text-[35px] sm:!text-[30px] !text-[25px] infoPerso"
                background-color="white"
                value="معلومات الحساب"
                solo
                reverse
                disabled
                color="white"
              ></v-text-field>

              <v-text-field
                class="lg:!text-[25px] md:!text-[23px] sm:!text-[30px] !text-[14px] !px-2 i"
                :counter="20"
                v-model="userBeforeUpdate.name"
                label="الاسم و اللقب"
                name="الاسم و اللقب"
                v-validate="'required|alpha_spaces'"
                :error-messages="errors.first('الاسم و اللقب')"
                reverse
              ></v-text-field>

              <v-text-field
                class="lg:!text-[25px] md:!text-[23px] sm:!text-[30px] !text-[18px] !px-2 i"
                reverse
                label="الايميل"
                v-model="userBeforeUpdate.email"
                name="الايميل"
                v-validate="'required|email'"
                :error-messages="errors.first('الايميل')"
              ></v-text-field>

              <v-textarea
                class="!text-[#0d6efd] lg:!text-[20px] md:!text-[18px] sm:!text-[16px] !text-[14px] placeholder:!text-[0d6efd] i"
                auto-grow
                persistent-placeholder
                reverse
                label="سيرة ذاتية"
                rows="4"
                placeholder="say Something"
                v-model="userBeforeUpdate.bio"
                :validate-on-blur="true"
              ></v-textarea>
              <v-btn
                :disabled="isReallyUpdated"
                class="!mb-7 !text-white"
                :color="success ? 'success' : '#0d6efd'"
                :loading="loadingPerso"
                name="persoData"
                type="submit"
              >
                <slot v-if="!success" />
                <template v-else>
                  <span>
                    تم التعدبل بنجاح
                    <v-icon>mdi-check</v-icon>
                  </span>
                </template>
                <span v-if="!success">تعدبل الملف الشخصي</span>
              </v-btn>
            </v-form>
          </div>
          <div class="px-5 md:h p-2">
            <v-form @submit.prevent="updatePassword" name="form2">
              <v-text-field
                class="lg:!text-[23px] md:!text-[21px] sm:!text-[19px] !text-[17px] !text-white fieldReadOnly !cursor-pointer passChange"
                value=" تغيير كلمة السر"
                reverse
                solo
                readonly
              ></v-text-field>

              <v-text-field
                class="lg:!text-[25px] md:!text-[23px] sm:!text-[30px] !text-[18px] !px-2 i"
                :error-messages="errors.first('كلمة السر السابقة')"
                label="كلمة السر السابقة"
                reverse
                v-model="managePassword.currentPassword"
                v-validate="'required'"
                name="كلمة السر السابقة"
                :prepend-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                variant="outlined"
                persistent-placeholder
                @click:prepend-inner="visible = !visible"
              ></v-text-field>

              <v-text-field
                class="lg:!text-[25px] md:!text-[23px] sm:!text-[30px] !text-[18px] !px-2 i"
                :error-messages="errors.first('كلمة السر الجديدة')"
                label="كلمة السر الجديدة"
                reverse
                v-validate="'required|'"
                name="كلمة السر الجديدة"
                :prepend-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                variant="outlined"
                @click:prepend-inner="visible = !visible"
                v-model="managePassword.password"
                ref="$password"
                persistent-placeholder
              ></v-text-field>

              <v-text-field
                :error-messages="errors.first(' تاكيد كلمة السر')"
                class="lg:!text-[25px] md:!text-[23px] sm:!text-[30px] !text-[18px] !px-2 i"
                label=" تاكيد كلمة السر"
                reverse
                v-validate="'required|confirmed:$password'"
                name=" تاكيد كلمة السر"
                :prepend-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                v-model="managePassword.passwordConfirm"
                variant="outlined"
                @click:prepend-inner="visible = !visible"
                persistent-placeholder
              ></v-text-field>

              <!-- <v-text-field
            v-model="newUser.phone"
            reverse
            label="الهاتف "
            name="phone"
            v-validate="'required|phone'"
            :error-messages="errors.first('phone')"
              ></v-text-field>-->
              <v-btn
                :disabled="!isNoteEmpty"
                class="!mb-7 !text-white"
                type="submit"
                :loading="loading"
                :color="passSucces ? 'success' : '#0d6efd'"
              >
                <slot v-if="!passSucces" />
                <template v-else>
                  <span>
                    تم تغيير كلمة السر بنجاح
                    <v-icon>mdi-check</v-icon>
                  </span>
                </template>
                <span v-if="!passSucces">تغيير كلمة السر</span>
              </v-btn>
            </v-form>
          </div>
        </v-card>
      </v-app>
      <v-app v-if="showDialog">
        <v-dialog
          v-model="showDialog"
          width="auto"
          content-class="elevation-0 "
        >
          <v-avatar color="#0d6efd" size="200">
            <v-img
              v-if="showAltImage == false"
              :src="'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg'"
              v-on:error="onImgError"
            ></v-img>
            <span
              v-else
              class="white--text lg:text-[30px] md:text-[25px] sm:text-[20px] text-[18px]"
              >{{ user.data.user.name.charAt(0) }}</span
            >
          </v-avatar>
        </v-dialog>
      </v-app>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  created() {
    this.userBeforeUpdate = Object.assign({}, this.user.data.user);

    if (this.userBeforeUpdate.photo != null) {
      this.getImage();
    } else {
      this.showAltImage = true;
    }
  },
  data() {
    return {
      imageUrl: null,
      loadingPerso: false,
      success: false,
      passSucces: false,
      inputKey: null,
      userBeforeUpdate: {},
      managePassword: {
        currentPassword: "",
        password: "",
        passwordConfirm: "",
      },

      loading: false,
      visible: false,
      currentEdit: "",
      showDialog: false,
      showAltImage: false,
      yesForChange: false,
      imgUrl: null,
    };
  },
  components: {},
  props: {
    user: {
      type: Object,
    },
  },

  methods: {
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
            new Blob([res.data], { type: "image/png" })
          );
          console.log(this.imgUrl);
        })
        .catch((e) => {
          console.log(e.data);
        });
    },
    close() {
      this.editOpenDial = false;
    },
    onImgError() {
      this.showAltImage = true;
    },

    toglePass() {
      this.yesForChange = !this.yesForChange;
    },
    updatePersoData() {
      console.log(this.user.token);
      this.$validator.validateAll("form1").then((result) => {
        if (result) {
          this.loadingPerso = true;
          axios
            .patch(
              "users/updateMe",

              this.userBeforeUpdate,

              {
                headers: {
                  "Content-Type":
                    "application/json; multipart/form-data; harset=utf-8",
                  Authorization: "Bearer " + this.user.token,
                },
              }
            )
            .then((res) => {
              if (res.status === 200) {
                this.success = true;
                this.loadingPerso = false;
                Object.assign(res.data, { token: this.user.token });
                localStorage.setItem("user", JSON.stringify(res.data));

                console.log(res.data);

                // console.log(res);
              }
            })
            .catch((e) => {
              this.loadingPerso = false;
              this.error = e;
              console.log(e.response.data.message);
            })
            .finally(() => {
              this.loadingPerso = false;
              console.log(this.userBeforeUpdate);
              setTimeout(() => {
                this.success = false;
                location.reload();
              }, 3000);
            });

          // this.subsvalue = false;
          // this.dialogDelete = true;
        }
      });
    },
    onFileChange(file) {
      if (!file) {
        return;
      }
      this.userBeforeUpdate.photo = file;
      console.log(this.userBeforeUpdate.photo);
      this.createImage(file);
    },
    createImage(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imgUrl = e.target.result;
      };

      reader.readAsDataURL(file);
    },
    updatePassword() {
      console.log(this.user.token);
      this.$validator.validateAll("form2").then((result) => {
        if (result) {
          this.loading = true;
          axios
            .patch(
              "users/updateMyPassword",

              this.managePassword,

              {
                headers: {
                  Authorization: "Bearer " + this.user.token,
                },
              }
            )
            .then((res) => {
              if (res.status === 200) {
                this.loading = false;
                this.passSucces = true;

                console.log(res.data);
                // console.log(res);
              }
            })
            .catch((e) => {
              this.loading = false;
              this.error = e;
              console.log(e);
            })
            .finally(() => {
              this.loading = false;
              setTimeout(() => {
                this.passSucces = false;
                this.$emit("forceUpdate");
              }, 3000);
            });

          // this.subsvalue = false;
          // this.dialogDelete = true;
        } else {
          this.loading = false;
        }
      });
    },
  },

  computed: {
    // eslint-disable-next-line
    size() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 30;
        case "sm":
          return 30;
        case "md":
          return 40;
        case "lg":
          return 40;
        case "xl":
          return 40;
      }
    },
    isReallyUpdated() {
      return this._.isEqual(this.user.data.user, this.userBeforeUpdate);
    },
    isNoteEmpty() {
      if (
        this.managePassword.currentPassword != "" &&
        this.managePassword.password != "" &&
        this.managePassword.passwordConfirm != ""
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
