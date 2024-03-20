import { TSMSPMessage } from "@/app/Global/message";
import { UploadFile } from "antd";
import { RcFile } from "antd/es/upload";

export class EditProblemMessage extends TSMSPMessage {
    problemID: string
    source: string
    difficulty: number
    content: string
    images: RcFile[]
    problemBase: string
    constructor(problemID: string, source: string, difficulty: number, problemBase: string, content: string, fileList: UploadFile[]){
        super();
        this.problemID = problemID
        this.source = source
        this.difficulty = difficulty
        this.content = content
        const images: RcFile[] = fileList.map((ele)=>(ele.originFileObj)).filter((value)=>(value!==undefined))
        this.images = images
        this.problemBase = problemBase
    }
}