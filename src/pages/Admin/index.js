import { async } from '@firebase/util';
import { signOut } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConnection';
import './admin.css';

function Admin(){

    const [task, setTask] = useState('');
    const [user, setUser] = useState({});
    const [post, setPost] = useState([]);
    const [edit, setEdit] = useState({});

    useEffect(()=>{
        async function LoadTask(){
            const userDat = localStorage.getItem('@dateuser');

            setUser(JSON.parse(userDat));

            if(userDat){
                const data = JSON.parse(userDat);
                
                const tarefaRef = collection(db, 'tarefas');

                const q = query(tarefaRef, orderBy('date', 'desc'), where('userUid', '==', data?.uid));
                const unsub = onSnapshot(q, (snapshot)=>{
                    let lista = [];

                    snapshot.forEach((item)=>{
                        lista.push({
                            id: item.id,
                            tarefa: item.data().tarefa,
                            userUid: item.data().userUid
                        })
                    })

                    setPost(lista);
                })

            }
        }

        LoadTask();
    }, [])

    async function handleLogout(){
        await signOut(auth)
    }

    async function handlePost(e){
        e.preventDefault();

        if(task === ''){
            alert('Vazio')
            return;
        }

        if(edit?.id){
            handleUpdatePost()
            return;
        }

        await addDoc(collection(db, 'tarefas'), {
            tarefa: task,
            date: new Date(),
            userUid: user?.uid
        })
        .then(()=>{
            setTask('')
        })
        .catch((e)=>{
            alert('error');
        })
    }

    async function deletePost(id){
        const docRef = doc(db, 'tarefas', id);
        await deleteDoc(docRef)
    }

    async function editPost(item){
        setTask(item.tarefa);
        setEdit(item);
    }

    async function handleUpdatePost(){
        const docRef = doc(db, 'tarefas', edit?.id);

        await updateDoc(docRef, {
            tarefa: task
        })
        .then(()=>{
            alert('Atualizou');
            setEdit({})
            setTask('')
        })
        .catch(()=>{
            alert('Errou');
            setEdit({})
            setTask('')
        })
    }

    return(
        <section className="section_home">
            <div className="center">
                <h1>Minhas tarefas</h1>

                <form className="form_all">
                    <textarea value={task} placeholder="Digite a sua tarefa" onChange={(e)=>{ setTask(e.target.value)}}></textarea>

                    {Object.keys(edit).length > 0 ?(
                        <button type="submit" onClick={ handlePost }>Atualizar tarefa</button> 
                    ) : (        
                        <button type="submit" onClick={ handlePost }>Adicionar tarefa</button>
                    )}

                </form>

                {post.map((list)=>(

                    <article key={list.id} className="list_task"> 
                        <span>{list.tarefa}</span>

                        <div className="group_btn">
                            <button onClick={() => editPost(list)} >Editar</button>
                            <span onClick={() => deletePost(list.id)}>Concluir</span>
                        </div>
                    </article>

                ))}


                <h2 onClick={ handleLogout } className="sair">Sair</h2>
            </div>
        </section>
    );
}

export default Admin;