import React from "react";
import {
	Box,
	Text,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	useToast,
	Stack,
	Button,
	Center,
} from "@chakra-ui/react";
import axios from "axios";
import ReactPlayer from "react-player/lazy";
import DownloadButton from "./DownloadButton";

function Player() {
	const [volume, setVolume] = React.useState<number>(0.5);
	const [title, setTitle] = React.useState<string>("Loading information...");
	const [listeners, setListeners] = React.useState<string>(
		"Loading information..."
	);

	const [src, setSrc] = React.useState<string>("");
	const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

	const toast = useToast();

	const getInfo = async (first: boolean) => {
		try {
			const { data: res } = await axios.get(
				"https://radio.hyperyaderi.ru/status-json.xsl"
			);

			try {
				if (
					res.icestats.source[0].listenurl ===
					"http://radio.hyperyaderi.ru:1337/radio"
				) {
					setTitle(res.icestats.source[0].title);
					setListeners(res.icestats.source[0].listeners);
				} else {
					setTitle(res.icestats.source[1].title);
					setListeners(res.icestats.source[1].listeners);
				}
			} catch {
				setTitle(res.icestats.source.title);
				setListeners(res.icestats.source.listeners);
			}
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
				console.log(`Произошла ошибка: ${e}`);
			}
		}
	};

	React.useEffect(() => {
		getInfo(true);
		const interval = setInterval(() => getInfo(false), 8000);
		return () => {
			clearInterval(interval);
		};
		// eslint-disable-next-line
	}, []);

	const toggle = () => {
		if (isPlaying) {
			setSrc("");
			setIsPlaying(false);
		} else {
			setSrc("https://radio.hyperyaderi.ru/radio");
			setIsPlaying(true);
		}
	};

	return (
		<Box
			bgColor="rgba(255, 255, 255, 0.15)"
			border="1px solid #FFFFFF"
			borderRadius="30px"
			backdropFilter="blur(35px)"
			w="100%"
			maxW={["full", "md"]}
			minW={["full", "md"]}
		>
			<Box display="none">
				<ReactPlayer url={src} playing={isPlaying} volume={volume} />
			</Box>
			<Box m="20px">
				<Stack direction="row" justifyContent="space-between">
					<Center>
						<Button variant="unstyled" w="auto" h="auto" onClick={toggle}>
							{(!isPlaying && (
								<svg
									width="100"
									height="100"
									viewBox="0 0 100 100"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M67.241 44.0372L40.0208 30.4271C35.034 27.9337 29.1667 31.5599 29.1667 37.1353V62.8647C29.1667 68.4401 35.034 72.0663 40.0208 69.573L67.241 55.9629C72.1546 53.506 72.1546 46.494 67.241 44.0372Z"
										fill="white"
										fill-opacity="0.8"
									/>
								</svg>
							)) || (
								<svg
									width="100"
									height="100"
									viewBox="0 0 100 100"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect
										x="29"
										y="30"
										width="14"
										height="41"
										rx="5"
										fill="white"
										fill-opacity="0.8"
									/>
									<rect
										x="57"
										y="30"
										width="14"
										height="41"
										rx="5"
										fill="white"
										fill-opacity="0.8"
									/>
								</svg>
							)}
						</Button>
					</Center>
					<Box w="100%">
						<Stack
							direction="column"
							h="full"
							justifyContent="center"
							textAlign="center"
						>
							<Slider
								aria-label="slider"
								min={1}
								max={10}
								colorScheme="white"
								onChange={(val) => {
									if (val === 1) {
										setVolume(0.0000000001);
										return;
									}
									setVolume(val / 10);
								}}
								defaultValue={volume * 10}
							>
								<SliderTrack>
									<SliderFilledTrack />
								</SliderTrack>
								<SliderThumb />
							</Slider>
							<Box flex="1" />
							<Box>
								<Text
									fontSize="16px"
									fontWeight="400"
									lineHeight="19px"
									color="rgba(255, 255, 255, 0.8)"
								>
									{title}
								</Text>
								<DownloadButton title={title} isMobile={false} />
							</Box>

							<Box flex="1" />
							<Text
								fontSize="16px"
								fontWeight="400"
								lineHeight="19px"
								color="rgba(255, 255, 255, 0.8)"
							>
								{listeners} слушателей
							</Text>
						</Stack>
					</Box>
				</Stack>
			</Box>
		</Box>
	);
}

export default Player;
