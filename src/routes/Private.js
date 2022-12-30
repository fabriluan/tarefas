import { auth } from "../firebaseConnection";
import { useState, useEffect } from "react";
import { onAuthStateChanged, reauthenticateWithCredential } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Private({children}){

    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(()=>{
        async function CheckLogin(){
            const unsub = onAuthStateChanged(auth, (user) =>{
                if(user){
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }

                    localStorage.setItem('@dateuser', JSON.stringify(userData));

                    setLoading(false);
                    setSigned(true);
                }else{
                    setLoading(false);
                    setSigned(false);
                }
            })
        }

        CheckLogin()

    }, [])

    if(loading){
        return(
            <div></div>
        )
    }

    if(!signed){
        return <Navigate to={'/'} />
    }

    return children;
}