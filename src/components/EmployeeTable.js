import { makeServer } from "../server"
import { useState, useEffect } from "react"
import { EmployeeForm } from "./EmployeeForm"


//This function fetches the server.js data and maps over the first and last name of the employees
export function EmployeeTable() {
    const [employees, setEmployees] = useState([])

    const deleteEmployee = async (id) => {
        try {
            await fetch(`/api/employees/${id}`, {method: 'DELETE'})
            setEmployees(employees.filter(employee => employee.id !== id))
        } catch (error) {
            
        }
    }

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
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(({id, firstName, lastName}) => {
                  return(
                  <tr key={id}>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>
                        <button onClick={() => deleteEmployee(id)}>DELETE</button>
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
              // If for some reason the employees cannot be returned the page will render this p tag.
            <p>No employees</p>
            )}
        <EmployeeForm />
      </div>
      );
}