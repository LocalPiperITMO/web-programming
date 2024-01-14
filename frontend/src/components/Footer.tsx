const data = ["Git: https://github.com/LocalPiper", "Telegram: @crimson_sun_is_rising"];
export function FooterContainer() {
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