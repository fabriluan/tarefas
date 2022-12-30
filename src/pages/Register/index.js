import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleRegister(e){
        e.preventDefault();

        if(email != '' && password != ''){
            await createUserWithEmailAndPassword(auth, email, password)
            .then(()=>{
                navigate('/admin', {replace: true});
            })
            .catch(()=>{
                alert('erro')
            })
        }else{
            alert('Errou Cadastro');
        }
    }

    return(
        <section className="section_home">
            <div className="center">
                <h1>Crie sua conta</h1>
                <p>Crie uma agora</p>

                <form className="form_all" onSubmit={handleRegister}>
                    <input 
                    type="text"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <input 
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Cadastrar</button>
                </form>

                <Link to={'/'}>Já possui uma conta? Faça o login</Link>
            </div>
        </section>
    );
}

export default Register;