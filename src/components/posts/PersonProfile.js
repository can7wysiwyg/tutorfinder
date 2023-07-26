import { useContext, useEffect, useState } from "react";
import "./personProfile.css";
import { GlobalState } from "../../GlobalState";
import { useParams } from "react-router-dom";

function PersonProfile() {
  
    const[user, setUser] = useState({})
    const state = useContext(GlobalState)
    const[users] = state.usersApi.users
    const{id} = useParams()

    useEffect(() => {
        if(id) {
            users?.forEach((person) => {
                if(person._id === id) setUser(person)
            })
        }

    }, [id, users])

  
    
if(Object.keys(user).length <= 0 ) {
    return(<>
    <p>😉😉😁 user is loading</p>
    </>)
}
    




    

    
  return (
    <>
        <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-xl-6 col-md-12">
            <div className="card user-card-full cardContainer">
              <div className="row m-l-0 m-r-0">
                <div className="col-sm-4 bg-c-lite-green user-profile">
                  <div className="card-block text-center text-white">
                    <div className="m-b-25">
                      <img
                        src={user.userImage}
                        className="img-radius"
                        alt="User-Profile"
                        style={{maxWidth: "80%", maxHeight: "30vh"}}
                      />
                    </div>
                    <h6 className=" card-title h3 f-w-600">{user.fullname}</h6>
                    <p>Tutor</p>
                    
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="card-block">
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Email</p>
                        <h6 className="text-muted f-w-400">{user.email}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Phone</p>
                        <h6 className="text-muted f-w-400">{user.phoneNumber}</h6>
                      </div>
                    </div>
                   
                    <div className="row">
                      <div className="col-sm-6">
                        <a href={`/subjects_view/${user._id}`} style={{textDecoration: "none"}} className="m-b-10 f-w-600">Subjects</a>
                    
                      </div>
                      <div className="col-sm-6">
                        <a href={`/qualifications_view/${user._id}`} className="m-b-10 f-w-600" style={{textDecoration: "none"}}>Qualifications</a>
                    
                      </div>
                    </div>
                    <ul className="social-link list-unstyled m-t-40 m-b-10">
                    <li><a href={user.facebookLink} ><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                    <li><a href={user.twitterLink}><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                    <li><a href={user.linkedInLink}><i class="mdi mdi-linkedin feather icon-linkedin linkedin" aria-hidden="true"></i></a></li>
                   <li><a href={`https://wa.me/${user.whatsappLink}`} aria-label="WHatsapp"><i class="mdi mdi-whatsapp feather icon-whatsapp whatsapp" aria-hidden="true"></i></a></li>   
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     
    </>
  );
}

export default PersonProfile;
