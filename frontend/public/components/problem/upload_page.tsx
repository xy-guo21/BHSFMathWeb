'use client'
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Upload, Select, Radio, Input } from 'antd';
import { useState } from 'react';
import { DEBUG_NO_BACKEND } from '@/app/Global/self_setting';
import { SERVER_ROOT_URL } from '@/app/Global/url';
import { PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { useRouter } from 'next/navigation';
import { UploadProblemMessage } from '@/app/user/upload_problem/UploadProblemMessage';
import 'katex/dist/katex.css';
import 'react-quill/dist/quill.snow.css';
import { difficultyOptions, problemBaseOptions, sourceOptions } from '@/app/Global/problem_related';
import {KatexSpan} from '@/app/Global/problem_components';
import { EditProblemMessage } from '@/app/user/edit_problem/[problemID]/EditProblemMessage';
import { UserTokenStore } from '../../UserTokenStore';

const {TextArea} = Input
const fileList_debug = [
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

const init_fileList: UploadFile[] = []
const init_source = ''
const init_difficulty = -1
const init_problem_text = ''
const init_problem_base = ''


const UploadProblemForm = (params: {
  difficulty: number, source: string, problemBase: string, 
  problemText: string, fileList?: UploadFile[], problemID?: string, 
  refreshPage?: ()=>void})=>{
  const [fileList, setFileList] = useState<UploadFile[]>(params.fileList? params.fileList: []);
  const [problemBase, setProblemBase] = useState<string>(params.problemBase)
  const [source, setSource] = useState<string>(params.source)
  const [difficulty, setDifficulty] = useState<number>(params.difficulty);
  const [problemText, setProblemText] = useState<string>(params.problemText);

  const handleChange: UploadProps['onChange'] = ({file: newFile, fileList: newFileList }) =>{
    setFileList(newFileList), 
    () => {
      console.log("newFileList", newFileList);
      console.log("id?", newFileList.map((ele)=>(ele.response.file_id)))
    }
  }
  const handleProblemTextChange = (value: string) => {
    setProblemText(value)
    console.log(value)
  }
  // <QuillInput onChangeFunc={handleProblemTextChange}/>
  const resetInput = () =>{
    setSource(init_source)
    setDifficulty(init_difficulty)
    setProblemText(init_problem_text)
    setProblemBase(init_problem_base)
    setFileList(init_fileList)
  }
  const handleUpload = () => {
    if (source === init_source){
      alert("请选择题源")
      return
    }
    if (difficulty === init_difficulty){
      alert("请选择难度")
      return
    }
    if (problemBase === init_problem_base){
      alert("请选择试卷所属题库")
      return
    }
    if (params.problemID === undefined){
      console.log(new UploadProblemMessage(
        UserTokenStore.getState().userToken, source, difficulty, problemBase, problemText, fileList
      ))
      if(DEBUG_NO_BACKEND){
        alert("上传题目成功！")
        resetInput()
        return
      }
      fetch(SERVER_ROOT_URL + 'uploadProblem/',{
        method: "POST", 
        headers: {"Content-Type":"text/plain"},
        body: JSON.stringify(new UploadProblemMessage(
          UserTokenStore.getState().userToken, source, difficulty, problemBase, problemText, fileList
        ))
      }).then(response => response.json()).then(replyJson => {
        console.log(replyJson)
        if (replyJson.status === 200) {
            alert("上传题目成功！")
            resetInput()
        } else {
            alert(replyJson.message) //以后改一个状态条，优雅一点
        }
      }).catch((e) => console.log(e))
    } else {
      if (DEBUG_NO_BACKEND){
        alert("修改题目成功！")
        params.refreshPage? params.refreshPage() : {}
        return
      }
      fetch(SERVER_ROOT_URL + 'editProblem',{
        method: "POST", 
        headers: {"Content-Type":"text/plain"},
        body: JSON.stringify(new EditProblemMessage(
          params.problemID, source, difficulty, problemBase, problemText, fileList
        ))
      }).then(response => response.json()).then(replyJson => {
        console.log(replyJson)
        if (replyJson.status === 200) {
            alert("修改题目成功！")
            resetInput()
        } else {
            alert(replyJson.message) //以后改一个状态条，优雅一点
        }
      }).catch((e) => console.log(e))
    }
  }
  return <>
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
      <h2>选择题库</h2>
      <Select 
        value={problemBase}
        style={{ width: 120 }}
        onChange={(v: string)=>{setProblemBase(v)}}
        options={problemBaseOptions}
      />
      <h2>题目文字</h2>
      <p>说明：公式仅支持 Latex 输入</p>
      <p>维护说明：1.加一下暂存 2.处理一下换行的显示</p>
      <TextArea 
        rows={5}
        value={problemText}
        onChange={(e)=>{handleProblemTextChange(e.target.value)}}
      />
      <KatexSpan text={problemText}/>
      <h2>题目图片</h2>
      <Upload
      // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
      action={SERVER_ROOT_URL + 'uploadFile/'}
      listType="picture"
      defaultFileList={[...fileList]}
      onChange={handleChange}
      >
        <Button icon={<UploadOutlined />}>上传图片</Button>
      </Upload>
      {params.problemID ? <Button onClick={handleUpload}> 确认修改题目 </Button>: <Button onClick={handleUpload}> 确认上传题目 </Button>}
    </>
}
const UploadProblemPage: React.FC = () => {
//   const router = useRouter()
  return (
    <div>
      <h1>上传题目</h1>
      <UploadProblemForm 
        difficulty={init_difficulty}
        source={init_source}
        problemBase={init_problem_base}
        problemText={init_problem_text}
      />
    </div>
  );
};


export default UploadProblemPage;

export {UploadProblemForm, init_difficulty, init_problem_base, init_problem_text, init_source, fileList_debug}