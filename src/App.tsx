import { Container } from '@mui/system'
import Menu from '@src/components/pages/menu'
import ModelList from '@src/components/pages/modellist'
import Page404 from './components/pages/page404';
import Providers from '@src/providers';
import ManufacturerList from './components/pages/manufacturerlist';
import PostList from './components/pages/postlist';
import '@src/App.css'
import { Route, Routes } from 'react-router-dom';
import Post from '@src/components/pages/post';

const App = () => {

  return (
    <Providers>
      <Menu />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<ManufacturerList />} />
          <Route path="/manufacturer/:manufacturer" element={<ModelList />} />
          <Route path="/manufacturer/:manufacturer/model/:model" element={<PostList />} />
          <Route path="/manufacturer/:manufacturer/model/:model/postid/:postid" element={<Post />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Container>
    </Providers>
  )
}

export default App
