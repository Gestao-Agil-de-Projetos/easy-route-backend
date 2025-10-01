import bcrypt from "bcrypt";

export const authService = {
  register: async ({ name, email, password, phone, cpf_cnpj, role }, userRepository, app) => {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
      name,
      email,
      phone,
      cpf_cnpj,
      role: role || "PASSENGER",
      password_hash: hashedPassword,
    });

    return { id: user.id, email: user.email };
  },

  login: async ({ email, password }, userRepository, app) => {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) throw new Error("Invalid email or password");

    const token = app.jwt.sign({ id: user.id, role: user.role });

    return { token };
  },
};
