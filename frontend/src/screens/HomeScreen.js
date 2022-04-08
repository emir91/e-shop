import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listProduct } from "../actions/productActions"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"

const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)

  const { loading, products, error } = productList

  useEffect(() => {
    dispatch(listProduct())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            )
          })}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
