'use client'
import { DEBUG_NO_BACKEND } from "@/app/Global/self_setting";
import 'katex/dist/katex.css';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { quill_modules } from "@/app/Global/quill_utils";
import { useState, useEffect } from "react";
import { Button, UploadFile, Upload, UploadProps, List } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { UploadSolutionMessage } from "./UploadSolutionMessage";
import { SERVER_ROOT_URL } from "@/app/Global/url";
import { HTMLComponent } from "../../../Global/problem_components";
import { problemQueryIDFetch } from "@/components/problems/fetch_function/problemQueryID";
import { Result } from "postcss";
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

const defaultSolutionText = ''
export default function Page({ params }: { params: { problemID: string } }) {
  
  const problemID = params.problemID
  const [fileList, setFileList] = useState<UploadFile[]>(fileList_default);
  const [solutionText, setSolutionText] = useState<string>(defaultSolutionText)
  const [problemText, setProblemText] = useState<string>('');
  const [has_images, setHasImages] = useState<boolean>(false)
  const [images, setImages] = useState<JSX.Element[]>([])

  const handleSolutionTextChange = (value: string) => {
    setSolutionText(value)
    console.log(value)
  }
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleUpload = () => {
    console.log(new UploadSolutionMessage(problemID, solutionText, fileList))
    if (DEBUG_NO_BACKEND){
        alert("上传题解成功")
        setFileList(fileList_default)
        setSolutionText(defaultSolutionText)
        return
    }
    fetch(SERVER_ROOT_URL + 'uploadProblem',{
      method: "POST", 
      headers: {"Content-Type":"text/plain"},
      body: JSON.stringify(new UploadSolutionMessage(
        problemID, solutionText, fileList
      ))
    }).then(response => response.json()).then(replyJson => {
      console.log(replyJson)
      if (replyJson.status === 200) {
        alert("上传题目成功！")
        setFileList(fileList_default)
        setSolutionText(defaultSolutionText)
      } else {
          alert(replyJson.message) //以后改一个状态条，优雅一点
      }
    }).catch((e) => console.log(e))
  }

  

  useEffect(() => {
      fetchData();
    }, []);
  const fetchData = () => {
    const result = problemQueryIDFetch({problemID})
    setProblemText(result.problemText)
    setHasImages(result.has_images)
    setImages(result.images)
  }
  
    return <>
    <h1>上传题解</h1>
    <h2>题目ID</h2> 
    {problemID}
    <h2>题目内容</h2>
    <HTMLComponent htmlString={problemText}></HTMLComponent>
    {has_images && <List dataSource={images} renderItem={(item)=>item}></List>}
    <h2>输入题解</h2>
    <p>说明：公式仅支持 Latex 输入</p>
    <p>维护说明：1.加一下暂存</p>
    <ReactQuill theme="snow" modules={quill_modules} value={solutionText} onChange={handleSolutionTextChange} />
    <h2>题解图片</h2>
    <Upload
      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
      listType="picture"
      defaultFileList={[...fileList]}
      onChange={handleChange}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <Button onClick={handleUpload}> 确认上传题解 </Button>
    </>
  }
