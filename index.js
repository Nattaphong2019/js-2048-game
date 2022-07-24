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
      tableHtml += "<td id=" + id + "><span></span></td>";
    }
    tableHtml += "</tr>";
  }
  tableHtml += "</tbody></table>";
  document.getElementById("canvas_table").innerHTML = tableHtml;
};

loadTable();
