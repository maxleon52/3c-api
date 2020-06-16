const bcrypt = require("bcryptjs");
const Yup = require("yup");
const User = require("../models/User");
const { update } = require("../models/User");

module.exports = {
  async create(req, res) {
    try {
      // Validação de preenchimento de campos
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ message: "Erro de validação de campos." });
      }

      // Verifica se existe um EMAIL cadastrado
      // PASSWORD é o input do front, mas na TB é password_has, ele meio que simboliza um campo VIRTUAL
      const { name, email, password } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res
          .status(401)
          .json({ message: "E-mail já cadastrado, faça login!" });
      }

      // Criptografando senha
      if (password) {
        const password_hash = await bcrypt.hash(password, 8);

        const { _id } = await User.create({ name, email, password_hash });
        return res.status(201).json({ _id, name, email });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Ocorreu um erro ao salvar no BD.", ErrCatch: error });
    }
  },

  async update(req, res) {
    try {
      // Validação de preenchimento de campos
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(6),
        password: Yup.string()
          .min(6)
          .when("oldPassword", (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when("password", (password, field) =>
          password ? field.required().oneOf([Yup.ref("password")]) : field
        ),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ message: "Erro de validação de campos." });
      }

      // Tentando atualizar dados
      const { name, email, oldPassword, password, avatar_id } = req.body;
      const user = await User.findById(req.userId);

      // Vericando se Email foi preenchido e buscando no BD
      if (email && email !== user.email) {
        const userExists = await User.findOne({ email });

        if (userExists) {
          return res.status(401).json({
            message:
              "Esse e-mail ja está sendo usado, use outro e-mail válido.",
          });
        }
      }

      // verificando se senha antiga foi preenchida e se bate
      if (
        oldPassword &&
        !(await bcrypt.compare(oldPassword, user.password_hash))
      ) {
        return res.status(401).json({ message: "Senha antiga inválida." });
      }

      // Criptografando nova senha
      const password_hash = await bcrypt.hash(password, 8);
      const response = await User.findByIdAndUpdate(
        user._id,
        { name, email, password_hash, avatar_id },
        {
          new: true,
        }
      );
      return res.json(response);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Ocorreu um erro inesperado, contate o suporte." });
    }
  },
};
