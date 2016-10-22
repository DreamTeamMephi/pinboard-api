import Sequelize from 'Sequelize';

var User = global.sequelize.define('user', {
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  local: {
    type: Sequelize.JSON,
    allowNull: false
  }
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  indexes: [
    // Create a unique index on email
    {
      unique: true,
      fields: ['email']
    }
  ]
});

//{force: true}
User.sync().then(function () {
  // Table created
});


export default User