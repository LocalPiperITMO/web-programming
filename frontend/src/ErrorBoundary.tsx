import { Component } from "react";
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
          <button
            typeof="button"
            className="btn btn-primary"
            onClick={() => (location.pathname = "../")}
          >
            Back To Main Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
