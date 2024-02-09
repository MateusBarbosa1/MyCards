const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/create-theme', async (req,res) => {
    const themeModel = require('./models/themeModel')
    const theme = await themeModel.createTheme(req);

    res.send(theme.id);
});

app.listen(3333, () => {console.log('server running on port 3333!');});