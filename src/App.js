import { EmployeeForm } from "./components/EmployeeForm";
import { EmployeeTable } from "./components/EmployeeTable";
import { makeServer } from "./server";
// import { useEffect, useState } from "react";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

function App() {

  return (
    <div>
      <EmployeeTable />
    </div>
  );
}
export default App;
