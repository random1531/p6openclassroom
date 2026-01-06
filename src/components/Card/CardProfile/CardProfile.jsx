import "./cardprofile.css";

export default function card({ Title, d, t }) {
  return (
    <div className="cardContainer">
      <p className="cardtitle">{Title}</p>
      <p className="carddata">
        {d} <span>{t}</span>
      </p>
    </div>
  );
}
