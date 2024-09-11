const data = ["Git: https://github.com/LocalPiper", "Telegram: @crimson_sun_is_rising", "E-mail: artsor53@gmail.com"];
export function FooterContainer() {
  return (
    <div className="container text-center fixed-bottom">
      <div className="row">
        {data.map((item, index) => (
          <div key={index} className="col">{item}</div>
        ))}
      </div>
    </div>
  );
}