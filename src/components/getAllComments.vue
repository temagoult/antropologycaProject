<template>
  <div
    class="lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4 myContainer"
  >
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="allComments"
      :single-select="singleSelect"
      show-select
      item-key="_id"
      class="elevation-1"
    >
      <template v-slot:top> </template>
      <template v-slot:[`item.icon`]="{ item }">
        <v-btn
          icon
          @click="deleteComment(selected[0]._id)"
          :disabled="selected.length == 0 || selected[0]._id != item._id"
        >
          <v-icon>mdi-delete</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  mounted() {
    this.getAllComment();
  },
  watch: {
    selected(val) {
      console.log(val);
    },
  },
  data() {
    return {
      singleSelect: true,
      selected: [],
      allComments: [],
      headers: [
        {
          text: "التعليقات",
          align: "start",
          sortable: false,
          class: "header",
          value: "comment",
        },
        {
          text: "صاحب التعليق ",
          value: "user.name",
          sortable: false,
          class: "header",
        },
        {
          text: "المقال",
          value: "post.title",
          sortable: false,
          class: "header",
        },
        {
          text: "تاريخ نشر التعليق",
          value: "createdAt",
          sortable: false,
          class: "header",
        },
        {
          text: "حذف التعليق",
          value: "icon",
          sortable: false,
          class: "header",
        },
      ],
    };
  },
  methods: {
    getFormattedDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    getAllComment() {
      console.log("hello");
      axios
        .get("comments", {
          headers: {
            Authorization: "Bearer " + this.user.token,
          },
        })
        .then((res) => {
          console.log(res);

          this.allComments = res.data.data.docs;

          this.allComments.map((e) => {
            e.createdAt = this.getFormattedDate(e.createdAt);
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log(this.allComments);
        });
    },
    deleteComment(id) {
      axios
        .delete("comments/" + id, {
          headers: {
            Authorization: "Bearer " + this.user.token,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$emit("forceUpdate");
        });
    },
  },
  props: {
    user: {
      type: Object,
    },
  },
};
</script>
<style>
::v-deep .v-data-table-header {
  font-size: 25px !important;
}
</style>
