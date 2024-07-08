import React, { useContext, useEffect, useRef, useState } from "react";
import "./home.css";
import banner from "../../assets/banner.jpeg";
import workersApi from "../../api/woekersApi";
import EmployeeCard from "../../components/EmployeeCard";
import { useNavigate } from "react-router-dom";
import FavsContext from "../../context";
export default function Home() {
	const searchRef = useRef(null);
	const navigate = useNavigate();
	const [workers, setWorkers] = useState([]);
	const [selectedCompany, setSelectedCompany] = useState("google");
	const { toggleFavorite, isInFavorites } = useContext(FavsContext);
	useEffect(() => {
		searchEmployees();
	}, []);

	const searchEmployees = async () => {
		const seed = searchRef.current.value || null;

		if (seed && seed !== "") setSelectedCompany(seed);

		try {
			const result = await workersApi.getWorkers({ seed: seed });
			setWorkers(result.data.results);
		} catch (error) {
			console.log(error);
		}
	};

	const goToEmployeePage = (company, index) => {
		navigate(`/employee/${company}/${index}`);
	};

	const renderEmployees = () => {
		if (workers.length === 0) return <></>;
		return (
			<div className="homeEmployeeGrid ">
				{workers.map((worker, index) => {
					return (
						<EmployeeCard
							onClick={() => goToEmployeePage(selectedCompany, index)}
							addToFavorites={() => toggleFavorite(worker)}
							isFavorite={isInFavorites(worker.login.username)}
							worker={worker}
							key={index}
						/>
					);
				})}
			</div>
		);
	};

	return (
		<div className="w-100 d-flex flex-column gap-3 p-3">
			<div
				className="strip w-100"
				style={{ backgroundImage: `url(${banner})`, height: "30rem" }}
			></div>
			<div className="container d-flex justify-content-center w-100">
				<input ref={searchRef} type="text" className="" placeholder="Search" />
				<button onClick={searchEmployees} className="btn btn-primary">
					Search
				</button>
			</div>
			{renderEmployees()}
		</div>
	);
}
