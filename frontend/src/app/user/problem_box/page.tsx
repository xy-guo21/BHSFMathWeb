'use client'
import { DisplayProblemItem, ProblemItem } from "../../Global/ProblemItem";
import { List, Button, Checkbox, Input } from "antd";
import { UploadProblemMessage } from "../upload_problem/UploadProblemMessage";
import { useRouter } from "next/navigation";
import 'katex/dist/katex.css';
import { DEBUG_NO_BACKEND } from "@/app/Global/self_setting";
import { SERVER_ROOT_URL } from "@/app/Global/url";
import { RemoveFromProblemBoxMessage } from "./RemoveFromProblemBoxMessage";
import { useState } from "react";
import { useEffect } from "react";
import { problemIDs_debug } from "../../Global/ProblemItem";
import { CheckboxProps } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {Form, 
    Cascader,
    DatePicker,
    InputNumber,
    Mentions,
    Select,
    TreeSelect,} from "antd";
import { json } from "stream/consumers";
import { ConstructPaperMessage } from "./ConstructPaperMessage";
import { allowedNodeEnvironmentFlags } from "process";
// let problemIDs_debug = ['0', '1']

const { RangePicker } = DatePicker;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
let problemIDs_default: string[] = []

const ProblemBoxPage: React.FC = () => {
    const router = useRouter()
    const [problemIDs, setProblemIDs] = useState<string[]>(problemIDs_default)
    const [selectedProblemIDs, setSelectedProblemIDs] = useState<string[]>([])
    const [paperTitle, setPaperTitle] = useState<string>()
    const [paperDescription, setPaperDesciption] = useState<string>('')
    useEffect(() => {
        fetchData();
      }, []);
    const fetchData = ()=>{
        if (DEBUG_NO_BACKEND){
            setProblemIDs(problemIDs_debug)
        }
        else{
            fetch(SERVER_ROOT_URL+'queryProblemBox', {
                method: "GET",
                headers: {"Content-Type": "text/plain"}
            }).then(response=>response.json()).then(response =>{
                if (response.status === 200){
                    setProblemIDs(response.problemIDs)
                    console.log(response.problemIDs)
                } else {
                    alert(response.message)
                }
            })
        }
    }
    const removeOnclick = (removeProblemID: string) => {
        if (DEBUG_NO_BACKEND){ 
            setProblemIDs(problemIDs.filter((id)=>(id !== removeProblemID)))
            console.log(problemIDs.filter((id)=>(id !== removeProblemID)))
            alert("从试题篮中移除试题" + removeProblemID + "成功")
            
        } else {
            fetch(SERVER_ROOT_URL + 'removeFromProblemBox', {
                method: "POST",
                headers: {"Content-Type": "text/plain"},
                body: JSON.stringify(new RemoveFromProblemBoxMessage(removeProblemID))
            }).then(response => response.json()).then(replyJson => {
                if (replyJson.status == 200){
                    // 只改前端即可；可能的 failure case：某个在试题篮中的题目被删了
                    setProblemIDs(problemIDs.filter((id)=>(id !== removeProblemID)))
                    alert("从试题篮中移除试题" + removeProblemID + "成功")
                } else {
                    alert(replyJson.message)
                }
            }
            ).catch(e => {console.log(e)})
        }
    }

    const checkboxOnChange = (e: CheckboxChangeEvent, problemID: string) => {
        // console.log(e.target)
        console.log(`checked = ${e.target.checked}`);
        console.log(`problemID = ${problemID}`)
        if (e.target.checked){
            setSelectedProblemIDs([...selectedProblemIDs, problemID])
        } else {
            setSelectedProblemIDs(selectedProblemIDs.filter((id)=>(id!==problemID)))
        }
    };

    const paperTextOnFinish = (values: any) => {
        setPaperTitle(values.title)
        setPaperDesciption(values.description)
    }

    const constructPaperOnClick = ()=>{
        // 需要加一些 check
        if (paperTitle === undefined){
            alert("请输入试卷标题！")
            return
        }
        if (DEBUG_NO_BACKEND){
            alert("组卷成功")
            return
        }
        fetch(SERVER_ROOT_URL + '', {
            method: "POST",
            headers: {"Content-Type": "text/plain"},
            body: JSON.stringify(new ConstructPaperMessage(selectedProblemIDs, paperTitle, paperDescription))
        }).then(Response=>Response.json()).then(replyJson =>{
            if (replyJson.status === 200){
                alert("组卷成功")
            } else {
                alert(replyJson.message)
            }
        })
    }
    
    return <div>
        <h1>我的试题篮</h1>
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {console.log(page);},
                pageSize: 3,
            }}
            dataSource={problemIDs}
            renderItem={(problemID) => (
            <DisplayProblemItem  problemID={problemID} opt={
                <>
                <Button onClick={()=>{router.push('/problem/' + problemID)}}>查看详情</Button>
                <Button onClick={()=>removeOnclick(problemID)}>从试题篮中删除</Button>
                <Checkbox onChange={(e) => {checkboxOnChange(e, problemID)}}></Checkbox>
                </>
            }/>
            )}
        />
        <></>
        <Form {...formItemLayout} onFinish={paperTextOnFinish} variant="filled" style={{ maxWidth: 600 }}>
            <Form.Item name="title" label="试卷名称" rules={[{ required: true, message: '请输入试卷名称' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="description"
                label="试卷简介"
                rules={[{message: 'Please input!' }]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit" onClick={constructPaperOnClick}>
                用选中的题目组卷
                </Button>
            </Form.Item>
        </Form>
    </div>
}
export default ProblemBoxPage