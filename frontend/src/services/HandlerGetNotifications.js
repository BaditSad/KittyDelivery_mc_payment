
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getNotification = async () => {
  try {
    const response = await axios.get(`${API_URL}/notifications`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de notification:", error);
    throw error;
  }
};