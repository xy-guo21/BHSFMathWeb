'use client'
import { Component } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import 'katex/dist/katex.css';
import { quill_modules } from "@/app/Global/quill_utils";
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    }
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean'], 
      ['formula']
    ],
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    //  'formula'
  ]

  render() {
    return (
      <div className="text-editor">
        <ReactQuill theme="snow"
                    modules={quill_modules}
                    // formats={this.formats}
                    >
        </ReactQuill>
      </div>
    );
  }
}

export default MyComponent;