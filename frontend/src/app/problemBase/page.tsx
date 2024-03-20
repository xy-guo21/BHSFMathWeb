'use client'

import { Tabs } from "antd"
import { ProblemBaseItem, problemBaseOptions } from "../Global/problem_related"
import { useEffect, useState } from "react"
import { DEBUG_NO_BACKEND } from "../Global/self_setting"
import { SERVER_ROOT_URL } from "../Global/url"

const init_problemBase: ProblemBaseItem[] = []

const problemBaseNavi = ({page = <p>test</p>} : {page:React.ReactElement})=>{
    const [problemBases, setProblemBases] = useState<ProblemBaseItem[]>(init_problemBase)
    useEffect(() => {
        fetchProblemBase()
    }, [])
    const fetchProblemBase = ()=>{
        if (DEBUG_NO_BACKEND){
            setProblemBases(problemBaseOptions)
        } else {
            fetch(SERVER_ROOT_URL + 'queryAllProblemBase', {
                method: "GET", 
                headers: {"Content-Type":"text/plain"},
            }).then(response => response.json()).then(replyJson => {
                setProblemBases(replyJson.problemBases)
            }).catch((e) => console.log(e))
        }
    }
    return <Tabs
        items={problemBases.map((problemBase) => {
            return {
                label: problemBase.label, 
                key: problemBase.value, 
                children: page
            }
        })}
    />
}

export default problemBaseNavi