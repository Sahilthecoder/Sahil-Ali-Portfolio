import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void; // Optional external logger
  showErrorDetails?: boolean; // Toggle to display error message & stack trace in fallback UI
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state to display fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Store error info in state for optional display
    this.setState({ errorInfo });

    // Call optional external error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      // Default: log to console
      console.error('Uncaught error:', error, errorInfo);
    }
  }

  // Allow reset without full page reload
  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  renderFallback() {
    const { fallback, showErrorDetails } = this.props;
    const { error, errorInfo } = this.state;

    if (fallback) {
      // Render custom fallback if provided
      return fallback;
    }

    // Default fallback UI
    return (
      <div
        role="alert"
        className="relative dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 dark:from-black/70 dark:via-black/50 dark:to-black-70" />
        <div className="relative z-10 max-w-lg w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Please try refreshing the page or contact support if the issue persists.
          </p>

          {showErrorDetails && error && (
            <details className="mb-8 text-left text-xs text-red-400 whitespace-pre-wrap">
              <summary className="cursor-pointer font-semibold">Error details</summary>
              <p>{error.toString()}</p>
              {errorInfo?.componentStack && (
                <pre className="mt-2">{errorInfo.componentStack}</pre>
              )}
            </details>
          )}

          <div className="flex justify-center gap-4">
            <button
              onClick={this.handleReset}
              className="px-6 py-3 rounded-md border border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition"
              aria-label="Try to recover from error"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
              aria-label="Reload the page"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.state.hasError ? this.renderFallback() : this.props.children;
  }
}
