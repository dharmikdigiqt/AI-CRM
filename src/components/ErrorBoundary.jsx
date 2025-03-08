import { PureComponent } from "react";

class ErrorBoundary extends PureComponent {
  constructor() {
    super();
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { errorInfo, error } = this.state;
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    if (errorInfo) {
      return (
        <div className="p-5">
          {/* <center>
            <h2>Something went wrong.</h2>
          </center> */}
          {console.log(error.toString())}
          <details style={{ whiteSpace: "pre-wrap" }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
