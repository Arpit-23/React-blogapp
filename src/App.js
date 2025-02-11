import Home from './Pages/Home';
import BlogPage from './Pages/BlogPage';
import CategoryPage from './Pages/CategoryPage';
import TagPage from './Pages/TagPage';
import './App.css';
import { Route,Routes, useLocation, useSearchParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AppContext } from './context/AppContext';

function App() {
  const {fetchBlogPosts} = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  useEffect(() =>{
    const page = searchParams.get("page")?? 1;
    if(location.pathname.includes("tags")){
      const tag = location.pathname.split("/").at(-1).replace("-"," ");
      fetchBlogPosts(Number(page), tag);
    }
    else if(location.pathname.includes("categories")){
      const category = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), null, category);
    }
    else{
      console.log("inside app.js ", page)
      fetchBlogPosts(Number(page));
    }
  },[location.pathname,location.search]);
  return (
   <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog/:blogId' element={<BlogPage/>}/>
        <Route path='/tags/:tag' element={<TagPage/>}/>
        <Route path='/categories/:category' element={<CategoryPage/>}/>
      </Routes>
   </div>
  );
}

export default App;
