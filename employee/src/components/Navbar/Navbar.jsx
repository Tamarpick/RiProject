import { useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
	const navigate = useNavigate();
	return (
		<div className="w-100 bg-dark p-3 d-flex">
			<div className="d-flex flex-grow-1">
				<div className="px-3 py-2 me-4 text-white">
					<button href="#" className="btn" onClick={() => navigate("/")}>
						Home
					</button>
				</div>
				<div className="px-3 py-2 me-4 text-white">
					<button
						href="#"
						className="btn"
						onClick={() => navigate("/favorites")}
					>
						Favorites
					</button>
				</div>
			</div>
		</div>
	);
}
