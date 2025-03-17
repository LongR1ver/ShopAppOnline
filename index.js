/*

if this file is named server.js instead of index.js, then no need for {"start": "node ./index.js"} in package.json and can run {pnpm start} directly
now this app is using nodemon and babel so the start script is different: "start": "nodemon --inspect --exec babel-node index.js"

pnpm sequelize db:create

pnpm sequelize db:migrate

pnpm sequelize db:migrate:undo

pnpm sequelize db:migrate:undo:all

pnpm sequelize-cli model:generate --name table_name --attributes attributes_1:datatype,attribute_2:datatype,...

*/

//const express = require('express')
//require('dotenv').config()

import express from 'express'
import dotenv from 'dotenv'
import { AppRoute } from './AppRoute'

dotenv.config()
const app = express()
app.use(express.json())
express.urlencoded({ extended: true })

app.get('/', (req, res) => {
    // http://localhost:3000
    res.send('Hello world!')
})

const port = process?.env?.PORT ?? 3000

AppRoute(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})