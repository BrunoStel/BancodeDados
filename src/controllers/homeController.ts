import { Request, Response } from 'express';

import {Op} from 'sequelize' 

import {User, UserInstance} from '../models/User'

//import { sequelize } from '../instances/pg'; //Caso eu fosse usar o PG era so mudar o arquivo de importação! 

import { Product } from '../models/Product';
import { resourceLimits } from 'worker_threads';


export const home = async (req: Request, res: Response)=>{

    
//**************************************************Formas de consultar e filtrar o banco
    // let users = await User.findAll({
    //     attributes:['name','age'] //Para acessar somente esses 2 atributos
    // })

    // let users = await User.findAll({
    //     where:{name:'Bruno'} //Para filtrar as informações que vc quer no BD
    // })

    // let users = await User.findAll({
    //     where:{
    //         [Op.or]:[
    //             {name:'Bruno'},
    //             {name:'Ana'}
    //         ] 
    //         } //Para filtrar as informações com condicional OR
    // })

    // let users = await User.findAll({
    //     where:{
    //         age:[22, 15] //Outra forma
    //     }
    // })

    // let users = await User.findAll({
    //     where:{
    //         age:{ 
    //         //    [Op.gt]:20, //maior que
    //         //    [Op.gte]:20, //maior ou igual a
    //         //    [Op.lt]:20, //Menor que
    //         //    [Op.lte]:20, //Menor ou igual a
    //         //    [Op.between]: [20,50], //Entre 20 e 50 anos
    //         //    [Op.notBetween]: [20,50], //Todos que NÃO possuem entre 20 e 50 anos
    //         //    [Op.in]: [30,55], //Todos que tem 30 e 55 anos
    //             [Op.notIn]:[30,55],//Todos que não tem 30 e nem 55 anos
    //         },
    //         name:{
    //             [Op.like]: 'Br%', //Nomes q comecem com Br
    //             [Op.like]: '%u%' //Onde tiver u
    //         }
    //     }
    // })

//*******************************************ORDERNANDO e limitando os resultados
    // let users = await User.findAll({
    //     where:{
    //         age:{
    //             [Op.gt] : 18
    //         }
    //     },
    //     // order:[
    //    //    ['name']
    //    // ] //Ordernar pelo nome A-Z
    //    // order:[
    //    //     ['name', 'DESC'] //Do Z-A
    //    // ]
    //    order:[ //Com múltiplas ordenações
    //        ['age','ASC'], 
    //        ['name','ASC']
    //        ],
    //     offset:2, //Pular dois itens
    //     limit: 2 //Exiba no máximo 2 resultados por vez
    // })

//********************************************** Adicionando dados ao banco
//Build+Save
    // const user = User.build({
    //     name: 'Exemplo_build',
    //     age: 16
    // })
    // await user.save()

//Create
    // const usuario = await User.create({
    //     name: 'Exemplo_create',
    //     age:29
    // })

//**********************************************Atualizando dados
// await User.update({age:18},{ //Dados a serem alterados, condição para encontrar os itens

//         where:{
//             age:{
//                 [Op.lt]: 18
//             }
//         }
// })

// await User.update({name:'Testando_Update', age:55},{
//         where:{
//             id:12
//         }
// })

    // let results = await User.findAll({where:{id:7}}) //Selecionando um/ou mais usuarios
    // if (results.length>0){
    //     let usuario:UserInstance = results[0] //instanciando em uma variavel, o primeiro registro encontrado
    //     usuario.age = 70 //Alterando propriedades da variavel instanciada (espelhando um registro do BD)
    //     usuario.name = 'Alterando_dados_metodo2'
    //     await usuario.save() //Agora estou alterando no banco de dados propriamente dito
    // }

//**********************************************Deletando dados
    // await User.destroy({where:{id:1}})

    // let results = await User.findAll({where:{id:2}})
    // if(results.length > 0){
    //     let usuario = results[0]

    //     await usuario.destroy()
    // }


    
    let users = await User.findAll()

    res.render('pages/home', {
        users
    });

};


export const novoUsuario = async (req:Request, res:Response) => {
        let {name, age} = req.body
       
        
        if(name){
            const newUser = User.build({
                name: name
            })
            if(age){
                newUser.age = parseInt(age)
            }
            await newUser.save()
        }
        res.redirect('/')
}
