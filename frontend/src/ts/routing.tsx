import { useLocation, useNavigate } from "react-router-dom";

export const withRouter = (OriginalComponent: any) => {
  const NewComponent = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
      <OriginalComponent
        navigate={navigate}
        location={location}
        {...props}
      ></OriginalComponent>
    );
  };
  return NewComponent;
};
