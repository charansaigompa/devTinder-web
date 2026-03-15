import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectoinSlice'
import { BASE_URL } from '../utils/constants'
import { Link } from 'react-router-dom'


const Connections = () => {
    const dispatch=useDispatch()
    const connections=useSelector(store=>store.connections)

    const fetchConnections=async()=>{
     try{
           const res=await axios.get(BASE_URL+"/user/connections",{withCredentials:true})
        dispatch(addConnections(res.data.data))
     }
     catch(err){
        console.error(err)
     }
    }
    useEffect(()=>{
        fetchConnections()
    },[])
    if(!connections) return
    if(connections.length===0) return <h1>No connections found</h1>

  return (
    <div className='text-center my-10'>
        <h1 className="text-bold text-3xl">Connections</h1>
     {connections.map((connection)=>{
            const{_id,firstName,lastName,photoUrl,about,gender,age}=connection
            return(
                
                <div key={_id} className='flex m-4 p-2 bg-base-300 w-1/2 mx-auto rounded-lg justify-between'>
                      <div className='flex'>
                        <div>
                        <img className="w-20 h-20 rounded-full" src={photoUrl} alt="" />
                    </div>
                    <div className='text-left mx-4'>
                        <h1 className='font-bold text-lg'>{firstName+" "+lastName}</h1>
                        {age&&gender&& <p>{age+" "+gender}</p>}
                        <p>{about}</p>
                    </div>
                      </div>
                    
                    <div className='flex items-center p-2'>
                       <Link to={"/chat/"+_id} >
                        <button className='btn btn-primary '>Chat</button></Link>
                    </div>
                </div>
            )
     })}
      
    </div>
  )
}

export default Connections
