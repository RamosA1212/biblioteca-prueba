const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000; 

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

if (fs.existsSync("data")){
  console.log("Existe el directorio")
}else{
  fs.mkdir("data",(err)=>{
    if(err){
          console.log(err)
        }else{
          console.log("Directorio creado")
        }
  })
}


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/form.html');
});


app.post('/prestar', (req, res) => {
  const { id, nombre, apellido, titulo, autor, editorial, año } = req.body;

  
  if (!id || !nombre || !apellido || !titulo || !autor || !editorial || !año) {
    res.redirect('/error.html');
    return;
  }

  
  const contenido = `${id}, ${nombre}, ${apellido}, ${titulo}, ${autor}, ${editorial}, ${año}`;

 
 
 
 
  const fileName = `data/id_${id}.txt`;
  fs.writeFile(fileName, contenido, (err) => {
    if (err) {
      res.send('Error al guardar el archivo.');
    } else {
      res.download(fileName); 
    }
  });

  
});


app.get('/error.html', (req, res) => {
  res.sendFile(__dirname + '/public/error.html');
});


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});