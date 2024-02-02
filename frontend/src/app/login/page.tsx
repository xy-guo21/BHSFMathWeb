'use client'
import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Button, Form, Row, Col, Typography } from 'antd';
import { UserLoginMessage } from './UserLoginMessage';
import { SERVER_ROOT_URL } from '../Global/url';
import { setUserToken } from '../Global/TokenStore';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

const RegistrationForm: React.FC = () => {
  const router = useRouter()
  const onFinish = (values: any) => {
    console.log('Received values:', values);
    console.log('userName:', values.userName);
    console.log('password:', values.password)
    console.log(new UserLoginMessage(values.userName, values.password))
    fetch(SERVER_ROOT_URL + "admin/login",{
      method: "POST", 
      headers: {"Content-Type":"text/plain"},
      body: JSON.stringify(new UserLoginMessage(values.userName, values.password))
    }).then(response => response.json()).then(replyJson => {
      console.log(replyJson)
      if (replyJson.status === 0) {
          setUserToken(replyJson.message)
          router.push("home");
      } else {
          alert(replyJson.message) //以后改一个状态条，优雅一点
      }
    }).catch((e) => console.log(e))
  };


  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col span={8}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          UserLogin
        </Title>
        <Form
          name="registration_form"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input
              placeholder="Enter your username"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password
              placeholder="Input password"
              iconRender={(visible) => (visible ? <LockOutlined /> : <LockOutlined />)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default RegistrationForm;