import axiosInstance from './axiosInstance'

const uploadImage = async (imageFile)=>{
    const formData =new FormData();
    //append image file  to the form dat 
    formData.append('image',imageFile);

    try{
        const response = await  axiosInstance
        .post('/image-upload',formData,{
            headers:{
                'content-type':"multipart/form-data", //set header for file upload 

            },

        });
        return response.data; //return response data 
        
    }catch(error){
        console.error('error uploading the image', error);
        throw error; // rethrow error for handling 
    }
};
export default uploadImage;