import { TSMSPMessage } from "@/app/Global/message";
import { UploadFile } from "antd";
import { RcFile } from "antd/es/upload";

export class UploadProblemMessage extends TSMSPMessage {
    userToken: string
    source: string
    difficulty: number
    content: string
    imageIDs: string[]
    problemBase: string
    constructor(userToken: string, source: string, difficulty: number, problemBase: string, content: string, fileList: UploadFile[]){
        super();
        this.userToken = userToken
        this.source = source
        this.difficulty = difficulty
        this.content = content
        this.imageIDs = fileList.map((ele)=>(ele.response.file_id))
        this.problemBase = problemBase
    }
}