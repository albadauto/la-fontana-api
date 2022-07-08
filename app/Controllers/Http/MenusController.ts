import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from "@ioc:Adonis/Core/Application";
import Menu from 'App/Models/Menu';
export default class MenusController {
    public async store({ request, response }:HttpContextContract){
        try{
            const image = request.file("imageFood");
            if (image){
                const body = request.body();
                await image.move(Application.tmpPath("uploads"));
                await Menu.create({image: image.fileName, product: body?.product, price: body?.price, description: body?.description})
                return response.status(200).json({
                    created: true,
                    message: "Produto criado com sucesso!"
                })
            }else{
                return response.status(400).json({
                    created: false,
                    message: "Imagem não inserida"
                })
            }
        }catch(err){
            console.log(err);
        }
    }
}


