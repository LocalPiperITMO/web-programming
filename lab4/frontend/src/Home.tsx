import { useNavigate } from "react-router-dom";
import { Header } from "./Index";
import { Footer } from "./Index";
import { useState, useEffect } from "react";
import { handleAccess } from "./ts/access";

function Clock() {
  let [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <>
      <h2>Clock</h2>
      <div>
        <p>Time : {date.toLocaleTimeString()}</p>
        <p>Date : {date.toLocaleDateString()}</p>
      </div>
    </>
  );
}

function InputGroup({ su, sp }: any) {
  return (
    <>
      <div className="input-group flex-nowrap">
        <span className="input-group-text" id="addon-wrapping">
          Username
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your name"
          aria-label="Username"
          aria-describedby="addon-wrapping"
          onChange={su}
        />
      </div>
      <div className="input-group flex-nowrap">
        <span className="input-group-text" id="addon-wrapping">
          Password
        </span>
        <input
          type="password"
          className="form-control"
          placeholder="Enter your password"
          aria-label="Password"
          aria-describedby="addon-wrapping"
          onChange={sp}
        />
      </div>
    </>
  );
}

function ButtonGroup({ u, p, se }: any) {
  const navigate = useNavigate();
  function handleClick(_event: any, id: number) {
    navigate("/main", { state: { id: id } });
  }
  return (
    <>
      <div className="btn-group" role="group">
        <button
          type="button"
          onClick={async (e) => {
            const verdict = await handleAccess(u, p, "signin");
            if (!verdict.trim().includes("Access denied")) {
              handleClick(e, parseInt(verdict));
            } else {
              se(verdict);
            }
          }}
          className="btn btn-primary"
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={async (e) => {
            const verdict = await handleAccess(u, p, "signup");
            if (!verdict.trim().includes("Access denied")) {
              handleClick(e, parseInt(verdict));
            } else {
              se(verdict);
            }
          }}
          className="btn btn-primary"
        >
          Sign Up
        </button>
      </div>
    </>
  );
}

function ErrorGroup({ e }: any) {
  if (e.trim().length != 0) {
    return (
      <>
        <div className="text-bg-danger p-3">{e}</div>
      </>
    );
  }
  return <></>;
}
function AuthContainer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <h2>Log in/Register</h2>
      <ul className="list-group">
        <div className="col">
          <InputGroup su={handleUsername} sp={handlePassword} />
        </div>
        <div className="col">
          <ButtonGroup u={username} p={password} se={setError} />
        </div>
        <div className="col">
          <ErrorGroup e={error} />
        </div>
      </ul>
    </>
  );
}
function Base() {
  return (
    <>
      <div className="container text-center">
        <h1>Web Lab 4</h1>
        <h3>Welcome to my lab! Please, proceed with the authorization.</h3>
        <div className="row">
          <div className="col">
            <Clock />
          </div>
          <div className="col">
            <AuthContainer />
          </div>
        </div>
      </div>
    </>
  );
}
export default function Home() {
  return (
    <>
      <div className="container-fluid">
        <Header></Header>
        <Base></Base>
        <Footer></Footer>
      </div>
    </>
  );
}
