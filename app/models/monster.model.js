module.exports = (sequelize, Sequelize) => {
    const Monster = sequelize.define("monster", {
        name: {
            type: Sequelize.STRING
        },
        xp: {
            type: Sequelize.INTEGER
        },
        armor_class: {
            type: Sequelize.INTEGER
        },
        dexterity: {
            type: Sequelize.INTEGER
        },
        constitution: {
            type: Sequelize.INTEGER
        },
        strength: {
            type: Sequelize.INTEGER
        },
        intelligence: {
            type: Sequelize.INTEGER
        },
        wisdom: {
            type: Sequelize.INTEGER

        }
    });

    return Monster;
};