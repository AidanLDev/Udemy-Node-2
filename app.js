const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
const port = 3000;

app.engine('hbs', expressHandlebars({
 layoutsDir: 'views/layouts/handlebarsLayouts',
 defaultLayout: 'main-layout',
 extname: 'hbs'
}));
app.set('view engine', 'hbs');

//  Using PUG engine
// app.set('view engine', 'pug');
// app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('handlebarViews/404', { title: 'Not Found' });
});

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
