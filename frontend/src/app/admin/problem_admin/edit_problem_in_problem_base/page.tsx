'use client'

import { problemBaseOptions } from "@/app/Global/problem_related";
import { Divider, Form, Select, Input, Button } from "antd";
import type { FormProps } from 'antd';
import { ProblemBaseSelect } from "../../../../../public/components/problem_base/selection";
import { DEBUG_NO_BACKEND } from "@/app/Global/self_setting";
import { SERVER_DIRECTORY } from "next/dist/shared/lib/constants";
import { SERVER_ROOT_URL } from "@/app/Global/url";
import { UserTokenStore } from "../../../../../public/UserTokenStore";
import { AddProblemToProblemBaseMessage } from "../../../../../public/messages/problem_base/AddProblemToProblemBaseMessage";
import { DelProblemFromProblemBaseMessage } from "../../../../../public/messages/problem_base/DelProblemFromProblemBaseMessage";
import { useForm } from 'antd/lib/form/Form';

type FieldType = {
    problemBaseName: string
    problemID: string
}
const App: React.FC = () => {
    const [formAdd] = useForm();
    const [formDel] = useForm();
    const onFinishAddProblem: FormProps<FieldType>['onFinish'] = (values) => {
        if (DEBUG_NO_BACKEND){
            alert("添加题目"+values.problemID+"到题库"+values.problemBaseName+"成功")
        } else {
            fetch(SERVER_ROOT_URL + 'add_problem_to_problem_base', {
                method: "POST", 
                headers: {"Content-Type":"text/plain"},
                body: JSON.stringify(new AddProblemToProblemBaseMessage(UserTokenStore().userToken, values.problemBaseName, values.problemID))
            }).then(response=> response.json()).then( replyJson =>{
                if (replyJson.status === 200){
                    alert("添加题目"+values.problemID+"到题库"+values.problemBaseName+"成功")
                } else {
                    alert(replyJson.message)
                }
            })
        }
    }
    const onFinishDelProblem: FormProps<FieldType>['onFinish'] = (values) => {
        if (DEBUG_NO_BACKEND){
            alert("从题库"+values.problemBaseName+"删除题目"+values.problemID+"成功")
        } else {
            fetch(SERVER_ROOT_URL + 'add_problem_to_problem_base', {
                method: "POST", 
                headers: {"Content-Type":"text/plain"},
                body: JSON.stringify(new DelProblemFromProblemBaseMessage(UserTokenStore().userToken, values.problemBaseName, values.problemID))
            }).then(response=> response.json()).then( replyJson =>{
                if (replyJson.status === 200){
                    alert("从题库"+values.problemBaseName+"删除题目"+values.problemID+"成功")
                } else {
                    alert(replyJson.message)
                }
            })
        }
    }
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        alert(errorInfo.errorFields[0].errors[0])
    };
    
    return <>
        <h1>修改题库中题目</h1>
        <Divider>向题库中添加题目</Divider>
        <Form
            form={formAdd}
            onFinish={onFinishAddProblem}
            onFinishFailed={onFinishFailed}
            >
                <Form.Item<FieldType>
                    label="题库名称" name="problemBaseName"
                    rules={[{required: true, message: "请选择题库名称"}]}>
                        <ProblemBaseSelect onChange={(value: string) => formAdd.setFieldsValue({ problemBaseName: value })}/>
                </Form.Item>
                <Form.Item<FieldType>
                    label="题目ID" name="problemID"
                    rules={[{required: true, message: "请输入题目ID"}]}>
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        确认添加题目到题库
                    </Button>
                </Form.Item>
        </Form>
        <Divider>从题库中移除题目</Divider>
        <Form
            form={formDel}
            onFinish={onFinishDelProblem}
            onFinishFailed={onFinishFailed}
            >
                <Form.Item<FieldType>
                    label="题库名称" name="problemBaseName"
                    rules={[{required: true, message: "请选择题库名称"}]}>
                        <ProblemBaseSelect onChange={(value: string) => formDel.setFieldsValue({ problemBaseName: value })}/>
                </Form.Item>
                <Form.Item<FieldType>
                    label="题目ID" name="problemID"
                    rules={[{required: true, message: "请输入题目ID"}]}>
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        确认从题库中移除题目
                    </Button>
                </Form.Item>
        </Form>
    </>
}
export default App;