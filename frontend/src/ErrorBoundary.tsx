import { Component } from "react";
import { withRouter } from "./ts/routing";

class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <div className="container text-center">
          <h1>YOU SHALL NOT PASS</h1>
          <p>Lost? Forgotten? Try authorizing first!</p>
          <input
            type="button"
            value="To Main Page"
            onClick={() => (location.pathname = "../")}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
