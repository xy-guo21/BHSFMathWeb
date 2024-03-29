'use client'

import { useEffect, useState } from "react"
import { PaperItem } from "../../../../../public/components/paper/PaperItem"
import { paperQueryIDFetch } from "../../../../../public/components/paper/fetch_function/queryPaperID"
import { DisplayPaperItem } from "../../../../../public/components/paper/ui"
import { Button, Divider, Input } from "antd"
import { ExtraInfoForm, PaperExtraInfoItem } from "../../../../../public/components/paper/extra_info_form"
import { useAsyncError } from "react-router-dom"
import { DEBUG_NO_BACKEND } from "@/app/Global/self_setting"


import { Tabs, List } from 'antd';
import type { TabsProps } from 'antd';
import { SERVER_ROOT_URL } from "@/app/Global/url"
import { EditPaperExtraInfoMessage } from "./EditPaperExtraInfo"
import { DisplayProblemListItem } from "../../../../../public/components/problem/DisplayProblemItem"
import { DeleteProblemFromPaperMessage } from "./DeleteProblemFromPaper"
import { AddProblemToPaperMessage } from "./AddProblemToPaper"


export default function EditPaperPage({ params }: { params: { paperID: string } }){
    const paperID = params.paperID
    const [paper, setPaper] = useState<PaperItem>()
    const [refreshPage, setRefreshPage] = useState<boolean>(false)
    useEffect(() =>{
        console.log("refresh")
        const result_p = paperQueryIDFetch({paperID})
        setPaper(result_p)
    }, [refreshPage])

    const [newPaperName, setNewPaperName] = useState<string>()
    const [newPaperDescription, setNewPaperDescription] = useState<string>()
    const [newProblemBase, setNewProblemBase] = useState<string>()

    const checkEmptyString = (inputs: string|undefined) =>{
        if (inputs === undefined || inputs === ""){
            return false
        } else {
            return true
        }
    }
    const uploadEditPaperExtraInfo = (paperExtraInfo: PaperExtraInfoItem)=>{
        setNewPaperName(paperExtraInfo.paperName)
        setNewPaperDescription(paperExtraInfo.description)
        setNewProblemBase(paperExtraInfo.problemBase)
        if (checkEmptyString(newPaperName) === false){
            alert("试卷名不能为空")
            return 
        }
        if (checkEmptyString(newPaperDescription) === false){
            alert("试卷描述不能为空")
            return
        }
        if (checkEmptyString(newProblemBase) === false){
            alert("试卷所属题库不能为空")
            return
        }
        if (DEBUG_NO_BACKEND){
            alert("修改题目信息成功")
            
        } else {
            fetch(SERVER_ROOT_URL + 'editPaperExtraInfo',{
                method: "POST", 
                headers: {"Content-Type":"text/plain"},
                body: JSON.stringify(new EditPaperExtraInfoMessage(paperID, newPaperName, newPaperDescription, newProblemBase))}
                ).then(response => response.json()).then(replyJson => {
                    console.log(replyJson)
                    if (replyJson.status === 200) {
                        alert("修改试卷信息成功！")
                    } else {
                        alert(replyJson.message) //以后改一个状态条，优雅一点
                    }
                  }).catch((e) => console.log(e))
        }
        setRefreshPage(prevState => !prevState)
    }

    const deleteProblemFromPaper = (problemID: string)=>{
        new DeleteProblemFromPaperInfoMessage(paperID, problemID)
        if (DEBUG_NO_BACKEND){
            alert("从试卷中删除试题成功")
        } else {
            fetch(SERVER_ROOT_URL + 'deleteProblemFromPaper',{
                method: "POST", 
                headers: {"Content-Type":"text/plain"},
                body: JSON.stringify(new DeleteProblemFromPaperMessage(paperID, problemID))
              }).then(response => response.json()).then(replyJson => {
                console.log(replyJson)
                if (replyJson.status === 200) {
                    alert("从试卷中删除试题成功")
                } else {
                    alert(replyJson.message) //以后改一个状态条，优雅一点
                }
              }).catch((e) => console.log(e))
        }
        setRefreshPage(prevState => !prevState)
    }

    const [newProblemID, setNewProblemID] = useState<string>()
    const addProblemToPaper = () =>{
        if (checkEmptyString(newProblemID) == false){
            alert("题目ID不能为空")
            return
        }
        if (DEBUG_NO_BACKEND){
            alert("添加题目成功")
        } else {
            fetch(SERVER_ROOT_URL + 'addProblemToPaper',{
                method: "POST", 
                headers: {"Content-Type":"text/plain"},
                body: JSON.stringify(new AddProblemToPaperMessage(paperID, newProblemID))
              }).then(response => response.json()).then(replyJson => {
                console.log(replyJson)
                if (replyJson.status === 200) {
                    alert("添加题目到试卷成功！")
                } else {
                    alert(replyJson.message) //以后改一个状态条，优雅一点
                }
              }).catch((e) => console.log(e))
        }
        setRefreshPage(prevState => !prevState)
    }

    const [tabKey, setTabkey] = useState<string>('1')
    const tabOnChange = (key: string) => {
        setTabkey(key)
    }

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: '修改试卷信息',
        },
        {
          key: '2',
          label: '修改试卷题目',
        }
      ];
    
    return <>
        <h1>编辑试卷页</h1>
        {paper ? 
        <>
            {/* <Divider>原试卷内容</Divider>
            <DisplayPaperItem paper_={paper}/>
            <Divider>修改试卷</Divider> */}
            <Tabs defaultActiveKey="1" items={items} onChange={tabOnChange}/>
            {tabKey == '1' &&
            <ExtraInfoForm 
                initPaperTitle={paper.paperName}
                initPaperDescription={paper.description}
                initProblemBase={paper.problemBase}
                editPaperExtraInfo={uploadEditPaperExtraInfo}
            />}
            {tabKey == '2' &&
            <>
                <Divider>删除题目</Divider>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {console.log(page);},
                        pageSize: 3,
                    }}
                    dataSource={paper.problemIDs}
                    renderItem={(problemID) => (
                    <DisplayProblemListItem problemID={problemID} opt={
                    <Button onClick={() =>{deleteProblemFromPaper(problemID)}}>从试卷中删除此题</Button>
                    }/>
                    )}
                />
                <Divider>添加题目</Divider>
                <Input 
                    value={newProblemID} 
                    onChange={(e)=>{setNewProblemID(e.target.value)}}
                    placeholder="请输入要添加的题目ID"
                />
                <Button onClick={addProblemToPaper}>确认添加</Button>
            </>
            }
        </>: <></>}
    </>
}