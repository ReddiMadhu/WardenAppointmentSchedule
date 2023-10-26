const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const prisma = require('./prisma/db');
const verifyJWT = require('./middleware/jwtTokenMiddleware');
require('dotenv').config();

const app = express();

prisma.$connect()
    .then(()=>{
        console.log('Successfully connected to database !!!');
    })
    .catch((err)=>{
        console.error('Error connecting to the database:', err);
    })

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/register', require('./routes/register'));

app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use(verifyJWT);
app.get('/',(req, res) => {
    return res.json({ message: "Welcome to the home page !!!"});
});
app.use('/booking-availbility',require('./routes/availableAppointment'));
app.use('/book-appointment',require('./routes/booking'));
app.use('/user-appointments',require('./routes/appointments'));
app.use('/update-status',require('./routes/updateStatus'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});