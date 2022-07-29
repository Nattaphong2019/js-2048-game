let size = 4;
let min = 0;
let max = size - 1;
let isMoved = false;
let score = 0;
let excludeIds = [];
const loadTable = () => {
  document.getElementById("canvas_table").innerHTML = "";
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  for (let r = 0; r < size; r++) {
    const row = document.createElement("tr");
    for (let c = 0; c < size; c++) {
      let id = `${r},${c}`;
      const column = document.createElement("td");
      column.setAttribute("id", id);
      row.appendChild(column);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  document.getElementById("canvas_table").appendChild(table);

  let id1 = getId();
  let id2 = "";
  while (true) {
    id2 = getId();
    if (id1 != id2) break;
  }

  const box1 = document.getElementById(id1);
  const box2 = document.getElementById(id2);

  box1.innerHTML = 2;
  box1.style.backgroundColor = getColor(2);

  box2.innerHTML = 2;
  box2.style.backgroundColor = getColor(2);

  score = 0;
  document.getElementById("score").innerHTML = score;

  return false;
};

const getRandomId = () => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getId = () => {
  let r = getRandomId();
  let c = getRandomId();
  return `${r},${c}`;
};

const getColor = (val = 0) => {
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

const getKeyDown = (keyValue) => {
  isMoved = false;
  excludeIds = [];
  for (let r = min; r <= max; r++) {
    for (let c = min; c <= max; c++) {
      let id = `${r},${c}`;
      if (document.getElementById(id).innerHTML !== "") {
        checkMove(id, keyValue);
      }
    }
  }
  if (isMoved == true) {
    update();
  }
  return false;
};

const checkMove = (id, keyValue) => {
  let ids = `${id}`;
  let arr_id = ids.split(",");
  let r = parseInt(arr_id[0]);
  let c = parseInt(arr_id[1]);
  let k = 0;
  let newId = "";
  let oldId = "";
  if (keyValue == "left") {
    if (c != min) {
      for (k = c - 1; k >= min; k--) {
        newId = `${r},${k}`;
        oldId = `${r},${k + 1}`;
        move(newId, oldId);
      }
    }
    return false;
  } else if (keyValue == "up") {
    if (r != min) {
      for (k = r - 1; k >= min; k--) {
        newId = `${k},${c}`;
        oldId = `${k + 1},${c}`;
        move(newId, oldId);
      }
    }
    return false;
  } else if (keyValue == "right") {
    if (c != max) {
      for (k = c + 1; k <= max; k++) {
        newId = `${r},${k}`;
        oldId = `${r},${k - 1}`;
        move(newId, oldId);
      }
    }
    return false;
  } else if (keyValue == "down") {
    if (r != max) {
      for (k = r + 1; k <= max; k++) {
        newId = `${k},${c}`;
        oldId = `${k - 1},${c}`;
        move(newId, oldId);
      }
    }
    return false;
  }
};

const move = (newId, oldId) => {
  const oldBox = document.getElementById(oldId);
  const newBox = document.getElementById(newId);
  let oldValue = parseInt(oldBox.innerHTML);
  let newValue = parseInt(newBox.innerHTML);
  if (newBox.innerHTML != "") {
    if (excludeIds.indexOf(newId) == -1) {
      if (oldValue == newValue) {
        excludeIds.push(newId);
        newBox.innerHTML = oldValue + newValue;
        newBox.style.backgroundColor = getColor(oldValue + newValue);
        oldBox.innerHTML = "";
        oldBox.style.backgroundColor = getColor();
        isMoved = true;
        score += oldValue + newValue;
        update(score);
        return document.onkeydown();
      }
    }
  } else {
    newBox.innerHTML = oldBox.innerHTML;
    newBox.style.backgroundColor = oldBox.style.backgroundColor;
    oldBox.innerHTML = "";
    oldBox.style.backgroundColor = getColor();
    isMoved = true;
  }
};

const update = () => {
  let ids = [];
  for (let r = min; r <= max; r++) {
    for (let c = min; c <= max; c++) {
      let id = `${r},${c}`;
      if (document.getElementById(id).innerHTML == "") {
        ids.push(id);
      }
    }
  }
  let id = ids[Math.floor(Math.random() * ids.length)];
  const newBox = document.getElementById(id);
  newBox.innerHTML = 2;
  newBox.style.backgroundColor = getColor(2);
};

loadTable();
