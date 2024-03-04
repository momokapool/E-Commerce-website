const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: 'dhaoxmvyx',
    api_key: '634715121521262',
    api_secret: 'dT14LM5OM8e4Kqo_xFVZtBqtXVE'
});
const cloudinaryUploadImg = async (fileToUploads) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(fileToUploads, (result) => {
            resolve(
                {
                    url: result.secure_url,
                    asset_id: result.asset_id,
                    public_id: result.public_id,
                },
                {
                    resource_type: "auto",
                }
            );
        });
    });
};
const cloudinaryDeleteImg = async (fileToDelete) => {
    return new Promise((resolve) => {
        cloudinary.uploader.destroy(fileToDelete, (result) => {
            resolve(
                {
                    url: result.secure_url,
                    asset_id: result.asset_id,
                    public_id: result.public_id,
                },
                {
                    resource_type: "auto",
                }
            );
        });
    });
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg }; 