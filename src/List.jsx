import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';


function List({items , removeItem, editItem}) {
    return (

        <>
            {items.map((item) => {
                const { id, title } = item;
                return (
                    <div key={id} className="px-2 d-flex justify-content-between align-items-center">
                        <p className="P-title m-1">{title}</p>
                        <div>
                            <button onClick={()=>{editItem(id)}} className='btn btn-success m-1 text-white p-1'>
                                <FaEdit />
                            </button>
                            <button onClick={()=> {removeItem(id)}} className='btn btn-danger m-1 p-1'>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                )

            })}

        </>
    )
}

export default List
