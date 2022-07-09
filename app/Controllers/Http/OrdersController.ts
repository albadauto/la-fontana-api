import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order';

export default class OrdersController {
    public async store({ request, response }: HttpContextContract){
        try{
            const body = request.body();
            if (body){
                await Order.create(body);
                return response.status(200).json({
                     created: true,
                     message: "Pedido feito com sucesso!"
                })
            }
        }catch(err){
            return response.status(200).json({
                created: false,
                message: "Verifique as informações e tente novamente"
           })
        }
    }
    
}
/**
 * Exemplo de estrutura de cadastro de um pedido
 *  {
 *      order: refri, marmitex, doce, sla,
 *      extra: sla oq, velas de aniversario,
 *      id_usr: 43 <- ID DO USUARIO Q FEZ O PEDIDO
 *      price: 50.00
 *  }
 * 
 */