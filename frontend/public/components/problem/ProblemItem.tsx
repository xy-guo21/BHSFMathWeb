import React, { useEffect, useState } from "react"
import { List, Space, Button, UploadFile } from "antd"
import { SERVER_ROOT_URL } from "@/app/Global/url";

const problemIDs_debug = ['0', '1']
class ProblemItem {
    problemID: string;
    content: string;
    has_image: boolean;
    images?: JSX.Element[];
    images_front?: UploadFile[];
    like: number;
    dislike: number;
    star: number;
    difficulty: string;
    source: string;
    problemBase: string;

    constructor(
        problemID: string, 
        content: string, 
        problemBase: string, 
        difficulty: string, 
        source: string,
        like: number, 
        dislike: number, 
        star: number, 
        imagePaths: string[]
    ) {
        this.problemID = problemID;
        this.content = content;
        this.problemBase = problemBase;
        this.difficulty = difficulty;
        this.source = source;
        this.like = like;
        this.dislike = dislike;
        this.star = star;
        
        // this.has_image = false;
        // console.log("image_path", imagePaths)
        if (imagePaths && imagePaths.length !== 0) {
            this.has_image = true;
            this.images = imagePaths.map(imagePath => <img width={200} src={SERVER_ROOT_URL.slice(0, -1) + imagePath}/>);
            this.images_front = imagePaths.map((imagePath, id) => ({
                uid: `${id}`,
                name: `图${id + 1}`,
                status: 'done',
                url: imagePath
            }));
        } else {
            this.has_image = false;
        }
    }
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );



export {ProblemItem, problemIDs_debug, IconText}