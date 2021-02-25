const express = require('express');
require('dotenv').config()
const morgan = require('morgan');
const usersRouter = require('./routers/user.router')

const app = express()

app.use(express.json())
app.use(require('cors')())
app.use(morgan("combined"))

app.use('/api/v1/users', usersRouter)

app.listen(process.env.PORT, function(error) {
    if(error)
        console.error(error);
    else
        console.log(`Server Started on PORT ${process.env.PORT}`);
})
