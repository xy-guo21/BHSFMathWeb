'use client'

import 'katex/dist/katex.css';
import React from "react";

import { LikeOutlined, MessageOutlined, StarOutlined, DislikeOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { HTMLComponent } from '../problem_components';
import { DEBUG_NO_BACKEND } from '@/app/Global/self_setting';
import { SERVER_ROOT_URL } from '@/app/Global/url';


class ProblemItem {
    problemID: string
    content: string
    image?: JSX.Element
    like: number
    dislike: number
    star: number
    constructor(problemID: string, content: string, like: number, dislike: number, star: number, imagePath: string){
        this.problemID = problemID 
        this.content = content
        if (imagePath !== ''){
            this.image = <img width={200} src={imagePath}/>
        }
        this.like = like
        this.dislike = dislike
        this.star = star
    }

}
let problems: ProblemItem[]= []
if (DEBUG_NO_BACKEND){
problems = [
    new ProblemItem('0', 
        '<p><span class="ql-formula" data-value="a_2">﻿<span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>a</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">a_2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.5806em; vertical-align: -0.15em;"></span><span class="mord"><span class="mord mathnormal">a</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.3011em;"><span class="" style="top: -2.55em; margin-left: 0em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height: 0.15em;"><span class=""></span></span></span></span></span></span></span></span></span></span>﻿</span> </p>',
        1, 2, 0, 
        "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"),
    new ProblemItem('1', '<p>aaa</p>', 1, 2, 0, '')
]
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const App: React.FC = () => {
    const router = useRouter()
    if (DEBUG_NO_BACKEND){}
    else{
        fetch(SERVER_ROOT_URL+'problemQueryFilter', {
            method: "GET", 
            headers: {"Content-Type":"text/plain"},
        }).then(response=>response.json()).then(response => {
            console.log(response)
            problems = response.problems.map((item)=>(new ProblemItem(item.problemID, item.content, item.like, item.dislike, item.star, item.imagePath)))
        })
    }
    return <>
        <Button onClick={()=>{router.push('/user')}}>个人中心</Button>
        <Button onClick={()=>{router.push('/home')}}>首页</Button>
        <h1>我的题目</h1>
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {console.log(page);},
                pageSize: 3,
            }}
            dataSource={problems}
            footer={<div>我的题目</div>}
            renderItem={(item) => (
            <List.Item
                key={item.problemID}
                actions={[
                <IconText icon={StarOutlined} text={item.star.toString()} key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text={item.star.toString()} key="list-vertical-like-o" />,
                <IconText icon={DislikeOutlined} text={item.dislike.toString()} key="list-vertical-star-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                ]}
                extra={item.image}
            >
                <HTMLComponent htmlString={item.content}/>
                <Button onClick={()=>{router.push('/user/upload_answer/' + item.problemID)}}>上传题解</Button>
            </List.Item>
            )}
        />
  </>
}

export default App;