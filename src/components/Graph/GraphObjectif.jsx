import { Pie, PieChart, Tooltip, Legend, Cell } from "recharts";
import { fetchDuser } from "../../lib/ActionFetch";
import { useEffect, useState } from "react";
import "./graph.css";
export default function Objectif() {
  const [DFetch, SetDFetch] = useState([]);
  useEffect(() => {
    async function callData() {
      const d = await fetchDuser("2025-01-06", "2025-01-12");
      SetDFetch(await d);
    }
    callData();
  }, []);

  const dataPie = [
    {
      a: "réalisées",
      value: Array.isArray(DFetch) ? DFetch.length : 0,
      color: "#0B23F4",
    },
    {
      a: "restants",
      value: 6 - (Array.isArray(DFetch) ? DFetch.length : 0),
      color: "#B6BDFC",
    },
  ];


  const renderLegend = () => (
    <ul style={{ listStyle: "none", padding: 0, margin: 0,display:"flex" }}>
      {dataPie.map((entry, index) => (
        <li
          key={`legend-${index}`}
          style={{ display: "flex", alignItems: "center", marginBottom: 0 }}
        >
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              background: entry.color,
              borderRadius: "50%",
              marginRight: 8,
            }}
          ></span>
          {entry.value} {entry.a}
        </li>
      ))}
    </ul>
  );


 const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  index
}) => {
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  const entry = dataPie[index];

  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r={6} fill={entry.color} />
      <text
        x={10}
        y={4}
        fill="#333"
        fontSize={12}
        textAnchor="start"
      >
        {entry.value} {entry.a}
      </text>
    </g>
  );
};

  return (
    <div className="ContainerObjectif">
      <div className="cardObjectifGraph">
        <div className="headerObjectif">
          <p className="blueLight objectifSuite">
            <span className="blue objectifNb">X{DFetch.length}</span> sur
            objectif de 6
          </p>
          <p className="titlecardobjectif">Courses hebdomadaire réalisées</p>
        </div>
        <PieChart
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "500px",
            maxHeight: "290px",
            aspectRatio: 1,
          }}
          responsive
        >
        
          <Pie
            data={dataPie}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="80%"
            startAngle={0}
            endAngle={360}
            label={renderCustomLabel}
            labelLine={false}
          >
            {dataPie.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend content={renderLegend} />
        </PieChart>
      </div>
      <div className="CardContainer">
        <div className="CardObjectif">
          <p className="titlecardobjectif">Durée d’activité</p>
          <p className="objectifdata blue">
            {DFetch.reduce((a, b) => a + b.duration, 0)}{" "}
            <span className="blueLight objectifdataMetrique">minutes</span>
          </p>
        </div>
        <div className="CardObjectif orange">
          <p className="titlecardobjectif">Durée d’activité</p>
          <p className="objectifdata">
            {Math.round(DFetch.reduce((a, b) => a + b.distance, 0) * 10) / 10}{" "}
            <span className="objectifdataMetrique orangeLight">kilomètres</span>
          </p>
        </div>
      </div>
    </div>
  );
}
