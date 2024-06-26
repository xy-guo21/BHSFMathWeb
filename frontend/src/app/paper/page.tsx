'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DEBUG_NO_BACKEND } from "../Global/self_setting"
import { SERVER_ROOT_URL } from "../Global/url"
import { paperIDs_debug } from "../../../public/components/paper/PaperItem"
import { List, Button } from "antd"
import { DisplayPaperListItem } from "../../../public/components/paper/ui"

let paperIDs_default: string[] = []
const PaperListPage: React.FC = ()=>{
    const router = useRouter()
    const [paperIDs, setPaperIDs] = useState<string[]>(paperIDs_default)
    useEffect(() =>{
        fetchData();
    }, [])
    const fetchData = ()=>{
        if (DEBUG_NO_BACKEND){
            setPaperIDs(paperIDs_debug)
        }
        else{
            fetch(SERVER_ROOT_URL+'queryPaperList', {
                method: "GET",
                headers: {"Content-Type": "text/plain"}
            }).then(response=>response.json()).then(response =>{
                setPaperIDs(response.problemIDs)
            })
        }
    }

    return <>
        <Button onClick={()=>{router.push('/home')}}>返回主页</Button>
        <h1>所有试卷</h1>
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {console.log(page);},
                pageSize: 3,
            }}
            dataSource={paperIDs}
            renderItem={(paperID) => (
            <DisplayPaperListItem paperID={paperID} opt={
            <>
                <Button onClick={()=>{router.push('/paper/' + paperID)}}>查看试卷详情</Button>
            </>
            }/>
            )}
        />
    </>  
}

export default PaperListPage