import { Form, Input, Select, Button } from "antd"
import { useState } from "react"
import { problemBaseOptions } from "@/app/Global/problem_related"

class PaperExtraInfoItem {
    paperName: string
    description: string
    problemBase: string
    constructor(paperName: string, description: string, problemBase: string){
        this.paperName = paperName
        this.description = description
        this.problemBase = problemBase
    }
}

const ExtraInfoForm = (params:{
    initPaperTitle: string, 
    initPaperDescription: string, 
    initProblemBase: string, 
    editPaperExtraInfo: (extraInfo: PaperExtraInfoItem)=>void
}) =>{
    
    const [paperTitle, setPaperTitle] = useState<string>(params.initPaperTitle)
    const [paperDescription, setPaperDesciption] = useState<string>(params.initPaperDescription)
    const [problemBase, setProblemBase] = useState<string>(params.initProblemBase)
    
    const paperTextOnFinish = (values: any) => {
        setProblemBase(values.problemBase)
        setPaperTitle(values.title)
        setPaperDesciption(values.description)
    }
    return <Form layout="vertical" onFinish={paperTextOnFinish} variant="filled" style={{ maxWidth: 600 }}>
    <Form.Item name="title" label="试卷名称">
        <Input defaultValue={paperTitle}/>
    </Form.Item>
    <Form.Item name="problemBase" label="试卷所属题库">
    <Select 
        defaultValue={problemBase}
        value={problemBase}
        style={{ width: 120 }}
        onChange={(v: string)=>{setProblemBase(v)}}
        options={problemBaseOptions}
    />
    </Form.Item>
    <Form.Item
        name="description"
        label="试卷简介"
    >
        <Input.TextArea defaultValue={paperDescription}/>
    </Form.Item>
    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit" onClick={()=>{
            params.editPaperExtraInfo(new PaperExtraInfoItem(paperTitle, paperDescription, problemBase))
        }}>
        确认修改题目信息
        </Button>
    </Form.Item>
</Form>
}
export {PaperExtraInfoItem, ExtraInfoForm}