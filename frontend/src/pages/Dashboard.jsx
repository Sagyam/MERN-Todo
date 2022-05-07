import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import GoalItem from "../components/GoalItem";
import NewGoalModal from "../components/NewGoalModal";

import { getGoals, reset } from "../features/goals/goalSlice";

import { toast } from "react-toastify";
import { Text, Button, Spinner } from "@chakra-ui/react";

import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";

function Dashboard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	//eslint-disable-next-line no-unused-vars
	const { goals, isError, isSuccess, isLoading, message } = useSelector(
		(state) => state.goals
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
			dispatch(reset());
		}

		if (!user) {
			navigate("/login");
		} else {
			dispatch(getGoals());
		}

		return () => {
			dispatch(reset());
		};
	}, [user, navigate, isError, message, dispatch]);

	if (isLoading) {
		return (
			<Spinner
				thickness="5px"
				speed="0.5s"
				emptyColor="gray.200"
				color="purple.500"
				size="xl"
			/>
		);
	}

	const capitalize = (s) => {
		if (typeof s !== "string") return "";
		return s.charAt(0).toUpperCase() + s.slice(1);
	};

	const getGreeting = () => {
		const hour = new Date().getHours();
		if (hour < 12) {
			return "Good morning";
		} else if (hour < 18) {
			return "Good afternoon";
		} else {
			return "Good evening";
		}
	};

	return (
		<>
			<section className="heading">
				<Text
					bgGradient="linear(to-l, #7928CA, #FF0080)"
					bgClip="text"
					fontSize="6xl"
					fontWeight="extrabold"
				>
					{getGreeting()} {user && capitalize(user.name)}
				</Text>
				<p>Goals Dashboard</p>
			</section>

			<NewGoalModal />

			<section className="content">
				{goals.length > 0 ? (
					<div className="goals">
						{goals.map((goal) => (
							<GoalItem key={goal._id} goal={goal} />
						))}
					</div>
				) : (
					<h3>You have not set any goals</h3>
				)}
			</section>
		</>
	);
}

export default Dashboard;
