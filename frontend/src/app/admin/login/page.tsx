'use client'
import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Button, Form, Row, Col, Typography } from 'antd';
import { AdminLoginMessage } from './AdminLoginMessage';
import {create} from 'zustand'
import { setUserSession } from '../../../../public/SessionIDStore';
import { useRouter } from 'next/navigation';
import { SERVER_ROOT_URL } from '@/app/Global/url';
import { DEBUG_NO_BACKEND } from '@/app/Global/self_setting';

const { Title } = Typography;


const RegistrationForm: React.FC = () => {
  const router = useRouter();
  const onFinish = (values: any) => {
    console.log('Received values:', values);
    console.log('admin_id:', values.admin_id);
    console.log('password:', values.password)
    console.log(new AdminLoginMessage(values.admin_id, values.password))
    if (DEBUG_NO_BACKEND){
      setUserSession("test_usertoken")
      router.push("/admin/home");
      return
    }
    fetch(SERVER_ROOT_URL + "admin/login",{
      method: "POST", 
      headers: {"Content-Type":"text/plain"},
      body: JSON.stringify(new AdminLoginMessage(values.admin_id, values.password))
    }).then(response => response.json()).then(replyJson => {
      console.log(replyJson)
      if (replyJson.status === 0) {
          setUserToken(replyJson.message)
          router.push("/admin/home");
      } else {
          alert(replyJson.message) //以后改一个状态条，优雅一点
      }
    }).catch((e) => console.log(e))
  };


  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col span={8}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          管理员登录
        </Title>
        <Form
          name="admin_login_form"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          scrollToFirstError
        >
          <Form.Item
            name="admin_id"
            rules={[
              {
                required: true,
                message: '请输入管理员账号！',
              },
            ]}
          >
            <Input
              placeholder="请输入管理员账号"
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

export default RegistrationForm;

function setUserToken(message: any) {
  throw new Error('Function not implemented.');
}
