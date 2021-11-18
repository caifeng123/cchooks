import { render } from "react-dom";

import App from "./Router";
import "antd/dist/antd.css";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
