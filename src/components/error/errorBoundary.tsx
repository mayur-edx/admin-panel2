import { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";
import "../../styles/error.css";
interface Props {
	children?: ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false
	};
	public static getDerivedStateFromError(): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return (
				<div className="upper-content">
					<div className="inner-content">
						<h1 className="sub-content">Oops! There was a problem with your request.</h1>
						<Link className="redirect" to="/dashboard">
							Back to Home Page
						</Link>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
