'use client'
import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Button, Form, Row, Col, Typography } from 'antd';
import { UserLoginMessage } from './UserLoginMessage';
import { SERVER_ROOT_URL } from '../Global/url';
import { setUserToken } from '../../../public/UserTokenStore';
import { useRouter } from 'next/navigation';
import { DEBUG_NO_BACKEND } from '../Global/self_setting';

const { Title } = Typography;

const LoginForm: React.FC = () => {
  const router = useRouter()
  const onFinish = (values: any) => {
    console.log('Received values:', values);
    console.log('student_id:', values.student_id);
    console.log('password:', values.password)
    console.log(new UserLoginMessage(values.student_id, values.password))
    if (DEBUG_NO_BACKEND){
      router.push("home")
      return
    }
    fetch(SERVER_ROOT_URL + "login/",{
      method: "POST", 
      headers: {"Content-Type":"text/plain"},
      body: JSON.stringify(new UserLoginMessage(values.student_id, values.password))
    }).then(response => response.json()).then(replyJson => {
      console.log(replyJson)
      if (replyJson.status === 200) {
          setUserToken(replyJson.userToken)
          router.push("/home");
      } else {
          alert(replyJson.message) //以后改一个状态条，优雅一点
      }
    }).catch((e) => console.log(e))
  };


  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col span={8}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          登录
        </Title>
        <Form
          name="login_form"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          scrollToFirstError
        >
          <Form.Item
            name="student_id"
            rules={[
              {
                required: true,
                message: '请输入学号！',
              },
              {
                pattern: /^[0-9]+$/,
                message: '学号只能包含数字！',
              },
            ]}
          >
            <Input
              placeholder="请输入学号"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          >
            <Input.Password
              placeholder="请输入密码"
              iconRender={(visible) => (visible ? <LockOutlined /> : <LockOutlined />)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginForm;