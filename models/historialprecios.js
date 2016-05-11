/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('historialprecios', {
    historialprecioid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    articuloid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'articulos',
        key: 'articuloid'
      }
    },
    fecha_desde: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fecha_hasta: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'historialprecios',
    freezeTableName: true,
    timestamps: false
  });
};
