import { useDispatch } from "react-redux";
import { updateGoal, deleteGoal } from "../features/goals/goalSlice";

import { FaTrashAlt } from "react-icons/fa";
import moment from "moment";

import { Checkbox, Button, Heading, Text } from "@chakra-ui/react";

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
			<Checkbox
				size="lg"
				colorScheme="purple"
				spacing="1rem"
				name="complete"
				id="complete"
				borderColor="purple.500"
				isChecked={goal.completed}
				onChange={handleUpdate}
			></Checkbox>

			<Text size="md">{goal.startTime}</Text>
			<Text
				fontSize="3xl"
				fontWeight="bold"
				as={goal.completed ? "del" : ""}
				color={goal.completed ? "gray.300" : "black"}
			>
				{goal.goal}
			</Text>
			<Button
				leftIcon={<FaTrashAlt />}
				colorScheme="red"
				variant="solid"
				onClick={() => dispatch(deleteGoal(goal._id))}
				width="20%"
			>
				Delete
			</Button>
		</div>
	);
}

export default GoalItem;
