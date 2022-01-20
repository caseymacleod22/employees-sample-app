import { useState } from "react";

export function EmployeeForm() {
    const [employees, setEmployees] = useState([])
    const [employeeId, setEmployeeId] = useState('')
    const [update, setUpdate] = useState(false)
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const createEmployee = async () => {
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
        setEmployeeId('')
    } catch (err) {
        console.log(err)
    }
}

const submitForm = async (event) => {
    event.preventDefault()

    if(update){
        updateEmployee()
    } else {
        createEmployee()
    }
}

    return (
        <form onSubmit={submitForm}>
            <div>
                <div>
                    <input type="text" placeholder={} value={firstName} onChange={e => setFirstName(e.target.value)}/>
                </div>
                <div>
                <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <div>
                    <button type='submit'>{update ? 'Update' : 'Create'}</button>
                </div>
            </div>
        </form>
    )
}