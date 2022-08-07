import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import { Button, Col, Row, Table } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import {
  listProduct,
  deleteProduct,
  createProduct,
} from "../actions/productActions"
import { PRODUCT_CREATE_RESET } from "../constants/productConstants"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Paginate from "../components/Paginate"


const ProductListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams

  const pageNumber = params.pageNumber || 1

  const productList = useSelector((state) => state.productList)
  const { loading, products, pages, page, error } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: deleteLoading,
    success: successDelete,
    error: deleteError,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: createLoading,
    success: successCreate,
    error: createError,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login")
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProduct('', pageNumber))
    }
  }, [
    dispatch,
    navigate,
    successCreate,
    successDelete,
    createdProduct,
    userInfo,
  ])

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {deleteLoading && <Loader />}
      {deleteError && <Message variant="danger">{deleteError}</Message>}
      {createLoading && <Loader />}
      {createError && <Message variant="danger">{createError}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <Paginate pages={pages} page={page} isAdmin={true}/>
        </>
      )}
    </>
  )
}

export default ProductListScreen
