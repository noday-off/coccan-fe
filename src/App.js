import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import VoucherNew from "./pages/new/VoucherNew";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { userInputs, orgInputs, voucherInputs, universityInputs, departmentInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, } from "react";
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
                <Route index element={<List inputType="Vouchers"/>} />
                <Route path="single" element={<Single inputs={voucherInputs} title='Voucher Details' inputType="Vouchers"/>} />
                <Route
                  path="new"
                  element={<New inputs={voucherInputs} inputType="voucher" title="Add New Voucher" />}
                  />
              </Route>
              <Route path="universities">
                <Route index element={<List inputType="Universities"/>} />
                <Route path="single" element={<Single inputs={universityInputs} title='University Details' inputType="Universities"/>} />
                <Route
                  path="new"
                  element={<New inputs={universityInputs} inputType="university" title="Add New University" />}
                  />
              </Route>
              <Route path="departments">
                <Route index element={<List inputType="Departments"/>} />
                <Route path="single" element={<Single inputs={departmentInputs} title='Department Details' inputType="Departments"/>} />
                <Route
                  path="new"
                  element={<New inputs={departmentInputs} inputType="department" title="Add New Department" />}
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
