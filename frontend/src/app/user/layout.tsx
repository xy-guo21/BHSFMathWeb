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
  UserOutlined,
  HomeOutlined,
  QuestionCircleOutlined, 
  StarOutlined, 
  DatabaseOutlined, 
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
  '/home', 
  '/user', 
  '/user/upload_problem', 
  '/user/user_problem', 
  '/user/star_problem',
  '/user/problem_box',
  '/user/user_paper'
]

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
    { 
      key: '/home',
      icon: React.createElement(HomeOutlined),
      label: "主页"
    },
    {
      key: '/user', 
      icon: React.createElement(UserOutlined),
      label: '个人中心'
    },
    {
      key: 'user problem',
      label: '我的题目',
      icon: React.createElement(QuestionCircleOutlined), 
      // type: 'group',
      children: [{
          key: '/user/upload_problem',
          label: '上传题目'
      }, {
          key: '/user/user_problem',
          label: '已上传题目列表'
      }]
    },
    {
      key: 'user paper',
      label: '我的试卷',
      icon: <DatabaseOutlined />,
      children: [{
        key: '/user/user_paper', 
        label: '已上传试卷列表'
      }]
    },
    {
      key: '/user/star_problem',
      label: '我的收藏',
      icon: React.createElement(StarOutlined), 
    },
    {
      key: '/user/problem_box',
      label: '我的试题篮',
      icon: <ShoppingCartOutlined />
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