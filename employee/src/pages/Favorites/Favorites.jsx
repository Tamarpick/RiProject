import React, { useContext } from "react";
import EmployeeCard from "../../components/EmployeeCard";
import FavsContext from "../../context";
import "./favorites.css";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
	const { favorites, toggleFavorite, isInFavorites } = useContext(FavsContext);
	const navigate = useNavigate();
	const renderFavorites = () => {
		if (favorites.length > 0) {
			return favorites.map((employee, index) => {
				return (
					<EmployeeCard
						key={index}
						worker={employee}
						addToFavorites={() => toggleFavorite(employee)}
						isFavorite={isInFavorites(employee.login.username)}
						onClick={() => {
							navigate(`/employeeFromFavorites/${index}`);
						}}
					/>
				);
			});
		}
		return <div>No favorites</div>;
	};
	return (
		<div className="favoritesContainer  container-fluid ">
			{renderFavorites()}
		</div>
	);
}
