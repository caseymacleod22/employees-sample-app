import { useState } from "react"

export function EmployeeForm() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [update, setUpdate] = useState(false)
    const [employees, setEmployees] = useState([])
    const [employeeId, setEmployeeId] = useState([])

    const submitForm = async (event) => {
        event.preventDefault()
      
        if(update){
            updateEmployee()
        }
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

  const setEmployeeToUpdate = (id) => {
    const employee = employees.find(emp => emp.id === id)
    if(!employee) return
    setUpdate(true)
    setEmployeeId(employee.id)
    setFirstName(employee.firstName)
    setLastName(employee.lastName)
    console.log('working')
}

    return (
        <form onSubmit={submitForm}>
        <div>
          <div>
             <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
          </div>
          <div>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
            {employees.map(e => (
                <button onClick={() => setEmployeeToUpdate(e.id)}>Update</button>
            ))}
          </div>
          <div>
            <button type='submit' onClick={console.log('test')}>Submit</button>
          </div>
        </div>
      </form>
    )
}