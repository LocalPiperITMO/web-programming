import { Link } from "react-router-dom";
import { Header } from "./Index";
import { Footer } from "./Index";

function Clock() {
    return (
        <>
        <h2>Clock</h2>
        </>
    )
}

function InputGroup() {
    return (
        <>TODO: inputs</>
    )
}

function ButtonGroup() {
    return (
        <>TODO: buttons</>
    )
}

function ErrorGroup() {
    return <>TODO: errors</>
}
function AuthContainer() {
    return (
        <>
        <h2>Log in/Register</h2>
        <ul className="list-group">
            <div className="col"><InputGroup /></div>
            <div className="col"><ButtonGroup /></div>
            <div className="col"><ErrorGroup /></div>
        </ul>
        </>
    )
}
function Base() {
  return (
    <>
      <div className="container text-center">
        <h1>Web Lab 4</h1>
        <h3>Welcome to my lab! Please, proceed with the authorization.</h3>
        <div className="row">
          <div className="col"><Clock /></div>
          <div className="col"><AuthContainer /></div>
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

      <Link to="/main">Start</Link>
    </>
  );
}
