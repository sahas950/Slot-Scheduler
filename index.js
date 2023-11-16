const express = require('express')
const createError = require('http-errors')

const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());

const UserRoute = require('./Routes/User.route.js');
app.use('/users', UserRoute)

const SlotRoute = require('./Routes/Slot.route.js');
app.use('/slots', SlotRoute)

app.use((req, res, next) => {
    next(createError(404, "Unexpected Error"));
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    });
})
console.log(dotenv);
app.listen(process.env.PORT || 4000, () => {
    console.log('Server is running on port ' + (process.env.PORT || 4000));
});
