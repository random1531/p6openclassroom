import "./footer.css";
import mini from "../../assets/minilogo.png";
export default function Footer() {
  return (
    <footer>
      <p>©Sportsee Tous droits réservés</p>
      <div className="rightfooter">
        <p>Conditions générales</p>
        <p>Contact</p>
        <img src={mini} alt="" />
      </div>
    </footer>
  );
}
