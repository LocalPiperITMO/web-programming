export function getData() {
    fetch('http://localhost:8080/process')
        .then(async response => {
            console.log(response);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}