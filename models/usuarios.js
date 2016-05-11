/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    usuarioid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tipousuarioid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tiposusuario',
        key: 'tipousuarioid'
      }
    },
    maquinaestadoid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    fechacreacion: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.NOW
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    }
  }, {
    tableName: 'usuarios',
    freezeTableName: true,
    timestamps: false
  });
};
