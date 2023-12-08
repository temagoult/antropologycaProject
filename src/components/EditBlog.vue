<template>
  <div>
    <div class="formEditPost myContainer">
      <div class>
        <v-app class="!min-h-[0px]">
          <v-form
            @submit.prevent="getPost"
            class="md:gap-5 gap-2 !flex flex-col !p-2"
            aria-label="hello"
          >
            <div class="md:flex">
              <v-text-field
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
                v-model="post.coverImage.src"
                @change="onFileChange"
                required
              ></v-file-input>
              <v-img
                :src="post.coverImage.src"
                class="w-[50px] h-[50px]"
                v-model="image"
              />

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
              <ckeditor
                :editor="editor"
                :config="editorConfig"
                class="!min-h-[46vh]"
                v-model="post.body"
              ></ckeditor>
            </div>
            <v-btn
              class="!mb-7 !text-white md:!w-[30%] !w-[50%]"
              color="#0d6efd"
              name="persoData"
              type="submit"
              >تحدبث المقالة</v-btn
            >
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
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
import { Link } from "@ckeditor/ckeditor5-link";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { Table, TableToolbar } from "@ckeditor/ckeditor5-table";
import { Font } from "@ckeditor/ckeditor5-font";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Indent } from "@ckeditor/ckeditor5-indent";
import { List } from "@ckeditor/ckeditor5-list";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";
import { TextTransformation } from "@ckeditor/ckeditor5-typing";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";

import {
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
} from "@ckeditor/ckeditor5-image";

// import someModule from "../yourModulePath/someQuillModule.js";
// quillEditor.register("modules/someModule", someModule);

export default {
  data() {
    return {
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        plugins: [
          Essentials,
          SimpleUploadAdapter,
          Bold,
          Italic,
          Link,
          Paragraph,
          Alignment,
          Table,
          TableToolbar,
          Font,
          Heading,
          Image,
          ImageCaption,
          ImageStyle,
          ImageToolbar,
          ImageUpload,
          Indent,
          List,
          PasteFromOffice,
          MediaEmbed,
          TextTransformation,
        ],

        toolbar: {
          language: {
            ui: "ar",
            content: "ar",
          },
          items: [
            "heading",

            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "highlight",
            "|",
            "alignment",
            "|",
            "numberedList",
            "bulletedList",
            "|",
            "indent",
            "outdent",
            "|",
            "todoList",
            "link",
            "blockQuote",
            "imageUpload",

            "imageCaption",
            "mediaEmbed",
            "insertTable",
            "paste-from-office",
            "|",
            "undo",
            "redo",
            "SimpleUploadAdapter",
          ],
          image: {
            toolbar: [
              "imageTextAlternative",
              "toggleImageCaption",
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
            ],
          },
          table: {
            contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
          },
        },
      },
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
        body: "",
      },
      editorOption: {
        placeholder: "somthing",
      },
    };
  },
  mounted() {
    this.userBeforeUpdate = Object.assign({}, this.user.data.user);
    this.post = Object.assign({}, this.editableBlog);
    console.log(this.post);
  },
  methods: {
    getPost() {
      this.$validator.validateAll().then((result) => {
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

      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    onImgError() {
      this.showAltImage = true;
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
  },

  props: {
    user: {
      type: Object,
    },
    editableBlog: {
      type: Object,
    },
  },
};
</script>
