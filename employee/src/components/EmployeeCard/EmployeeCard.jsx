import "./employeeCard.css";

export default function EmployeeCard({
	worker,
	onClick,
	addToFavorites,
	isFavorite,
}) {
	return (
		<div className="employeeCard container ">
			<div className="employeeTitle">
				{worker.name.title} {worker.name.first} {worker.name.last}
			</div>
			<div className="employeeContent container-fluid w-100">
				<img
					src={worker.picture.large}
					alt="employee"
					className="employeeImage"
				/>
				<div className="employeeBasicInfo container-fluid d-flex flex-column justify-content-between">
					<div className="employeeEmail">Email: {worker.email}</div>
					<div className="employeePhone">Phone: {worker.cell}</div>
					<div className="employeePhone">Age: {worker.dob.age}</div>
					<div className="employeeFooter d-flex justify-content-center gap-3 w-100">
						<button className="btn btn-primary" onClick={onClick}>
							more info
						</button>
						<button
							className="btn btn-primary"
							style={{ backgroundColor: isFavorite ? "red" : "green" }}
							onClick={addToFavorites}
						>
							{/* {isFavorite ? "Remove from favorites" : "Add to favorites"} */}
							⭐
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
