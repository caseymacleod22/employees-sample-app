// import React from "react";
// import { useState } from "react";
// import Modal from "react-modal/lib/components/Modal";

// export function MoreInfo(props) {

//     const customStyles = {
//         content: {
//           top: '50%',
//           left: '50%',
//           right: 'auto',
//           bottom: 'auto',
//           marginRight: '-50%',
//           transform: 'translate(-50%, -50%)',
//         },
//       };

//     let subtitle;
//     const [employees, setEmployees] = useState([])
//     const [modalIsOpen, setIsOpen] = React.useState(false);
//     const [info, setInfo] = useState('')
    
//     function openModal() {
//         setIsOpen(true);
//     }
    
//     function afterOpenModal() {
//         // references are now sync'd and can be accessed.
//         subtitle.style.color = '#f00';
//     }
    
//     function closeModal() {
//         setIsOpen(false);
//     }
    
    

//     function openModal() {
//         setIsOpen(true);
//       }

//     const modalInfo = async(id) => {
//         try {
//           openModal(true)
//           const res = await fetch(`/api/employees/${id}`)
//           const json = await res.json
//            setInfo(json.info) 
  
//         } catch (error) {
          
//         }
//       }
//     return (
//         <div>
//             <button onClick={() => modalInfo(props.id)}>More Info</button>
//             <Modal
//         isOpen={modalIsOpen}
//         onAfterOpen={afterOpenModal}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Example Modal"
//       >
//         <h2 ref={(_subtitle) => (subtitle = _subtitle)}>More Info</h2>
//         <button onClick={closeModal}>close</button>
//         {employees.slice(0,1).map(info => (
//           <>
//           <p>{info.firstName}</p>
//           <p>{info.lastName}</p>
//           <p>{info.email}</p>
//           <p>{info.phone}</p>
//           <p>{info.address.streetAddress}, {info.address.city} {info.address.state} {info.address.zipCode}</p>
//           <p>{info.bio}</p>
//           </>
//         ))}
//       </Modal>
//         </div>
//     )
// }