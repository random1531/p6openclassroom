import CardProfile from "../components/Card/CardDashboard/Profil/CardProfile";
import GraphObjectif from "../components/Graph/GraphObjectif"
import GraphKm from "../components/Graph/GraphKm"
import GraphEart from "../components/Graph/GraphEartRate"
import {useData} from "../lib/DataProvider"
import "../css/dashboard.css"
export default function dashboard() {
  const {userData} = useData()
  return (
    <div className="mainDash">
      <CardProfile />

      
      <div className="graphContainer">

      <h2>Vos dernier performance</h2>
      <div className="graph">
        
      {userData ? <GraphKm user={userData}/> : <p>Chargement ..... </p> }
      {userData ? <GraphEart user={userData}/> : <p>Chargement ..... </p> }
      </div>
      <GraphObjectif/>
      </div>


    </div>
  );
}
