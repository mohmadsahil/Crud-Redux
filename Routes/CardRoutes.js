import express from 'express'
import { deleteData, getAllDetails, getOneData, updateData, uploadDetails } from '../Controllers/cardDetailsController.js';

const cardRoutes = express.Router();

cardRoutes.post("/create",uploadDetails)
cardRoutes.get("/all-data",getAllDetails)
cardRoutes.get("/data/:id",getOneData)
cardRoutes.delete("/delete/:id",deleteData)
cardRoutes.put("/update/:id",updateData)

export default cardRoutes;