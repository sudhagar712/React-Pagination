import React,{useState , useEffect} from 'react'
import './App.css'

const App = () => {
  const [data , setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [ currentPage , setCurrentPage ] = useState(1);
    const [postPerPage  , setPostPerPage ] = useState(10);


    

useEffect(()=>{
  const fetchData = async () => {
      
    try{
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setData(data)
      setLoading(false)
      console.log(data)
    }
    catch(error){
      console.error(error);
    }
  }
  fetchData();

},[])


const indexOfLastPost = currentPage * postPerPage;

const indexOfFirstPost = indexOfLastPost - postPerPage;


const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

const totalPages = Math.ceil(data.length / postPerPage);




const paginate = (page) => {
setCurrentPage(page)
}



if (loading) return <p>Loading...</p>;



  return (
    <div>
      <h1>Simple pagination</h1>
      <ul>
        {currentPosts.map((post) => {
          return (
            <li key={post.id}>
              {post.id} - &nbsp;&nbsp;
              {post.title}
            </li>
          );
        })}
      </ul>

      <div className="pagination">
        <button onClick={() => paginate(1)} type="button">
          First
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
          type="button"
        >
          Previous
        </button>

        {new Array(totalPages).fill(0).map((_, index) => (
          <button
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => paginate(index + 1)}
            key={index + 1}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
          type="button"
        >
          Next
        </button>
        <button onClick={() => paginate(totalPages)} type="button">
          Last
        </button>
      </div>
    </div>
  );
}

export default App
