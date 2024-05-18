import { DEBUG_NO_BACKEND } from "@/app/Global/self_setting"
import { SERVER_ROOT_URL } from "@/app/Global/url"
import { PaperItem } from "../ui"
import { QueryPaperDetailMessage } from "../../../../src/app/paper/QueryPaperDetailMessage"
import { papers_debug, undefined_paper } from "../PaperItem"


const paperQueryIDFetch = ({paperID}: {paperID: string})=> {
    let paper = undefined_paper
    if(DEBUG_NO_BACKEND){
        // console.log(problems_debug[0])
        // console.log(problems_debug[1])
        paper = (papers_debug.filter((pa)=>(pa.paperID === paperID))[0])
    }
    else{
        fetch(SERVER_ROOT_URL + 'paperQueryID', {
            method: "POST", 
            headers: {"Content-Type":"text/plain"},
            body: JSON.stringify(new QueryPaperDetailMessage(paperID))
        }).then(response=> response.json()).then( replyJson =>{
            paper = new PaperItem(paperID, replyJson.paperName, replyJson.description, replyJson.problemIDs)
            console.log(replyJson)
        })
    }
    return paper
}

export {paperQueryIDFetch}