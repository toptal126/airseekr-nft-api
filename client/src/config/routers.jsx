import { Route, Routes, Navigate } from "react-router-dom";

import Expenses from "../routes/expenses";
import Invoices from "../routes/invoices";
import Invoice from "../routes/invoice";
import Home from "../pages/Home";
import Mint from "../pages/Mint";
import Arena from "../pages/Arena";
import Gallery from "../pages/Gallery";
import Doa from "../pages/Arena/Doa";
import Leaderboard from "../pages/Arena/Leaderboard";
import Dashboard from "../pages/Arena/Dashboard";
import Records from "../pages/Arena/Records";

const Routers = (props) => {
  return (
    /* <Alert /> */
    <Routes>
      <Route index element={<Home />}></Route>
      <Route exact path="mint" element={<Mint />}></Route>
      <Route path="arena" element={<Arena />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="doa" element={<Doa />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="records" element={<Records />} />
        <Route index element={<Navigate replace to="dashboard" />} />
      </Route>
      <Route path="gallery" element={<Gallery />}></Route>
      {/* <Route path="invoices" element={<Invoices />}>
        <Route
          index
          element={
            <main style={{ padding: "1rem" }}>
              <p>Select an invoice</p>
            </main>
          }
        ></Route>
        <Route path=":invoiceId" element={<Invoice />}></Route>
      </Route> */}
      <Route path="expenses" element={<Expenses />}></Route>
      {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
      {/* <Route component={NotFound} /> */}
      <Route
        element={
          <main style={{ padding: "1rem" }}>
            <p> There's nothing here</p>
          </main>
        }
      ></Route>
    </Routes>
  );
};

export default Routers;
