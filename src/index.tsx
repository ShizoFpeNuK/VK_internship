import { StrictMode } from "react";
import "./index.scss";
import App from "./App";
import ReactDOM from "react-dom/client";
import { spy } from "mobx";

// !Просмотр actions
spy((e) => {
	if (e.type === "action") {
		console.log(e);
	}
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
