import Sequelize from 'sequelize';

var Board = global.sequelize.define('board', {
  uname: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  },
  posts_count: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  last_post_date: {
    type: Sequelize.DATE,
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
Board.sync().then(function () {
  // Table created
});


export default Board