import { login } from "../services/AuthService";

export const UserLogin = async (email: string, password: string) => {
   try {
      const response = await login(email, password);
		console.log(response)
   } catch (error) {
		console.log(error)
	}
};
