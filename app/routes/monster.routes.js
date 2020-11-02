module.exports = app => {
    const monsters = require("../controllers/monster.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", monsters.create);

    // Retrieve all Tutorials
    router.get("/", monsters.findAll);

    // // Retrieve all published Tutorials
    // router.get("/published", monsters.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", monsters.findOne);

    // Update a Tutorial with id
    router.put("/:id", monsters.update);

    // Delete a Tutorial with id
    router.delete("/:id", monsters.delete);

    // Delete all Tutorials
    router.delete("/", monsters.deleteAll);

    app.use('/api/monsters', router);
};