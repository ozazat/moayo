import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle` 
	:root {
		--base-color-white: #f5f5f5;
		--base-color-lightgrey: #f2f2f2;
		--base-color-grey: #d9d9d9;
		--base-color-black: #333333;
		--point-color-blue: #47b8e0;
		--point-color-yellow: #ffc952;
		--point-color-green: #34be3a;
		--point-color-red: #ff7473;
	}
	*{
		font-family: 'SUITE Variable', 'sans-serif';
		box-sizing: border-box;
	}

	h1 {
		font-weight: 700;
	}
	h3 {
		font-weight: 400;
	}
	div {
		font-weight: 400;
	}
`;

export default GlobalStyles;
