import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import productRouter from "./routes/productRoutes.js"

dotenv.config()

const app = express()

connectDB()

app.get("/", (req, res) => {
  res.send("API running ...")
})

app.use("/api/products", productRouter)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port ${process.env.PORT}`
  )
)
