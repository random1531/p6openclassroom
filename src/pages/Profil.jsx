import { useData } from "../lib/DataProvider";
import "../css/profile.css";
import CardProfile from "../components/Card/CardProfile/CardProfile";
import UserDetails from "../components/User/UserDetails/UserDetails";
import CardUser from "../components/User/cardUser/CardUser";
export default function Profil() {
  const { userData } = useData();

  const transformTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return { h, m };
  };

  const DayOfRest = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffTime = now - created;
    return Math.floor(diffTime / (1000 * 3600 * 24));
  };

  const DataCard = [
    {
      title: "Temps total couru",
      Value: userData
        ? `${transformTime(userData.statistics.totalDuration).h}h`
        : "Chargement",
      def: userData
        ? `${transformTime(userData.statistics.totalDuration).m}min`
        : "",
    },
    {
      title: "Distance totale parcourue",
      Value: userData
        ? `${userData.statistics.totalDistance}`
        : "Chargement...",
      def: "Km",
    },
    {
      title: "Nombre de sessions",
      Value: userData
        ? `${userData.statistics.totalSessions}`
        : "Chargement...",
      def: "Session",
    },
    {
      title: "Calories brûlées",
      Value: "25000",
      def: "cal",
    },
    {
      title: "Nombre de jours de repos",
      Value: userData
        ? `${
            Math.sign(
              DayOfRest(userData.profile.createdAt) -
                userData.statistics.totalSessions
            ) === -1
              ? 0
              : DayOfRest(userData.profile.createdAt) -
                userData.statistics.totalSessions
          }`
        : "Chargement",
      def: "jours",
    },
  ];

  return (
    <div className="profilemaincontenaire">
      <div className="userdetailscontainer">
        {userData ? <CardUser user={userData} /> : <p>Chargement ...</p>}
        {userData ? <UserDetails user={userData} /> : <p>Chargement...</p>}
      </div>
      <div className="cardprofilecontainer">
        <div className="headprofilcard">
          <h3>Vos statistiques</h3>
          <p className="light">
            depuis le{" "}
            {userData
              ? new Date(userData.profile.createdAt).toLocaleString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Chargement..."}
          </p>
        </div>
        <div className="cardContainers">
          {DataCard.map((e) => (
            <CardProfile key={e.title} Title={e.title} d={e.Value} t={e.def} />
          ))}
        </div>
      </div>
    </div>
  );
}
