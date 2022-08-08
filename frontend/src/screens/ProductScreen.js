import React, { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { listProductDetails, createProductReview } from "../actions/productActions"
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants"
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import Rating from "../components/Rating"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Meta from "../components/Meta"

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")


  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const selector = useSelector((state) => state.productDetails)
  const { loading, product, error } = selector

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview } = productReviewCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if(successProductReview) {
      alert("Review added!")
      setRating(0)
      setComment("")
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }
    if(errorProductReview) {
      setRating(0)
      setComment("")
      setTimeout(() => {
        dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
      }, 2000)
    }
    dispatch(listProductDetails(params.id))
  }, [dispatch, params, successProductReview, errorProductReview])

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(params.id, {rating, comment}))
    
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name}/>
          <Link className='btn btn-light my-3' to='/'>
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price:</strong> ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description: </strong>
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Price:</strong>
                      </Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Status:</strong>
                      </Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (item) => {
                                return (
                                  <option key={item + 1} value={item + 1}>
                                    {item + 1}
                                  </option>
                                )
                              }
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className='text-center'>
                    <Button
                      className='btn-block'
                      type='button'
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => {
                  return (
                    <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating}/>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                  )
                })}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                  {userInfo ? (<Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value=''>Select</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="my-2">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control as='textarea' rows='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary" className="my-2">Submit</Button>
                  </Form>) : (
                    <Message>Please <Link to='/login'>sign in</Link> to write a review</Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
