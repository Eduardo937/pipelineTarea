import dynamodb from "../services/dynamodbService";
import joi from "joi";
import {PREFIX_NAME} from "../config";

const Entrenador = dynamodb.define('entrenador', {
    hashKey: 'EntrenadorId',
    timestamps: false,
    schema: {
        EntrenadorId: dynamodb.types.uuid(),
        Nombre: joi.string(),
        Edad: joi.number(),
        NumPokemon: joi.number()
    },
    tableName:`Entrenador${PREFIX_NAME}`
})

dynamodb.createTables((err)=>{
    if(err)
        return console.log(err);
    console.log("Tabla Pokemon creada");
})

export default Entrenador;