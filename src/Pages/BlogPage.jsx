import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import BlogDetail from '../components/BlogDetail';

function BlogPage() {
    const [blog, setBlog] = useState(null);
    const [relatedblogs, setRelatedBlogs] = useState([]);
    const location = useLocation();
    const navigate = useNavigation();
    const {loading, setLoading} = useContext(AppContext);
    const baseUrl= "https://codehelp:apis.vercel.app/api/get-blog";
    const blogId = location.pathname.split("/").at(-1);

    async function fetchRelatedBlogs(){
        setLoading(true);
        const url = `${baseUrl}?blogId=${blogId}`;
        try{
            const res= await fetch(url);
            const data  = await res.json();
            setBlog(data.blog);
            setRelatedBlogs(data.relatedblogs);
        }
        catch(error){
          console.log(error);
          setBlog(null);
          setRelatedBlogs([]);
        }
        setLoading(false);
    }
    useEffect(() =>{
      fetchRelatedBlogs();
    },[location.pathname]);
  return (
    <div  className='my-[100px]'>
      <Header />
      <div className='w-11/12 mx-auto'>
        <div>
          <button  className='border-2 border-gray-300 py-1 px-4 rounded-md mb-6'  onClick={() =>{
            navigate(-1);
          }}>Back</button>
        </div>
        <div>
          {loading ?(
            <Spinner />
          ): blog ?(
          <div>
            <BlogDetail post={blog} />
            <h2 className='text-2xl font-bold my-10'>Related Blogs</h2>
            <div className='flex flex-col gap-y-8'>
              {relatedblogs.map((post) =>(
                <div  key={post.id}>
                  <BlogDetail post={post}/>
                </div>
              ))}
            </div>
          </div>  
          ): (
            <p>No Blog Found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogPage