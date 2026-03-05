const API_URL = process.env.NEXT_PUBLIC_API_URL

export const authService = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Identifiants incorrects");
    
    const data = await response.json();
    // On stocke le token dans le localStorage pour rester connecté
    if (typeof window !== "undefined") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.analyste));
    }
    return data;
  }
};

