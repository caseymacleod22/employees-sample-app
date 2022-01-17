import { useState } from "react";
import { makeServer } from "../server";

export function EmployeeForm() {
    const [employees, setEmployees] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

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
    return (
        <form onSubmit={submitForm}>
            <div>
                <div>
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                </div>
                <div>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                </div>
                <div>
                    <button type='submit'>Update</button>
                </div>
            </div>
        </form>
    )
}