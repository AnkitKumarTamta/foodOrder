import React,{useState} from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",geolocation:""})

    const handlesubmit = async (e)=>{
        e.preventDefault()
        console.log(JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation}))
        
        const response = await fetch('http://localhost:5000/api/createuser',{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
        })

        const data = await response.json();
        console.log(data)
        alert('Successfully Signed in...')
        

        if(!data.success)
        {
            alert('enter valid credentials')
        }
       
        
      
    }
    
    const onChange = (event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value});
    }

  return (
    <>
    <div className='container'>
      <h1 className='text-center m-5'>Registration</h1>
    <form onSubmit={handlesubmit}>
    <div className="form-group">
    <label htmlFor="name" className='form-label'>Name</label>
    <input type="text" className="form-control" name='name' onChange={onChange} value={credentials.name} placeholder="Enter email" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" name='email' onChange={onChange} value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" name='password' onChange={onChange} value={credentials.password} id="exampleInputPassword1" placeholder="Password" />
  </div>
  <div className="form-group">
    <label htmlFor="geolocation" className='form-label'>Address</label>
    <input type="text" className="form-control" name='geolocation' onChange={onChange} value={credentials.geolocation} placeholder="Enter Address" />
  </div>
  
  <button type="submit" className="btn btn-success text-white">Submit</button>
  <Link to='/login' className='btn btn-danger m-3'>Already a user</Link>
</form>
</div>
    </>
  )
}

export default SignUp