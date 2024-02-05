'use client'
import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Button, Form, Row, Col, Typography, Select, Cascader} from 'antd';
import { SERVER_ROOT_URL } from '@/app/Global/url';
import { ResgisterUserMessage } from './RegisterUserMessage';
import { SCHOOL_OPTIONS } from './school_list';
import { DEBUG_NO_BACKEND } from '@/app/Global/self_setting';


const { Title } = Typography;

const onChange = (value: string[]) => {
  console.log(value);
};

const RegistrationForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values:', values);
    console.log('school = ', values.school)
    console.log(new ResgisterUserMessage(values.username, values.student_id, values.password, values.enrollment, values.school[0], values.school[1]))
    // 在这里可以处理用户注册逻辑，比如发送请求到服务器
    if (DEBUG_NO_BACKEND) {
      alert("添加用户成功")
      return
    }
    fetch(SERVER_ROOT_URL+'admin/registration',{
      method: "POST", 
      headers:{"Content-Type":"text/plain"},
      body: JSON.stringify(new ResgisterUserMessage(values.username, values.student_id, values.password, values.enrollment, values.school[0], values.school[1]))
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
      return Promise.reject('密码必须不少于6位');
    }
    return Promise.resolve();
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col span={8}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          注册
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
                message: '请输入用户名！',
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: '用户名只能包含字母、数字和下划线',
              },
            ]}
          >
            <Input
              placeholder="请输入用户名"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          
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
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
              {
                validator: validatePassword,
              },
            ]}
          >
            <Input.Password
              placeholder="请输入密码"
              iconRender={(visible) => (visible ? <LockOutlined /> : <LockOutlined />)}
            />
          </Form.Item>
          
          <Form.Item
            name="school"
            rules={[
              {
                required: true,
                message: '请选择学校！',
              },
            ]}
          >
            <Cascader options={SCHOOL_OPTIONS} onChange={onChange} placeholder="请选择学校" />
          </Form.Item>

          <Form.Item
            name="enrollment"
            rules={[
              {
                required: true,
                message: '请选择入学年份！',
              },
            ]}
          >
            <Select
                placeholder="请选择入学年份"
                options={[
                {
                    value: '2018',
                    label: '2018',
                },
                {
                    value: '2019',
                    label: '2019',
                },
                {
                    value: '2020',
                    label: '2020',
                },
                {
                    value: '2021',
                    label: '2021',
                },
                {
                    value: '2022',
                    label: '2022',
                },
                {
                    value: '2023',
                    label: '2023',
                },
                ]}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              注册
            </Button>
          </Form.Item>

        </Form>
      </Col>
    </Row>
  );
};

export default RegistrationForm;
