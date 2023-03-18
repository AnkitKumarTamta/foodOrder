import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'


const Login = () => {
  const [credentials, setCredentials] = useState({email:"",password:""})
  const navigate = useNavigate();

    const handlesubmit = async (e)=>{
        e.preventDefault()
        console.log(JSON.stringify({email:credentials.email,password:credentials.password}))
        
        const response = await fetch('http://localhost:5000/api/loginuser',{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        })

        const data = await response.json();
        console.log(data)
        

        if(!data.success)
        {
            alert('enter valid credentials')
        }

        if(data.success)
        {
          localStorage.setItem('userEmail',credentials.email)
          localStorage.setItem('authToken',data.authToken)
          navigate('/')
        }
        

    }
    
    const onChange = (event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value});
    }

  return (
    <>
    <div className='container'>
      <h1 className='text-center m-5'>Login Page</h1>
    <form onSubmit={handlesubmit}>
    
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" name='email' onChange={onChange} value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" name='password' onChange={onChange} value={credentials.password} id="exampleInputPassword1" placeholder="Password" />
  </div>
  
  
  <button type="submit" className="btn btn-success text-white">Login</button>
  <Link to='/createuser' className='btn btn-danger m-3'>I'm a new user</Link>
</form>
</div>
    </>
  )
}

export default Login