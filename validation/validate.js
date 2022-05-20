const validationModule = {
    validateBody(schema) {
        return (req, res, next) => {
            const { error } = schema.validate(req.body);      
            if (error) {
                //console.log(error.details[0].path)
                //console.log(error.details[0].context)
                const errorMessage = error.details[0].message;
                res.status(400).json({ error: "Requête non conforme", errorMessage });
                return; // return fait quitter la fonction/méthode, le next ne sera pas exécuté
            }
            

            next();
        };
    }
};


module.exports = validationModule;

