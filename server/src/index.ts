import express from "express"
import path from "path"
import cors from "cors"
import 'dotenv/config'
import getIndex from "./routes/getIndex.js"
import getBuildings from "./routes/getBuildings.js"
import getAvailability from "./routes/getAvailability.js"
import getClassroomSchedule from "./routes/getClassroomSchedule.js"
import getSectionInfo from "./routes/getSectionInfo.js"

const app = express() 
const __dirname = path.resolve()

app.use(cors())

app.use(express.static(path.join(__dirname, '..', 'client', 'public')))
app.use(express.static(path.join(__dirname, '..', 'client', 'build')))
app.use(express.static(path.join(__dirname, '..', 'client', 'build', 'assets')))

app.use('/', getIndex);
app.use('/api', getBuildings);
app.use('/api', getAvailability);
app.use('/api', getClassroomSchedule);
app.use('/api', getSectionInfo);

// Fallback to 8000 if env PORT not specified
app.listen(process.env.PORT || 8000, () => {
    console.log("Server started")
})
