import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class AuthController {
    public async verifyPassword({ request, response, auth }: HttpContextContract){
        try{
            const { email, password } = request.body();
            const token = await auth.attempt(email, password);
            return response.status(200).json({
                auth:true,
                token
            })
        } catch {
            return response.status(401).json({
                message: "Usuário não existe no sistema."
            });
        }
    }

    public async createUser({ request, response }: HttpContextContract){
        try{
            const body = request.body();
            if (body){
                await User.create(body);
                return response.status(200).json({
                    created: true,
                    message: "Usuário inserido com sucesso!"
                })
            }else{
                return response.status(400).json({
                    created: true,
                    message:"Informações inválidas, tente novamente."
                })
            }
        }catch(err){
            console.log(err);
        }
    }
}


