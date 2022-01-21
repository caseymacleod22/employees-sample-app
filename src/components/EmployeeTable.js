import Modal from "react-modal/lib/components/Modal"
import { useState, useEffect } from "react"
import React from "react"
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

export function EmployeeTable() {
    const [employees, setEmployees] = useState([])
    const [employeeId, setEmployeeId] = useState([])
    const [update, setUpdate] = useState(false)
    const [expand, setExpand] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [info, setInfo] = useState('')

    useEffect(() => {
      fetch('/api/employees')
      .then(res => res.json())
      .then(json => setEmployees(json.employees)
      )
      // console.log(expand)
    }, [])

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    const expandAllEmployees = () => {
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

    const moreInfo = async(id) => {
      try {
        openModal(true)
        const res = await fetch(`/api/employees/${id}`)
        const json = await res.json
         setInfo(json.info) 

      } catch (error) {
        
      }
    }

    return (
        <div>
        <div>
        </div>
        <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>More Info</h2>
        <button onClick={closeModal}>close</button>
        {employees.slice(0, 1).map(info => (
          <>
          <p>{info.firstName}</p>
          <p>{info.lastName}</p>
          <p>{info.email}</p>
          <p>{info.phone}</p>
          <p>{info.address.streetAddress}, {info.address.city} {info.address.state} {info.address.zipCode}</p>
          <p>{info.bio}</p>
          </>
        ))}
      </Modal>
    </div>
            <table>
              <tbody>
              <tr>
                <td>
                  <button onClick={() => expandAllEmployees()}>{expand ? 'COLLAPSE ALL' : 'EXPAND ALL'}
                </button>
                </td>
              </tr>
                {employees.filter(item => item).map(({id, avatar, firstName, lastName, email, phone, bio, address}) => {
                  return(
                    <tr key={id}>
                    <td><img src={avatar} alt="avatar" style={{height: '60px', width:'100px'}}/></td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    {expand === true ? (
                      <table>
                        <thead>
                          <tr>
                          <td>{email}</td>
                          <td>{phone}</td>
                          <td>{address.streetAddress}</td>
                          <td>{address.city}, {address.state} {address.zipCode}</td>
                          <td>{bio}</td>  
                          {console.log(email)}                  
                          </tr>
                        </thead>
                      </table>
                      ) : (
                      <th></th>
                    )}
                    <td>
                        <button onClick={() => setEmployeeToUpdate(id)}>Update</button>
                        <button onClick={() => moreInfo(id)}>More Info</button>
                        <button onClick={() => deleteEmployee(id)}>Delete</button>        
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
                    <button type='submit'>{update ? 'Update' : ''}</button>
                </div>
            </div>
        </form>
      </div>
      )
}