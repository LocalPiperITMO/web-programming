function Canvas() {
  return (
    <>
      <h2>Graph</h2>
      <canvas id="canvas" width={300} height={300}></canvas>
    </>
  );
}

function TextInput({ data }) {
  return (
    <input
      className="form-control"
      type="text"
      placeholder={data[0] + "..." + data[1]}
    />
  );
}

function CheckboxInput({ data }) {
  return (
    <>
      <div className="container text-center value-checkbox-container">
        {data.map((item: string) => (
          <div className="col">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={item}
                id={"flexCheck" + item}
              />
              <label className="form-check-label" htmlFor={"flexCheck" + item}>
                {item}
              </label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
function InputField({ label, type, data }) {
  if (type === "checkbox") {
    return (
      <div className="container text-center">
        <div className="col-2">
          <p>{label}</p>
        </div>
        <div className="col-8">
          <CheckboxInput data={data} />
        </div>
      </div>
    );
  } else if (type === "text") {
    return (
      <div className="container text-center">
        <div className="col-2">{label}</div>
        <div className="col-8">
          <TextInput data={data} />
        </div>
      </div>
    );
  }

  return <>An error has occurred!</>;
}

function InputContainer() {
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
      <h2>Input</h2>
      <ul className="list-group">
        {inputs.map((input) => (
          <InputField
            label={input.label}
            type={input.type}
            data={input.data}
          ></InputField>
        ))}
      </ul>
    </>
  );
}

function ButtonContainer() {
  return (
    <>
      <h2>Menu</h2>
      <div
        className="btn-group-vertical"
        role="group"
        aria-label="Vertical button group"
      >
        <button type="button" className="btn btn-primary">
          Submit
        </button>
        <button type="button" className="btn btn-primary">
          Clear table
        </button>
        <button type="button" className="btn btn-primary">
          Back To Main Page
        </button>
      </div>
    </>
  );
}
export function BodyContainer() {
  return (
    <div className="container text-center">
      <h1>Web Lab 4</h1>
      <div className="row row-cols-2">
        <div className="col">
          <Canvas />
        </div>
        <div className="col">
          <InputContainer />
        </div>
        <div className="col">
          <ButtonContainer />
        </div>
        <div className="col">TODO: add result table</div>
      </div>
    </div>
  );
}
