import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js"
import orderRouter from "./routes/orderRoutes.js"

dotenv.config()

const app = express()

app.use(express.json())

connectDB()

app.get("/", (req, res) => {
  res.send("API running ...")
})

app.use("/api/products", productRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port ${process.env.PORT}`
  )
)
