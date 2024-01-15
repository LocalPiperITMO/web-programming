import { useNavigate } from "react-router-dom";
import { Header } from "./Index";
import { Footer } from "./Index";
import { useState, useEffect } from "react";

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

function InputGroup() {
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
        />
      </div>
    </>
  );
}

function ButtonGroup() {
  const navigate = useNavigate();

  function handleClick(_event: any) {
    navigate("/main");
  }
  return (
    <>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" onClick={handleClick} className="btn btn-primary">
          Sign In
        </button>
        <button type="button" onClick={handleClick} className="btn btn-primary">
          Sign Up
        </button>
      </div>
    </>
  );
}

function ErrorGroup() {
  return <>TODO: errors</>;
}
function AuthContainer() {
  return (
    <>
      <h2>Log in/Register</h2>
      <ul className="list-group">
        <div className="col">
          <InputGroup />
        </div>
        <div className="col">
          <ButtonGroup />
        </div>
        <div className="col">
          <ErrorGroup />
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
