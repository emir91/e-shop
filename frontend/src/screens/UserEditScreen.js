import React, { useState, useEffect } from "react"
import { Link, useParams, useLocation, useNavigate } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { getUserDetails } from "../actions/userActions"
import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
import Loader from "../components/Loader"

const UserEditScreen = () => {
  const [email, setEmail] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [name, setName] = useState("")

  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, user, error } = userDetails

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (!user || user._id !== id) {
      dispatch(getUserDetails(id))
    } else {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [user, dispatch, id])

  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin" className="my-3">
              <Form.Check
                type="password"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                label="Is Admin"
              ></Form.Check>
            </Form.Group>

            <Button className="my-3" type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
