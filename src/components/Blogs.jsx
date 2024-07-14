import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import Spinner from './Spinner';
import BlogDetail from './BlogDetail';

export default function Blogs() {
  const {posts, loading} = useContext(AppContext);
  console.log(posts)
  return (
    <div className='my-[100px]'>
      <div className='flex flex-col gap-y-10 my-4'>
        {
          loading ?
          (<Spinner />)
          : posts.length==0
          ? (<p className='font-bold text-3xl text-center my-[200px]'>Does not have any posts...</p>)
          :(posts.map((post) => (
            <BlogDetail key={post.id} post={post}/>
          )))
        }
        
      </div>
    </div>
  )
}
