import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Col, Form, Row, Table } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import { listMyOrders } from "../actions/orderActions"
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants"
import Message from "../components/Message"
import Loader from "../components/Loader"

const ProfileScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [successMsg, setSuccessMsg] = useState(false)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, user, error } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdate = useSelector((state) => state.userUpdate)
  const { success } = userUpdate

  const orderListMy = useSelector((state) => state.orderListMy)
  const { orders, loading: ordersLoading, error: ordersError } = orderListMy

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Passwords must match")
      setTimeout(() => {
        setMessage(null)
      }, 1500)
    } else {
      setSuccessMsg(true)
      setTimeout(() => {
        setSuccessMsg(false)
      }, 1500)
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/login")
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails("profile"))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, userInfo, navigate, user, success])

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {successMsg && <Message variant="success">Profile Updated</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
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

          <Form.Group controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            ></Form.Control>
          </Form.Group>

          <Button className="my-3" type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {ordersLoading ? (
          <Loader />
        ) : ordersError ? (
          <Message variant="danger">{ordersError}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant="light">Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
