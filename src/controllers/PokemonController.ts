import { Request,Response } from "express";
import AbstractController from "./AbstractController";
import db from '../models';
import Entrenador from "../modelsNOSQL/entrenadorNOSQL";

class PokemonController extends AbstractController{
    private static _instance: PokemonController;
    public static get instance():PokemonController{
        if(this._instance){
            return this._instance;
        }
        this._instance = new PokemonController("pokemon");
        return this._instance;
    } 

    protected initializeRoutes(): void {
        this.router.get("/test",this.getTest.bind(this));
        //CRUD
        this.router.get("/consultar",this.getConsultar.bind(this));
        this.router.post("/crear",this.postCrear.bind(this));
        this.router.post("/crearDepto", this.postCrearEntrenador.bind(this));
        this.router.get("/consultaDepto",this.getConsultarEntrenador.bind(this));
        //this.router.post("/cambiar",);
        //this.router.post("/eliminar",);       
    }

    private async getConsultarEntrenador(req:Request,res:Response){
        try{
            const entrenador = await Entrenador.scan().exec().promise();
            res.status(200).send(entrenador[0].Items);
            console.log(entrenador);
        }catch(err){
            console.error(err);
            res.status(500).send("Error al consultar departamentos");
        }
    }

    private async postCrearEntrenador(req: Request, res: Response){
        try{
            console.log(req.body);
            await Entrenador.create(req.body);
            console.log("Entrenador Pokemon creado")
            res.status(200).send("Entrenador Pokemon creado");
        }catch(err){
            console.error(err);
            res.status(500).send("Error al crear entrenador");
        }
    }

    private async getConsultar(req:Request,res:Response){
        try{
            console.log("Consultar Pokemon");
            let pokemones = await db["Pokemon"].findAll();
            res.status(200).json(pokemones);
        }catch(err){
            console.error(err);
            res.status(500).send("Error al consultar Pokemones");
        }
    }

    private async postCrear(req: Request, res: Response){
        try{
            console.log(req.body);
            await db.Pokemon.create(req.body);
            console.log("Pokemon creado")
            res.status(200).send("Pokemon creado");
        }catch(err){
            console.error(err);
            res.status(500).send("Error al crear un pokemon");
        }
    }

    private async getTest(req: Request, res: Response){
        try{
            console.log("PokemonController works");
            res.status(200).send("PokemonController works");
        }catch(err){
            console.error(err);
            res.status(500).send("Error en PokemonController");
        }
    }
    
}

export default PokemonController;