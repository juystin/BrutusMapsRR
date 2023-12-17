import express from "express"
import path from "path"
import 'dotenv/config'
import getIndex from "./routes/getIndex.js"
import getBuildings from "./routes/getBuildings.js"
import getAvailability from "./routes/getAvailability.js"

const app = express()
const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, '..', 'client', 'public')))
app.use(express.static(path.join(__dirname, '..', 'client', 'build')))
app.use(express.static(path.join(__dirname, '..', 'client', 'build', 'assets')))

app.use('/', getIndex);
app.use('/api', getBuildings);
app.use('/api', getAvailability);

app.listen(process.env.PORT, () => {
    console.log("Server started")
})
