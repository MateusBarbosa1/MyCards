const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, './public')))
app.set('views', path.join(__dirname, './views'));

const themeModel = require('./models/themeModel');
const cardsModel = require('./models/cardsModel');

// THEMES //
app.post('/create-theme', async (req,res) => {
    await themeModel.createTheme(req);

    res.redirect('/');
});
app.get('/', async (req,res) => {
    const themes = await themeModel.getThemes(req);
    res.render('index', { themes: themes });
});
app.get('/delete/:name', async (req,res) => {
    await themeModel.deleteTheme(req.params.name);
    res.redirect('/');
});

// CARDS //
app.get('/:name', async (req,res) => {
    const cards = await cardsModel.getCards(req.params.name);
    res.render('cards', {cards: cards, name: req.params.name});
});
app.post('/:name/create-card', async  (req,res) => {
    await cardsModel.createCards(req);
    res.redirect('/'+req.params.name);
});
app.get('/:name/delete/:name_card', async (req,res) => {
    await cardsModel.deleteCard(req.params.name, req.params.name_card);
    res.redirect('/'+req.params.name);
});
app.post('/:name/update-card/:index', async (req,res) => {
    await cardsModel.updateCard(req, req.params.name, req.params.index);
    res.redirect('/'+req.params.name);
});

app.listen(3333, () => {console.log('server running on port 3333!');});