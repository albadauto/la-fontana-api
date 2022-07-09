import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from "@ioc:Adonis/Core/Application";
import uuid from "react-uuid";
import Menu from 'App/Models/Menu';
export default class MenusController {

    public async store({ request, response }: HttpContextContract) {
        try {
            const image = request.file("imageFood");
            if (image) {
                const body = request.body();
                image.fileName = `${uuid()}.${image.extname}`;
                await image.move(Application.tmpPath("uploads"), { name: image.fileName });
                await Menu.create({ image: image.fileName, product: body?.product, price: body?.price, description: body?.description })
                return response.status(200).json({
                    created: true,
                    message: "Produto criado com sucesso!"
                })
            } else {
                return response.status(400).json({
                    created: false,
                    message: "Imagem não inserida"
                })
            }
        } catch (err) {
            return response.status(400).json({
                created: false,
                message: "Erro: Verifique se todas as informações são válidas!"
            })
        }
    }


    public async show({ response, params }: HttpContextContract) {
        try {
            const result = await Menu.findOrFail(params.id);
            return response.status(200).json({
                find: true,
                result
            })
        } catch (error) {
            if (!params.id) {
                response.status(200).json({
                    find: false,
                    message: "ID não existe!"
                })
            }
        } finally {
            return response.status(400).json({
                message: "Produto não encontrado"
            })
        }
    }


}


