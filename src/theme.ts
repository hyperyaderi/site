import { extendTheme } from "@chakra-ui/react";
import "./css/theme.css";

const styles = {
	global: {
		body: {
			bg: "#EDB5A5",
		},
	},
};

const fonts = {
	heading: `'Stolzl Medium', sans-serif`,
	body: `'Stolzl Regular', sans-serif`,
};

export default extendTheme({ fonts, styles });
