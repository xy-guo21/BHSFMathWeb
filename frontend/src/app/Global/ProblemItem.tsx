import { List, Space, Button } from "antd"
import React, { useEffect, useState } from "react"
import { LikeOutlined, MessageOutlined, StarOutlined, DislikeOutlined, KeyOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { HTMLComponent } from "./problem_components";
import { debuglog } from "util";
import { DEBUG_NO_BACKEND } from "./self_setting";
import { SERVER_ROOT_URL } from "./url";
import { ProblemQueryIDMessage } from "../problem/ProblemQueryMessage";
import { unstable_useViewTransitionState } from "react-router-dom";

const problemIDs_debug = ['0', '1']
class ProblemItem {
    problemID: string
    content: string
    image?: JSX.Element
    like?: number
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

const problems_debug = [
    new ProblemItem('0', 
        '<p><span class="ql-formula" data-value="a_2">﻿<span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>a</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">a_2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.5806em; vertical-align: -0.15em;"></span><span class="mord"><span class="mord mathnormal">a</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.3011em;"><span class="" style="top: -2.55em; margin-left: 0em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height: 0.15em;"><span class=""></span></span></span></span></span></span></span></span></span></span>﻿</span> </p>',
        1, 2, 0, 
        "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"),
    new ProblemItem('1', '<p>aaa</p>', 1, 2, 0, '')
]

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

const DisplayProblemItemOld = ({item, opt}: {item: ProblemItem; opt: React.ReactElement}) => {
    const router = useRouter()
    return <List.Item
                key={item.problemID}
                actions={[
                <IconText icon={KeyOutlined} text={"id = " + item.problemID} key="list-vertical-star-o" />,
                <IconText icon={StarOutlined} text={item.star.toString()} key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text={item.star.toString()} key="list-vertical-like-o" />,
                <IconText icon={DislikeOutlined} text={item.dislike.toString()} key="list-vertical-star-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                opt
                ]}
                extra={item.image}
            >
                <HTMLComponent htmlString={item.content}/>
            </List.Item>
}

const DisplayProblemItem = ({problemID, opt}: {problemID: string; opt: React.ReactElement}) => {
    const router = useRouter()
    const [problem, setProblem] = useState<ProblemItem>()
    useEffect(()=>{fetchProblem()}, [problemID])
    const fetchProblem = ()=>{
        if(DEBUG_NO_BACKEND){
            // console.log(problems_debug[0])
            // console.log(problems_debug[1])
            setProblem(problems_debug.filter((prob)=>(prob.problemID === problemID))[0])
        }
        else{
            fetch(SERVER_ROOT_URL + 'problemQueryID', {
                method: "POST", 
                headers: {"Content-Type":"text/plain"},
                body: JSON.stringify(new ProblemQueryIDMessage(problemID))
            }).then(response=> response.json()).then( replyJson =>{
                setProblem(new ProblemItem(problemID, replyJson.content, replyJson.like, replyJson.dislike, replyJson.star, replyJson.imagePath))
                console.log(replyJson)
            })
        }
    }
    return problem && <List.Item
                key={problem.problemID}
                actions={[
                <IconText icon={KeyOutlined} text={"id = " + problem.problemID} key="list-vertical-star-o" />,
                <IconText icon={StarOutlined} text={problem.star.toString()} key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text={problem.star.toString()} key="list-vertical-like-o" />,
                <IconText icon={DislikeOutlined} text={problem.dislike.toString()} key="list-vertical-star-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                opt
                ]}
                extra={problem.image}
            >
                <HTMLComponent htmlString={problem.content}/>
            </List.Item>
}
export {ProblemItem, DisplayProblemItem, problemIDs_debug}