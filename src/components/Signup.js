import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert, Dropdown, DropdownButton} from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom"


export default function Signup() {
    
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const nameRef=useRef()
    const [office,setOffice]=useState('Choose your office')
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useNavigate()
    const handleSelect=(e)=>{
        console.log(e);
        setOffice(e)
      }
    async function handleSubmit(e) {
        e.preventDefault()
        if (office === 'Choose your office') {
            return setError("Please choose your office")
        }
        if (passwordRef.current.value.length<6){
            return setError("Password must be minimum 6 characters")
        }
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        if (emailRef.current.value !== "undefined") {

           

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          
            if (!pattern.test(emailRef.current.value)) {
          
              
          
              return setError( "Please enter valid email address")
          
            }
          
          }

        try {
            setError("")
            setLoading(true)
            console.log(emailRef.current.value, passwordRef.current.value,nameRef.current.value)
            await signup(emailRef.current.value, passwordRef.current.value,nameRef.current.value,office)
            
            history('/')
        } catch(error) {
            alert("Error : ", error)
            setError("Failed to create an account")
        }

        setLoading(false)
    }
    return (
        <>
        <Card >
            <Card.Body><h2 className='text-ceter mb-4'>

                Sign Up
            </h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
                    <Form.Group id="email"><Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required /></Form.Group>
                    <Form.Group id="password"><Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required /></Form.Group>
                    <Form.Group id="password-cofirm"><Form.Label>Password Cofirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required /></Form.Group>
                        <Form.Group id="name"><Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required /></Form.Group>
                        Office
                        <style type="text/css">
        </style>
<DropdownButton
      
      variant="secondary"
      menuVariant="dark"
      className="mt-2"
      title={office}
      
      onSelect={handleSelect}
        >
         
              <Dropdown.Item eventKey="A1">A1</Dropdown.Item>
              <Dropdown.Item eventKey="B2">B2</Dropdown.Item>
              <Dropdown.Item eventKey="C3">C3</Dropdown.Item>
              
        </DropdownButton> <br></br>
                    <Button disabled={loading}
                     style={{backgroundColor: "#AF9C67", color: "white", borderColor:"transparent"}} 
                     className="w-100" 
                     type="submit">Sign Up</Button>
                </Form>
            </Card.Body></Card><div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div></>
    )
}
