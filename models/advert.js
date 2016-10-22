import Sequelize from 'Sequelize';

var Advert = global.sequelize.define('advert', {
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
Advert.sync().then(function () {
  // Table created
});


export default Advert