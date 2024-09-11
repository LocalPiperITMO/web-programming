export function validate(x: any, y: any, r: any) {
  const numX = Number(x);
  const numY = Number(y);
  const numR = Number(r);
  let pass = true;
  let message = ["", "", ""];
  if (Number.isNaN(numX) || x.trim().length == 0) {
    pass = false;
    message[0] = "X is invalid! ";
  }
  if (Number.isNaN(numY) || y.trim().length == 0) {
    pass = false;
    message[1] = "Y is invalid! ";
  }
  if (Number.isNaN(numR) || r.trim().length == 0) {
    pass = false;
    message[2] = "R is invalid! ";
  }
  if (numY < -3 || numY > 2) {
    pass = false;
    message[1] = "Y is invalid! ";
  }
  return {
    pass: pass,
    verdict: message,
  };
}
