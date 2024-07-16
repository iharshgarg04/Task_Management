const History = require('../models/history');

exports.FetchHistory = async(req,res)=>{
    try{
        const userId = req.params.id;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"User is not found",
            })
        }

        const response = await History.find({userId:userId}).sort({updatedAt:-1});
        return res.status(200).json({
            success:true,
            message:"History fetched successfully",
            response
        })
    }catch(error){
        console.log(error);
        console.log("Error while fetching the history");
    }
}