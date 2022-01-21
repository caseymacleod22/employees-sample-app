import Modal from "react-modal/lib/components/Modal"
import { useState, useEffect } from "react"
import React from "react"
import { EmployeeForm } from "./EmployeeForm";
// import { EmployeeForm } from "./EmployeeForm"

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

  const styleUl = {
    listStyleType: 'none'
  }

  const avatarStyling = {
    height: '60px',
    width: '100'

  }

export function EmployeeTable() {
    const [employees, setEmployees] = useState([])
    const [employeeId, setEmployeeId] = useState([])
    const [update, setUpdate] = useState(false)
    const [expand, setExpand] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [selectedEmployee, setSelectedEmployee] = useState('')

    useEffect(() => {
      fetch('/api/employees')
      .then(res => res.json())
      .then(json => setEmployees(json.employees)
      )
    }, [])

    const expandAllEmployees = () => {
      if(expand === false) {
        setExpand(true)
      } if(expand === true) {
        setExpand(false)
      }
    }

//     const updateEmployee = async () => {
//       try {
//       const res = await fetch(`/api/employees/${employeeId}`, 
//       {method: 'PATCH', body: JSON.stringify({firstName, lastName})})
//       const json = await res.json()

//       const employeesCopy = [...employees]
//       const index = employees.findIndex((employee) => employee.id === employeeId)
//       employeesCopy[index] = json.employee

//       setEmployees(employeesCopy)
//       setFirstName('')
//       setLastName('')
//       setUpdate(false)
//       setEmployeeId(null)
//   } catch (err) {
//       console.log(err)
//   }
// }

// const submitForm = async (event) => {
//   event.preventDefault()

//   if(update){
//       updateEmployee()
//   }
// }
    
  
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
    <div>
      <>
      <EmployeeForm />
      <button onClick={() => expandAllEmployees()}>{expand ? 'COLLAPSE ALL' : 'EXPAND ALL'}</button>
              <ul style={styleUl}>
                {employees.map(e => (
                <li>
                <img src={e.avatar} alt="avatar" style={avatarStyling} key={e.id} onClick={() => setSelectedEmployee(e)}/>
                <li>{e.firstName} {e.lastName}</li>
                  <button onClick={() => setEmployeeToUpdate(e.id)}>Update</button>
                  <button onClick={() => deleteEmployee(e.id)}>Delete</button>        
                  {expand === true ? (

                        <ul style={styleUl}>
                        <li>{e.email}</li>
                        <li>{e.phone}</li>
                        <li>{e.address.streetAddress}</li>
                        <li>{e.address.city}, {e.address.state} {e.address.zipCode}</li>
                        <li>{e.bio}</li>  
                        </ul>

                      ) : (
                      <li></li>
                    )}
              </li>
            ))}
          </ul>
          </>
          <Modal isOpen={selectedEmployee}
                 style={customStyles}
          >
          <img src={selectedEmployee?.avatar} alt='avatar' style={avatarStyling} />
          <p>{selectedEmployee?.firstName}</p>
          <p>{selectedEmployee?.lastName}</p>
          <p>{selectedEmployee?.email}</p>
          <p>{selectedEmployee?.phone}</p>
          <p>{selectedEmployee?.address?.streetAddress} {selectedEmployee?.address?.city}, {selectedEmployee?.address?.state} {selectedEmployee?.address?.zipCode}</p>
          <p>{selectedEmployee?.bio}</p>
          <button onClick={() => setSelectedEmployee(null)}>Close</button>
        </Modal>
    </div>
  </div>
    )
}