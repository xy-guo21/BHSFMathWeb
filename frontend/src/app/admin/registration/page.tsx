'use client'
import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Button, Form, Row, Col, Typography } from 'antd';
import { SERVER_ROOT_URL } from '@/app/Global/url';
import { ResgisterUserMessage } from './RegisterUserMessage';


const { Title } = Typography;

const RegistrationForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values:', values);
    // 在这里可以处理用户注册逻辑，比如发送请求到服务器
    fetch(SERVER_ROOT_URL+'admin/registration',{
      method: "POST", 
      headers:{"Content-Type":"text/plain"},
      body: JSON.stringify(new ResgisterUserMessage(values.userName, values.password, values.schoolID, values.enrollmentYear, values.studyPeriod))
    }).then(response => response.json()).then(replyJson => {
      console.log(replyJson)
      if (replyJson.status === 0) {
          alert("添加用户成功")
      } else {
          alert(replyJson.message) //以后改一个状态条，优雅一点
      }
    }).catch((e) => console.log(e))
  };

  const validatePassword = (rule: any, value: string) => {
    if (value && value.length < 6) {
      return Promise.reject('Password must be at least 6 characters long');
    }
    return Promise.resolve();
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col span={8}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Register
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
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: 'Username can only contain letters, numbers, and underscores',
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
              {
                validator: validatePassword,
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
