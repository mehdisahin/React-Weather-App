import DetailPage from "./DetailPage";
import HomePage from "./HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />}></Route>
					<Route
						path="/weather-details/:cityName"
						element={<DetailPage />}
					></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
