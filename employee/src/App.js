import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "./index.css";

import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EmployeeFromSearch from "./pages/EmployeeFromSearch/EmployeeFromSearch";
import { FavsProvider } from "./context";
import Favorites from "./pages/Favorites";
import EmployeeFromFavorites from "./pages/EmployeeFromFavorites";

function App() {
	return (
		<FavsProvider>
			<div className="App d-flex flex-column ">
				<Navbar />

				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/employee/:company/:index"
						element={<EmployeeFromSearch />}
					/>
					<Route path="/favorites" element={<Favorites />} />
					<Route
						path="/employeeFromFavorites/:index"
						element={<EmployeeFromFavorites />}
					/>
				</Routes>
			</div>
		</FavsProvider>
	);
}

export default App;
