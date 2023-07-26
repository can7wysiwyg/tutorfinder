import { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";


function MyProfile() {
  const state = useContext(GlobalState);
  const token = state.token;
  const [user, setUser] = useState([]);

  const[isVisitor] = state.userApi.isVisitor
  

const redIrect = () => {
  if(isVisitor) {
    return window.location.href = "/"
  }


}  


redIrect()




  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("https://apigigs.onrender.com/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    };

    getUser();
  }, [token]);

  
  if (user.length === 0) return null;



 

 
  return <div className="container mt-4 mb-4 p-4 d-flex justify-content-center body">

<div className="card" style={{width: "18rem"}}>
  <img className="card-img-top" src={user.userImage} alt={user.fullname} />
  <div className="card-body">
    <h5 className="card-title"> {user.fullname}  </h5>
    <p className="card-text"> {user.username}  </p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">{user.email}  </li>
    <li className="list-group-item">  {user.phoneNumber}  </li>
    <li className="list-group-item">  {user.securityAnswer} </li>
  </ul>
  <div className="card-body">
  <p>  <a href={`/show_my_qualifications/${user._id}`} className="card-link">my qualifications</a> </p>
   <p> <a href={`/manage_my_profile/${user._id}`} className="card-link"> manage my profile </a> </p>
   <p> <a href={"/view_my_socials"} className="card-link"> my social media accounts  </a> </p>


  </div>
</div>






    

  </div>;
}

export default MyProfile;
