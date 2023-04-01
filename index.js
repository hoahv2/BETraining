const escapehtml = require("escape-html")
const express = require("express")
const bodyParser = require('body-parser');
const path = require('path');

const controller = require('./controller')

const app = express();

const PORT = 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.get('/users', async (req, res) => {
try {
    res.render('index');
} catch (error) {
    console.log(error);
}
})

app.get('/users/:id', async (req, res) => {
    try {
        const {
            id,
        } = req.params
    
        const result = await controller.getUser(id)
        res.json(result)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
})

app.post('/users', async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        await controller.createUser(data)
        res.status(200);
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
})

app.get('/test', controller.userController.getUser)
app.post('/test', controller.userController.getUser)
app.put('/test', controller.userController.getUser)

// app.delete()

app.listen(PORT, () => {
    console.log(`SERVER RUN PORT: ${PORT}`)
})
