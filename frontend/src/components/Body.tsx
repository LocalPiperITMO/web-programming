import { useState } from "react";
import { Canvas } from "./Canvas";
import { useNavigate } from "react-router-dom";

function YInput({ y, sy, data }) {
  return (
    <input
      className="form-control"
      type="text"
      placeholder={data[0] + "..." + data[1]}
      onChange={sy}
    />
  );
}

function XInput({ x, sx, data }) {
  return (
    <>
      <div className="container text-center value-checkbox-container">
        {data.map((item: string, index: number) => (
          <div key={index} className="col">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={item}
                id={"xCheck" + item}
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

function RInput({ r, sr, data }) {
  return (
    <>
      <div className="container text-center value-checkbox-container">
        {data.map((item: string, index: number) => (
          <div key={index} className="col">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={item}
                id={"rCheck" + item}
                onClick={sr}
                disabled={parseInt(item) <= 0}
              />
              <label className="form-check-label" htmlFor={"rCheck" + item}>
                {item}
              </label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function InputContainer({ x, sx, y, sy, r, sr }) {
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
            <XInput x={x} sx={sx} data={inputs[0].data} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3>Y</h3>
          </div>
          <div className="col">
            <YInput y={y} sy={sy} data={inputs[1].data} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3>R</h3>
          </div>
          <div className="col">
            <RInput r={r} sr={sr} data={inputs[2].data} />
          </div>
        </div>
      </div>
    </>
  );
}

function ButtonContainer({ x, y, r, act, clear }) {
  const navigate = useNavigate();

  function handleClick(_event: any) {
    navigate("../");
  }

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
        <button type="button" className="btn btn-primary" onClick={handleClick}>
          Back To Main Page
        </button>
      </div>
    </>
  );
}

function ResultTableContainer({ data }) {
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
export function BodyContainer() {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [r, setR] = useState("");
  const [out, setOut] = useState("[]");

  const handleXClick = (e) => {
    setX(e.target.value);
  };

  const handleYClick = (e) => {
    setY(e.target.value);
  };

  const handleRClick = (e) => {
    if (r.length !== 0) {
      setR("");
    } else {
      setR(e.target.value);
    }
  };
  const handleClear = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    fetch("http://localhost:17017/clear", requestOptions);

    setOut("[]");
  };

  const handleSubmit = async () => {
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
    fetch("http://localhost:17017/process", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        setOut(JSON.stringify(response));
      });
  };

  return (
    <div className="container text-center">
      <h1>Web Lab 4</h1>
      <div className="row row-cols-2">
        <div className="col">
          <Canvas r={r} />
        </div>
        <div className="col">
          <InputContainer
            x={x}
            sx={handleXClick}
            y={y}
            sy={handleYClick}
            r={r}
            sr={handleRClick}
          />
        </div>
        <div className="col">
          <ButtonContainer
            x={x}
            y={y}
            r={r}
            act={handleSubmit}
            clear={handleClear}
          />
        </div>
        <div className="col">
          <ResultTableContainer data={out} />
        </div>
      </div>
    </div>
  );
}
