import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
  return { hasError: true };
}

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2 className="text-red-500">Error</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


/*
Author => Ünsal Demircioğlu
Github =>  https://github.com/unsaldemircioglu
*/