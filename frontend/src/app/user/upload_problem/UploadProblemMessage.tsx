import { TSMSPMessage } from "@/app/Global/message";
import { UploadFile } from "antd";
import { RcFile } from "antd/es/upload";

export class UploadProblemMessage extends TSMSPMessage {
    source: string
    difficulty: number
    content: string
    images: File[]
    constructor(source: string, difficulty: number, content: string, fileList: UploadFile[]){
        super();
        this.source = source
        this.difficulty = difficulty
        this.content = content
        const images: (RcFile|undefined)[] = fileList.map((ele)=>(ele.originFileObj)).filter((value)=>(value!==undefined))
        this.images = images
    }
}