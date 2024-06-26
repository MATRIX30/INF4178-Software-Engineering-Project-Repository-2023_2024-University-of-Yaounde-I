
const avro = require('avsc');

const objetType = avro.Type.forSchema({
    type: 'record',
    name: 'Objet',
    fields: [
        { name: 'id_utilisateur', type: 'int' },
        { name: 'pseudo', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'telephone', type: 'string' },
    ]
});

module.exports = objetType;

