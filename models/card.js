import Sequelize from 'sequelize';

var Card = global.sequelize.define('card', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  board_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  owner_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

}, {
  freezeTableName: true, // Model tableName will be the same as the model name
});

//{force: true}
Card.sync().then(function () {
  // Table created
});


export default Card