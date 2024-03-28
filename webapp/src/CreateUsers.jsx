
import React from 'react'
import { useState } from 'react'
import axios from  'axios'
import { useNavigate} from 'react-router-dom'

function CreateUsers(){
    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [email, setEmail] = useState()
    const navigate = useNavigate();

    const Submit =(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/createUser",{name,email,age})
        .then(result => {
            console.log(result)
             navigate( "/")
        })
        .catch(err => console.log(err))
    }
 {/*const Submit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/createUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, age }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => console.log(result))
    .catch(err => console.error('There was a problem with the fetch operation:', err));
}

*/}

  return (
    <div>
       <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-2'>
                <div className="col-md">
                    <div className="card">
                        <div className="card-header">Sign Up</div>
                        <div className="card-body">
                            <form onSubmit={Submit}>
                                <h2>ADD user</h2>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" name="name"  
                                    onChange={(e)=>setName(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" 
                                    onChange={(e)=>setEmail(e.target.value)} />
                                </div>  
                                <div className="form-group">
                                    <label htmlFor="age">Age</label>
                                    <input type="number" className="form-control" id="age" name="age" 
                                    onChange={(e)=>setAge(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default CreateUsers
