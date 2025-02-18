import axios from "axios";

const PEXELS_API_KEY =
  "Dr6QuUc8kNoskgYl1Bc0fIW8SKsJWHJ9FOTd98eR7hpx4xlFtfBIfFbe";
const PEXELS_API_URL = "https://api.pexels.com/v1/search";

export const fetchInvitationImages = async (page = 1) => {
  try {
    const response = await axios.get(PEXELS_API_URL, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      params: {
        query: "invitation",
        per_page: 10,
        page: page,
      },
    });
    return response.data.photos;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};
