import "./CardProfile.css";
import { useData } from "../../../../lib/DataProvider";

export default function userInfo() {
  const { userData } = useData();

  return (
    <>
      {userData ? (
        <div className="userinfocontainers">
          <div className="leftpart">
            <img
              className="profilpic"
              src={userData.profile.profilePicture}
              alt=""
            />
            <div className="leftUserHead">
              <h2 className="nameProfile">
                {userData.profile.firstName} {userData.profile.lastName}
              </h2>
              <span className="longerCreate">
                Menbre depuis le{" "}
                {new Date(userData.profile.createdAt).toLocaleString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="rightpart">
            <p className="light">Distance total parcourue</p>
            <p className="distancehead">{userData.statistics.totalDistance} Km</p>
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}
