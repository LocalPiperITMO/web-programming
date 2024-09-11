function updateClock() {
    let now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Добавим ведущий ноль к часам, минутам и секундам, если они состоят из одной цифры
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    let timeString = hours + ':' + minutes + ':' + seconds;

    // Получим день, месяц и год
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let dateString = now.toLocaleDateString('en-US', options);

    // Обновим содержимое элементов на странице
    document.getElementById('time').textContent = timeString;
    document.getElementById('date').textContent = dateString;
}

// Обновление часов каждые 13 секунд
setInterval(updateClock, 13000);

// Инициализация часов при загрузке страницы
updateClock();