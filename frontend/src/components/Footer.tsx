const data = ["Git: https://github.com/LocalPiper", "Telegram: @crimson_sun_is_rising", "E-mail: artsor53@gmail.com"];
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