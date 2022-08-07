import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { listProduct } from "../actions/productActions"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Paginate from "../components/Paginate"
import ProductCarousel from "../components/ProductCarousel"
import { Link } from "react-router-dom"

const HomeScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()
  
  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1

  const productList = useSelector((state) => state.productList)
  const { loading, products, pages, page, error } = productList

  useEffect(() => {
    dispatch(listProduct(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
    {!keyword ? (
      <ProductCarousel />
    ) : (
      <Link to='/' className="btn btn-light">Go Back</Link>
    )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
          {products.map((product) => {
            return (
               <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
              
            )
          })}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""}/>
        </>
      )}
    </>
  )
}

export default HomeScreen
