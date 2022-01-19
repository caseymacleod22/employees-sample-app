import { useState, useEffect } from "react"
// import { EmployeeForm } from "./EmployeeForm"


export function EmployeeTable() {
    const [employees, setEmployees] = useState([])
    const [employeeId, setEmployeeId] = useState([])
    const [update, setUpdate] = useState(false)
    const [expand, setExpand] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
      fetch('/api/employees')
      .then(res => res.json())
      .then(json => setEmployees(json.employees)
      )
      console.log(expand)
    }, [])

    const expandAllEmployees = (id, firstName, lastName, email) => {
      if(expand === false) {
        setExpand(true)
      } if(expand === true) {
        setExpand(false)
      }
      console.log(expand)
    }

    const updateEmployee = async () => {
      try {
      const res = await fetch(`/api/employees/${employeeId}`, 
      {method: 'PATCH', body: JSON.stringify({firstName, lastName})})
      const json = await res.json()

      const employeesCopy = [...employees]
      const index = employees.findIndex((employee) => employee.id === employeeId)
      employeesCopy[index] = json.employee

      setEmployees(employeesCopy)
      setFirstName('')
      setLastName('')
      setUpdate(false)
      setEmployeeId(null)
  } catch (err) {
      console.log(err)
  }
}

const submitForm = async (event) => {
  event.preventDefault()

  if(update){
      updateEmployee()
  }
}
    
  
const deleteEmployee = async (id) => {
  try {
      await fetch(`/api/employees/${id}`, {method: 'DELETE'})
      setEmployees(employees.filter(employee => employee.id !== id))
  } catch (error) {
      
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

    return (
        <div>
          <header>
            <h1>Employees</h1>
          </header>
            <table>
              <tbody>
                {employees.filter(item => item).map(({id, firstName, lastName, email, phone, bio, avatar}) => {
                  return(
                  <tr key={id}>
                    <td>{firstName}</td><br /><br />
                    <td>{lastName}</td><br /><br />
                    {expand === true ? (
                      <table>
                        <thead>
                          <tr>
                          <td>{email}</td><br /><br />
                          <td>{phone}</td><br /><br />
                          <td>{bio}</td><br /><br />
                          <img src={avatar} alt="avatar" style={{height: '60px', width:'100px'}}/>
                          {/* <td>{address}</td><br /><br /> */}
                          </tr>
                        </thead>
                      </table>
                    ) : (
                      <th></th>
                    )}
                    <td>
                        <button onClick={() => setEmployeeToUpdate(id)}>UPDATE</button>
                        <button onClick={() => deleteEmployee(id)}>DELETE</button>                  
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
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
                    <button onClick={() => expandAllEmployees()}>{expand ? 'COLLAPSE ALL' : 'EXPAND ALL'}</button>
                </div>
            </div>
        </form>
      </div>
      )
}