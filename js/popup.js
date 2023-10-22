let input = document.getElementById('y-input');
let popup = document.getElementById('popup');

input.addEventListener('mouseenter', function () {
    popup.style.display = "block";
});
input.addEventListener('mouseout', function () {
    popup.style.display = "none";
})