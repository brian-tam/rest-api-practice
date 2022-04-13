const express = require('express');
const { all } = require('express/lib/application');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))

const comments = [
    {
        username: 'Todd',
        comment: 'lol its so funny!',
    },
    {
        username: 'damn',
        comment: 'bruh haha'
    },
    {
        username: 'brian',
        comment: 'xdxd',
    },
    {
        username: 'katie',
        comment: 'so tidy'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")

})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;

    res.send(`ok you need ${qty} for your ${meat} taco!`)
})
app.listen(3000, () => {
    console.log("listening in 3000")
})

