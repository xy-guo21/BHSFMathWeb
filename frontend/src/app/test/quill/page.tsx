'use client'
import React, { useEffect, useState } from 'react';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import Quill styles
import dynamic from "next/dynamic";
import { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const EditorComponent = () => {
	useEffect(()=>{
		window.katex = katex
	}, [])
	const [editorHtml, setEditorHtml] = useState('');
	const ReactQuill = useMemo(
		() => dynamic(() => import("react-quill"), { ssr: false }),
		[]
	);
	const modules = {
	  toolbar: {
		container: [
		  [{ 'formula': 'Formula' }], // Include formula button in the toolbar
		  ['bold', 'italic', 'underline', 'strike'], // other toolbar options
		  ['link', 'image'],
		  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
		  [{ 'indent': '-1'}, { 'indent': '+1' }],
		  [{ 'color': [] }, { 'background': [] }],
		  ['clean']
		],
	  },
	  formula: true, // enable formula module
	};
  
	const formats = [
	  'bold', 'italic', 'underline', 'strike',
	  'link', 'image',
	  'list', 'bullet',
	  'indent',
	  'color', 'background',
	];
  
	const handleEditorChange = (html) => {
	  setEditorHtml(html);
	};
  
	return (
	  <div>
		<ReactQuill
		  theme="snow"
		  value={editorHtml}
		  onChange={handleEditorChange}
		  modules={modules}
		  formats={formats}
		/>
	  </div>
	);
  };
  
  export default EditorComponent;


