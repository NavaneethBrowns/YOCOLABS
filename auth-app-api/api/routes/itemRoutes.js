import express from 'express'
import {
    getItem,
    getItems,
    updateItem,
    addItem,
    deleteItem
} from '../controllers/item.controller.js';
import { allowAccess } from '../middleware/allowAccess.js';

const itemRoutes = express.Router();

itemRoutes
    .get('/item/:id', allowAccess(['admin','user']) , getItem)
    .get('/items', allowAccess(['admin','user']) , getItems)
    .put('/updateItem/:id', allowAccess(['admin']) , updateItem)
    .post('/addItem', allowAccess(['admin']) , addItem)
    .delete('/delete/:id', allowAccess(['admin']) , deleteItem);

export default itemRoutes;