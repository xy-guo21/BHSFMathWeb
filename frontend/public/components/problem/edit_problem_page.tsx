'use client'
import { Divider, Input, Upload, Button, UploadFile, UploadProps} from "antd";
import { DisplayProblemItem } from "./DisplayProblemItem";
import { useEffect, useState } from "react";
import { ProblemItem } from "./ProblemItem";
import { problemQueryIDFetch } from "./fetch_function/problemQueryID";
import { UploadProblemForm, fileList_debug } from "./upload_page";

export default function EditProblemPage({ params }: { params: { problemID: string } }) {
    const problemID = params.problemID
    const [problem, setProblem] = useState<ProblemItem>()
    const [refreshPage, setRefreshPage] = useState<boolean>(false);

    useEffect(()=>{
        const result_p = problemQueryIDFetch({problemID})
        setProblem(result_p)
    }, [refreshPage])

    const handleRefreshPage = () =>{
        setRefreshPage(prevState => !prevState);
        console.log(refreshPage)
    }
    return <>
        <h1>编辑题目</h1>
        {problem ? 
        <>
            <Divider>题目原内容</Divider>
            <DisplayProblemItem problem_={problem}/>
            <Divider>修改题目内容</Divider>
            <UploadProblemForm
                difficulty={0}
                source={problem.source}
                problemBase={problem.problemBase}
                problemText={problem.content}
                fileList={problem.images_front}
                problemID={problem.problemID}
                refreshPage={handleRefreshPage}
            />
        </>:<></>
        }
    </>
}
