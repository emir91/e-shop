import React, { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { listProductDetails } from "../actions/productActions"
import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
import Loader from "../components/Loader"

const ProductEditScreen = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState("")

  const { productId } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, product, error } = productDetails

  const submitHandler = (e) => {
    e.preventDefault()
    //UPDATE PRODUCT
  }

  useEffect(() => {
    if (!product || product._id !== productId) {
      dispatch(listProductDetails(productId))
    } else {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.countInStock)
    }
  }, [product, dispatch, productId, navigate])

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>

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

            <Form.Group controlId="price" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="my-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Enter image"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand" className="my-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Enter brand"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="my-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock" className="my-3">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                placeholder="Enter countInStock"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="my-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              ></Form.Control>
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

export default ProductEditScreen
