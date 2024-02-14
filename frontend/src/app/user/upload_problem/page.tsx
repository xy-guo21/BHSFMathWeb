'use client'
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Upload, Select, Radio } from 'antd';
import { useState } from 'react';
import { DEBUG_NO_BACKEND } from '@/app/Global/self_setting';
import { SERVER_ROOT_URL } from '@/app/Global/url';
import { PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { quill_modules } from '@/app/Global/quill_utils';
import { useRouter } from 'next/navigation';
import { UploadProblemMessage } from './UploadProblemMessage';
import { RcFile } from 'antd/es/upload';
import 'katex/dist/katex.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { difficultyOptions, sourceOptions } from '@/app/Global/problem_related';

let fileList_default: UploadFile[] = []

if (DEBUG_NO_BACKEND){
    fileList_default = [
        {
          uid: '0',
          name: 'xxx.png',
          status: 'uploading',
          percent: 33,
        },
        {
          uid: '-1',
          name: 'yyy.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'zzz.png',
          status: 'error',
        },
      ];

}
const init_source = ''
const init_difficulty = -1
const init_problem_text = ''

const App: React.FC = () => {
  const router = useRouter();
  const [fileList, setFileList] = useState<UploadFile[]>(fileList_default);
  const [source, setSource] = useState<string>(init_source)
  const [difficulty, setDifficulty] = useState<number>(init_difficulty);
  const [problemText, setProblemText] = useState<string>(init_problem_text);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleProblemTextChange = (value: string) => {
    setProblemText(value)
    console.log(value)
  }
  // <QuillInput onChangeFunc={handleProblemTextChange}/>
  const handleUpload = () => {
    if (source === init_source){
      alert("请选择题源")
      return
    }
    if (difficulty === init_difficulty){
      alert("请选择难度")
    }
    console.log(new UploadProblemMessage(
      source, difficulty, problemText, fileList
    ))
    if(DEBUG_NO_BACKEND){
      alert("上传题目成功！")
      setSource(init_source)
      setDifficulty(init_difficulty)
      setProblemText(init_problem_text)
      setFileList(fileList_default)
      return
    }
    fetch(SERVER_ROOT_URL + 'uploadProblem',{
      method: "POST", 
      headers: {"Content-Type":"text/plain"},
      body: JSON.stringify(new UploadProblemMessage(
        source, difficulty, problemText, fileList
      ))
    }).then(response => response.json()).then(replyJson => {
      console.log(replyJson)
      if (replyJson.status === 200) {
          alert("上传题目成功！")
          setSource(init_source)
          setDifficulty(init_difficulty)
          setProblemText(init_problem_text)
          setFileList(fileList_default)
      } else {
          alert(replyJson.message) //以后改一个状态条，优雅一点
      }
    }).catch((e) => console.log(e))
  }
  return (
    <div>
      <Button onClick={()=>{router.push('/user')}}>个人中心</Button>
      <Button onClick={()=>{router.push('/home')}}>首页</Button>
      <h1>上传题目</h1>
      <h2>选择难度</h2>
      <Radio.Group value={difficulty} buttonStyle="solid" options={difficultyOptions} onChange={(e)=>{setDifficulty(e.target.value)}}>
      </Radio.Group>
      <h2>选择题源</h2>
      <Select
        value={source}
        style={{ width: 120 }}
        onChange={(v: string)=>{setSource(v)}}
        options={sourceOptions}
      />
      <h2>题目文字</h2>
      <p>说明：公式仅支持 Latex 输入</p>
      <p>维护说明：1.加一下暂存</p>
      <ReactQuill theme="snow" modules={quill_modules} value={problemText} onChange={handleProblemTextChange} />
      <h2>题目图片</h2>
      <Upload
      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
      listType="picture"
      defaultFileList={[...fileList]}
      onChange={handleChange}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <Button onClick={handleUpload}> 确认上传题目 </Button>
    </div>
  );
};

export default App;