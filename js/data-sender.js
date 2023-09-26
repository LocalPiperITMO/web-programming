function getXValue() {
    const xInputs = document.getElementsByClassName("box");
    for (let xInput of xInputs) {
        if (xInput.checked) {
            return xInput.value;
        }
    }
}

function getYValue() {
    return document.getElementById("y-input").value;
}

function getRValue() {
    const rValue = document.getElementById("r-input");
    return rValue.value;
}

async function getData() {
    let rawX = getXValue();
    let rawY = getYValue();
    let rawR = getRValue();

    let x = parseFloat(checkIfXDefined(rawX));
    let y = parseFloat(checkIfYDefined(rawY));
    let r = parseFloat(rawR);
    if (validate(x, y, r)) {
        let request = {"X": x, "Y": y, "R": r};
        let response = await fetch("php/index.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            }
        )
            .then(responseCaught => {
                if (responseCaught.ok) {
                    return responseCaught.json();
                }
                throw new Error(responseCaught.statusText);
            })
        addRow(response);
    }
}