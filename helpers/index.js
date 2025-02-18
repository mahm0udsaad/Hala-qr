import axios from "axios";

export const uploadImage = async (token, base64Image) => {
  if (!base64Image) return null;

  const formData = new FormData();
  formData.append("image", `data:image/png;base64,${base64Image}`); // Proper format

  try {
    const response = await axios.post(
      "https://hala-qr.jmintel.net/api/v1/image-upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000, // 10 seconds
      },
    );

    return {
      fileName: response.data.data.file_name,
      url: response.data.data.file_url,
    };
  } catch (error) {
    console.error("Image upload error:", error);
    Alert.alert(
      "Upload Error",
      error.response?.data?.message || "Failed to upload image",
    );
    return null;
  }
};
