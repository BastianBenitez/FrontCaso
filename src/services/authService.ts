import axios from "axios";

interface LoginResponse {
  token: string;
  user: object; // Ajusta el tipo de usuario según tus necesidades
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post(
    "http://localhost:3000/api/auth/login",
    { email, contrasena: password },
    { withCredentials: true }
  );

  return response.data; // Contiene token y datos de usuario
};
