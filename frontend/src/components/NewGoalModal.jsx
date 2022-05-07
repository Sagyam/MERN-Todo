import React from "react";
import { useDisclosure } from "@chakra-ui/react";

import { FaPlus } from "react-icons/fa";

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Button,
} from "@chakra-ui/react";

import GoalForm from "./GoalForm";

function NewGoalModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const Overlay = () => (
		<ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px) " />
	);
	const [overlay, setOverlay] = React.useState(<Overlay />);
	return (
		<>
			<Button
				onClick={() => {
					setOverlay(<Overlay />);
					onOpen();
				}}
				leftIcon={<FaPlus />}
				colorScheme="purple"
			>
				Add Goal
			</Button>

			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				{overlay}
				<ModalContent>
					<ModalHeader>Add New Goal</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<GoalForm />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

export default NewGoalModal;
