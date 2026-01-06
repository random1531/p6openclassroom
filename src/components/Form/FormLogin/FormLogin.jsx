import { connexion } from "../../../lib/ActionFetch";
import { useState } from 'react';
import "./form.css"
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router';


function Form() {
    const redirect = useNavigate()
    const [message, setMessage] = useState("")
    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const data = await connexion({ username, password });
        setMessage(data.message)
        if(data.status === 200){
           redirect("/dashboard")
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                    <span className='headerform'>Se connecter</span>
                <div className='inputform'>
                <label>Adresse email</label>
                <input name="username" type="text" />
                </div>
                <div className='inputform'>
                <label>Mot de passe</label>
                <input name="password" type="password" />
                </div>
                <button className='btnsubmit' type="submit">Se connecter</button>
                <p>{message}</p>
            </form>

        </>
    );
}

export default Form;