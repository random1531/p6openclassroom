import "./carduser.css";


export default function userInfo({user}) {
 const d = user


  
  return (
    <>
      {d ? (
        <div className="userinfocontainer">
          <img
            className="profilpic"
            src={d.profile.profilePicture}
            alt=""
          />
          <div className="leftUserHead">
            <h2 className="nameProfile">
              {d.profile.firstName} {d.profile.lastName}
            </h2>
            <span className="longerCreate">
              Menbre depuis le{" "}
              {new Date(d.profile.createdAt).toLocaleString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}
