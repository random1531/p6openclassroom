//login//
export async function connexion({ username, password }) {
  const response = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const connect = await response.json();
  if (response.status === 200) {
    localStorage.setItem("token", connect.token);
    localStorage.setItem("user", connect.userId);
    return { status: response.status, message: "connecter" };
  } else {
    return { status: response.status, message: "erreur de connextion" };
  }
}

//UserDataProfil
export async function fetchUser() {
  const response = await fetch("http://localhost:8000/api/user-info", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
  const userInfoData = await response.json();
  return userInfoData;
}

//UserDataLog
export async function fetchDuser(start, end) {
    const response = await fetch(
        `http://localhost:8000/api/user-activity?startWeek=${start}&endWeek=${end}`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        }
    );
    const userData = await response.json();
    return userData;
}

export function groupByWee(data) {
  function getWeekNumber(dateStr) {
    const date = new Date(dateStr);
    const firstY = new Date(date.getFullYear(), 0, 1);
    const day = Math.floor((date - firstY) / 86400000);
    return Math.ceil((day + firstY.getDay() + 1) / 7);
  }
  const group = {};
  data.forEach((item) => {
    const week = getWeekNumber(item.date);
    if (!group[week]) group[week] = [];
    group[week].push(item);
  });
  return group;
}