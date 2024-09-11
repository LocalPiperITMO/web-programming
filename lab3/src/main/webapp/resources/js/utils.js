let HIDDEN_X = document.getElementById("hidden-form:hidden-x");
let HIDDEN_Y = document.getElementById("hidden-form:hidden-y");
let HIDDEN_R = document.getElementById("hidden-form:hidden-r");
let HIDDEN_BUTTON = document.getElementById("hidden-form:hidden-send");

function normalizeCoords(point) {
    const x = convertXCoordinate(point.x);
    const y = convertYCoordinate(point.y);

    return {
        x: x,
        y: y
    }
}

function triggerRequest(point) {
    const normalized = normalizeCoords(point);

    HIDDEN_X.value = normalized.x;
    HIDDEN_Y.value = normalized.y;
    HIDDEN_R.value = getRadius();
    HIDDEN_BUTTON.click();
}

function getRadius() {

    for (let i = 0; i < 5; ++i) {
        let id = "input-form:r:" + i;
        if (document.getElementById(id).checked) {
            return document.getElementById(id).value;
        }
    }
}