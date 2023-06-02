import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Routers } from "./core/routes";

function App() {
	return (
		<BrowserRouter>
			<Routers />
		</BrowserRouter>
	);
}

export default App;
