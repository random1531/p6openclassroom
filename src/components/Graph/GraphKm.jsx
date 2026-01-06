import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import { fetchDuser } from "../../lib/ActionFetch";
import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
} from "recharts";
import "./graph.css";

export default function GraphKm({ user }) {
  const UserData = user;
  const [data, setData] = useState([]);
  const [startWeek, setstartWeek] = useState(
    new Date(UserData.profile.createdAt)
  );
  const [endWeek, setendWeek] = useState(() => {
    const end = new Date(UserData.profile.createdAt);
    end.setDate(end.getDate() + 28);
    return end;
  });

  //changement de date
  const handleChangeDate = (e) => {
    if (!startWeek) return;
    const Direction = e.currentTarget.id === "right" ? 1 : -1;

    const newStart = new Date(startWeek);
    newStart.setDate(newStart.getDate() + 28 * Direction);
    const newEnd = new Date(newStart);
    newEnd.setDate(newEnd.getDate() + 28);
    setstartWeek(newStart);
    setendWeek(newEnd);
  };

  //Fetch des Data
  useEffect(() => {
    if (!startWeek || !endWeek) return;
    async function fetchdata() {
      const fetched = await fetchDuser(
        startWeek.toISOString().slice(0, 10),
        endWeek.toISOString().slice(0, 10)
      );
      setData(fetched);
    }
    fetchdata();
  }, [startWeek, endWeek]);

  //group
  function getWeekNumber(dateStr) {
    const date = new Date(dateStr);
    const dayNr = (date.getDay() + 6) % 7;
    date.setDate(date.getDate() - dayNr + 3);
    const firstThursday = new Date(date.getFullYear(), 0, 4);
    const diff = date - firstThursday;
    return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
  }

  function groupByWeek(d) {
    const weeks = [];
    const weekMap = {};
    d.forEach((e) => {
      const weekNumber = getWeekNumber(e.date);
      if (!weeks.includes(weekNumber)) weeks.push(weekNumber);
      if (!weekMap[weekNumber]) weekMap[weekNumber] = [];
      weekMap[weekNumber].push(e.distance);
    });

    const result = {};
    weeks.forEach((weekNumber, idx) => {
      const key = `S${idx + 1}`;
      result[key] = weekMap[weekNumber].reduce((a, b) => a + b, 0);
    });
    return result;
  }

  const dataFiltered = useMemo(() => {
    if (!startWeek || !endWeek) return [];

    const filter = data.filter(
      (e) => new Date(e.date) >= startWeek && new Date(e.date) <= endWeek
    );
    const group = groupByWeek(filter);
    return Object.entries(group).map(([week, km]) => ({
      week,
      km,
    }));
  }, [data, startWeek, endWeek]);

  const moyenkm =
    dataFiltered && dataFiltered.length > 0
      ? Math.round(
          (dataFiltered.reduce((a, b) => a + b.km, 0) / dataFiltered.length) *
            10
        ) / 10
      : 0;



  return (
    <div className="mainCardGraph">
    

      <div className="headerKm">
        <div className="headerKmData">
          <p className="blue">{moyenkm} km en moyenne</p>
          <span>
            Total des kilomètres {dataFiltered.length} dernières semaines
          </span>
        </div>
        <div className="changedate">
          <FaRegArrowAltCircleLeft
            className="arrow"
            id="left"
            onClick={handleChangeDate}
            />
          <p className="pickerDate">
            {startWeek.toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
            })}
            {" - "}
            {endWeek.toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
            })}
          </p>
          <FaRegArrowAltCircleRight
            className="arrow"
            id="right"
            onClick={handleChangeDate}
            />
        </div>
      </div>

      <div
        className="monthchart"
        style={{ width: "100%",  height: 310 }}
        >
        <ResponsiveContainer width="100%" height="100%"  minWidth={0} minHeight={0}>
          <BarChart data={dataFiltered}>
            <CartesianGrid />
            <XAxis dataKey="week" />
            <YAxis width={20} />
            <Tooltip />
            <Legend  iconType="circle" wrapperStyle={{ justifyContent: "flex-start", display: "flex" }} />
            <Bar
              barSize={14}
              dataKey="km"
              fill="#B6BDFC"
              radius={[10, 10, 10, 10]}
              />
          </BarChart>
        </ResponsiveContainer>
      </div>
             
    </div>
  );
}
