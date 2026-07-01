import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import RecipeList from './pages/RecipeList'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<RecipeList />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
