'use client'

const quill_modules = {
    toolbar: {container: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['clean'],
      ["formula"]
    ],
    handlers: {},
    }
  }

export {quill_modules};
