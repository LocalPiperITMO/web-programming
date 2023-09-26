function checkIfXDefined(str) {
    if (str === undefined) {
        document.getElementById("x-error").style.display = "block";
        return false;
    }
    preprocess(str);
    document.getElementById("x-error").style.display = "none";
    return str;
}

function checkIfYDefined(str) {
    if (!str) {
        document.getElementById("y-error").style.display = "block";
        return false;
    }
    document.getElementById("y-error").style.display = "none";
    preprocess(str);
    return str;
}

function preprocess(str) {
    str.trim();
    str.replace(",", ".");
    return str;
}

function validate(x, y, r) {
    let result = true;
    if (isNaN(x) || !(-5 <= x <= 3)) {
        document.getElementById("x-error").style.display = "block";
        result = false;
    } else {
        document.getElementById("x-error").style.display = "none";
    }
    if (isNaN(y) || y < -3 || y > 5) {
        document.getElementById("y-error").style.display = "block";
        result = false;
    } else {
        document.getElementById("y-error").style.display = "none";
    }
    if (isNaN(r) || r < 1 || r > 5) {
        document.getElementById("r-error").style.display = "block";
        result = false;
    } else {
        document.getElementById("r-error").style.display = "none";
    }
    return result;
}