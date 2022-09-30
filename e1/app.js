const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const axios = require('axios');

app.use(express.static("public"));
app.set('view engine', 'hbs');

app.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: "index",
    partialsDir: __dirname + '/views/partials',
}));

const leagueOfLegendsApi = async () => {
    const result = await axios.get("http://ddragon.leagueoflegends.com/cdn/12.18.1/data/de_DE/champion.json");
    let champions = [];
    for (const [key, value] of Object.entries(result.data.data)) {
        champions.push({
            "name": value.name,
            "type": value.tags
        })
    }
    return champions;
}

const suggestedChamps = () => {
    return [
        {
            name: "KATARINA",
            lane: "midlaner"
        },
        {
            name: "JAYCE",
            lane: "toplaner"
        },
        {
            name: "HEIMERDINGER",
            lane: "toplaner"
        },
        {
            name: "ZED",
            lane: "midlaner"
        },
        {
            name: "AZIR",
            lane: "midlaner"
        },
    ]
}

app.get("/", async (req, res) => {
    const champs = await leagueOfLegendsApi();
    // res.render("main", {layout: "index", champions: champs, suggestedChampions: suggestedChamps()});
    res.render("main", {layout: "index", suggestedChampions: suggestedChamps()});
})

app.listen(3000, () => {
    console.log("SERVER HAS STARTED!");
});