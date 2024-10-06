import { useContext, useState, useEffect } from "react"
import axios from "axios"

interface Attendee {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    // Add any other relevant fields if needed
  }

const Test = (props:any)=>{
    const [users, setUsers] = useState<Attendee[]>([])

    useEffect(()=>{
        all()
            }, [])
    const all = async():Promise<void>=>{
                try {
                    const response = await axios.get<Attendee[]>('http://localhost:3200/attendees')
                    if(response.status === 200){
                        setUsers(response.data);
    
                    }
                } catch (error) {
                    console.log(error);
                    
                    
                }
            }
            return (
                <>
                <h2>Attendees</h2>
                {users.map((item)=>{
                    return <div key={item.id}>{item.first_name}</div>
        })}
                </>
            )
     
        }

        export default Test

