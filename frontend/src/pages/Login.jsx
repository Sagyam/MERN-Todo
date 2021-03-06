import React, { useEffect } from "react";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

import { Button } from "@chakra-ui/react";

function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess || user) {
			navigate("/");
		}
		dispatch(reset());
	}, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email,
			password,
		};

		dispatch(login(userData));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="heading">
				<p> Login and start setting goals </p>
			</section>

			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<input
							type="email"
							className="form-control"
							name="email"
							id="email"
							value={email}
							placeholder="Enter your email"
							onChange={onChange}
						/>
					</div>

					<div className="form-group">
						<input
							type="password"
							className="form-control"
							name="password"
							id="password"
							value={password}
							placeholder="Enter your password"
							onChange={onChange}
						/>
					</div>

					<div className="form-group">
						<Button
							variant="solid"
							colorScheme="purple"
							width="100%"
							type="submit"
						>
							Login
						</Button>
					</div>
				</form>
			</section>
		</>
	);
}
export default Login;
