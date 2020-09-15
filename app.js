var http = require('http');
var url = require('url');
var fs = require('fs');
const jsdom = require("jsdom");
const axios = require('axios');
//create a server object:
http.createServer(function (req, res) {
 res.writeHead(200, {'Content-Type': 'text/html'}); // http header
var url = req.url;
 if(url ==='/api/proveedores'){
    axios.get('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json')
   .then(function(respuesta){
      fs.readFile("./proveedores.html", "utf8", function(error, data) {
         var dom = new jsdom.JSDOM(data);
         var document = dom.window.document;
         var bodyp = document.getElementById("bodyp");
         console.log(respuesta.data);
         respuesta.data.map(function(value, index){
            var tr = document.createElement('tr');
            var th = document.createElement('th');
            th.innerHTML = value.idproveedor;
            var td = document.createElement('td');
            td.innerHTML = value.nombrecompania;
            var td2 = document.createElement('td');
            td2.innerHTML = value.nombrecontacto;
            tr.appendChild(th);
            tr.appendChild(td);
            tr.appendChild(td2);
            bodyp.appendChild(tr);
         });
        /* var elemento = document.createElement('table');
        // elemento.className('table table-striped');
         var thead = document.createElement('thead');
         var id = document.createElement('th');
         id.innerHTML= 'id Proveedores';
         var compania = document.createElement('th');
         compania.innerHTML= 'Nombre Compañia';
         var contacto = document.createElement('th');
         contacto.innerHTML= 'Nombre Contacto';
         var tbody = document.createElement("tbody");
         tr.appendChild(id);
         tr.appendChild(compania);
         tr.appendChild(contacto);
         thead.appendChild(tr);
         elemento.appendChild(thead); */
         res.write(dom.window.document.body.innerHTML); //write a response
         res.end(); //end the response
       });
   })   
   
 }else if(url ==='/api/clientes'){
   axios.get('https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json')
   .then(function(respuesta){
      fs.readFile("./clientes.html", "utf8", function(error, data) {
         var dom = new jsdom.JSDOM(data);
         var document = dom.window.document;
         var bodyp = document.getElementById("bodyp");
         console.log(respuesta.data);
         respuesta.data.map(function(value, index){
            var tr = document.createElement('tr');
            var th = document.createElement('th');
            th.innerHTML = value.idCliente;
            var td = document.createElement('td');
            td.innerHTML = value.NombreCompania;
            var td2 = document.createElement('td');
            td2.innerHTML = value.NombreContacto;
            tr.appendChild(th);
            tr.appendChild(td);
            tr.appendChild(td2);
            bodyp.appendChild(tr);
         });
         res.write(dom.window.document.body.innerHTML); //write a response
         res.end(); //end the response
       });
   })   
 }else{
    res.write('<h1>Hello World!<h1>'); //write a response
    res.end(); //end the response
 }
}).listen(8081, function(){
 console.log("server start at port 8081"); //the server object listens on port 3000
});