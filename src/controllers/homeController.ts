import { Request, Response } from 'express';

import {User} from '../models/User'

//import { sequelize } from '../instances/pg'; //Caso eu fosse usar o PG era so mudar o arquivo de importação! 

import { Product } from '../models/Product';

export const home = async (req: Request, res: Response)=>{
    let users = await User.findAll()

    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Bruno',
        lastName: 'Stelmastchuk',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
        users
    });
};