import "./header.css";
import Logo from "../Hearder/Logo/logo";
import { useNavigate } from "react-router";

export default function header() {
  const navigate = useNavigate();

  const diconect = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const NavProfil = () => {
    navigate("/profile");
  };
  const Navdashboar = () => {
    navigate("/dashboard");
  };
  return (
    <header>
      <Logo />
      <nav className="navigationbar">
        <div className="pagination">
          <p onClick={Navdashboar}>Dashboard</p>
          <p onClick={NavProfil}>Mon profil</p>
        </div>
        <p onClick={diconect} className="disconnect">
          Se déconnecter
        </p>
      </nav>
    </header>
  );
}
