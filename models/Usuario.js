module.exports = (sequelize, DataTypes) => sequelize.define('Usuario', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    email: { type: DataTypes.STRING, unique: true },
    CURP: { type: DataTypes.STRING, unique: true },
    rolEscuela: DataTypes.STRING,
    nombre: DataTypes.TEXT,
    apellido: DataTypes.TEXT,
    telefono: DataTypes.BIGINT,
    claveEscuela: DataTypes.STRING,
    nombreEscuela: DataTypes.STRING,
    regionEscuela: DataTypes.STRING
});
