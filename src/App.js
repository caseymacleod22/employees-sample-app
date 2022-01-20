import { EmployeeTable } from "./components/EmployeeTable";
import Header from "./components/Header";
import { makeServer } from "./server";
// import { useEffect, useState } from "react";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

function App() {

  return (
  <div>
    <Header />
    <EmployeeTable />
  </div>
  );
}
export default App;
