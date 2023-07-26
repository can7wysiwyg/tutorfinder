import { useEffect, useState } from "react"
import axios from "axios"



function UserApi() {

    const [isLogged, setIsLogged] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const [isVisitor, setvisitor] = useState(false)
    const [owner, setOwner] = useState('')


    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')))

    useEffect(() => {

        if(token) {
         
            const getUser = async() => {
                const res = await axios.get('https://apigigs.onrender.com/auth/user', {
                    headers: {Authorization: `Bearer ${token}`}
                })
                setIsLogged(true)

            

                res.data.role === 0 ? setvisitor(true) : setvisitor(false)
                res.data.role === 1 ? setIsUser(true) : setIsUser(false)

                setOwner(res.data._id)

            


            }

            getUser()

        }


    }, [token, owner])

    

    return{
        isLogged: [isLogged, setIsLogged],
        owner: [owner, setOwner],
        isVisitor: [isVisitor, setvisitor],
        isUser: [isUser, setIsUser],
        
    }
}

export default UserApi

