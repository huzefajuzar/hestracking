import React, { useState,useRef, useEffect } from "react"
import { Card, Button, Alert, Dropdown, DropdownButton,Form} from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { collection, query, where, getDocs, onSnapshot,doc} from "firebase/firestore";
import db from "../firebase"




export default function Dashboard() {
  
  const [error, setError] = useState("")
  
  const { currentUser, logout,userid} = useAuth()
  const history = useNavigate()
  const descriptionRef=useRef()
  
  const [loading, setLoading] = useState(false)
  
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  const [value,setValue]=useState('Choose a Category')
  
  const [colors, setColors]=useState("")
  console.log(colors)
  useEffect(
    ()=> 
      onSnapshot(doc(db,"users",userid()), 
    (snapshot)=>
    {setColors(snapshot.data())}
    ),
    
  [userid])

  
  const handleSelect=(e)=>{
    console.log(e);
    setValue(e)
  }
  async function handleSubmit(e) {
    e.preventDefault()

    if (value === 'Choose a Cateogry') {
        return setError("Please choose a category")
    }
    if(descriptionRef.current.value === ''){return setError("Please fill the description")}

    try {
        setError("")
        setLoading(true)
        console.log(userid())
        history('/')
    } catch(error) {
        alert("Error : ", error)
        setError("Failed to create a ticket")
    }

    setLoading(false)
}
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {colors.email}<br></br>
          <strong>Name:</strong> {colors.name}<br></br>
          <strong>Office #:</strong> {colors.office}<br></br>

          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <Card><h2 className="text-center mb-4">Create a Ticket</h2>
      <Card.Body>
       
        <Form onSubmit={handleSubmit}>
        <strong>Category</strong> <DropdownButton
      
      title={value}
      
      onSelect={handleSelect}
        >
              <Dropdown.Item eventKey="Electrical">Electrical</Dropdown.Item>
              <Dropdown.Item eventKey="Mechanical">Mechanical</Dropdown.Item>
              <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
              
        </DropdownButton><br></br>
                    <Form.Group id="text"><Form.Label><strong>Description</strong></Form.Label>
                        <Form.Control size="sm" type="text" ref={descriptionRef} required /></Form.Group><br></br>
                
                    
                    
                        <Button disabled={loading} className="w-100" type="submit">Create Ticket</Button></Form></Card.Body></Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}
