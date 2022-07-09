import React from "react";
import { useToast } from "@chakra-ui/react";

function SafariAlert() {
	const toast = useToast();
	React.useEffect(() => {
		toast({
			title: "Внимание!",
			description:
				"Наш сайт не оптимизирован под Safari, поэтому возможны баги и ошибки.",
			status: "warning",
			duration: 9000,
			isClosable: true,
		});
		// eslint-disable-next-line
	}, []);

	return null;
}

export default SafariAlert;
