import "./containerform.css"
import Form from "../Form/FormLogin/FormLogin"
export default function containerform(){
    return(
        <div className="container">
            <h1 className="titlelogin">Transformez 
vos stats en résultats</h1>
            <Form/>
            <span className="missedpassword">Mot de passe oublié ?</span>
        </div>
    )
}