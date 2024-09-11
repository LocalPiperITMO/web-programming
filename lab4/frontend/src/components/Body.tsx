import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Canvas } from "./Canvas";
import { validate } from "../ts/validate";
import { sendPointData } from "../ts/canvas";

export type TPoint = {
  x: number,
  y: number,
  scale: number
}

function YInput({ sy, data }: any) {
  return (
    <input
      className="form-control"
      type="text"
      maxLength={10}
      placeholder={data[0] + "..." + data[1]}
      onChange={sy}
    />
  );
}

function XInput({ sx, data }: any) {
  return (
    <>
      <div className="container text-center value-checkbox-container">
        {data.map((item: string, index: number) => (
          <div key={index} className="col">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                value={item}
                name={"xCheck"}
                onClick={sx}
              />
              <label className="form-check-label" htmlFor={"xCheck" + item}>
                {item}
              </label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function RInput({ sr, data }: any) {
  return (
    <>
      <div className="container text-center value-checkbox-container">
        {data.map((item: string, index: number) => (
          <div key={index} className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={"rCheck"}
              value={item}
              onClick={sr}
            />
            <label className="form-check-label" htmlFor={"rCheck" + item}>
              {item}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}

function InputContainer({ sx, sy, sr }: any) {
  const inputs = [
    {
      label: "X",
      type: "checkbox",
      data: ["-3", "-2", "-1", "0", "1", "2", "3", "4", "5"],
    },
    {
      label: "Y",
      type: "text",
      data: ["-3", "2"],
    },
    {
      label: "R",
      type: "checkbox",
      data: ["-3", "-2", "-1", "0", "1", "2", "3", "4", "5"],
    },
  ];
  return (
    <>
      <div className="container text-center">
        <h2>Inputs</h2>
        <div className="row">
          <div className="col">
            <h3>X</h3>
          </div>
          <div className="col">
            <XInput sx={sx} data={inputs[0].data} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3>Y</h3>
          </div>
          <div className="col">
            <YInput sy={sy} data={inputs[1].data} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3>R</h3>
          </div>
          <div className="col">
            <RInput sr={sr} data={inputs[2].data} />
          </div>
        </div>
      </div>
    </>
  );
}

function ButtonContainer({ act, clear }: any) {
  const navigate = useNavigate();

  return (
    <>
      <h2>Menu</h2>
      <div
        className="btn-group-vertical"
        role="group"
        aria-label="Vertical button group"
      >
        <button type="button" className="btn btn-primary" onClick={act}>
          Submit
        </button>
        <button type="button" className="btn btn-primary" onClick={clear}>
          Clear table
        </button>
        <button type="button" className="btn btn-primary" onClick={() => navigate("../")}>
          Back To Main Page
        </button>
      </div>
    </>
  );
}

function ResultTableContainer({ data }: any) {
  if (data !== "[]") {
    return (
      <>
        <div className="result-table-container">
          <h2>Result</h2>
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">X</th>
                <th scope="col">Y</th>
                <th scope="col">R</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody id="result-table" className="table-group-divider ">
              {JSON.parse(data).map((item: any, index: number) => (
                <tr key={index}>
                  <td scope="col">{item.x}</td>
                  <td scope="col">{item.y}</td>
                  <td scope="col">{item.r}</td>
                  <td scope="col">{item.isHit ? "HIT" : "MISS"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  return (
    <>
      <h2>Result</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">X</th>
            <th scope="col">Y</th>
            <th scope="col">R</th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody
          id="result-table"
          className="table-group-divider result-table-container"
        ></tbody>
      </table>
    </>
  );
}

function ErrorContainer({ errors }: any) {
  if (errors !== "") {
    return (
      <div className="container text-center">
        <h2>Error</h2>
        <p>{errors}</p>
      </div>
    );
  }
  return <></>;
}
export function BodyContainer() {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [r, setR] = useState(0);
  const [points, setPoints] = useState<TPoint[]>([]);
  const [err, setErr] = useState("");
  const location = useLocation();
  const user = location.state.id;

  const handleClear = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: user,
      }),
    };
    fetch("http://localhost:17017/clear", requestOptions);
    setPoints([]);
  };

  const handleSubmit = async () => {
    const message = validate(x, y, r);
    if (message.pass) {
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
          id: user,
        }),
      };
      fetch("http://localhost:17017/process", requestOptions)
        .then((response) => response.json())
        .then((response) => {
          setPoints(response);
          setErr("");
        });
    } else {
      // FIXME
      setErr(message.verdict.join("\n"));
    }
  };

  return (
    <div className="container text-center">
      <h1>Web Lab 4</h1>
      <div className="row row-cols-2">
        <div className="col">
          <Canvas
            canvasDimensions={{
              width: 300,
              height: 300
            }}
            scale={r}
            points={points}
            onPointAdd={(point) => {
              sendPointData(point.x, point.y, point.scale, user)
              handleSubmit()
            }}
          />
        </div>
        <div className="col">
          <InputContainer
            sx={setX}
            sy={setY}
            sr={setR}
          />
        </div>
        <div className="col">
          <ButtonContainer act={handleSubmit} clear={handleClear} />
        </div>
        <div className="col">
          <ResultTableContainer data={points} />
        </div>
      </div>
      <ErrorContainer errors={err} />
    </div>
  );
}
