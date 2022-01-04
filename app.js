const { response } = require("express");
const express = require("express");
const https = require("https");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/", (req, res) => {
  let city = req.body.city;
  // console.log(city);
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=49e5e31e4ead1b6cbd869a3463d020ed&units=metric";

  https.get(url, (response) => {
    response.on("data", (data) => {
      const all = JSON.parse(data);
      const icon = all.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      /**
       * name of city : all.name
       * temp of city : all.main.temp
       * how it looks like : all.weather[0].description
       * id (for image) :
       */

      let insert = `
        <div style="margin:3rem; padding: 2rem;">
        <h1 style="font-family: monospace;">Looks like ${all.weather[0].description} in ${all.name}!</h1>
        <img src="${imageUrl}" alt="" srcset="">
        </div>
        `;

      res.write(insert);
    });
  });
});

app.listen(3000, () => {
  console.log("server is running...");
});
