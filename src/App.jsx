import { HashRouter as Router, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/ErrorPage";
import Root from "./routes/RootPage";
import RequestsPage from "./pages/RequestsPage";
import Layout from "./layout/layout";
function App() {
	return (
		<Layout>
		<Routes>
			<Route path="/" element={<Root/>} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/request" element={<RequestsPage />} />
			{/* Handle Error page */}
			<Route path="*" element={<ErrorPage />} />
		</Routes>
		</Layout>
	)

}

export default App;
