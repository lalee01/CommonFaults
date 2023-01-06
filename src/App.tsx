import { Container } from '@mui/system'
import Menu from '@src/components/pages/menu'
import ModelList from '@src/components/pages/modellist'
import Page404 from './components/pages/page404';
import Providers from '@src/providers';
import ManufacturerList from './components/pages/manufacturerlist';
import PostList from './components/pages/postlist';
import Welcome from './components/pages/welcome';
import '@src/App.css'
import { Route, Routes, Navigate } from 'react-router-dom';
import Post from '@src/components/pages/post';

type ProviderProps = {
  children:  any
}

const App = () => {

  const ProtectedPage = ({children}: ProviderProps)=>{
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/"></Navigate>;
    }
    return children;
  }

  return (
    <Providers>
      <Menu />
      <Container maxWidth="lg">
        <Routes>
        <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<ProtectedPage><ManufacturerList /></ProtectedPage>} />
          <Route path="/manufacturer/:manufacturer" element={<ProtectedPage> <ModelList /> </ProtectedPage>} />
          <Route path="/manufacturer/:manufacturer/model/:model" element={<ProtectedPage> <PostList /> </ProtectedPage>} />
          <Route path="/manufacturer/:manufacturer/model/:model/postid/:postid" element={<ProtectedPage> <Post /> </ProtectedPage>} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Container>
    </Providers>
  )
}

export default App
