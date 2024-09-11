import { HeaderContainer } from "./components/Header";
import { BodyContainer } from "./components/Body";
import { FooterContainer } from "./components/Footer";
import ErrorBoundary from "./ErrorBoundary";
export function Header() {
  return <HeaderContainer></HeaderContainer>;
}

function Body() {
  return <BodyContainer></BodyContainer>;
}

export function Footer() {
  return <FooterContainer></FooterContainer>;
}
export default function Main() {
  return (
    <>
      <div className="container-fluid">
        <Header></Header>
        <ErrorBoundary>
          <Body></Body>
        </ErrorBoundary>
        <Footer></Footer>
      </div>
    </>
  );
}
