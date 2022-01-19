import { EmployeeTable } from "./components/EmployeeTable";
import { makeServer } from "./server";
// import Expand from "./components/Expand";
// import { useEffect, useState } from "react";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

function App() {

  return (
    <div>
      <EmployeeTable />
      {/* <Expand /> */}
    </div>
  );
}
export default App;
