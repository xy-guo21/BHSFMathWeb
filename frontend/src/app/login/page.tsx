'use client'
import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Button, Form, Row, Col, Typography } from 'antd';


const { Title } = Typography;

const RegistrationForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values:', values);
    // 在这里可以处理用户注册逻辑，比如发送请求到服务器
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