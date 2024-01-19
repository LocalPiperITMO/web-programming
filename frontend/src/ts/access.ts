export async function handleRegister(u : string, p : string) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: u,
        password: p
      }),
    };
    const responce = await fetch("http://localhost:17017/signup", requestOptions);
    const body = await responce.text();
    return body;
}
