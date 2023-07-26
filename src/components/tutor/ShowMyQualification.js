import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { Card } from "react-bootstrap";

function ShowMyQualification() {
  const state = useContext(GlobalState);
  const token = state.token;
  const [userQualification, setUserQualification] = useState([]);
  const[isVisitor] = state.userApi.isVisitor
  

const redIrect = () => {
  if(isVisitor) {
    return window.location.href = "/"
  }


}  


redIrect()


  useEffect(() => {
    const getSingleUser = async () => {
      const res = await axios.get("https://apigigs.onrender.com/qualification/owner_view", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserQualification(res.data.owned);
    };

    getSingleUser();
  }, [token]);

  if (userQualification.length === 0) {
    return (
      <>
        <h1 className="text-center">
          Please create your qualifications for better success
        </h1>
        <Link to={`/create_qualification`}>Create Here</Link>
      </>
    );
  }

  return (
    
    <div className="container">
    <h1 style={{ marginBottom: "2rem", textAlign: "center" }}>My Qualification(s)</h1>
    <div className="row">
      {userQualification?.map((userQ) => (
        <div key={userQ._id} className="col-md-4">
          <DisplayMyQualification userQ={userQ} />
        </div>
      ))}
    </div>
  </div>
  
    
  );
}



const DisplayMyQualification = ({ userQ }) => {
  return (
    <div>
      <Card>
        <Card.Img
          src={userQ.qualificationImage}
          style={{ width: "100%", height: "100%" }}
          variant="top"
        />
        <Card.Body>
          <Card.Title as="div">
            qualification name: {userQ.qualification}
          </Card.Title>
          <Card.Text as="p">my Specialty: {userQ.tutorSpecialty1}</Card.Text>
          <Card.Text as="p"> {userQ.tutorSpecialty2}</Card.Text>
          <Card.Text as="p"> {userQ.tutorSpecialty3}</Card.Text>
          <Card.Link href={`/delete_qualification/${userQ._id}`} className="d-block p-2">
            delete qualification{" "}
          </Card.Link>
          <Card.Link href="/my_profile" className="d-block p-2">
            back to profile{" "}
          </Card.Link>
        </Card.Body>
      </Card>
    
    </div>
  );
};

export default ShowMyQualification;
