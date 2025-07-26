export default function validate(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({
        error: "Dados inválidos",
        details: error.format(),
      });
    }
  };
}