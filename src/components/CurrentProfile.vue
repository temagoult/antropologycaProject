<template>
  <v-dialog
    transition="dialog-top-transition"
    width="auto"
    v-model="localModelValue "
    @click:outside="close"
  >
    <v-card class width="400">
      <div class="flex items-center justify-between">
        <v-card-title class="!text-[#0d6efd]">المعلومات الشخصية</v-card-title>
        <v-btn color="#0d6efd" icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-card-text>الاسم: {{ `${ this.current.Firstname}` }}</v-card-text>
      <v-card-text>اللقب: {{ `${ this.current.lastName}` }}</v-card-text>
      <v-card-text>التخصص: {{ `${ this.current.specialite}` }}</v-card-text>
      <v-card-text>الايميل: {{ `${ this.current.email}` }}</v-card-text>
      <v-card-text>الهاتف: {{ `${ this.current.phone}` }}</v-card-text>
      <!-- <v-btn color="blue darken-1" text @click="close">اغلاق</v-btn> -->
    </v-card>
    <v-spacer></v-spacer>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    current: { tyoe: Object },
    profileDialogShow: { type: Boolean }
  },
  computed: {
    localModelValue: {
      get() {
        console.log(this.profileDialogShow);
        return this.profileDialogShow;
      },
      set(newValue) {
        this.$emit("updatemodelValue", newValue);
      }
    }
  },
  methods: {
    close() {
      this.$emit("close", this.close);
    }
  }
};
</script>