import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Chat } from "./components/Chat/Chat";
import CustomNavLink from "./components/CustomNavLink";
import { EndpointCreation } from "./components/EndpointCreation/EndpointCreation";
import FolderManagement from "./components/FolderManagement/FolderManagement";

// Placeholder components for your routes

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col w-full h-screen">
        {/* Flex container instead of 'row' */}
        <div className="flex flex-row h-screen">
          {/* Sidebar: flex-column, flex-shrink-0, and padding utilities */}
          <div className="flex flex-col flex-shrink-0 p-4 bg-slate-200">
            {/* Navigation: flex-column utility */}
            <ul className="flex flex-col space-y-2">
              <li>
                <CustomNavLink to="/folder-management">
                  Folder Management
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/endpoint-creation">
                  Endpoint Creation
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink to="/chat">Chat</CustomNavLink>
              </li>
            </ul>
          </div>

          {/* Main content: flex-grow utility for sizing */}
          <div className="w-4/5 overflow-auto">
            <Routes>
              <Route path="/folder-management" element={<FolderManagement />} />
              <Route path="/endpoint-creation" element={<EndpointCreation />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
