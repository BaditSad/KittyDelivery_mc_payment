const { Sequelize } = require('sequelize');

// Remplacez ces valeurs par celles de votre configuration de base de données
const sequelize = new Sequelize('kittydelivery', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres' // Assurez-vous que le dialecte est correct
});

// Fonction pour se connecter à la base de données
async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connexion réussie à la base de données PostgreSQL');
    } catch (err) {
        console.error('Erreur de connexion à la base de données PostgreSQL:', err);
        throw err;
    }
}

module.exports = { sequelize, connectToDatabase };
