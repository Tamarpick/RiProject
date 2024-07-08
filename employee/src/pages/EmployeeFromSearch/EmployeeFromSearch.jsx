import { useContext, useEffect, useState } from "react";
import "./employeeFromSearch.css";
import workersApi from "../../api/woekersApi";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import FavsContext from "../../context";

export default function EmployeeFromSearch() {
	const [workerObject, setWorkerObject] = useState(null);
	const { favorites, toggleFavorite, isInFavorites } = useContext(FavsContext);
	const { company, index } = useParams();

	const findEmployee = async () => {
		try {
			const result = await workersApi.getWorkers({ seed: company });

			console.log("result.data.results[index]", result.data.results[index]);
			setWorkerObject(result.data.results[index]);
		} catch (error) {}
	};

	useEffect(() => {
		findEmployee();
	}, [company, index]);

	const renderLoading = () => {
		return <div>Loading...</div>;
	};

	const renderActionButton = () => {
		const btnText = !isInFavorites(workerObject.login.username)
			? "Add to favourites"
			: "Remove from favourites";

		return (
			<button
				onClick={() => toggleFavorite(workerObject)}
				className="btn btn-primary"
			>
				{btnText}
			</button>
		);
	};

	const renderEmployeePage = () => {
		// workerObject.location.coordinates.latitude
		console.log(
			"workerObject.location.coordinates.latitude",
			workerObject.location.coordinates.latitude
		);
		return (
			<div className="employeePageContainer container-fluid d-flex flex-column justify-content-center align-items-center">
				<div className="employeePagePanel container-fluid d-flex flex-column">
					<div className="employeeInfoContainer container-fluid col-lg-12 d-flex flex-wrap gap-3">
						<div className="col-lg-5 col-sm-12 d-flex justify-content-center align-items-center">
							<img
								src={workerObject.picture.large}
								alt="employee"
								className="employeePageImage"
							/>
						</div>
						<div className="col-lg-6 col-sm-12">
							<div className="employeeName container-fluid d-flex justify-content-center">
								<div className="employeeNameTitle">
									{workerObject.name.title}. {workerObject.name.first}{" "}
									{workerObject.name.last}
								</div>
							</div>
							<div className="employeeInfo d-flex flex-column">
								<div className="employeeInfoItem d-flex flex-row justify-content-between">
									<div className="employeeInfoItemTitle">Gender:</div>
									<div className="employeeInfoItemValue">
										{workerObject.gender}
									</div>
								</div>
								<div className="employeeInfoItem d-flex flex-row justify-content-between">
									<div className="employeeInfoItemTitle">DOB & Age:</div>
									<div className="employeeInfoItemValue">
										{new Date(workerObject.dob.date).toLocaleDateString(
											"he-il"
										)}{" "}
										🔷 {workerObject.dob.age} years old
									</div>
								</div>
								<div className="employeeInfoItem d-flex flex-row justify-content-between">
									<div className="employeeInfoItemTitle">Email:</div>
									<div className="employeeInfoItemValue">
										{workerObject.email}
									</div>
								</div>
								<div className="employeeInfoItem d-flex flex-row justify-content-between">
									<div className="employeeInfoItemTitle">Phone:</div>
									<div className="employeeInfoItemValue">
										{workerObject.phone}
									</div>
								</div>
								<div className="employeeInfoItem d-flex flex-row justify-content-between">
									<div className="employeeInfoItemTitle">Cell:</div>
									<div className="employeeInfoItemValue">
										{workerObject.cell}
									</div>
								</div>
								<div className="employeeInfoItem d-flex flex-row justify-content-between">
									<div className="employeeInfoItemTitle">Location:</div>
									<div className="employeeInfoItemValue">
										{workerObject.location.city}, {workerObject.location.state},{" "}
										{workerObject.location.country}
									</div>
								</div>
								<MapContainer
									style={{ height: "300px", width: "100%" }}
									center={[
										parseInt(workerObject.location.coordinates.latitude),
										parseInt(workerObject.location.coordinates.longitude),
									]}
									zoom={30}
									scrollWheelZoom={true}
								>
									<TileLayer
										attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
										url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									/>
									<Marker
										position={[
											parseInt(workerObject.location.coordinates.latitude),
											parseInt(workerObject.location.coordinates.longitude),
										]}
									>
										<Popup>
											A pretty CSS3 popup. <br /> Easily customizable.
										</Popup>
									</Marker>
								</MapContainer>
							</div>
						</div>
						<div className="employeePageFooter container-fluid col-12">
							{renderActionButton()}
						</div>
					</div>
				</div>
			</div>
		);
	};

	return <>{(!workerObject && renderLoading()) || renderEmployeePage()}</>;
}
