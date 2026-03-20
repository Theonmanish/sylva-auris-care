import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("App error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F1412",
          padding: "40px",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "1.5rem",
            color: "#E8EFEA",
            marginBottom: "16px",
          }}>
            Something went wrong.
          </p>
          <p style={{
            fontSize: "14px",
            color: "#6B756E",
            marginBottom: "32px",
            lineHeight: "1.7",
          }}>
            We could not load this page. Please try again.
          </p>
          <button
            onClick={() => window.location.href = "/"}
            style={{
              background: "#1F3D2B",
              color: "#E8EFEA",
              border: "none",
              borderRadius: "10px",
              padding: "12px 24px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Return to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;