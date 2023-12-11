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
        @click="getData"
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
import router from "../router";
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
        title: "علم الإنسان",
        coverImage: null,
        summary:
          "يُمكننا أن نعتبرَ الأنثروبولوجيا علماً حديثاً يقرب عمرهُ من قرن وربع القرن تقريباً، كما نستطيع. بعين الوقت، أن نعتبرها من أقدم علوم البشر. فالجامعات لم تبدأ بتدريس الأنثروبولوجيا إلا حديثاً 9جداً. فلقد عيّن أول أستاذٍ لها في جامعة أوكسفورد، وهو «السير أدورد تايلور» عام 1884، وفي جامعة كمبرج، وهو الأستاذ «هادن» في عام 1900، وفي جامعة لفربول، وهو «السير جيمس فريزر» في عام 1907. وعيّن أول أستاذٍ لها في جامعة لندن في عام 1908، وفي الجامعات الأمريكية في عام 1886",

        body: '<p style="text-align:right;">يُمكننا أن نعتبرَ الأنثروبولوجيا علماً حديثاً يقرب عمرهُ من قرن وربع القرن تقريباً، كما نستطيع. بعين الوقت، أن نعتبرها من أقدم علوم البشر. فالجامعات لم تبدأ بتدريس الأنثروبولوجيا إلا حديثاً جداً. فلقد عيّن أول أستاذٍ لها في جامعة <a href="https://ar.wikipedia.org/wiki/%D8%A3%D9%83%D8%B3%D9%81%D9%88%D8%B1%D8%AF">أوكسفورد</a>، وهو «السير أدورد تايلور» عام <a href="https://ar.wikipedia.org/wiki/1884">1884</a>، وفي جامعة <a href="https://ar.wikipedia.org/wiki/%D9%83%D8%A7%D9%85%D8%A8%D8%B1%D9%8A%D8%AF%D8%AC">كمبرج</a>، وهو الأستاذ «هادن» في عام <a href="https://ar.wikipedia.org/wiki/1900">1900</a>، وفي جامعة <a href="https://ar.wikipedia.org/wiki/%D9%84%D9%8A%D9%81%D8%B1%D8%A8%D9%88%D9%84">لفربول</a>، وهو «السير جيمس فريزر» في عام <a href="https://ar.wikipedia.org/wiki/1907">1907</a>. وعيّن أول أستاذٍ لها في <a href="https://ar.wikipedia.org/wiki/%D8%AC%D8%A7%D9%85%D8%B9%D8%A9_%D9%84%D9%86%D8%AF%D9%86">جامعة لندن</a> في عام 1908، وفي الجامعات الأمريكية في عام <a href="https://ar.wikipedia.org/wiki/1886">1886</a>.</p><p style="text-align:right;">ولأن الأنثروبولوجيا تعنى بدراسة <a href="https://ar.wikipedia.org/wiki/%D9%86%D8%B8%D8%B1%D9%8A%D8%A9">النظريات</a> التي تتعلق بطبيعة المُجتمعات البشرية، فإننا نستطيع أن نعتبرها، من جهة أخرى، من أقدم العلوم. إذ هي بدأت مع أقدم تأمّلات الإنسان حول تلكَ الموضوعات. فلقد قالوا مثلاً: إن المؤرّخ الإغريقي (<a href="https://ar.wikipedia.org/wiki/%D9%87%D9%8A%D8%B1%D9%88%D8%AF%D9%88%D8%AA">هيرودوتس</a>) «أبو الانثروبولوجيا» كما هو أبو التاريخ، لأنهُ وصفَ لنا بإسهاب، التكوين الجسمي لأقوام قديمة كـ (السيثيين) وقدماءَ المصريين وغيرهم من الشعوب القديمة، وصوّر <a href="https://ar.wikipedia.org/wiki/%D8%A3%D8%AE%D9%84%D8%A7%D9%82">أخلاقهم</a> <a href="https://ar.wikipedia.org/wiki/%D8%B9%D8%A7%D8%AF%D8%A9_(%D8%B9%D9%84%D9%85_%D8%A7%D9%84%D8%A7%D8%AC%D8%AA%D9%85%D8%A7%D8%B9)">وعاداتهم</a>. كما كتب المؤرخ الروماني (تاكيتس) دراستهُ المشهورة عن <a href="https://ar.wikipedia.org/wiki/%D8%AC%D8%B1%D9%85%D8%A7%D9%86">القبائل الجرمانية</a>.</p><p style="text-align:right;">حتى <a href="https://ar.wikipedia.org/wiki/%D8%A8%D9%84%D8%A7%D8%AF_%D8%A8%D8%A7%D8%A8%D9%84">البابليون</a> قبل «هيرودوتس» بزمن طويل، جمعوا في متاحفَ خاصة بعض ما تركهُ <a href="https://ar.wikipedia.org/wiki/%D8%B3%D9%88%D9%85%D8%B1">السومريون</a> من أدواتٍ ومخلفات.</p><p style="text-align:right;">إننا نستطيع أن نعتبرَ <a href="https://ar.wikipedia.org/wiki/%D8%A7%D9%84%D9%82%D8%B1%D9%86_18">القرن الثامن عشر</a> نقطة بدءٍ مناسبة للأنثروبولوجيا. نشهد بعدها ظهور العناصر المكونة لهذا العلم. فآراء <a href="https://ar.wikipedia.org/wiki/%D9%85%D9%88%D9%86%D8%AA%D8%B3%D9%83%D9%8A%D9%88">مونتسكيو</a> في كتابهِ الشهير (<a href="https://ar.wikipedia.org/wiki/%D8%B1%D9%88%D8%AD_%D8%A7%D9%84%D9%82%D9%88%D8%A7%D9%86%D9%8A%D9%86">روح القوانين</a>) عن المجتمع وأسسه وطبيعته. وكتابات (سان سيمون) وإدعاؤه وجود علم للمجتمع، وآراء (<a href="https://ar.wikipedia.org/wiki/%D8%AF%D9%8A%D9%81%D9%8A%D8%AF_%D9%87%D9%8A%D9%88%D9%85">ديفيد هيوم</a>) و (<a href="https://ar.wikipedia.org/wiki/%D8%A2%D8%AF%D9%85_%D8%B3%D9%85%D9%8A%D8%AB">آدم سمث</a>) ونظرتهما إلى المجتمعات باعتبارها تتكون من أنساق طبيعية، واعتقادهما بالتطور غير المحدود، وبوجود قوانين لذلكَ التطور، كل تلكَ التأمّلات والآراء حوت بلا شك البذرات الصالحة والمكونات الأساسية التي نمت في القرن التاسع عشر، فكونت المدراس الانثروبولوجيّة الكبيرة.</p><p style="text-align:right;">وبعدَ مُنتصف القرن التاسع عشر بدأت الكتب القديمة في الأنثروبولوجيا بالظهور في <a href="https://ar.wikipedia.org/wiki/%D8%A3%D9%88%D8%B1%D9%88%D8%A8%D8%A7">أوروبا</a> <a href="https://ar.wikipedia.org/wiki/%D8%A7%D9%84%D9%88%D9%84%D8%A7%D9%8A%D8%A7%D8%AA_%D8%A7%D9%84%D9%85%D8%AA%D8%AD%D8%AF%D8%A9">وأمريكا</a>. وكانَ أبرز تلكَ الكتب كتاب (السير هنرى مين) «القانون القديم» عام 1861 وكتابه عن (المجتمعات القروية في الشرق والغرب) (1861)، وكتاب (باخوفن) عن (حق ألام) عام 1861 وكتاب (فوستل دو كولانج) عن (المدينة القديمة) 1864 وكتاب (ماكلينان) عن «الزواج البدائي» عام 1865 وكتاب (السر أدورد تايلور) المُسمى «أبحاث في التأريخ القديم للجنس البشري» عام 1865 وكتابه الآخر عن «الحضارة البدائية» عام 1871، ومن ثم (لوس موركن) عن «أنساق روابط الدم والمصاهرة في العائلة الإنسانية» عام 1870.</p><p style="text-align:right;">كما ظهرت «بعين الوقت» مدرستان كبيرتان من مدراس هذا العلم، هما «مدرسة القانون المقارن» و «المدرسة التطورية». فأفاد رجال المدرسة الأولى الأنثروبولوجيا كثيراً حين انصرفوا إلى دراسة <a href="https://ar.wikipedia.org/wiki/%D9%82%D8%A7%D9%86%D9%88%D9%86_%D9%85%D9%82%D8%A7%D8%B1%D9%86">القانون المقارن</a>. حيث اهتموا بصورة خاصة بالقانون القديم وقوانيين الشعوب البدائية. كما تأثرَ رجال المدرسة الثانية «التطورية» بنظريات (<a href="https://ar.wikipedia.org/wiki/%D8%AC%D8%A7%D9%86_%D8%A8%D8%A7%D8%AA%D9%8A%D8%B3%D8%AA_%D9%84%D8%A7%D9%85%D8%A7%D8%B1%D9%83">لامارك</a>) و (<a href="https://ar.wikipedia.org/wiki/%D8%AA%D8%B4%D8%A7%D8%B1%D9%84%D8%B2_%D8%AF%D8%A7%D8%B1%D9%88%D9%8A%D9%86">دارون</a>) في التطور الحياتي. فأقاموا نظرياتهم في التطور الاجتماعي على عين الأسس.</p><p style="text-align:right;">وفي مطلع <a href="https://ar.wikipedia.org/wiki/%D8%A7%D9%84%D9%82%D8%B1%D9%86_20">القرن العشرين</a> برزت في الأنثروبولوجيا أسماء ضخمة مثل «السر جيمس فريزر»، و"<a href="https://ar.wikipedia.org/wiki/%D8%A5%D9%85%D9%8A%D9%84_%D8%AF%D9%88%D8%B1%D9%83%D8%A7%D9%8A%D9%85">إميل دوركايم</a>"، و«راد كلف براون»، و"<a href="https://ar.wikipedia.org/wiki/%D9%85%D8%A7%D9%84%D9%8A%D9%86%D9%88%D9%81%D8%B3%D9%83%D9%8A_(%D8%AA%D9%88%D8%B6%D9%8A%D8%AD)">مالينوفسكي</a>"، و«ألبوث سميث»، و«رفرز». كما ظهرت مدارس أنثروبولوجية هامّة مثل (مدرسة الانتشار الحضاري) و (<a href="https://ar.wikipedia.org/wiki/%D9%85%D8%AF%D8%B1%D8%B3%D8%A9_%D9%88%D8%B8%D9%8A%D9%81%D9%8A%D8%A9_(%D8%B9%D9%84%D9%85_%D8%A7%D9%84%D9%86%D9%81%D8%B3)">المدرسة الوظيفية</a>). وكلاهما هاجمتا ودحضتا «المدرسة التطورية»، هذا إلى جانب «المدرسة البيئية»، وهي مدرسة قديمة مستمرة الوجود.</p><p style="text-align:right;">إننا نستطيع أن نعتبرَ نقطة البدء الحقيقية للأنثروبولوجيا هي القرن العشرين، التي تمثلت بظهور أسماء ضخمة من عباقرة الأنثروبولوجيا، إضافة إلى مؤلفاتهم في ذلك الشأن. ناهيكَ عن المدارس الانثروبولوجية المهمة التي ساعدت في نمو وتطوير هذا العلم.</p><p style="text-align:right;">ثمة قضية معينة هنا، وهي أن علم الاجتماع والأنثروبولوجيا علمان متقاربان متشابهان، بحيث لا يمكن للباحث الفصل أو التمييز بين هذين العلمين. لدرجة تقاربهما، لذلكَ فإن من الأنسب تعيين نقاط الاختلاف بين هذين العلمين لمعرفة اتجاه كل من هذين العلمين في الدراسات الاجتماعية.</p><h2 style="text-align:right;">علاقة علم الاجتماع بالأنثروبولوجيا (علم الإنسان)<span style="color:rgb(84,89,93);">[</span><a href="https://ar.wikipedia.org/w/index.php?title=%D8%B9%D9%84%D9%85_%D8%A7%D9%84%D8%A5%D9%86%D8%B3%D8%A7%D9%86&amp;action=edit&amp;section=11">عدل</a><span style="color:rgb(84,89,93);">]</span></h2><p style="text-align:right;">علمُ الاجتماع هو علمٌ قريبٌ جداً من الأنثروبولوجيا لأنهُ يدرس العلاقات الاجتماعية بين المجموعات البشرية، ولكنهُ يختلفُ عن الأنثروبولوجيا من بعض النواح: إن علمَ الاجتماع يركز في دراساتهِ على موضوعاتٍ مختارة مثل السحر أو الدين أو البطالة أو الزواج أو ما يشبه ذلك، ولا يدرس مجتمعات كاملة دراسة شاملة كما تدرسها الأنثروبولوجيا.</p><h2 style="text-align:right;">فروع علم الإنسان<span style="color:rgb(84,89,93);">[</span><a href="https://ar.wikipedia.org/w/index.php?title=%D8%B9%D9%84%D9%85_%D8%A7%D9%84%D8%A5%D9%86%D8%B3%D8%A7%D9%86&amp;action=edit&amp;section=12">عدل</a><span style="color:rgb(84,89,93);">]</span></h2><ul><li style="text-align:right;"><a href="https://ar.wikipedia.org/wiki/%D8%B9%D9%84%D9%85_%D8%A7%D9%84%D8%A5%D9%86%D8%B3%D8%A7%D9%86_%D8%A7%D9%84%D8%AB%D9%82%D8%A7%D9%81%D9%8A">علم الإنسان الثقافي</a></li><li style="text-align:right;"><a href="https://ar.wikipedia.org/wiki/%D8%B9%D9%84%D9%85_%D8%A7%D9%84%D8%A5%D9%86%D8%B3%D8%A7%D9%86_%D8%A7%D9%84%D8%AD%D9%8A%D9%88%D9%8A">علم الإنسان الحيوي</a></li><li style="text-align:right;"><a href="https://ar.wikipedia.org/wiki/%D8%B9%D9%84%D9%85_%D8%A7%D9%84%D8%A5%D9%86%D8%B3%D8%A7%D9%86_%D8%A7%D9%84%D8%A7%D8%AC%D8%AA%D9%85%D8%A7%D8%B9%D9%8A">علم الإنسان الاجتماعي</a></li><li style="text-align:right;"><a href="https://ar.wikipedia.org/wiki/%D9%84%D8%B3%D8%A7%D9%86%D9%8A%D8%A7%D8%AA">علم الإنسان اللغوي</a></li><li style="text-align:right;"><a href="https://ar.wikipedia.org/wiki/%D8%B9%D9%84%D9%85_%D8%A7%D9%84%D8%A2%D8%AB%D8%A7%D8%B1">علم الآثار</a></li></ul><figure class="image"><img style="aspect-ratio:600/400;" src="https://anthropologyca.onrender.com/api/v1/posts/post-image/b181b918c5932af7c613ebbbb36072981702309049865.jpg" width="600" height="400"></figure>',
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
    ClassicEditor.create(document.querySelector("#editor"), {
      language: {
        // The UI will be English.
        ui: "ar",

        // But the content will be edited in Arabic.
        content: "ar",
      },
    })
      .then((editor) => {
        window.editor = editor;
      })
      .catch((err) => {
        console.error(err.stack);
      });
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
                setTimeout(() => {
                  router.push({
                    path: "/gestionArticles",
                  });
                }, 5000);
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
    getData() {
      console.log(this.post);
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
.ck.ck-editor__editable_inline {
  direction: rtl;
  text-align: right;
}
</style>
