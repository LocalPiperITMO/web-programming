export async function handleAccess(u : string, p : string, rule : string) {
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
    const responce = await fetch("http://localhost:17017/" + rule, requestOptions);
    const body = await responce.text();
    return body;
}
