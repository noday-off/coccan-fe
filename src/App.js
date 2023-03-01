import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { productInputs, userInputs, orgInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route index element={<Home />} />
              <Route path="users">
                <Route index element={<List inputType="Users"/>} />
                <Route path="single" element={<Single inputs={userInputs} title='User Details' inputType="Users" />} />
                <Route
                  path="new"
                  element={<New inputs={userInputs} inputType="user" title="Add New User" />}
                  />
              </Route>
              <Route path="organizations">
                <Route index element={<List inputType="Organizations" />} />
                <Route path="single" element={<Single inputs={orgInputs} title='Organization Details' inputType="Organizations"/>} />
                <Route
                  path="new"
                  element={<New inputs={orgInputs} inputType="organization" title="Add New Organization" />}
                  />
              </Route>
              <Route path="vouchers">
                <Route index element={<List />} />
                <Route path=":voucherId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={productInputs} inputType="product" title="Add New Vouchers" />}
                  />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
