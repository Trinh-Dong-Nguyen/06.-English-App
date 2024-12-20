/* eslint-disable @typescript-eslint/no-explicit-any */
// src/configs/froala.config.ts
// import { clientInstance } from '~/services/axios'
// import blogEndpoint from '~/services/axios/endpoints/blog.endpoint'

export interface FroalaEvents {
  initialized: any
  "image.beforeUpload": (images: FileList) => Promise<void>
  // 'image.uploaded': (response: string) => boolean;
  "image.inserted": ($img: any, response: any) => void
  "image.replaced": ($img: any, response: any) => void
  "image.error": (error: any, response: any) => void
  "image.removed": ($img: any, response: any) => void
}

function generateFroalaConfig() {
  const events: FroalaEvents = {
    "image.beforeUpload": async function () {},
    // 'image.uploaded': function(response) {
    //     console.log('response: ', response)
    //     const json = JSON.parse(response)
    //     const imgUrl = json.picture_url
    //     this['image'].insert(
    //         imgUrl,
    //         false,
    //         { style: '' },
    //         this['image'].get(),
    //         response,
    //     )
    //     return false
    // },
    "image.inserted": async function () {},
    "image.replaced": function () {},
    "image.error": function () {},
    "image.removed": async function () {},
    initialized: undefined,
  }

  return {
    placeholderText: "Edit Your Content Here!",
    toolbarButtons: [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "|",
      "fontFamily",
      "fontSize",
      "color",
      "|",
      "paragraphFormat",
      "paragraphStyle",
      "|",
      "align",
      "formatOL",
      "formatUL",
      "outdent",
      "indent",
      "|",
      "insertLink",
      "insertImage",
      "|",
      "undo",
      "redo",
      "clearFormatting",
      "selectAll",
    ],
    toolbarSticky: false,
    theme: "gray",
    heightMin: 300,
    heightMax: 600,
    imageMaxSize: 0.5 * 1024 * 1024,
    imageAllowedTypes: ["jpeg", "jpg", "png", "webp"],
    events,
    quickInsertTags: [],
  }
}

export default generateFroalaConfig
