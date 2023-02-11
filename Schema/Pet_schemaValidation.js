const petSchema = {
    type: "object",
    properties: {
      type: { type: "string" },
      name: { type: "string" },
      height: { type: "number" },
      weight: { type: "number" },
      color: { type: "string" },
      bio: { type: "string" },
      hypoallergenic: { type: "boolean" },
      dietery: { type: "string" },
      breed: { type: "string" },
      picture: { type: "string" },
    },
    required: [
      "type",
      "name",
      "height",
      "weight",
      "color",
      "bio",
      "hypoallergenic",
      "dietery",
      "breed",
    ],
  };
  
  module.exports = petSchema ;