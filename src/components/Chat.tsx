import React from "react";
import {
	Box,
	Text,
	Stack,
	Link,
	Center,
	useToast,
	FormControl,
	Input,
} from "@chakra-ui/react";
import axios from "axios";
import "../css/chat.css";

interface Message {
	name: string;
	message: string;
	created_at?: string;
}

function Chat() {
	const toast = useToast();

	const [name, setName] = React.useState<string | null>(null);
	const [messages, setMessages] = React.useState<Message[] | null>(null);

	const [messageInput, setMessageInput] = React.useState<string>("");

	const [nameInput, setNameInput] = React.useState<string>("");

	const getMessages = async (first: boolean) => {
		try {
			const { data: res } = await axios.post(
				"https://chat.hyperyaderi.ru/getMessages"
			);

			setMessages(res.messages);
		} catch (e) {
			if (first) {
				toast({
					title: "Произошла ошибка",
					description: `${e}`,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			} else {
				//console.log(`Произошла ошибка: ${e}`);
			}
		}
	};

	React.useEffect(() => {
		getMessages(true);
		// eslint-disable-next-line
	}, []);

	const Interval = () => {
		getMessages(false);
	};

	setInterval(Interval, 2000);

	const sTest = (s: string) => {
		if (s === "") return false;
		let count = 0;
		for (let i = 0; i < s.length; i++) {
			if (s[i] === " ") ++count;
		}

		if (count === s.length) return false;

		return true;
	};

	const handleNameChange = () => {
		if (sTest(nameInput)) {
			setName(nameInput);
			return;
		}

		toast({
			title: "Введите имя!",
			status: "error",
			duration: 3000,
			isClosable: true,
		});
	};

	const MessageBlock = (props: Message) => (
		<Box>
			<Stack direction="column" spacing="1px">
				<Text
					color="rgba(228, 228, 228, 0.8)"
					fontWeight="400"
					fontSize="14px"
					lineHeight="16px"
				>
					{props.name}
				</Text>
				<Text
					color="rgba(255, 255, 255, 0.9)"
					fontWeight="400"
					fontSize="15px"
					lineHeight="19px"
				>
					{props.message}
				</Text>
			</Stack>
		</Box>
	);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		await handleMessageChange();
	};

	const handleMessageChange = async () => {
		if (sTest(messageInput)) {
			setName(messageInput);
			try {
				await axios.post("https://chat.hyperyaderi.ru/sendMessage", {
					name: name,
					message: messageInput,
				});
			} catch (e) {
				toast({
					title: "Произошла ошибка",
					description: `${e}`,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			}

			getMessages(false);

			setMessageInput("");
			return;
		}

		toast({
			title: "Введите сообщение!",
			status: "error",
			duration: 3000,
			isClosable: true,
		});
	};

	return (
		<Box
			bgColor="rgba(255, 255, 255, 0.15)"
			border="1px solid #FFFFFF"
			borderRadius="30px"
			maxW="md"
			h="full"
			maxH="100vh"
		>
			<Box>
				<Box borderBottom="1px" borderBottomColor="white">
					{(!name && (
						<Stack direction="row" m="20px" spacing="10px">
							<FormControl>
								<Input
									value={nameInput}
									placeholder="Введите имя"
									color="rgba(255, 255, 255, 0.8)"
									_placeholder={{ color: "rgba(255, 255, 255, 0.8)" }}
									onChange={(e: any) => {
										setNameInput(e.target.value);
									}}
									bgColor="rgba(255, 255, 255, 0.15)"
									border="1px solid #FFFFFF"
									borderRadius="20px"
									focusBorderColor="#EDB5A5"
								/>
							</FormControl>
							<Center>
								<Link
									onClick={handleNameChange}
									color="rgba(255, 255, 255, 0.75)"
								>
									Войти
								</Link>
							</Center>
						</Stack>
					)) || (
						<form onSubmit={handleSubmit}>
							<Stack m="20px" direction="row" spacing="5px">
								<FormControl>
									<Input
										value={messageInput}
										placeholder="Введите сообщение"
										_placeholder={{ color: "rgba(255, 255, 255, 0.8)" }}
										onChange={(e: any) => {
											setMessageInput(e.target.value);
										}}
										color="rgba(255, 255, 255, 0.8)"
										bgColor="rgba(255, 255, 255, 0.15)"
										border="1px solid #FFFFFF"
										borderRadius="20px"
										focusBorderColor="#EDB5A5"
									/>
								</FormControl>
								<Center>
									<Link
										onClick={handleMessageChange}
										color="rgba(255, 255, 255, 0.75)"
									>
										<svg
											width="40"
											height="40"
											viewBox="0 0 57 57"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M25.2432 27.4294L20.6925 20.0223C19.3941 17.9088 18.7448 16.8521 19.2081 16.2999C19.6714 15.7478 20.8249 16.2036 23.1317 17.1154L43.2409 25.063C44.8641 25.7045 45.6757 26.0253 45.7296 26.6409C45.7834 27.2566 45.0399 27.7134 43.5528 28.6271L25.1291 39.9459C23.0156 41.2443 21.9589 41.8936 21.4068 41.4303C20.8546 40.967 21.3105 39.8135 22.2222 37.5067L25.4175 29.4218L35.3078 28.5565C35.858 28.5084 36.265 28.0234 36.2169 27.4732C36.1687 26.923 35.6837 26.516 35.1335 26.5642L25.2432 27.4294Z"
												fill="white"
												fill-opacity="0.75"
											/>
										</svg>
									</Link>
								</Center>
							</Stack>
						</form>
					)}
				</Box>
				<Box m="20px" paddingTop={5}>
					<Stack
						spacing="15px"
						maxH="70vh"
						direction="column"
						overflow="scroll"
						className="chat"
					>
						{messages && (
							<>
								{messages.map((message) => (
									<MessageBlock name={message.name} message={message.message} />
								))}
							</>
						)}
					</Stack>
				</Box>
			</Box>
		</Box>
	);
}

export default Chat;
