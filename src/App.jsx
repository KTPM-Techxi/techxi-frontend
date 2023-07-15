import { HashRouter as Router, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/ErrorPage";
import Root from "./routes/RootPage";
import RequestsPage from "./pages/RequestsPage";
import Layout from "./layout/layout";
import { HomePage } from "./pages/HomePage";
import AllRequests from "./pages/AllRequests/AllRequests";
import DateTimePicker from "./pages/TestPage";

import axios from 'axios'
import { UserList } from "./pages/UserList";
axios.defaults.baseURL = 'http://localhost:8080'

function App() {
	return (
		<Layout>
		<Routes>
			<Route path="/" element={<HomePage/>} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/requests" element={<AllRequests />} />
			<Route path="/request" element={<RequestsPage />} />
			<Route path="/userlist" element={<UserList />} />
			{/* Handle Error page */}
			<Route path="*" element={<ErrorPage />} />
			{/* Test page to test component */}
			<Route path="/test" element={<DateTimePicker />} />
		</Routes>
		</Layout>
	)

}

export default App;
