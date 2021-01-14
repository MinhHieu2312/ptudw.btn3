var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    bodyToMongoose: function(bodyObject, _id){
        const formData = bodyObject;
        formData.productID = new ObjectId(_id);
        formData.avt_img = "https://vsmcamp.com/wp-content/uploads/2020/11/JaZBMzV14fzRI4vBWG8jymplSUGSGgimkqtJakOV.jpeg"
        
        return formData;
    }
}