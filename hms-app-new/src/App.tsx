import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import './App.css'
import Home from './pages/Home'
import IdeaPortal from './pages/IdeaPortal'
import YourIdea from './pages/YourIdea'
import Archive from './pages/Archive'
import NoPage from './pages/NoPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="Idea_Portal" element={<IdeaPortal />} />
        <Route path="Your_Idea" element={<YourIdea />} />
        <Route path="Archive" element={<Archive />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  )
}

export default App
