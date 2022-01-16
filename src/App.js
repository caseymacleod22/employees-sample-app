import { makeServer } from "./server";
import { useEffect, useState } from "react";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

function App() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetch('/api/employees')
    .then(res => res.json())
    .then(json => setEmployees(json.employees)
    )
  }, [])
  return (
    <div>
      <header>
        <h1>Employees</h1>
      </header>
      {employees.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>first name</th>
              <th>last name</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(({id, firstName, lastName}) => {
              return(
              <tr key={id}>
                <td>{firstName}</td>
                <td>{lastName}</td>
              </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <p>No employees</p>
        )}
  </div>
  );
}
export default App;
