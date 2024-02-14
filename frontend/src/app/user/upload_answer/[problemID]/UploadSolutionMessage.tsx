import { TSMSPMessage } from "@/app/Global/message";
import { UploadFile } from "antd";
import { RcFile } from "antd/es/upload";

export class UploadSolutionMessage extends TSMSPMessage {
    problemID: string
    content: string
    images: File[]
    constructor(problemID: string, content: string, fileList: UploadFile[]){
        super();
        this.problemID = problemID
        this.content = content
        const images: (RcFile|undefined)[] = fileList.map((ele)=>(ele.originFileObj)).filter((value)=>(value!==undefined))
        this.images = images
    }
}