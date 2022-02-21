import React,{useEffect} from 'react'
import "./Getmore.css"
import "./Login.css"
import { useParams,useNavigate } from 'react-router-dom';
const GetMoreInfo = () => {
  const { user } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate("/login") 
  },[])
  return (
    <div className="container-fluid getmore">
      <div className='login__warpper'>
        getMoreInfo
      </div>
    </div>
  )
}

export default GetMoreInfo;