'use client'
import React, { useState } from 'react';
import { Input, Button, Row, Col, Typography, Tag, Select } from 'antd';


const { Title } = Typography;
const { Option } = Select;

// 模拟数学竞赛题目数据（中文）
const mockMathContestQuestions = [
    { id: '1', title: '解方程：2x + 5 = 11，求 x 的值', difficulty: 2, topics: ['代数'], source: '数学竞赛 2020' },
    { id: '2', title: '前 10 个质数的和是多少？', difficulty: 5, topics: ['数论'], source: '数学奥林匹克练习' },
    { id: '3', title: '如果一个三角形的角度分别为30°、60°和90°，其边长的比是多少？', difficulty: 3, topics: ['几何'], source: '几何挑战' },
    { id: '4', title: '解方程组：3x + y = 10，2x - y = 5', difficulty: 4, topics: ['代数'], source: '数学竞赛 2019' },
    { id: '5', title: '在一个数列中，每一项是前一项加 3 得到的。如果第一项是 4，求第 10 项是多少？', difficulty: 3, topics: ['组合'], source: '数值模式测试' },
    { id: '6', title: '一个矩形田地长40米，宽30米，其面积是多少平方米？', difficulty: 2, topics: ['几何'], source: '数学测验' },
    { id: '7', title: '如果一个直角三角形的边长分别是5、12和13，最大的角的度数是多少？', difficulty: 4, topics: ['几何'], source: '三角学挑战' },
    { id: '8', title: '当 2^10 被 7 整除时，余数是多少？', difficulty: 5, topics: ['数论'], source: '数学奥林匹克准备' },
    { id: '9', title: '一个圆的半径是8厘米，其周长是多少？', difficulty: 3, topics: ['几何'], source: '圆形性质测试' },
    { id: '10', title: '简化表达式：(4a^2b^3)(2ab^2)', difficulty: 2, topics: ['代数'], source: '代数基础' },
    // 添加更多的数学竞赛题目
    // ...
    { id: '17', title: '如果一个正方形的周长是36厘米，每边的长度是多少？', difficulty: 2, topics: ['几何'], source: '几何挑战' },
    { id: '18', title: '一个数列由递推关系定义：a_n = a_{n-1} + 2，其中 a_1 = 3。求这个数列的第 5 项。', difficulty: 3, topics: ['组合'], source: '数值模式测试' },
    { id: '19', title: '解不等式：2x - 7 > 5', difficulty: 4, topics: ['代数'], source: '数学竞赛 2021' },
    { id: '20', title: '一个直角三角形中，一个角是45°。如果斜边长度是10厘米，邻边的长度是多少？', difficulty: 3, topics: ['几何'], source: '三角学挑战' },
  ];
  

const ProblemSearch: React.FC = () => {
  const [questionId, setQuestionId] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | undefined>(undefined);
  const [selectedSource, setSelectedSource] = useState('');
  const [question, setQuestion] = useState<any>(null); // Updated type

  const handleSearch = () => {
    // Simulate fetching question from a database by criteria
    const foundQuestion = mockMathContestQuestions.find(q =>
      (q.id === questionId || !questionId) &&
      (q.topics.includes(selectedTopic) || !selectedTopic) &&
      (q.difficulty === selectedDifficulty || selectedDifficulty === undefined) &&
      (q.source === selectedSource || !selectedSource)
    );
    setQuestion(foundQuestion);
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col span={8}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          题目搜索
        </Title>
        <Input
          placeholder="输入题目ID"
          value={questionId}
          onChange={(e) => setQuestionId(e.target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <Select
          showSearch
          style={{ width: '100%', marginBottom: '1rem' }}
          placeholder="选择题目类别"
          optionFilterProp="children"
          onChange={(value) => setSelectedTopic(value)}
        >
          {mockMathContestQuestions.flatMap(question => question.topics).filter((value, index, self) => self.indexOf(value) === index).map((topic, index) => (
            <Option key={index} value={topic}>{topic}</Option>
          ))}
        </Select>
        <Select
          style={{ width: '100%', marginBottom: '1rem' }}
          placeholder="选择题目难度（1-7）"
          onChange={(value) => setSelectedDifficulty(value)}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((difficulty, index) => (
            <Option key={index} value={difficulty}>{difficulty}</Option>
          ))}
        </Select>
        <Select
          showSearch
          style={{ width: '100%', marginBottom: '1rem' }}
          placeholder="选择题目来源"
          optionFilterProp="children"
          onChange={(value) => setSelectedSource(value)}
        >
          {mockMathContestQuestions.flatMap(question => question.source).filter((value, index, self) => self.indexOf(value) === index).map((source, index) => (
            <Option key={index} value={source}>{source}</Option>
          ))}
        </Select>
        <Button type="primary" onClick={handleSearch} style={{ width: '100%' }}>
          搜索
        </Button>
        {question && (
          <div style={{ marginTop: '2rem' }}>
            <Title level={3}>搜索结果</Title>
            <div>
              <Title level={4}>{`题目ID: ${question.id}`}</Title>
              <Title level={5}>{`标题: ${question.title}`}</Title>
              <p>{`难度: ${question.difficulty}`}</p>
              <p>{`来源: ${question.source}`}</p>
              <p>
                类别: {question.topics.map((topic: string, index: number) => (
                  <Tag key={index}>{topic}</Tag>
                ))}
              </p>
            </div>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default ProblemSearch;
