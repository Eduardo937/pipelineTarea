import { Model, Sequelize } from "sequelize";

interface PokemonAttributes {
    id: number;
    nombre: string;
    tipo: string;
    poder: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Pokemon extends Model<PokemonAttributes> implements PokemonAttributes {
        public id!: number;
        public nombre!: string;
        public tipo!: string;
        public poder!: number;

        static associate(models:any) {
            // define association here
        }
    }
    Pokemon.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        poder: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Pokemon'
    });
    return Pokemon;
};
