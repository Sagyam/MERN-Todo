import React from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";

import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Input,
	VStack,
} from "@chakra-ui/react";

import { useFormik } from "formik";

function GoalForm() {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			goal: "",
			deadline: "",
			startTime: "",
			endTime: "",
		},
		onSubmit: (values) => {
			console.log(values);
			dispatch(createGoal(values));
		},
	});

	return (
		<Flex align="center" justify="center">
			<Box bg="white" p={6} rounded="md">
				<form onSubmit={formik.handleSubmit}>
					<VStack spacing={6} align="flex-start">
						<FormControl marginBottom={4}>
							<Input
								id="goal"
								name="goal"
								type="text"
								variant="filled"
								placeholder="Enter your goal"
								size="lg"
								isRequired={true}
								errorBorderColor="crimson"
								onChange={formik.handleChange}
								value={formik.values.goal}
							/>
						</FormControl>

						<FormControl marginBottom={4}>
							<HStack spacing={8} align="flex-start">
								<FormLabel htmlFor="deadline">Deadline</FormLabel>
								<input
									type="date"
									id="deadline"
									name="deadline"
									onChange={formik.handleChange}
									value={formik.values.deadline}
								/>
							</HStack>
						</FormControl>

						<HStack spacing={8} align="flex-start">
							<FormControl marginBottom={4}>
								<FormLabel htmlFor="startTime">Start Time</FormLabel>
								<input
									type="time"
									id="startTime"
									name="startTime"
									onChange={formik.handleChange}
									value={formik.values.startTime}
								/>
							</FormControl>
							<FormControl marginBottom={4}>
								<FormLabel htmlFor="endTime">End Date</FormLabel>
								<input
									type="time"
									id="endTime"
									name="endTime"
									onChange={formik.handleChange}
									value={formik.values.endTime}
								/>
							</FormControl>
						</HStack>

						<Button type="submit" colorScheme="purple" isFullWidth>
							Submit
						</Button>
					</VStack>
				</form>
			</Box>
		</Flex>
	);
}

export default GoalForm;
