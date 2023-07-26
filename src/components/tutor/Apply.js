import { useContext } from "react"
import { GlobalState } from "../../GlobalState"
import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"


function Apply() {
   const state = useContext(GlobalState)
   const token = state.token
   const[owner] = state.userApi.owner
   const [description, setDescription] = useState("")
   const [apply, setApply] = useState({})


   useEffect(() => {

    const getApply = async() => {

const res = await axios.get(`https://apigigs.onrender.com/user/show_review/${owner}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

setApply(res.data.result)

    }

    getApply()


   }, [owner, token])

   
   const handleChange = (event) => {
    setDescription(event.target.value)
   }

   const handleSubmit = async(event) => {
    event.preventDefault()
     
    await axios.post(`https://apigigs.onrender.com/user/application_form/${owner}`, {description}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    window.location.href = "/"

   }

   if(Object.keys(apply).length > 1) {
    return(
<div className="text-center">

<h2>you arleady submitted a report.. wait as we are reviewing it..</h2>


</div>)
}



    return(<div style={{marginBottom: "2rem", marginTop: "2rem", fontFamily: "cursive"}}>
        <h1 className="text-center" > submit report to reinstate your account...</h1>
 <form onSubmit={handleSubmit}>
        <div className="form-outline">
  <textarea className="form-control" id="textAreaExample1" rows="4"  value={description} onChange={handleChange}></textarea>
  <div style={{marginTop: "2rem"}}>
  <button className="btn btn-secondary" for="textAreaExample" >Submit</button>
  </div>
  
</div>

</form>
 
    
    
    </div>)
}

export default Apply