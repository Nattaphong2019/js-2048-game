let size = 4;
let min = 0;
let max = size - 1;
let isMoved = false;
let score = 0;
let excludeIds = [];
loadTable = () => {
  let tableHtml = "";
  tableHtml = "<table><tbody>";
  for (let r = 0; r < size; r++) {
    tableHtml += "<tr>";
    for (let c = 0; c < size; c++) {
      let id = "[" + r + "," + c + "]";
      tableHtml += `<td id=` + id + `><span></span></td>`;
    }
    tableHtml += "</tr>";
  }
  tableHtml += "</tbody></table>";
  document.getElementById("canvas_table").innerHTML = tableHtml;

  let id1 = getId();
  let id2 = "";
  while (true) {
    id2 = getId();
    if (id1 != id2) break;
  }

  document.getElementById(id1).innerHTML = "2";
  document.getElementById(id2).innerHTML = "2";

  document.getElementById(id1).style.backgroundColor = getColor(2);
  document.getElementById(id2).style.backgroundColor = getColor(2);

  score = 0;
  document.getElementById("score").innerHTML = score;

  return false;
};

getRandomId = () => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

getId = () => {
  let r = getRandomId();
  let c = getRandomId();
  return "[" + r + "," + c + "]";
};

getColor = (val = 0) => {
  const colors = {
    0: "#ffffff",
    2: "#ff0000",
    4: "#ff8000",
    8: "#ffff00",
    16: "#80ff00",
    32: "#00ff00",
    64: "#00ff80",
    128: "#00ffff",
    256: "#0080ff",
    512: "#0000ff",
    1024: "#8000ff",
    2048: "#ff00ff",
  };
  return colors[val];
};

document.onkeydown = (e) => {
  e.preventDefault();
  switch (e.keyCode) {
    case 37:
      getKeyDown("left");
      break;
    case 38:
      getKeyDown("up");
      break;
    case 39:
      getKeyDown("right");
      break;
    case 40:
      getKeyDown("down");
      break;
  }
};

getKeyDown = (keyValue) => {
  console.log(keyValue);
};

getKeyDown();

loadTable();
