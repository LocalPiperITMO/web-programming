export function sendData(x, y, r) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      x: x,
      y: y,
      r: r,
    }),
  };
  fetch("http://localhost:8080/process", requestOptions)
    .then(async (response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("ERROR", error);
    });
}
