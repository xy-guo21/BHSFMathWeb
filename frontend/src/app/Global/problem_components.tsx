import React from "react";
import { BlockMath } from 'react-katex';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import 'katex/dist/katex.min.css';
import { useEffect, useRef } from 'react';
import { Space } from "antd";

interface HTMLComponentProps {
    htmlString: string;
}

class HTMLComponent extends React.Component<HTMLComponentProps> {
    render() {
      return (
        <div dangerouslySetInnerHTML={{ __html: this.props.htmlString }} />
      );
    }
  }


const test_text = "aaa$\\frac{a}{b}\\epsilon$"
export default function KatexSpan({ text, ...delegated }) {
  const katexTextRef = useRef();
  useEffect(() => {
    if (katexTextRef.current) {
      renderMathInElement(katexTextRef.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
      });
    }
  }, [text]);

  return (
    <>
      <h2>预览</h2>
      <Space>
        <div ref={katexTextRef} {...delegated}>
          {text}
        </div>
      </Space>
    </>
  );
}
export {HTMLComponent, KatexSpan}