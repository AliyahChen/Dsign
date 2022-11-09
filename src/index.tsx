import "./i18n";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import Landing from "./pages/Landing/Landing";
import PortfolioBricks from "./pages/PortfolioBricks/PortfolioBricks";
import Profile from "./pages/Profile/Profile";
import FriendList from "./pages/FriendList/FriendList";
import OtherUserProfile from "./pages/OtherUserProfile/OtherUserProfile";
import FavoriteList from "./pages/FavoriteList/FavoriteList";
import SingleProject from "./pages/SingleProject/SingleProject";
import CreateNewProject from "./pages/CreateNewProject/CreateNewProject";
import EditExistProject from "./pages/EditExistProject/EditExistProject";
import Login from "./pages/Login/Login";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Landing />} />
        <Route path="portfolioBricks" element={<PortfolioBricks />} />
        <Route path="profile" element={<Profile />} />
        <Route path="singleProject" element={<SingleProject />} />
        <Route path="createNewProject" element={<CreateNewProject />} />
        <Route path="editExistProject" element={<EditExistProject />} />
        <Route path="friendList" element={<FriendList />} />
        <Route path="userProfile" element={<OtherUserProfile />} />
        <Route path="favoriteList" element={<FavoriteList />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="profile" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
