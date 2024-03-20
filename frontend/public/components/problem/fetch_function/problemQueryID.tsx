'use client'
import { DEBUG_NO_BACKEND } from "@/app/Global/self_setting"
import { SERVER_ROOT_URL } from "@/app/Global/url"
import { ProblemQueryIDMessage } from "@/app/problem/ProblemQueryMessage"
import { ProblemItem } from "../ProblemItem"

const problems_debug = [
  new ProblemItem('0', 
  '$\\frac1 2$', 
      // '<p><span class="ql-formula" data-value="a_2">﻿<span contenteditable="false"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>a</mi><mn>2</mn></msub></mrow><annotation encoding="application/x-tex">a_2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height: 0.5806em; vertical-align: -0.15em;"></span><span class="mord"><span class="mord mathnormal">a</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height: 0.3011em;"><span class="" style="top: -2.55em; margin-left: 0em; margin-right: 0.05em;"><span class="pstrut" style="height: 2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height: 0.15em;"><span class=""></span></span></span></span></span></span></span></span></span></span>﻿</span> </p>',
      "中等", "高中数学", "2023高考", 
      1, 2, 0, 
      ["https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"]),
  new ProblemItem('1', '<p>aaa</p>', '简单', "初中数学", "2022中考",  1, 2, 0, [])
]

const undefined_problem = new ProblemItem('-1', '未定义', '未知', '未知', '未知',  -1, -1, -1, [])
const problemQueryIDFetch = ({problemID}: {problemID: string})=> {
    let problem = undefined_problem
    if (DEBUG_NO_BACKEND){
       problem = (problems_debug.filter((prob)=>(prob.problemID === problemID))[0])
    } else {
        fetch(SERVER_ROOT_URL + 'problemQueryID',{
          method: "POST", 
          headers: {"Content-Type":"text/plain"},
          body: JSON.stringify(new ProblemQueryIDMessage(problemID))
        }).then(response => response.json()).then(replyJson => {
          console.log(replyJson)
          if (replyJson.status === 200) {
            problem = new ProblemItem(problemID, replyJson.content, 
              replyJson.difficulty, replyJson.problemBase, replyJson.source, 
              replyJson.like, replyJson.dislike, 
              replyJson.star, replyJson.imagePaths)
          } else {
              alert(replyJson.message) //以后改一个状态条，优雅一点
          }
        }).catch((e) => console.log(e))
    }
    
    return problem
}

export {problemQueryIDFetch, undefined_problem}