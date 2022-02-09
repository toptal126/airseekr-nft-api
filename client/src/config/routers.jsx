import { Route, Routes } from "react-router-dom";

import Expenses from "../routes/expenses";
import Invoices from "../routes/invoices";
import Invoice from "../routes/invoice";
import Home from "../pages/Home";
import Mint from "../pages/Mint";
import Room from "../pages/Room";
import Gallery from "../pages/Gallery";

const Routers = (props) => {
  return (
    /* <Alert /> */
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/mint" element={<Mint />}></Route>
      <Route path="/room" element={<Room />}></Route>
      <Route path="/gallery" element={<Gallery />}></Route>
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
