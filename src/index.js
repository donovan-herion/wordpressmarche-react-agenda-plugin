import App from "./components/App";

// Added lines to use wp.element instead of importing React
const { render } = wp.element;

ReactDOM.render(<App />, document.querySelector("#app"));
