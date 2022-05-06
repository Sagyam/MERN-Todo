import { useDispatch } from "react-redux";
import { updateGoal, deleteGoal } from "../features/goals/goalSlice";
import { FaTrashAlt } from "react-icons/fa";
import moment from "moment";

function GoalItem({ goal }) {
	const dispatch = useDispatch();

	const getDate = (date) => {
		return moment(date).format("D MMM HH:mm");
	};

	const handleUpdate = () => {
		let newGoal = {
			...goal,
		};
		newGoal.completed = !newGoal.completed;
		dispatch(updateGoal(newGoal));
	};

	return (
		<div className={goal.completed ? "goal complete" : "goal"}>
			<input
				type="checkbox"
				name="complete"
				id="complete"
				checked={goal.completed ? "checked" : ""}
				onChange={handleUpdate}
			/>
			<div className="goal-text">
				<div>{getDate(goal.updatedAt)}</div>
				<h2>{goal.text}</h2>
				<button
					onClick={() => dispatch(deleteGoal(goal._id))}
					className="close"
				>
					<FaTrashAlt />
				</button>
			</div>
		</div>
	);
}

export default GoalItem;
