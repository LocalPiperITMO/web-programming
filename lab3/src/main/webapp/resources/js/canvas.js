let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d');
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
canvas.addEventListener("click", function (evt) {
    const rect = canvas.getBoundingClientRect();
    const userX = evt.clientX - rect.left;
    const userY = evt.clientY - rect.top;

    triggerRequest({
        x: userX,
        y: userY
    });

})

function drawXYRPoint(x, y, r, color) {

    // normalization
    x = canvas.width / 2 + canvas.width / 3 * (x / r)
    y = canvas.height / 2 - canvas.height / 2.95 * (y / r)
    // drawing
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}


function convertXCoordinate(cornerX) {
    return (cornerX - canvas.width / 2) / (canvas.width / 3) / 0.3;
}

function convertYCoordinate(cornerY) {
    return -(cornerY - canvas.height / 2) / (canvas.height / 3) / 0.3;
}

