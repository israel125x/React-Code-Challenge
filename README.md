# Prueba tecnica GONET
prueba tecnica 

Para correr este protecto se requiere instalar Node.js 

Clone el repositorio
coloquese en la carpeta del proyecto
ejecute npm install
una ves concluido ejecute npm start

Extra :

codigo de la Firebase Function del backend 

/-------------------------------------------------------------------
//The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();


exports.getfavoritos = functions.https.onRequest(async (req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    const hash = req.query.hash;
    var ref = admin.database().ref("favoritos/"+hash);
    var keys=[];   
    ref.once("value")
          .then(function(snapshot) {
            if(!snapshot.exists()){
              res.send(keys);
            }
            snapshot.forEach(function(item) {
              var itemVal = item.val();
              keys.push(itemVal);
            });
            console.log('data: ',keys);
            res.send(keys);
        });  
});


exports.insertfavoritos = functions.https.onRequest(async (req, res) => {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('req: ',req);
    const titulo = req.query.title;
    const hash = req.query.hash;
    const id = req.query.id;
    const poster = req.query.poster;
    const snapshot = await admin.database().ref('favoritos').child(hash).child(id).set({Titulo: titulo, Poster:poster, Id: id});
    res.send("OK");
  });


  exports.deletefavoritos = functions.https.onRequest(async (req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    const hash = req.query.hash;
    const id = req.query.id;
    const snapshot = await admin.database().ref('favoritos').child(hash).child(id).remove();
    res.send("OK");
  });

/-------------------------------------------------------------------
