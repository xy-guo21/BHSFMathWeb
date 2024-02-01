'use client'
import React from 'react';
import { Button, Flex } from 'antd';
import { APIUrl } from '../../../public/GlobalVariables';
import Link from 'next/link'

const Home = () => {
  return (
    <ul>
      <li>
        <Link href="/">
          Global Home
        </Link>
      </li>
      <li>
        <Link href="/about">
          About Us
        </Link>
      </li>
      <li>
        <Link href="/blog/hello-world">
          Blog Post
        </Link>
      </li>
      <li>
        <Link href="/home">
          my home page
        </Link>
      </li>
    </ul>
  )
}
export default Home;
// const App: React.FC = () => {
//   // return <p></p>
//   return <>
//     <Button onClick={
//       () =>{
//         console.log("pressing button");
//         fetch(APIUrl, {
//           method: "POST",
//           mode: "no-cors", 
//           headers: {"Content-Type":"text/plain"},
//           body: JSON.stringify("hello, world")
//         }).then((response) => response.json()).then((replyJson)=>{
//           console.log(replyJson)
//         }).catch((e) => console.log(e))
//       }
//     }></Button>
//   </>
// }
// const App: React.FC = () => {
//     return <>
//     <h1>Test Login Page</h1>
//     <Flex gap="small" wrap="wrap">
//     <Button type="primary">Primary Button</Button>
//     <Button>Default Button</Button>
//     <Button type="dashed">Dashed Button</Button>
//     <Button type="text">Text Button</Button>
//     <Button type="link">Link Button</Button>
//   </Flex>
//     </>
// }

// export default App;
// import React, { useState } from 'react';
// import { DownloadOutlined } from '@ant-design/icons';
// import { Button, Divider, Flex, Radio } from 'antd';
// import type { ConfigProviderProps } from 'antd';

// type SizeType = ConfigProviderProps['componentSize'];

// const App: React.FC = () => {
//   const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
//   return (
//     <>
//       <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
//         <Radio.Button value="large">Large</Radio.Button>
//         <Radio.Button value="default">Default</Radio.Button>
//         <Radio.Button value="small">Small</Radio.Button>
//       </Radio.Group>
//       <Divider orientation="left" plain>
//         Preview
//       </Divider>
//       <Flex gap="small" align="flex-start" vertical>
//         <Flex gap="small" wrap="wrap">
//           <Button type="primary" size={size}>
//             Primary
//           </Button>
//           <Button size={size}>Default</Button>
//           <Button type="dashed" size={size}>
//             Dashed
//           </Button>
//         </Flex>
//         <Button type="link" size={size}>
//           Link
//         </Button>
//         <Flex gap="small" wrap="wrap">
//           <Button type="primary" icon={<DownloadOutlined />} size={size} />
//           <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size} />
//           <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
//           <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
//             Download
//           </Button>
//           <Button type="primary" icon={<DownloadOutlined />} size={size}>
//             Download
//           </Button>
//         </Flex>
//       </Flex>
//     </>
//   );
// };

// export default App;

