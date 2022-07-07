import React from "react";
import { Box, Center, Stack, Heading } from "@chakra-ui/react";
import bg from "./images/bg.png";
import bg_night from "./images/bg_night.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Player from "./components/Player";
import MobilePlayer from "./components/MobilePlayer";
import Contacts from "./components/Contacts";
import Chat from "./components/Chat";
import { BrowserView, MobileView } from "react-device-detect";
import "./css/app.css";

function App() {
	const [theme, setTheme] = React.useState<string>("light");
	const [time, setTime] = React.useState<number>(new Date().getHours());

	React.useEffect(() => {
		const interval = setInterval(() => setTime(new Date().getHours()), 60000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	React.useEffect(() => {
		if (time > 6 && time < 21) {
			setTheme("light");
			document.body.style.background = "#EDB5A5";
		} else {
			setTheme("night");
			document.body.style.background = "#5644C7";
		}
	}, [time]);

	return (
		<Box w="full" h="full">
			<LazyLoadImage
				sizes="100vw"
				src={theme === "light" ? bg : bg_night}
				style={{
					position: "fixed",
					inset: "0px",
					boxSizing: "border-box",
					padding: "0px",
					border: "none",
					margin: "auto",
					display: "block",
					width: "0px",
					height: "0px",
					minWidth: "100%",
					maxWidth: "100%",
					minHeight: "100%",
					maxHeight: "100%",
					objectFit: "cover",
					zIndex: "1",
					filter: "blur(10px)",
				}}
				draggable={false}
			/>
			<Box zIndex={100} position="relative">
				<Center
					maxW="full"
					justifyContent="center"
					h="100vh"
					paddingRight={[5, 10]}
					paddingLeft={[5, 0]}
				>
					<Stack
						direction={["column", "row"]}
						spacing="20px"
						justifyContent="space-between"
						h="full"
						w="full"
					>
						<Box flex="1" />
						<Stack
							maxW={["full", "2xl"]}
							h="full"
							spacing={["30px", "0px"]}
							paddingTop={10}
							paddingBottom={10}
							direction="column"
						>
							<Center>
								<Heading
									fontWeight="500"
									color="rgba(255, 255, 255, 0.7)"
									fontSize={["48px", "54px"]}
									lineHeight={"67px"}
								>
									hyperyaderi
								</Heading>
							</Center>
							<Box flex="1" />
							<Center w="100%">
								<BrowserView>
									<Player />
								</BrowserView>
								<MobileView
									style={{
										width: "100%",
									}}
								>
									<MobilePlayer />
								</MobileView>
							</Center>
							<Box flex="1" />
							<Contacts theme={theme} />
						</Stack>
						<Box flex="1" />
						<Box h="full" paddingTop={10} paddingBottom={10}>
							<Chat theme={theme} />
						</Box>
					</Stack>
				</Center>
			</Box>
		</Box>
	);
}

export default App;
