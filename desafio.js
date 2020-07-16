const express = require('express')

const app = express()
app.use(express.json())
const donos = []

function checkId(req, res, next) {
    const user = donos[req.params.id]
    if (!user) {
        console.error("Essa tarefa não existe")
    }

    return next()
}

function count(req, res, next) {

    console.count("O número de requisições feitas é ")
    return next()
}

app.use(count)
app.get('/projects', (req, res) => {
    return res.json(donos)
})

app.get('/projects/:id', checkId, (req, res) => {
    const { id } = req.params;
    return res.json(donos)
})


app.post('/projects', (req, res) => {
    const { id, title } = req.body;
    const projeto = {
        id,
        title,
        tasks: []
    }
    donos.push(projeto)
    return res.json(donos)
})


app.put('/projects/:id/tasks', checkId, (req, res) => {
    const { id } = req.params
    const { title } = req.body
    const project = donos.find(ind => ind.id == id)


    project.tasks.push(title)
    return res.json(project)
})

app.put('/projects/:id', checkId, (req, res) => {
    const { id } = req.params
    const { title } = req.body
    const project = donos.find(ind => ind.id == id)


    project.title = title
    return res.json(project)

})

app.delete("/projects/:id", checkId, (req, res) => {
    const { id } = req.params;

    donos.splice(id, 1)

    return res.send()
})

app.listen(3000)