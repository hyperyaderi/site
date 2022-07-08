import React from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import { useToast, Box, Button } from "@chakra-ui/react";

function DownloadButton({
	title,
	isMobile,
}: {
	title: string;
	isMobile: boolean;
}) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const toast = useToast();

	const Download = () => {
		setIsLoading(true);
		try {
			axios
				.get(`https://music.hyperyaderi.ru/get_nowplaying_track`, {
					responseType: "blob",
				})
				.then((res) => {
					const name = `${title}.mp3`;

					fileDownload(res.data, name);
					setIsLoading(false);
				});
		} catch (e) {
			setIsLoading(false);
			toast({
				title: "Произошла ошибка",
				description: `${e}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	return (
		<Box>
			<Button
				variant="unstyled"
				color="#FFFFFFCC"
				isLoading={isLoading}
				onClick={Download}
			>
				<svg
					width={isMobile ? "30px" : "24"}
					height={isMobile ? "30px" : "24"}
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 14L11.6464 14.3536L12 14.7071L12.3536 14.3536L12 14ZM12.5 5C12.5 4.72386 12.2761 4.5 12 4.5C11.7239 4.5 11.5 4.72386 11.5 5L12.5 5ZM6.64645 9.35355L11.6464 14.3536L12.3536 13.6464L7.35355 8.64645L6.64645 9.35355ZM12.3536 14.3536L17.3536 9.35355L16.6464 8.64645L11.6464 13.6464L12.3536 14.3536ZM12.5 14L12.5 5L11.5 5L11.5 14L12.5 14Z"
						fill="white"
						fill-opacity="0.8"
					/>
					<path
						d="M5 16L5 17C5 18.1046 5.89543 19 7 19L17 19C18.1046 19 19 18.1046 19 17V16"
						stroke="white"
						stroke-opacity="0.8"
					/>
				</svg>
			</Button>
		</Box>
	);
}

export default DownloadButton;
