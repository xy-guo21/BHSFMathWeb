'use client'
import React from 'react'
import {createRoot} from 'react-dom/client'
import Markdown from 'react-markdown'

// const markdown = '# Hi, Pluto*!'
const markdown = '# Hi, $$a_2$$ Pluto*!'

const App: React.FC = () => {
    return <Markdown>{markdown}</Markdown>
}
export default App