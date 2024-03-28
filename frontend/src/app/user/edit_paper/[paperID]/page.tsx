'use client'

import { useEffect, useState } from "react"
import { PaperItem } from "../../../../../public/components/paper/PaperItem"
import { paperQueryIDFetch } from "../../../../../public/components/paper/fetch_function/queryPaperID"
import { DisplayPaperItem } from "../../../../../public/components/paper/ui"
import { Divider } from "antd"
import { ExtraInfoForm, PaperExtraInfoItem } from "../../../../../public/components/paper/extra_info_form"
import { useAsyncError } from "react-router-dom"
import { DEBUG_NO_BACKEND } from "@/app/Global/self_setting"


import { Tabs } from 'antd';
import type { TabsProps } from 'antd';






export default function EditPaperPage({ params }: { params: { paperID: string } }){
    const paperID = params.paperID
    const [paper, setPaper] = useState<PaperItem>()
    useEffect(() =>{
        const result_p = paperQueryIDFetch({paperID})
        setPaper(result_p)
    }, [])

    const [newPaperName, setNewPaperName] = useState<string>()
    const [newPaperDescription, setNewPaperDescription] = useState<string>()
    const [newProblemBase, setNewProblemBase] = useState<string>()

    const uploadEditPaperExtraInfo = (paperExtraInfo: PaperExtraInfoItem)=>{
        setNewPaperName(paperExtraInfo.paperName)
        setNewPaperDescription(paperExtraInfo.description)
        setNewProblemBase(paperExtraInfo.problemBase)
        if (DEBUG_NO_BACKEND){
            alert("修改题目信息成功")
        } else {
            alert("这里的功能还没有开放，之后再来尝试吧 :)")
        }
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
            <Divider>原试卷内容</Divider>
            <DisplayPaperItem paper_={paper}/>
            <Divider>修改试卷</Divider>
            <Tabs defaultActiveKey="1" items={items} onChange={tabOnChange}/>
            {tabKey == '1' &&
            <ExtraInfoForm 
                initPaperTitle={paper.paperName}
                initPaperDescription={paper.description}
                initProblemBase={paper.problemBase}
                editPaperExtraInfo={uploadEditPaperExtraInfo}
            />}
            {tabKey == '2' &&
            <p>暂未开放</p>
            }
        </>: <></>}
    </>
}