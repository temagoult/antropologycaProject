<template>
  <div
    class="lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4 myContainer"
  >
    <v-data-table
      :headers="headers"
      :items="allUsers"
      sort-by="posts"
      class="elevation-1"
      sort-desc
    >
      <v-toolbar flat>
        <v-app>
          <v-select
            :items="items"
            single-line
            item-value="value"
            item-text="text"
          ></v-select>
        </v-app>

        <v-spacer></v-spacer>
      </v-toolbar>

      <template v-slot:[`item.num`]="{ index }">
        {{ index + 1 }}
      </template>
      <template v-slot:[`item.img`]="{ item }">
        <v-img
          :src="item.photo"
          v-if="showAltImage == false"
          :lazy-src="item.photo"
          class="md:!w-[40px] w-[30px] h-[30px] md:!h-[40px] rounded-[50%]"
        >
        </v-img>
        <span
          v-else
          class="p-2 white--text lg:text-[18px] md:text-[16px] sm:text-[14px] text-[8px] rounded-[50%] border border-solid border-gray-500 w-[20px] h-[20px]"
          >{{ item.name.charAt(0) }}</span
        >
      </template>
    </v-data-table>
  </div>
</template>
<script>
import moment from "moment";
import axios from "axios";
export default {
  data: () => ({
    showAltImage: false,
    select: "Florida",
    items: [
      { text: "Foo", value: "foo" },
      { text: "bar", value: "bar" },
      { text: "ss", value: "ss" },
      { text: "aa", value: "aa" },
    ],
    counter: 0,

    headers: [
      { text: "الرقم ", value: "num", class: "header", sortable: false },
      { text: "photo ", value: "img", class: "header", sortable: false },
      { text: "اسم المستخدم", value: "name", class: "header", sortable: false },
      { text: "الايميل", value: "email", class: "header", sortable: false },
      { text: "نوع الحساب", value: "role", class: "header", sortable: false },
      {
        text: "تاريخ انشاء الخساب",
        value: "createdAt",
        class: "header",
        sortable: false,
      },

      {
        text: "عدد المقالات المنشورة",
        value: "posts.length",

        class: "header",
        sortable: false,
      },
    ],
    allUsers: [],
    imgUrl: null,
    listImageUsers: [],
  }),
  methods: {
    onImgError() {
      this.showAltImage = true;
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
        })
        .catch((e) => {
          console.log(e.data);
        })
        .finally(() => {});
    },
    getFormattedDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
  },

  computed: {},

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    axios
      .get("users", {
        headers: {
          Authorization: "Bearer " + this.user.token,
        },
      })
      .then((res) => {
        this.allUsers = res.data.data.docs;
        console.log(this.allUsers.length);
        this.allUsers.map((e) => {
          e.createdAt = this.getFormattedDate(e.createdAt);
          if (e.photo != null) {
            axios
              .get(
                "users/user-photo/" + e.photo,
                { responseType: "arraybuffer" },

                {
                  headers: {
                    Authorization: "Bearer " + this.user.token,
                  },
                }
              )
              .then((res) => {
                e.photo = URL.createObjectURL(
                  new Blob([res.data], { tyoe: "image/jpg" })
                );
                console.log(this.imgUrl);

                console.log(
                  new Blob([this.userAvatar.image], { type: "image/jpg" })
                );
              })
              .catch((e) => {
                console.log(e.data);
              })
              .finally(() => {});
          }
        });
        console.log(this.allUsers);
      })
      .catch((e) => {
        console.log(e.data);
      })
      .finally(() => {});
    this.getImage();
  },
  props: {
    user: { type: Object },
  },
};
</script>
<style>
::v-deep .v-data-table-header {
  font-size: 25px !important;
}
</style>
