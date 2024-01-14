const data = ["P3206", "Sorokin Artem", "Variant: 1946"];
export function HeaderContainer() {
  return (
    <div className="container text-center">
      <div className="row">
        {data.map((item) => (
          <div className="col">{item}</div>
        ))}
      </div>
    </div>
  );
}
