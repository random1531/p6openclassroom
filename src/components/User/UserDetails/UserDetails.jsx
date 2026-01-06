import "./userdetails.css";

export default function UserDetails({ user }) {
  const d = user;
  return (
    <div className="userdetailsblock">
      <h3 className="title">Votre profil</h3>
      <hr className="bar" />
      {d ? (
        <ul>
          <li>Âge : {d.profile.age}</li>
          <li>Genre : Femme</li>
          <li>Taille : {`${d.profile.height.toString().slice(0,1)}m${d.profile.height.toString().slice(1,3)}`}</li>
          <li>Poids : {d.profile.weight}kg</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
