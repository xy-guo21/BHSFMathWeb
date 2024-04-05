'use client'
import React from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  ShoppingCartOutlined, 
  IdcardOutlined, 
  PartitionOutlined, 
  UserOutlined,
  HomeOutlined,
  QuestionCircleOutlined, 
  StarOutlined, 
  VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/navigation';

const { Header, Content, Footer, Sider } = Layout;

// const items: MenuProps['items'] = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   AppstoreOutlined,
//   TeamOutlined,
//   ShopOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `nav ${index + 1}`,
// }));
const routingList = [
  '/admin/home', 
  
  '/admin/problem_admin/upload_problem',
  '/admin/problem_admin/edit_problem', 

  '/admin/problem_admin/problem_box',
  '/admin/system_admin/registration'
]

type MenuItem = Required<MenuProps>['items'][number];
const problemItems: MenuItem[] = [
  {
    key: '/admin/problem_admin/upload_problem',
    label: '上传题目'
  }, {
    key: '/admin/problem_admin/edit_problem', 
    label: '编辑题目'
  }, {
    key: '/admin/problem_admin/problem_list', 
    label: '题目列表页'
  }, {
    key: '/admin/problem_admin/my_problem_list', 
    label: '我上传的题目'
  }
]
const paperItems: MenuItem[] = [
  {
    key: '/admin/problem_admin/problem_box',
    label: '试题篮'
  }, 
  {
    key: '/admin/problem_admin/edit_paper', 
    label: '编辑试卷'
  }, 
  {
    key: '/admin/problem_admin/paper_list', 
    label: '试卷列表'
  }, 
  {
    key: '/admin/problem_admin/my_paper', 
    label: '我上传的试卷'
  }
]
const problemBaseItems: MenuItem[] = [
  {
    key: '?',
    label: '建立题库'
  }
]
const items: MenuItem[] = [
    { 
      key: '/admin/home',
      icon: React.createElement(HomeOutlined),
      label: "管理员主页"
    },
    {
      key: '/admin/user_center', 
      icon: React.createElement(UserOutlined),
      label: '管理员个人中心'
    },
    {
      key: 'super admin',
      label: '超级管理员',
      icon: <IdcardOutlined />, 
      // type: 'group',
      children: [{
          key: '/admin/super_admin/user_list',
          label: '所有用户列表'
      }, {
          key: '/admin/super_admin/admin_list',
          label: '所有管理员列表'
      }]
    },
    {
      key: 'problem base admin',
      label: '题库管理员',
      icon: React.createElement(QuestionCircleOutlined), 
      // type: 'group',
      children: [{
        key: 'problem', 
        label: "题目相关", 
        children: problemItems
      }, {
        key: 'paper', 
        label: '试卷相关', 
        children: paperItems
      }, {
        key: 'problemBase', 
        label: '题库相关', 
        children: problemBaseItems
      }]
    },
    {
      key: 'system admin', 
      label: '系统管理员', 
      icon: <PartitionOutlined />,
      children: [
        {
          key: '/admin/system_admin/registration', 
          label: '注册学生用户'
        }
      ]
    }
]


const UserLayout: React.FC = ({ children }: React.PropsWithChildren) => {
    const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();
    const router = useRouter()
    const menuClick: MenuProps['onClick'] = (e) => {
        console.log(e)
        if (routingList.includes(e.key)){
            router.push(e.key)
        }
    }
  return (
    <Layout hasSider>
      <Sider
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" onClick={menuClick} items={items} />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default UserLayout;