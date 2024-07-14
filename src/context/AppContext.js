import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

function AppContextProvider({children}){
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page ,setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const navigate = useNavigate();

    async function fetchBlogPosts(page=1, tag=null, category){
        console.log("in context", page)
        setLoading(true);
        let url = `${baseUrl}?page=${page}`;
        if(tag){
            url+= `&tag=${tag}`;
        }
        if(category){
            url +=`&category=${category}`;
        }
        try{
            const result = await fetch(url);
            const data = await result.json();
            if(!data.posts ||data.posts.length ===0)
                throw new Error("Something went wrong");
            console.log("Api resource " ,data);
            setPage(data.page);
            setPosts(data.posts);
            console.log(data.posts)
            setTotalPages(data.totalPages);
        }
        catch(error){
            console.log("Error in fetching data");
            setPage(1);
            setPosts([]);
            setTotalPages(null);
        }
        setLoading(false);
    }

    function handlePageChange(page){
        navigate({search: `?page=${page}`});
        setPage(page);
        // fetchBlogPosts(page);
    }

    const value  = {
        loading,
        setLoading,
        posts,
        setPosts,
        page,
        setPage,
        totalPages,
        setTotalPages,
        fetchBlogPosts,
        handlePageChange
    };

    return <AppContext.Provider value={value}>
    {children}
    </AppContext.Provider>

}

export default AppContextProvider;