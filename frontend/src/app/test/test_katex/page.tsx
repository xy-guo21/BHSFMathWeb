// 'use client'
// import React from 'react';
// import 'katex/dist/katex.min.css';
// import { BlockMath } from 'react-katex';

// function LaTeXComponent() {
//   return (
//     <div>
//       <p>Here is an equation rendered using LaTeX:</p>
//       <BlockMath math={"a_2"} />
//     </div>
//   );
// }

// export default LaTeXComponent;

// import React, { useEffect, useRef } from 'react';

// function RenderHTMLWithMathJax({ htmlWithMath }) {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
//     script.onload = () => {
//       const mathJaxScript = document.createElement('script');
//       mathJaxScript.type = 'text/javascript';
//       mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
//       mathJaxScript.onload = () => {
//         window.MathJax.typeset();
//       };
//       document.head.appendChild(mathJaxScript);
//     };
//     document.head.appendChild(script);
//   }, [htmlWithMath]);

//   return (
//     <div ref={containerRef} dangerouslySetInnerHTML={{ __html: htmlWithMath }} />
//   );
// }

// function App() {
//   const htmlWithMath = `<div>aaa<span>$$a_2$$</span>aaaa</div>`;
  
//   return (
//     <div className="App">
//       <RenderHTMLWithMathJax htmlWithMath={htmlWithMath} />
//     </div>
//   );
// }

// export default App;

'use client';
import renderMathInElement from 'katex/dist/contrib/auto-render';
import 'katex/dist/katex.min.css';
import { useEffect, useRef } from 'react';

const text = "aaa$\\frac{a}{b}\\epsilon$"
export default function KatexSpan({ ...delegated }) {
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
    <div ref={katexTextRef} {...delegated}>
      {text}
    </div>
  );
}

