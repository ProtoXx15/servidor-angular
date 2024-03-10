const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 204,
  methods: "GET, POST, DELETE",
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/recetas", (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const perPage = parseInt(req.query.perPage) || 10;

  fs.readFile("recetas.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    const start = page * perPage;
    const end = start + perPage;

    const result = jsonData.recetas.slice(start, end);

    res.status(200).json({
      recetas: result,
      total: jsonData.recetas.length,
      page,
      perPage,
      totalPages: Math.ceil(jsonData.recetas.length / perPage),
    });
  });
});

app.post("/recetas", (req, res) => {
  const { nombre, descripcion, ingredientes, preparacion } = req.body;

  fs.readFile("recetas.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const jsonData = JSON.parse(data);

    const maxId = jsonData.recetas.reduce(
      (max, receta) => Math.max(max, receta.id),
      0
    );
    const newReceta = {
      id: maxId + 1,
      nombre,
      descripcion,
      ingredientes,
      preparacion
    };

    jsonData.recetas.push(newReceta);

    fs.writeFile("recetas.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.status(201).json(newReceta);
    });
  });
});

app.delete("/recetas/:id", (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile("recetas.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    const recetaIndex = jsonData.recetas.findIndex(receta => receta.id === id);

    if (recetaIndex === -1) {
      res.status(404).json({ message: "Receta no encontrada" });
      return;
    }

    jsonData.recetas.splice(recetaIndex, 1);
    
    jsonData.recetas = jsonData.recetas.map((receta, index) => {
      return { ...receta, id: index + 1 };
    });

    fs.writeFile("recetas.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }
      res.status(200).json({ message: "Receta eliminada con éxito" });
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});
