'use client'
import { DEBUG_NO_BACKEND } from '@/app/Global/self_setting';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { SERVER_ROOT_URL } from '@/app/Global/url';
import { ConstructNewProblemBaseMessage } from '../../../../../public/messages/problem_base/ConstructNewProblemBaseMessage';
import { UserTokenStore } from '../../../../../public/UserTokenStore';

type FieldType = {
  problemBaseName: string
};

const App: React.FC = () =>{
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        if (DEBUG_NO_BACKEND){
            alert("创建题库"+ values.problemBaseName + "成功！")
        } else {
            fetch(SERVER_ROOT_URL + 'problemQueryID', {
                method: "POST", 
                headers: {"Content-Type":"text/plain"},
                body: JSON.stringify(new ConstructNewProblemBaseMessage(UserTokenStore.getState().userToken, values.problemBaseName))
            }).then(response=> response.json()).then( replyJson =>{
                if (replyJson.status === 200){
                    alert("创建题库"+ values.problemBaseName + "成功！")
                } else {
                    alert(replyJson.message)
                }
            })
        }
    };
      
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        alert(errorInfo.errorFields[0].errors[0])
    };

    return <>
        <h1>创建题库页</h1>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
            label="新建题库名称"
            name="problemBaseName"
            rules={[{ required: true, message: '请输入题库名称' }]}
            >
            <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
        </Form>
    </>
}

export default App