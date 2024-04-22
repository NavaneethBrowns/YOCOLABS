import sequelize from "../../config/dbConnection.js";
import { ItemModel } from "../model/item.model.js";

const Item = await ItemModel(sequelize);

export const addItem = async (req, res) => {
  try {
    const inputData = req.body;
    const item = await Item.create(inputData);
    console.log(item);
    return res.status(201).json("Created Successfully!");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding item info" });
  }
};

export const getItems = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = Number(page);
    limit = Number(limit);
    const skip = (page - 1) * limit;
    const { count, rows: items } = await Item.findAndCountAll({
      offset: skip,
      limit: limit,
    });
    return res.status(200).json({ items, totalCount: count });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching items" });
  }
};

export const getItem = async (req, res) => {
  try {
    const item = await Item.findOne({ where: { id: req.params.id } });
    if (!item) {
      return res.status(404).json("No such item!");
    }
    return res.status(200).json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching item" });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const inputData = req.body;
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json("Item not found!");
    }
    await item.update(inputData);
    return res.status(200).json("Item updated successfully!");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating item" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json("Item not found!");
    }
    await item.destroy();
    return res.status(200).json("Item deleted successfully!");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting item" });
  }
};
