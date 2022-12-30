import { auth } from "../../firebaseConnection";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import './home.css'

function Home(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault();

        if(email != '' && password != ''){
            await signInWithEmailAndPassword(auth, email, password)
            .then(()=>{
                navigate('/admin', {replace: true});
            })
        }else{
            alert('vazio');
        }
    }
    
    return(
        <section className="section_home">
            <div className="center">
                <h1>Lista de tarefas</h1>
                <p>Gerencie a sua agenda de forma fácil.</p>

                <form className="form_all" onSubmit={handleLogin}>
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

                    <button type="submit">Acessar</button>
                </form>

                <Link to={'/register'}>Não possui uma conta? Crie uma agora</Link>
            </div>
        </section>
    );
}

export default Home;