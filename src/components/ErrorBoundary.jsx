import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      "Error Boundary tərəfindən tutulan xəta:",
      error
    );

    console.error(
      "Component stack:",
      errorInfo.componentStack
    );
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-boundary">
          <div className="error-boundary-card">
            <h1> Nəsə səhv getdi</h1>

            <p>
              Tətbiqdə gözlənilməz xəta baş verdi.
            </p>

            <button onClick={this.handleReload}>
              Səhifəni yenilə
            </button>

            {import.meta.env.DEV &&
              this.state.error && (
                <details className="error-details">
                  <summary>
                    Texniki məlumat
                  </summary>

                  <pre>
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;