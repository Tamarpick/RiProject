import { createContext, useEffect, useState } from "react";

const FavsContext = createContext();

export function FavsProvider({ children }) {
	const [favorites, setFavorites] = useState(getFromLocalStorage());

	// useEffect(() => {
	// 	setFavorites(getFromLocalStorage());
	//     return
	// }, [favorites]);

	function toggleFavorite(employee) {
		let newFavorites = favorites;
		const filtered = favorites.filter(
			(emp) => emp.login.username === employee.login.username
		).length;
		if (filtered > 0) {
			newFavorites = favorites.filter(
				(emp) => emp.login.username !== employee.login.username
			);
		} else newFavorites = [...favorites, employee];

		saveToLocalStorage(newFavorites);
		setFavorites(getFromLocalStorage());
	}

	function getFromLocalStorage() {
		const storage = localStorage.getItem("favs");
		console.log("storage", storage);
		return storage ? JSON.parse(storage) : [];
	}

	function saveToLocalStorage(newFavorites) {
		localStorage.setItem("favs", JSON.stringify(newFavorites));
	}

	function isInFavorites(username) {
		return (
			favorites.filter((emp) => emp.login.username === username).length > 0
		);
	}

	return (
		<FavsContext.Provider value={{ favorites, toggleFavorite, isInFavorites }}>
			{children}
		</FavsContext.Provider>
	);
}

export default FavsContext;
