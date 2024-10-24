import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFields } from "./state/selectSlice";
import { useFieldsSelector, useFieldsStatus } from "./state/hooks";


const Admin: React.FC = ()=>{
    const fields = useFieldsSelector()
    const status = useFieldsStatus()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchFields())
    }, [dispatch])


    if (status === 'loading') return <h2>Loading...</h2>
  if (status === 'failed') return <h2>Can't get fields...</h2>
    return(
        <>
        <div>
            {fields.map((field:string, index:number)=>(
                <div key={index}>
                    <input 
                    type="checkbox" 
                    id={field.column_name} 
                    name={field.column_name}/>
                    <label htmlFor={field.column_name}>{field.column_name}</label>
                    

                </div>
            ))}
            </div>
        </>
    )
}

export default Admin