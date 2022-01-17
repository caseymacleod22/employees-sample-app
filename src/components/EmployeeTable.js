import { makeServer } from "../server"
import { useState, useEffect } from "react"
import { EmployeeForm } from "./EmployeeForm"


//This function fetches the server.js data and maps over the first and last name of the employees
export function EmployeeTable() {
    const [employees, setEmployees] = useState([])
    const [employeeId, setEmployeeId] = useState([])
    const [update, setUpdate] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const deleteEmployee = async (id) => {
        try {
            await fetch(`/api/employees/${id}`, {method: 'DELETE'})
            setEmployees(employees.filter(employee => employee.id !== id))
        } catch (error) {
            
        }
    }


    const submitForm = async (event) => {
        event.preventDefault()

        try {
            const res = await fetch('/api/employees', 
            {method: 'POST', body: JSON.stringify({firstName, lastName})})
            const json = await res.json()

            setEmployees([...employees, json.employee])
            setFirstName('')
            setLastName('')
        } catch (error) {
            console.log('Something went wrong')
        }
    }

    const setEmployeeToUpdate = (id) => {
        const employee = employees.find(emp => emp.id === id)
        if(!employee) return
        setUpdate(true)
        setEmployeeId(employee.id)
        setFirstName(employee.firstName)
        setLastName(employee.lastName)
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
                        <button onClick={() => setEmployeeToUpdate(id)}>UPDATE</button>
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
                <form onSubmit={submitForm}>
            <div>
                <div>
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                </div>
                <div>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                </div>
                <div>
                    <button type='submit'>{update ? 'Update' : 'Create'}</button>
                </div>
            </div>
        </form>
      </div>
      );
}