import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import { fetchDuser } from "../../lib/ActionFetch";
import "./graph.css";

export default function GraphEart({ user }) {
  const userData = user;

  const [data, setData] = useState([]);
  function getFirstMonday(date) {
    let d = new Date(date);
    let day = d.getDay();
    if (day === 0) day = 7;
    if (day !== 1) {
      d.setDate(d.getDate() - (day - 1));
    }
    return d;
  }
  const [StartWeek, SetStartWeek] = useState(() =>
    getFirstMonday(userData.profile.createdAt)
  );

  const [EndWeek, SetEndWeek] = useState(() => {
    const end = new Date(getFirstMonday(userData.profile.createdAt));
    end.setDate(end.getDate() + 6);
    return end;
  });

  useEffect(() => {
    async function callData() {
      const dx = await fetchDuser(
        StartWeek.toISOString().slice(0, 10),
        EndWeek.toISOString().slice(0, 10)
      );
      setData(await dx);
    }
    callData();
  }, [StartWeek, EndWeek]);

  const handleChangeDate = (e) => {
    const incDirection = e.target.id === "right" ? 1 : -1;
    const newStart = new Date(StartWeek.getTime());
    newStart.setDate(newStart.getDate() + 7 * incDirection);
    SetStartWeek(newStart);

    const newEnd = new Date(newStart.getTime());
    newEnd.setDate(newEnd.getDate() + 6);
    SetEndWeek(newEnd);
  };

  const jours = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  const dataRefDate = jours.map((jour, idx) => {
    const found = data.find((obj) => {
      const objDay = jours[(new Date(obj.date).getDay() + 6) % 7];
      return objDay === jour;
    });
    if (found) {
      return {
        ...found,
        day: jour,
      };
    } else {
      return {
        day: jour,
        heartRate: { min: 0, max: 0, average: 0 },
      };
    }
  });

  const FreqMoycardiaque =
    data && data.length > 0
      ? Math.floor(
          data.reduce((a, b) => a + b.heartRate.average, 0) / data.length
        )
      : 0;

  const renderLegend = () => <ul></ul>;

  return (
    <div className="carda">
      <div className="headerKm">
        <div className="headerKmData">
          <p className="orange">{FreqMoycardiaque} BPM</p>
          <span>Fréquence cardiaque moyenne</span>
        </div>
        <div className="changedate">
          <FaRegArrowAltCircleLeft
            className="arrow"
            id="left"
            onClick={handleChangeDate}
          />
          <p>
            {StartWeek.toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
            })}
            -
            {EndWeek.toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
            })}{" "}
          </p>
          <FaRegArrowAltCircleRight
            className="arrow"
            id="right"
            onClick={handleChangeDate}
          />
        </div>
      </div>

      {dataRefDate && dataRefDate.length > 0 ? (
        <ResponsiveContainer width="100%" height={380}>
          <ComposedChart
            data={dataRefDate || []}
            margin={{ top: 20, right: 10, bottom: 0, left: 10 }}
            barCategoryGap="35%"
            barGap={3}
          >
            <CartesianGrid stroke="#f5f5f5" vertical={false} />

            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={30} />
              <Bar
              dataKey="heartRate.min"
              fill="#FCC1B6"
              name="min"
              legendType="circle"
              barSize={14}
              radius={[16, 16, 16, 16]}

            />
            <Bar
              dataKey="heartRate.max"
              fill="#F4320B"
              name="max"
              barSize={14}
              radius={[16, 16, 16, 16]}
              legendType="circle"
            />
          
            <Line
              type="monotone"
              dataKey="heartRate.average"
              name="moy"
              stroke="#F2F3FF"
              strokeWidth={2}
              dot={{ r: 5,fill:"#0B23F4"}}
              legendType="line"
              
            />
            <Legend
              wrapperStyle={{ justifyContent: "flex-start", display: "flex",flexDirection:"row",width:"100%" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <p>Pas de donnée</p>
      )}
    </div>
  );
}
