function addRowWithoutSaving(arr) {
    let row = document.createElement("tr");
    for (let el in arr) {
        let cell = document.createElement("td");
        cell.innerHTML = arr[el];
        row.appendChild(cell);
    }
    document.getElementById("outputs").prepend(row);
}
function addRow(arr) {
    addRowWithoutSaving(arr);
    let tableData = JSON.parse(localStorage.getItem("tableData")) || [];

    tableData.push(arr);
    localStorage.setItem("tableData", JSON.stringify(tableData));
}

function restoreTable() {
    let outputs = document.getElementById("outputs");
    if (outputs.firstChild) {
        while (outputs.firstChild) {
            outputs.removeChild(outputs.firstChild);
        }
    }
    let tableData = JSON.parse(localStorage.getItem("tableData")) || [];
    tableData.forEach((arr) => {
        addRowWithoutSaving(arr);
    });
}

function clearTable() {
    let outputs = document.getElementById("outputs");
    while (outputs.firstChild) {
        outputs.removeChild(outputs.firstChild);
    }

    localStorage.removeItem("tableData");
}

window.onload = restoreTable;
