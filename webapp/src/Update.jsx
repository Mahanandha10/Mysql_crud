import React,{useEffect,useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
function Update(){
    const {id}=useParams()
    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [email, setEmail] = useState()
    const navigate = useNavigate()
    useEffect( () => {
        axios.get('http://localhost:3001/getUser/'+id)
        .then(result => {console.log(result)
        setName(result.data.name)
        setEmail(result.data.email)
        setAge(result.data.age)
    })
        .catch(err=>console.log(err))
    },[])
    const Update=(e)=>{
        e.preventDefault();
        axios.put("http://localhost:3001/updateUser/"+id,{name, email, age})
        .then(result=> {
            console.log(result)
            navigate('/')
        })
        .catch(err =>console.log(err))
    }
  return (
    <div>
       <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-2'>
                <div className="col-md">
                    <div className="card">
                        <div className="card-header">update</div>
                        <div className="card-body">
                            <form onSubmit={Update}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" name="name" 
                                    value={name}  onChange={(e)=>setName(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" 
                                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="age">Age</label>
                                    <input type="number" className="form-control" id="age" name="age" 
                                    value={age}  onChange={(e)=>setAge(e.target.value)}/>
                                </div>
                                <button type="submit" className="btn btn-primary">update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
  )
}

export default Update
