const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = 5000;
const path = require('path');
const { v4: uuid } = require('uuid');



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
let tweets = [
    {
        "id": uuid(),
        "user": "baka",
        "tweet": "this is a beautyful day outside"
    }, {
        "id": uuid(),
        "user": "bobo",
        "tweet": "a day like this..."
    },
    {
        "id": uuid(),
        "user": "cherca",
        "tweet": "kid like you..."
    }
]


app.get('/', (req, res) => {
    res.render('tweets', { tweets });
})

app.get('/tweets', (req, res) => {
    res.render('new');
})

app.post('/tweets', (req, res) => {
    const new_tweet = req.body;
    const id = uuid();
    new_tweet.id = id;
    tweets.push(new_tweet);
    res.redirect('/')
})

app.get('/tweets/:id', (req, res) => {
    const { id } = req.params;
    const tweet = tweets.find(tw => tw.id === id);

    res.render('show', { tweet });
})

app.get('/tweets/:id/edit', (req, res) => {
    const { id } = req.params;
    const tweet = tweets.find(tw => tw.id === id);

    res.render('edit', { tweet });
})

app.patch('/tweets/:id/edit', (req, res) => {
    const { id } = req.params;
    const tweet = tweets.find(tw => tw.id === id);
    tweet.tweet = req.body.tweet;
    res.redirect('/')
})

app.delete('/tweets/:id/delete', (req, res) => {
    const { id } = req.params;
    tweets = tweets.filter(tw => tw.id !== id)
    res.redirect('/')
})

app.listen(PORT, () => {
    console.log("hello human")
})