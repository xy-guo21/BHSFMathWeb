'use client'
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { useState } from 'react';
import { DEBUG_NO_BACKEND } from '@/app/Global/self_setting';
import { SERVER_ROOT_URL } from '@/app/Global/url';
import { DeleteImageMessage } from './DeleteImageMessage';
import { PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';
let BACKEND_URL = SERVER_ROOT_URL + 'uploadProblem'
let fileList_default: UploadFile[] = []

if (DEBUG_NO_BACKEND){
    fileList_default = [
        {
          uid: '0',
          name: 'xxx.png',
          status: 'uploading',
          percent: 33,
        },
        {
          uid: '-1',
          name: 'yyy.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'zzz.png',
          status: 'error',
        },
      ];
    BACKEND_URL = "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"

}


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const App: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(fileList_default);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const handleRemove = (file: UploadFile) =>{
        console.log(file)
        console.log(file.status)
        console.log(new DeleteImageMessage(file.uid, file.name))
        
        if (file.status === 'uploading'){
            alert("不能删除正在上传的文件，请稍后尝试")
        }
        
        if (file.status === 'done'){
            if (DEBUG_NO_BACKEND){
                alert("删除文件成功！")
                return
            }
            fetch(SERVER_ROOT_URL+'deleteImage',{
                method: "POST", 
                headers: {"Content-Type":"text/plain"},
                body: JSON.stringify(new DeleteImageMessage(file.uid, file.name))
            }).then(response=>response.json()).then(replyJson =>{
                if (replyJson.status===200){
                    alert("删除文件成功！")
                } else {
                    alert("ERROR")
                }
            }).catch(e=>{console.log(e)})
        }
        if (file.status === 'error'){
            return
        }
        if (file.status === 'removed'){
            alert("文件不可以删除两次")
        }
    }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <>
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default App;


