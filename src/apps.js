const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;
// const port =3000;

// public static path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")


app.set('view engine', 'hbs');
app.set("views", template_path)
hbs.registerPartials(partials_path)

app.use(express.static(static_path));


// ROUTING 
app.get("", (req, res) => {
    res.render('index');
})
app.get("/about", (req, res) => {
    res.render('about');
})
app.get("/weather", (req, res) => {
    res.render('weather');
})
app.get("*", (req, res) => {
    res.render('error404');
})


app.listen(port, () => {
    console.log(`Run at port number ${port}`)
});