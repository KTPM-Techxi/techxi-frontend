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
import InputUserInforForm from "./components/CallCenter/InputUserInforForm";
import Map from "./components/Map/Map";
import { useEffect, useState } from 'react';
import * as Realm from 'realm-web';
axios.defaults.baseURL = 'http://localhost:8080';

const app = new Realm.App({ id: 'tech-wnnaa' });

function App() {
  const [user, setUser] = useState();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const login = async () => {
      // Authenticate anonymously
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user);
      //   console.log('🚀 ~ login ~ user:', user);

      // Connect to the database
      const mongodb = app.currentUser.mongoClient('mongodb-atlas');
      const collection = mongodb.db('techxi').collection('bookings');

      // Everytime a change happens in the stream, add it to the list of events
      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change]);
      }
    };
    login();
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage user={user} setUser={setUser} evetns={events} setEvents={setEvents} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/requests" element={<AllRequests />} />
        <Route path="/request" element={<RequestsPage />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/map" element={<Map />} />
        {/* Handle Error page */}
        <Route path="*" element={<ErrorPage />} />
        {/* Test page to test component */}
        <Route path="/test" element={<DateTimePicker />} />
      </Routes>
    </Layout>
  );
}

export default App;
