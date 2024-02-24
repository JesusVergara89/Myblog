import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { db1, storage } from '../../../firebaseconfig'
import { toast } from 'react-toastify'
import { deleteObject, ref } from 'firebase/storage'

const Deletecompo =  ({ id, imageUrl }) => {
    const handleDelete = async() => {
        try {
         await deleteDoc(doc(db1, "Articles", id)) 
         toast("Delete", {type: "success"}) 
         const storageRef = ref(storage, imageUrl)
         await deleteObject(storageRef)
        } catch (error) {
            toast("Error deliting", {type: "error"})
        }    
    }
    return (
        <button onClick={handleDelete} className="delete-card">
            <i className='bx bxs-x-square'></i>
        </button>
    )
}

export default Deletecompo