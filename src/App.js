import { makeServer } from "./server";
import { EmployeeTable } from "./components/EmployeeTable";
import { useEffect, useState } from "react";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

function App() {
  let [employees, setEmployees] = useState([])

  useEffect(() => {
    fetch("api/employees")
    .then((res) => res.json())
    .then((json) => {
      setEmployees(json.employees)
    })
  }, [])
  return (
    <div>
      <header>
        <h1>Employees</h1>
        <EmployeeTable />
      </header>
      <ul>
        {employees.map((employee) => {
          <li key={employee.id}>{employee.firstName}</li>
          console.log(employee.firstName)
        })}
      </ul>
    </div>
  );
}
export default App;
