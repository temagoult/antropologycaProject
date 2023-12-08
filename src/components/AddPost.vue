<template>
  <div
    class="lg:mb-[30px] md:mb-[25px] sm:mb-[15px] mb-[10px] lg:p-8 md:p-7 sm:p-5 p-4"
  >
    <div
      class="text-[#0d6efd] md:text-start text-center sousTitre flex md:p-2 p-[3px] md:justify-start justify-center gap-2 items-center relative w-[100%]"
    >
      <i
        class="fa-solid fa-paperclip lg:text-[40px] md:text-[35px] sm:text-[25px] text-[20px] bg-white md:mr-[100px] m-0 pr-1"
      ></i>
      <div
        class="lg:text-[40px] md:text-[35px] sm:text-[25px] text-[20px] bg-white p-2 mr-[-8px]"
      >
        اضافة مقالة
      </div>
      <div class="w-[100%] bg-[#0d6efd] h-[1px] absolute z-[-1]"></div>
    </div>
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

    <div class="formAddPost myContainer">
      <div class>
        <v-app class="!min-h-[0px]">
          <v-form
            @submit.prevent="addPost"
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
                v-model="post.coverImage"
                @change="onFileChange"
                required
                ref="fileInput"
                :rules="rules"
                prepend-icon="mdi-camera"
                accept="image/PNG  image/JPG image/JPEG image/WEBP image/GIF image/INDD image/TIFF image/RAW image/PSD image/BMP image/HEIF"
              ></v-file-input>
              <v-img
                :src="imageUrl"
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
              <div required>
                <ckeditor
                  :editor="editor"
                  :config="editorConfig"
                  class="!min-h-[46vh]"
                  v-model="post.body"
                  v-validate="'required'"
                  name="editor"
                  :error-messages="errors.first('editor')"
                ></ckeditor>
              </div>
            </div>
            <v-btn
              class="!mb-7 !text-white md:!w-[30%] !w-[50%]"
              type="submit"
              :loading="loading"
              :color="passSucces ? 'success' : '#0d6efd'"
            >
              <slot v-if="!passSucces" />
              <template v-else>
                <span>
                  تم نشر المقالة بنجاح
                  <v-icon>mdi-check</v-icon>
                </span>
              </template>
              <span v-if="!passSucces"> نشر المقالة</span></v-btn
            >
          </v-form>
        </v-app>
      </div>
    </div>
  </div>

  <!-- Or manually control the data synchronization -->
</template>
<script src="https://cdn.ckbox.io/ckbox/latest/ckbox.js"></script>
<script>
const { htmlToText } = require("html-to-text");
import { ref } from "vue";
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
import axios, { Axios } from "axios";

import {
  Image,
  ImageCaption,
  ImageStyle,
  ImageTextAlternative,
  ImageResizeEditing,
  ImageResizeHandles,
  ImageToolbar,
  ImageUpload,
  AutoImage,
} from "@ckeditor/ckeditor5-image";

const content = ref("");
console.log(content);
function uploadAdapter(loader) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const body = new FormData();
        loader.file.then(async (file) => {
          body.append("image", file);

          try {
            const response = await axios.post(
              "https://anthropologyca.onrender.com/api/v1/posts/post-image/",
              body
            );
            const imageUrl = `https://anthropologyca.onrender.com/api/v1/posts/post-image/${response.data.data.filename}`;

            // CKEditor expects a specific format for the resolved promisejuijjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
            resolve({
              default: imageUrl,
            });
          } catch (error) {
            console.error("Error uploading image:", error);
            reject(error);
          }
        });
      });
    },
  };
}
function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}
const imageConfiguration = {
  resizeOptions: [
    {
      name: "resizeImage:original",
      value: null,
      label: "Original",
    },
    {
      name: "resizeImage:40",
      value: "40",
      label: "40%",
    },
    {
      name: "resizeImage:60",
      value: "60",
      label: "60%",
    },
  ],
};
export default {
  components: {},
  watch: {
    content(val) {
      console.log(
        htmlToText(val, {
          wordwrap: 130,
        })
      );
    },
  },
  data() {
    return {
      loading: false,
      editor: ClassicEditor,
      editorData: "",
      passSucces: false,
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

          Image,
          ImageCaption,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageResizeEditing,
          ImageResizeHandles,

          ImageUpload,
          AutoImage,
          uploadPlugin,
        ],

        toolbar: {
          shouldNotGroupWhenFull: true,
          language: "ar",

          items: [
            "heading",

            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "|",
            "bold",
            "italic",

            "|",
            "alignment",
            "|",
            "numberedList",
            "bulletedList",
            "|",
            "indent",
            "outdent",
            "|",

            "link",

            "imageUpload",
            "resizeImage",

            "mediaEmbed",
            "insertTable",

            "|",
            "undo",
            "redo",
          ],
          simpleUpload: {
            // The URL that the images are uploaded to.

            // Enable the XMLHttpRequest.withCredentials property.
            withCredentials: true,

            // Headers sent along with the XMLHttpRequest to the upload server.
            headers: {
              "X-CSRF-TOKEN": "CSRF-Token",
              Authorization: "Bearer <JSON Web Token>",
            },
          },

          image: {
            ignoreDataId: true,
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
      // starting editor's content
      content: `
      `,
      loading: false,
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
        // Some Quill options...
      },
      rules: [
        (v) => !!v || "File is required",
        (v) => (v && v.size > 0) || "File is required",
      ],
    };
  },
  mounted() {
    this.userBeforeUpdate = Object.assign({}, this.user.data.user);
  },
  methods: {
    addPost() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.loading = true;
          axios
            .post(
              "https://anthropologyca.onrender.com/api/v1/posts/",

              {
                title: this.post.title,
                summary: this.post.summary,
                body: this.post.body,
                image: this.post.coverImage,
              },

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
                this.loading = false;
                this.passSucces = true;

                console.log(res);
              }
            })
            .catch((e) => {
              this.loading = false;
              this.error = e;
              console.log(e.response.data.message);
              this.errorMessages = e.response.data.message;
            })
            .finally(() => (this.loading = false));
        } else {
          this.loading = false;
        }
      });
    },
    onFileChange(file) {
      if (!file) {
        return;
      }
      this.post.coverImage = file;

      console.log(this.post.coverImage);
      this.createImage(file);
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
  },
};
</script>
<style>
.ck-editor__editable {
  min-height: 200px !important;
  direction: rtl !important;
  list-style: decimal !important;
}
.ck.ck-content .image {
  width: 50%;
  height: 100px;
}
</style>
