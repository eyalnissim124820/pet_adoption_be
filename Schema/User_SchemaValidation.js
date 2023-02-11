const userSchema = {
    type: "object",
    properties: {
      first_name: { type: "string" },
      last_name: { type: "string" },
      email: { type: "string" },
      phone: { type: "string" },
      password: { type: "string" },
      password_confirm: { type: "string" },
    },
    required: [
      "first_name",
      "last_name",
      "email",
      "password"
    ],
  };
  
  module.exports = userSchema ;