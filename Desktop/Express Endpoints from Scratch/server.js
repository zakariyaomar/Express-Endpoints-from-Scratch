import express from "express";

const app = express();
const PORT = 3000;

// AI-generated: built-in middleware that parses incoming JSON request bodies into req.body
app.use(express.json());

let cities = [
  { id: 1, name: "Nairobi", county: "Nairobi", population: 4397073 },
  { id: 2, name: "Mombasa", county: "Mombasa", population: 1208333 },
  { id: 3, name: "Kisumu", county: "Kisumu", population: 610082 },
  { id: 4, name: "Nakuru", county: "Nakuru", population: 570674 },
  { id: 5, name: "Eldoret", county: "Uasin Gishu", population: 475716 },
  { id: 6, name: "Thika", county: "Kiambu", population: 279429 },
  { id: 7, name: "Malindi", county: "Kilifi", population: 207253 },
  { id: 8, name: "Kitale", county: "Trans-Nzoia", population: 220111 },
];

// Task 1: GET all cities, with optional county and minPopulation filters
app.get("/api/cities", (req, res) => {
  let result = cities;
  const { county, minPopulation } = req.query;

  if (county) {
    result = result.filter(
      (c) => c.county.toLowerCase() === county.toLowerCase()
    );
  }

  if (minPopulation) {
    result = result.filter((c) => c.population > Number(minPopulation));
  }

  res.status(200).json({ success: true, count: result.length, data: result });
});

// Bonus: GET a single city by id
app.get("/api/cities/:id", (req, res) => {
  const city = cities.find((c) => c.id === parseInt(req.params.id));

  if (!city) {
    return res.status(404).json({
      success: false,
      error: `City with ID ${req.params.id} not found`,
    });
  }

  res.status(200).json({ success: true, data: city });
});

// Task 2: POST a new city with validation
app.post("/api/cities", (req, res) => {
  const { name, county, population } = req.body;

  const isValidName = typeof name === "string" && name.trim().length > 0;
  const isValidCounty = typeof county === "string" && county.trim().length > 0;

  if (!isValidName || !isValidCounty) {
    return res
      .status(400)
      .json({ success: false, error: "Name and county are required" });
  }

  const isValidPopulation = typeof population === "number" && population > 0;
  if (!isValidPopulation) {
    return res
      .status(400)
      .json({ success: false, error: "Population must be a positive number" });
  }

  const newId =
    cities.length > 0 ? Math.max(...cities.map((c) => c.id)) + 1 : 1;

  const newCity = { id: newId, name, county, population };
  cities.push(newCity);

  res.status(201).json({ success: true, data: newCity });
});

// Bonus: PATCH partial update of a city
app.patch("/api/cities/:id", (req, res) => {
  const city = cities.find((c) => c.id === parseInt(req.params.id));

  if (!city) {
    return res.status(404).json({
      success: false,
      error: `City with ID ${req.params.id} not found`,
    });
  }

  const { name, county, population } = req.body;

  if (name !== undefined) city.name = name;
  if (county !== undefined) city.county = county;
  if (population !== undefined) city.population = population;

  res.status(200).json({ success: true, data: city });
});

// Task 3: DELETE a city by id
app.delete("/api/cities/:id", (req, res) => {
  const index = cities.findIndex((c) => c.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: `City with ID ${req.params.id} not found`,
    });
  }

  const [deleted] = cities.splice(index, 1);

  res
    .status(200)
    .json({ success: true, message: "City deleted", data: deleted });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
