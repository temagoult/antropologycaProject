<template>
  <div
    class="lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4 !min-h-min myContainer"
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
    <!-- Two-way Data-Binding -->

    <div class="formAddPost">
      <div class>
        <v-app class="!min-h-[0px]">
          <v-form
            @submit.prevent="getPost"
            class="md:gap-5 gap-2 !flex flex-col !p-2"
            aria-label="hello"
          >
            <v-label
              class="lg:!text-[23px] md:!text-[21px] sm:!text-[19px] !text-[17px] !text-blue !text-center fieldReadOnly !cursor-pointer"
            >اضافة مقالة</v-label>
            <div class="md:flex">
              <v-text-field
                :counter="20"
                label="   عنوان المقال"
                name="title"
                focusColor="red"
                v-validate="'required|alpha_spaces'"
                :error-messages="errors.first('title')"
                persistent-placeholder
                v-model="post.title"
                persistent-hint
                reverse
                class="addPost md:!w-[50%]"
              ></v-text-field>

              <v-file-input
                placeholder="صورة المقال"
                show-size
                counter
                reverse
                class="md:!w-[50%]"
                v-model="post.coverImage"
                @change="onFileChange"
                required
              ></v-file-input>
              <v-img :src="imageUrl" class="w-[50px] h-[50px]" v-model="image" />

              <v-label v-if="validImage">add a valid image</v-label>
            </div>

            <v-textarea
              persistent-placeholder
              auto-grow
              variant="filled"
              label="ملخص المقال"
              reverse
              rows="4"
              name="area"
              v-validate="'required'"
              :error-messages="errors.first('area')"
              class="addPost"
              v-model="post.summary"
            ></v-textarea>
            <div>
              <v-label>موضوع المقال</v-label>
              <quill-editor
                ref="myQuillEditor"
                class="min-h-[50px] !relative addPost !py-2"
                v-model="post.body"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
              />
            </div>
            <v-btn
              class="!mb-7 !text-white w-[50%]"
              color="#0d6efd"
              name="persoData"
              type="submit"
            >getPost</v-btn>
          </v-form>
        </v-app>
      </div>
    </div>
  </div>

  <!-- Or manually control the data synchronization -->
</template>
  
  <script>
import { ref } from "vue";

const content = ref("");
console.log(content);
// You can also register Quill modules in the component
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

// import someModule from "../yourModulePath/someQuillModule.js";
// quillEditor.register("modules/someModule", someModule);

export default {
  data() {
    return {
      validImage: false,
      image: undefined,
      // to save image url
      imageUrl: "",
      showAltImage: false,
      showDialog: false,
      userBeforeUpdate: {},
      post: {
        title: "",
        coverImage: null,
        summary: "",
        body: ""
      },
      editorOption: {
        // Some Quill options...
      }
    };
  },
  mounted() {
    this.userBeforeUpdate = Object.assign({}, this.user.data.user);
  },
  methods: {
    getPost() {
      this.$validator.validateAll().then(result => {
        if (result) {
          console.log(this.post);
        }
      });
    },
    onFileChange(file) {
      if (!file) {
        return;
      }
      this.post.coverImage = "file";

      console.log(this.createImage(file));
    },
    createImage(file) {
      const reader = new FileReader();

      reader.onload = e => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    },
    onImgError() {
      this.showAltImage = true;
    }
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
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },

  components: {
    quillEditor
  },

  props: {
    user: {
      type: Object
    }
  }
};
</script>