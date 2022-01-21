// import { useState, useEffect } from "react"

// export function EmployeeForm() {

//     const [firstName, setFirstName] = useState('')
//     const [lastName, setLastName] = useState('')
//     const [update, setUpdate] = useState(false)
//     const [employees, setEmployees] = useState([])
//     const [employeeId, setEmployeeId] = useState([])

//     useEffect(() => {
//         fetch('/api/employees')
//         .then(res => res.json())
//         .then(json => setEmployees(json.employees)
//         )
//       }, [])
      
//       const updateEmployee = async () => {
//         try {
//         const res = await fetch(`/api/employees/${employeeId}`, 
//         {method: 'PATCH', body: JSON.stringify({firstName, lastName})})
//         const json = await res.json()
  
//         const employeesCopy = [...employees]
//         const index = employees.findIndex((emp) => emp.id === employeeId)
//         employeesCopy[index] = json.employee
  
//         setEmployees(employeesCopy)
//         setFirstName('')
//         setLastName('')
//         setUpdate(false)
//         setEmployeeId(null)
//     } catch (err) {
//         console.log(err)
//     }
//   }

//   const submitForm = async (event) => {
//     event.preventDefault()
  
//     if(update){
//         updateEmployee()
//     }
//   }

//   const setEmployeeToUpdate = (id) => {
//     const employee = employees.find(emp => emp.id === id)
//     if(!employee) return
//     setUpdate(true)
//     setEmployeeId(employee.id)
//     setFirstName(employee.firstName)
//     setLastName(employee.lastName)
// }

//     return (
//         <form onSubmit={submitForm}>
//         <div>
//           <div>
//              <input type="text" placeholder='First Name' value={firstName} onChange={e => setFirstName(e.target.value)}/>
//           </div>
//           <div>
//             <input type="text" placeholder='Last Name' value={lastName} onChange={e => setLastName(e.target.value)}/>
//             {employees.map(e => (
//                 <button onClick={() => console.log(setEmployeeToUpdate(e.id))} >Update</button>
//             ))}
//           </div>
//           <div>
//             <button type='submit'>Submit</button>
//           </div>
//         </div>
//       </form>
//     )
// }