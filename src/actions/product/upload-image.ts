'use server';
export const uploadImage = async (file: FormData) => {
    try {

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
        method: 'POST',
        body: file,
      });
  
      const data = await response.json();
      console.log(data)
  
      console.log('Image uploaded successfully:', data.data.url);
  
      // Handle the uploaded image URL as needed
  
      return {status:200,json:{url:data.data.url,thumb:data.data.thumb.url,deleteUrl:data.data.delete_url,title:data.data.title}};
    } catch (error) {
      console.error('Image upload failed:', error);
  
      // Handle the error gracefully
  
      throw error;
    }
  };
  