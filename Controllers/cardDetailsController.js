import { cardData } from "../Models/cardDetailsSchema.js";
import cloudinary from "cloudinary";

export const uploadDetails = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "kindly Enter The Full Details",
      });
    }
    const file = req.files?.image;
    if (!file) {
      return res.status(401).json({
        success: false,
        message: "kindly Upload the Image",
      });
    }
    const fileresult = await cloudinary.v2.uploader.upload(file.tempFilePath);

    const cartAllData = new cardData({
      title,
      description,
      image: {
        public_id: fileresult.public_id,
        url: fileresult.secure_url,
      },
    });

    const saveData = await cartAllData.save();

    return res.status(200).json({
      status: true,
      message: "Data has Been Save Successfully!",
      data:saveData,
    });
  } catch (error) {
    return next(error.message, 500);
  }
};

export const getAllDetails = async (req, res, next) => {
  try {
    const getData = await cardData.find();
    if (!getData) {
      return res.status(402).json({
        status: false,
        message: "No Data Found!",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "All Data Get Successfully!",
        data: getData,
      });
    }
  } catch (error) {
    return next(error.message, 500);
  }
};

export const getOneData = async (req, res, next) => {
  const { id } = req.params;

  try {
    const getData = await cardData.findById(id);
    if (!getData) {
      return res.status(404).json({
        status: false,
        message: "Data Not Found!",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data Found Successfully!",
        data: getData,
      });
    }
  } catch (error) {
    return next(error.message, 500);
  }
};

export const updateData = async (req, res, next) => {
  const id = req.params.id;
  try {
    const getUpdateData = await cardData.findById(id);
    if (!getUpdateData) {
      return res.status(404).json({
        status: false,
        message: "Not Data Found!",
      });
    }

    if (req.files?.image) {
      if (getUpdateData.image && getUpdateData.image.public_id) {
        await cloudinary.v2.uploader.destroy(getUpdateData.image.public_id);
      }


      const file = req.files?.image;
      const fileresult = await cloudinary.v2.uploader.upload(file.tempFilePath);

      getUpdateData.image.public_id = fileresult.public_id;
      getUpdateData.image.url = fileresult.secure_url;
    }

    const updateData = await  cardData.findByIdAndUpdate(id,req.body,{new:true})
    return res.status(200).json({
      status:true,
      message:"Data has been Updated!",
      data:updateData
    })
  } catch (error) {
    return next(error.message, 500);
  }
};

export const deleteData = async (req, res, next) => {
  const id = req.params.id;
  try {
    const Delete = await cardData.findById(id);
    if (!Delete) {
      return res.status(404).json({
        status: false,
        message: "Data Not Found!",
      });
    } else {
      await cardData.findByIdAndDelete(id);
      return res.status(200).json({
        status: true,
        message: "Data Deleted!",
      });
    }
  } catch (error) {
    return next(error.message, 500);
  }
};
