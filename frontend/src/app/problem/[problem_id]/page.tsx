'use client'

import React, { useState } from 'react';
import { Row, Col, Typography, Rate, Button, message, Upload, Image, Descriptions, Collapse} from 'antd';
import { mockQuestions } from './../problems.js'; // 引用题目数据文件
import { UploadOutlined, StarOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Title, Text } = Typography;
const { Panel } = Collapse;

export default function Page({ params }: { params: { problem_id: string } }) {

  // 状态：是否已收藏
  const [isFavorited, setIsFavorited] = useState(false);

  // 处理收藏/取消收藏的逻辑
  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  // 处理提交难度评定的逻辑
  const handleRateChange = (value: number) => {
    // 将评定的难度值发送给后端
    console.log('Rated difficulty:', value);
  };

  // 处理提交点赞的逻辑
  const handleLike = () => {
    // 发送点赞消息给后端
    console.log('Liked the question');
  };

  // 处理提交踩的逻辑
  const handleDislike = () => {
    // 发送踩消息给后端
    console.log('Disliked the question');
  };

  // 处理提交解答的逻辑
  const props: UploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  
  // 根据 params.problem_id 获取题目对象
  const problemId = params.problem_id;
  const problem = mockQuestions.find(q => q.id === problemId);

  // 如果找到题目对象，则显示题目的完整内容，否则显示提示信息
  return (
    <div style={{ padding: '16rem' }}> {/* 添加整体留白 */}
      {problem ? (
        <>
          <Row gutter={24}>
            {/* 左边显示题目内容 */}
            <Col span={16}>
            <Title level={4}>题目详情</Title>
              <Descriptions  column={8}> 
                <Descriptions.Item label="题号">{problem.id}</Descriptions.Item>
                <Descriptions.Item label="难度">{problem.difficulty}</Descriptions.Item>
                <Descriptions.Item label="类别">{problem.topics.join(', ')}</Descriptions.Item>
                <Descriptions.Item label="来源">{problem.source}</Descriptions.Item>
              </Descriptions>

              <Text>{` ${problem.title}`}</Text>
              <br />
              <Image
                width={400}
                src={problem.image}
              />
              <br />
              {problem.answers && problem.answers.length > 0 && (
                <>
                  <Title level={4}>参考答案</Title>
                  <Collapse accordion>
                    {problem.answers.map(answer => (
                      <Panel header={`答案 ${answer.id}`} key={answer.id}>
                        <Image src={answer.image} />
                      </Panel>
                    ))}
                  </Collapse>
                </>
              )}
            </Col>

            {/* 右边评定难度、点赞/踩、提交解答 */}
            <Col span={8}>
              <Descriptions title="评定难度"/>
              <Rate allowHalf defaultValue={problem.difficulty} onChange={handleRateChange} />
              <br />
              <br />
              <Button type="primary" shape="round" onClick={handleLike}>赞</Button>
              <Button type="dashed" shape="round" onClick={handleDislike} style={{ marginLeft: '1rem' }}>踩</Button>
              <br />
              <br />
              <Button type="default" onClick={handleFavoriteToggle}>
                收藏
                <StarOutlined style={{ color: isFavorited ? '#ffbf00' : 'grey' }} /> 
              </Button>
              <br />
              <br />
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>提交答案 </Button>
              </Upload>
            </Col>
          </Row>
        </>
      ) : (
        <div>未找到题目</div>
      )}
    </div>
  );
}
