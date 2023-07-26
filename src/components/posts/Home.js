import axios from "axios";
import { GlobalState } from "../../GlobalState";
import "./home.css";
import moment from "moment/moment";
import _ from "lodash";
import { Link } from "react-router-dom";
import { useEffect, useContext, useState } from "react";

const pageSize = 8;

function Home() {
  const state = useContext(GlobalState);

  const [users] = state.usersApi.users;
  const [posts, setPosts] = useState([]);
  const[owner] = state.userApi.owner
  const[toBlock, setToBlock] = useState({})
  const[newPost, setNewPost] = useState([])
  const[genuity, setGenuity] = useState({})
  const [paginated, setPaginated] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0); 
  
   

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get("https://apigigs.onrender.com/subject/show_all");

      // Filter posts based on the user's role
      const filteredPosts = res.data.subject.filter((post) => {
        const postOwner = users.find((user) => user._id === post.subjectOwner);
        return postOwner?.role !== 0;
      });

      setPosts(filteredPosts);

      setNewPost(res.data.subject)
    
    };

    getPosts();
  }, [users]); 



  const pages = _.range(1, pageCount + 1);



  useEffect(() => {
    const newPageCount = Math.ceil(posts.length / pageSize);
    setPageCount(newPageCount);
  }, [posts]);

  // Update the paginated state only when posts change
  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginated(posts.slice(startIndex, endIndex));
  }, [currentPage, posts]);


  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get("https://apigigs.onrender.com/subject/show_all");

      
      setNewPost(res.data.subject)
    
    };

    getPosts();
  }, []); 
  useEffect(() => {

    if(owner) {
      newPost.forEach((item) => {
        if(item.subjectOwner === owner  ) setToBlock(item)
      })
    }
  
  }, [owner, newPost])


  useEffect(() => {

    if(toBlock.subjectOwner) {
    
      users.forEach((user) => {
     if(user._id === toBlock.subjectOwner) setGenuity(user)

      })

    }


  }, [toBlock.subjectOwner, users])


  


   if(genuity.role === 0) {

    return(<div className="text-center" style={{fontStyle: "italic"}} >

      <h1>In a land far far away there was a genius who is thought to have been accused of breaking laws by citizens.</h1>
      <h2>And one day the citizens reported the genius for wrong doings.</h2>
      <h3>We are reviewing your account and you will be contacted if necessary...</h3>

      
    
    
    
    </div>)
  } 
  
 


  if(paginated.length === 0) {
    return(<div className="text-center" style={{marginBottom: "2rem"}}>
      <h1>posts are loading..</h1>
  
      <img src="https://media.tenor.com/9WFsBeb7sr8AAAAC/loading-gif.gif" alt="loading gif" />
  
  
    
    
    </div>)
  }
  
  
  

  return (
    <>
      {paginated.map((post, index) => (
        <ShowOurPosts key={index} post={post}  />
      ))}

<nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages.map((page, index) => (
            <li
              className={page === currentPage ? "page-item active" : "page-item"}
              key={index}
            >
              <p className="page-link" onClick={() => setCurrentPage(page)}>
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav>
      
    </>
  );
}




const ShowOurPosts = ({ post, toBlock }) => {
  const state = useContext(GlobalState);
  const [users] = state.usersApi.users;
  const [person, setPerson] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  

 

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };


  useEffect(() => {
    if (post.subjectOwner) {
       
      users.forEach((user) => {
        if (user._id === post.subjectOwner) setPerson(user);
      });
    }
  }, [post.subjectOwner, users]);

  
  const {subjectCommentary} = post
  const maxChars = 90

  const shouldShowSeeMore = subjectCommentary.length > maxChars;

  
  return (<>
  
  <div className="row d-flex align-items-center justify-content-center">
      <div className="col-md-6">
        <div className="mycard">
          <div className="d-flex justify-content-between p-2 px-3">
            <div className="d-flex flex-row align-items-center">
              {" "}
              <img
                src={person.userImage}
                alt={person.fullname}
                width="50"
                className="rounded-circle"
              />
              <div className="d-flex flex-column ml-2">
                {" "}
                <a href={`/person_profile/${person._id}`} className="card-link" style={{textDecoration: "none"}}>   <span className="font-weight-bold">  {person.fullname}   </span> </a> {" "}
                <small className="text-primary">{ moment(post.updatedAt).format('LLLL')} </small>{" "}
              </div>
            </div>
            
          </div>{" "}
        
          <div className="p-2">
          <h4 className="text-justify">
             <Link to={`/post_single/${post._id}`} style={{textDecorationLine: "none"}}> {post.subjectName} </Link>
            </h4>
            <span className="text-justify">MK{post.subjectPrice}</span>
            <p className="text-justify" style={{fontSize: "18px"}}>
            
            {isExpanded ? subjectCommentary : subjectCommentary.slice(0, maxChars)}
        {shouldShowSeeMore && (
          <span onClick={toggleExpansion}>
            {isExpanded ? `` : <a href={`/post_single/${post._id}`}>see more</a> }
          </span>
        )}

            </p>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-row icons d-flex align-items-center">
                {" "}
                
              </div>
              <div className="d-flex flex-row muted-color">
                {" "}
                
              </div>
            </div>
            <hr />
          
          </div>
        </div>
      </div>
    </div>        
    
  
  </>
     );
};

export default Home;