import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Demo = () => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate("/login");
	}, []);

	return null;
};

export default Demo;
