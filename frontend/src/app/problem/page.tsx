'use client'
import React, { useState } from 'react';
import { Input, Button, Row, Col, Typography, Tag, Select, Divider } from 'antd';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { DEBUG_NO_BACKEND } from '../Global/self_setting';
import { APIUrl } from '../../../public/GlobalVariables';
import { SERVER_ROOT_URL } from '../Global/url';
import { ProblemQueryFilterMessage, ProblemQueryIDMessage } from './ProblemQueryMessage';
import { useRouter } from 'next/navigation';

const { Title } = Typography;
const { Option } = Select;

// 模拟数学竞赛题目数据（中文）
const mockQuestions = [
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
    const router = useRouter()
    const [searchMode, setSearchMode] = useState<'id' | 'filter'>('id');
    const [questionId, setQuestionId] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<number | undefined>(undefined);
    const [selectedSource, setSelectedSource] = useState('');
    const [questionById, setQuestionById] = useState(null);
    const [questionByFilter, setQuestionByFilter] = useState(null);
  
    const handleIdSearch = () => {
      // Simulate fetching question from a database by ID
      if (DEBUG_NO_BACKEND){
        const foundQuestion = mockQuestions.find(q => q.id === questionId);
        setQuestionById(foundQuestion);
        return
      }
      fetch(SERVER_ROOT_URL + 'problemQueryID', {
        method: "POST", 
        headers: {"Content-Type":"text/plain"},
        body: JSON.stringify(new ProblemQueryIDMessage(questionId))
      }).then(response=> response.json()).then( replyJson =>{
        // setQuestionById(replyJson)
        console.log(replyJson)
      })
    };
  
    const handleFilterSearch = () => {
      // Simulate fetching questions from a database by topic, difficulty, and source
      if (DEBUG_NO_BACKEND){
        const foundQuestions = mockQuestions.filter(q =>
          (selectedTopic === '' || selectedTopic === '不限' || q.topics.includes(selectedTopic)) &&
          (selectedDifficulty === undefined || selectedDifficulty === '不限' || q.difficulty === selectedDifficulty) &&
          (selectedSource === '' || selectedSource === '不限' || q.source === selectedSource)
        );
        setQuestionByFilter(foundQuestions);
        return
      }
      fetch(SERVER_ROOT_URL + 'problemQueryFilter', {
        method: "POST", 
        headers: {"Content-Type":"text/plain"},
        body: JSON.stringify(new ProblemQueryFilterMessage(selectedTopic, selectedDifficulty, selectedSource))
      }).then(response=> response.json()).then( replyJson =>{
        console.log(replyJson)
        // setQuestionByFilter(replyJson)
      })

    };
  
    const switchToIdMode = () => {
      setSearchMode('id');
    };
  
    const switchToFilterMode = () => {
      setSearchMode('filter');
    };
  
    return (
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Col span={16}>
          <Row justify="center" gutter={16}>
            {/* Switch Buttons */}
            <Col span={24} style={{ marginBottom: '1rem', textAlign: 'center' }}>
              <Button type={searchMode === 'id' ? 'primary' : 'default'} onClick={switchToIdMode} style={{ marginRight: '1rem' }}>
                题号搜索
              </Button>
              <Button type={searchMode === 'filter' ? 'primary' : 'default'} onClick={switchToFilterMode}>
                过滤器搜索
              </Button>
            </Col>
  
            {/* Left Side: Search by ID */}
            {searchMode === 'id' && (
              <Col span={12}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  题号搜索
                </Title>
                <Input
                  placeholder="请输入题目ID"
                  value={questionId}
                  onChange={(e) => setQuestionId(e.target.value)}
                  style={{ marginBottom: '1rem' }}
                />
                <Button type="primary" onClick={handleIdSearch} style={{ width: '100%', marginBottom: '1rem' }}>
                  搜索
                </Button>
                {questionById && (
                  <div style={{ marginTop: '2rem' }}>
                    <div style={{ flex: 1 }}>
                      {/* 显示题目内容的缩略 */}
                      <Title level={5}>{`${questionById.id}: ${questionById.title.slice(0, 10)}${questionById.title.length > 10 ? '...' : ''}`}</Title>
                    </div>
                    {/* 添加查看详情按钮 */}
                    <Button onClick={()=>{router.push('/problem/'+questionById.id)}}>查看详情</Button>
                    {/* <Router> */}
                      {/* <Link to={`/problem/${questionById.id}`} style={{ marginLeft: '1rem' }}>查看详情</Link> */}
                    {/* </Router> */}
                  </div>
                )}
              </Col>
            )}
  
            {/* Right Side: Search by Filter */}
            {searchMode === 'filter' && (
              <Col span={12}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  过滤器搜索
                </Title>
                <Select
                  showSearch
                  style={{ width: '100%', marginBottom: '1rem' }}
                  placeholder="请选择类别"
                  optionFilterProp="children"
                  onChange={(value) => setSelectedTopic(value)}
                >
                  <Option value="不限">不限</Option>
                  {mockQuestions.flatMap(question => question.topics).filter((value, index, self) => self.indexOf(value) === index).map((topic, index) => (
                    <Option key={index} value={topic}>{topic}</Option>
                  ))}
                </Select>
                <Select
                  style={{ width: '100%', marginBottom: '1rem' }}
                  placeholder="请选择难度"
                  onChange={(value) => setSelectedDifficulty(value)}
                >
                  <Option value="不限">不限</Option>
                  {[1, 2, 3, 4, 5, 6, 7].map((difficulty, index) => (
                    <Option key={index} value={difficulty}>{difficulty}</Option>
                  ))}
                </Select>
                <Select
                  showSearch
                  style={{ width: '100%', marginBottom: '1rem' }}
                  placeholder="请选择来源"
                  optionFilterProp="children"
                  onChange={(value) => setSelectedSource(value)}
                >
                  <Option value="不限">不限</Option>
                  {mockQuestions.flatMap(question => question.source).filter((value, index, self) => self.indexOf(value) === index).map((source, index) => (
                    <Option key={index} value={source}>{source}</Option>
                  ))}
                </Select>
                <Button type="primary" onClick={handleFilterSearch} style={{ width: '100%' }}>
                  搜索
                </Button>
                {questionByFilter && (
                  <div style={{ marginTop: '2rem' }}>
                    <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                        找到 {questionByFilter.length} 道符合要求的题目
                    </p>
                    {questionByFilter.map((q, index) => (
                      <div key={index} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                          <Title level={5}>{`${q.id}:${q.title.slice(0, 10)}${q.title.length > 10 ? '...' : ''}`}</Title>
                        </div>  
                        <Router>
                          <Link to={`/problem/${q.id}`}>查看详情</Link>
                        </Router>
                      </div>                      
                    ))}
                  </div>
                )}
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    );
  };
  
  export default ProblemSearch;
  