import FormContainer from "../components/Form/containerForm";
import LoginPicture from "../components/Hearder/loginPicture/loginPicture";
import Logo from "../components/Hearder/Logo/logo";
import "../css/login.css";

export default function login() {
  return (
    <main className="login">
      <div className="left">
        <div className="logologin">
          <Logo />
        </div>
        <FormContainer />
      </div>
      <div className="right">
        <LoginPicture />
        <p className="bulleLogin">
          Analysez vos performances en un clin d’œil, suivez vos progrès et
          atteignez vos objectifs.
        </p>
      </div>
    </main>
  );
}
