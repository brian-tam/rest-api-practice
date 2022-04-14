const express = require('express');
const { all } = require('express/lib/application');
const path = require('path');
const { v4: uuid } = require('uuid')


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))

const comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol its so funny!',
    },
    {
        id: uuid(),
        username: 'damn',
        comment: 'bruh haha'
    },
    {
        id: uuid(),
        username: 'brian',
        comment: 'xdxd',
    },
    {
        id: uuid(),
        username: 'katie',
        comment: 'so tidy'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body
    comments.push({ username, comment, id: uuid(), })
    res.redirect('/comments');
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response")
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment, id })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const FoundComment = comments.find(c => c.id === id);
    FoundComment.comment = newCommentText;
    res.redirect('comments')

})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;

    res.send(`ok you need ${qty} for your ${meat} taco!`)
})
app.listen(3000, () => {
    console.log("listening in 3000")
})

