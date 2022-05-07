import { useDispatch } from "react-redux";
import { useRef } from "react";
import { updateGoal, deleteGoal } from "../features/goals/goalSlice";

import { FaTrashAlt } from "react-icons/fa";
import moment from "moment";

import {
	Checkbox,
	Button,
	Heading,
	Text,
	useDisclosure,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
} from "@chakra-ui/react";

function GoalItem({ goal }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();

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
				onClick={onOpen}
				width="20%"
			>
				Delete
			</Button>

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
				isCentered
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Goal
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You can't undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button
								colorScheme="red"
								onClick={() => dispatch(deleteGoal(goal._id))}
								ml={3}
							>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</div>
	);
}

export default GoalItem;
