//firebase.firestore().enablePersistence() //SE CONFIGURA PARA USAR LA APP OFFLINE



var db = firebase.firestore(); //SE INCIALIZA LA INSTANCIA DE LA BASE DE DATOS
var table = false;

var contarvotos = false;


function registrarEstudiante(){
    
    console.log("registrando...");
    
    var nombre = document.getElementById("nombreS").value;
    var apellido = document.getElementById("apellidoS").value;
    var carnet = document.getElementById("carnetS").value;
    var correo = document.getElementById("correoS").value;
    var pass = document.getElementById("passwordS").value;
    var tlf = document.getElementById("telefonoS").value;
    var ca = document.getElementById("caRegistro").value;
    
    db.collection("Estudiante").add({
        nombre: nombre,
        apellido: apellido,
        carnet: carnet,
        correo: correo,
        password: pass,
        telefono: tlf,
        ca: ca,
        voto: false
    }).then(function(){
        
        //alert("se registro el ca "+ca);
        
        $("#myModal").modal("hide");
        
        contarvotos = true;
        
        document.getElementById("login").className = "oculto";
        document.getElementById("username").className = "oculto";
        document.getElementById("pass").className = "oculto";
        document.getElementById("usernameText").className = "oculto";
        document.getElementById("passText").className = "oculto";
        document.getElementById("buttonText").className = "oculto";
        document.getElementById("buttonRegistro").className = "oculto";
        //document.getElementById("login").style = "display: none";
        //$("#login").hide();
        //document.getElementById("body").style = "background-color: #FFFFFF";
        $("#body").css("background-color", "#FFFFFF");
        //document.getElementById("pie").style = "position: relative";
        $("#pie").css("position", "relative");
      
        //document.getElementById("contVotoSection").style = "display: block";
        $("#contVotoSection").show();
        //document.getElementById("tablaSection").style = "display: block";
        $("#tablaSection").show();
        //document.getElementById("votoSection").style = "display: block";
        $("#votoSection").show();
        //document.getElementById("menu").style = "display: block";    
        $("#menu").show();
        
      
        document.getElementById("nombreUser").innerText = nombre;
        document.getElementById("apellidoUser").innerText = apellido;
        document.getElementById("carnet").innerText = carnet;
        document.getElementById("telefono").innerText = tlf;
        document.getElementById("voto").innerText = "No ha votado";
                        
        
    });
    
}

function logIn(){
    
    
    var username = document.getElementById("username").value;
    var pass = document.getElementById("pass").value;
    
    db.collection("Estudiante").get().then(function(querySnapshot){
       
        querySnapshot.forEach(function(doc) {
           
            console.log("el usuario es "+username);
            console.log("servidor responde "+doc.data().correo);
            console.log("servidor responde "+doc.data().password);
            if(doc.data().correo == username && doc.data().password == pass){
                
                console.log("ENTRO EN LA CONDICION");
                var data = {
                       nombre: doc.data().nombre,
                       apellido: doc.data().apellido,
                       carnet: doc.data().carnet,
                       correo: doc.data().correo,
                       telefono: doc.data().telefono,
                       ca: doc.data().ca,
                       voto: doc.data().voto
                    }
                   
                           contarvotos = true;
                      document.getElementById("username").className = "oculto";
                      document.getElementById("pass").className = "oculto";
                      document.getElementById("usernameText").className = "oculto";
                      document.getElementById("passText").className = "oculto";
                      document.getElementById("login").className = "oculto";
                      document.getElementById("buttonText").className = "oculto";
                      document.getElementById("buttonRegistro").className = "oculto";
                   // document.getElementById("login").style = "display: none";
                   // document.getElementById("body").style = "background-color: #FFFFFF";
                      
                
                             //document.getElementById("login").style = "display: none";
        //$("#login").hide();
        //document.getElementById("body").style = "background-color: #FFFFFF";
        $("#body").css("background-color", "#FFFFFF");
        //document.getElementById("pie").style = "position: relative";
        $("#pie").css("position", "relative");
      
        //document.getElementById("contVotoSection").style = "display: block";
        $("#contVotoSection").show();
        //document.getElementById("tablaSection").style = "display: block";
        $("#tablaSection").show();
        //document.getElementById("votoSection").style = "display: block";
        $("#votoSection").show();
        //document.getElementById("menu").style = "display: block";    
        $("#menu").show();
                
                   
                    document.getElementById("nombreUser").innerText = doc.data().nombre;
                    document.getElementById("apellidoUser").innerText = doc.data().apellido;
                    document.getElementById("carnet").innerText = doc.data().carnet;
                    document.getElementById("telefono").innerText = doc.data().telefono;
                    document.getElementById("candidato").innerText = doc.data().ca;
                
          
                    if(!doc.data().voto){
                        document.getElementById("voto").innerText = "No ha votado";
                        //SE MUESTRA BOTON PARA VOTAR
                    }else{
                       document.getElementById("voto").innerText = "Ya ha votado";
                       document.getElementById("votarBoton").style = "display: none";
                  }
                
            }
            
        });
        
        
    });
        
        
}



function buscarPersona(){
    var persona = document.getElementById("personaTlf").value;
    
    console.log("El input tiene como valor "+persona);
    
    db.collection("Estudiante").where("telefono","==",persona).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
            
            if(doc != null){
                
                document.getElementById("busquedaDatos").style = "display: block";

                document.getElementById("nombreBuscado").innerText = doc.data().nombre;
                document.getElementById("apellidoBuscado").innerText = doc.data().apellido;
                document.getElementById("carnetBuscado").innerText = doc.data().carnet;
                document.getElementById("correoBuscado").innerText = doc.data().correo;
                
                if(!doc.data().voto){
                    document.getElementById("votoBuscado").innerText = "No ha votado";
                }
                else{
                    document.getElementById("votoBuscado").innerText = "Ya votó";
                }
            }
        });
    });
}

function consultarVotos(){
    
    
    db.collection("Estudiante").where("voto","==",true).get().then(function(querySnapshot){
        
        var votoTotal = 0;
        
        querySnapshot.forEach(function(doc) {
            votoTotal += 1;
        });
        
        db.collection("Amigo").where("voto","==",true).get().then(function(querySnapshot){
            
            querySnapshot.forEach(function(doc){
              
                votoTotal += 1;
            });
            
             document.getElementById("cantidadVoto").innerText = votoTotal.toString();
        });
        
        console.log(votoTotal);
        
       
    });
}



function consultarVotosToth(){
    
    
    db.collection("Estudiante").where("voto","==",true).get().then(function(querySnapshot){
        
        var votoTotal = 0;
        
        querySnapshot.forEach(function(doc) {
            
            if(doc.data().ca == "Andres Toth"){
                votoTotal += 1;
                console.log("vota por toth "+doc.id);
            }
            
            
        });
        
        db.collection("Amigo").where("voto","==",true).get().then(function(querySnapshot){
            
            querySnapshot.forEach(function(doc){
              
                if(doc.data().ca == "Andres Toth"){
                    votoTotal += 1;
                    console.log("vota por toth "+doc.id);
                }
            });
            
             document.getElementById("votosToth").innerText = votoTotal.toString();
        });
        
        //console.log(votoTotal);
        
       
    });
    
    
}

function consultarVotosRonald(){
    
    db.collection("Estudiante").where("voto","==",true).get().then(function(querySnapshot){
        
        var votoTotal = 0;
        
        querySnapshot.forEach(function(doc) {
            
            if(doc.data().ca == "Ronald Quintero"){
                votoTotal += 1;
            }
            
            
        });
        
        db.collection("Amigo").where("voto","==",true).get().then(function(querySnapshot){
            
            querySnapshot.forEach(function(doc){
              
                if(doc.data().ca == "Ronald Quintero"){
                    votoTotal += 1;
                }
            });
            
             document.getElementById("votosRonald").innerText = votoTotal.toString();
        });
        
        //console.log(votoTotal);
        
       
    });
    
    
}

function votar(){
    
    
   var carnet = document.getElementById("carnet").innerText;
  
    
   db.collection("Estudiante").get().then(function(querySnapshot) {
      
       querySnapshot.forEach(function(doc) {
          
           console.log(doc.id);
           
           if(doc.data().carnet == carnet){
               
               db.collection("Estudiante").doc(doc.id).update({voto: true}).then(function(){
                   document.getElementById("votarBoton").style = "display: none";
                   consultarVotos();
                   consultarVotosRonald();
                   consultarVotosToth();
               }).catch(function(err){
                   console.log(err);
               });
               
           }
            
       });
       
   });
    
 
}

function registrarAmigo(){
    
    var nombre = document.getElementById("nombreAmigo").value;
    var apellido = document.getElementById("apellidoAmigo").value;
    var carrera = document.getElementById("carreraAmigo").value;
    var telefono = document.getElementById("telefonoAmigo").value;
    var ca = document.getElementById("caAmigo").value;
    
    console.log("El nombre ingresado es "+nombre);
    
    if(nombre != "" && apellido != "" && carrera != "" && telefono != ""){
        
        addAmigo(nombre,apellido,carrera,telefono,ca);
    }
    else{
        alert("Debe introducir los campos correctamente");
    }
}

/*
function addAmigo(nombre,apellido,carrera,telefono){
    
    
    var carnet = document.getElementById("carnet").innerText;
    
    db.collection("Estudiante").get().then(function(querySnapshot){
        
        querySnapshot.forEach(function(doc){
            
            if(doc.data().carnet == carnet){
                
                var datos = {
                    
                    nombre: nombre,
                    apellido: apellido,
                    carrera: carrera,
                    telefono: telefono,
                    fk_estudiante: doc.id,
                    voto: false
                }
                
                db.collection("Amigo").add(datos).then(function(){
                    console.log("Se ha insertado un amigo");
                    document.getElementById("nombreAmigo").value = "";
                    document.getElementById("apellidoAmigo").value = "";
                    document.getElementById("carreraAmigo").value = "";
                    document.getElementById("telefonoAmigo").value = "";
                    
                }).catch(function(err){
                    console.log(err);
                });
                
            }
            
        });
    });
    
    
    
} */



function addAmigo(nombre,apellido,carrera,telefono,ca){
        
    var carnet = document.getElementById("carnet").innerText;
    
    db.collection("Estudiante").get().then((querySnapshot) => {
        
        querySnapshot.forEach(function(doc){
            
            if(doc.data().carnet == carnet){
                
                var datos = {
                    
                    nombre: nombre,
                    apellido: apellido,
                    carrera: carrera,
                    telefono: telefono,
                    fk_estudiante: doc.id,
                    ca: ca,
                    voto: false
                }
                
                
                db.collection("Amigo").get().then(function(querySnapshot){
                    
                    var existe = false;
                    
                    querySnapshot.forEach(function(doc){
                        
                        if(datos.telefono == doc.data().telefono){
                            existe = true;
                        }
                        
                        
                    });
                    
                    if(existe){
                        alert(datos.nombre+" "+datos.apellido+" ya esta registrado por otra persona");
                    }else{
                        
                        db.collection("Amigo").add(datos).then(function(){
                            console.log("Se ha insertado un amigo");
                            document.getElementById("nombreAmigo").value = "";
                            document.getElementById("apellidoAmigo").value = "";
                            document.getElementById("carreraAmigo").value = "";
                            document.getElementById("telefonoAmigo").value = "";
                    
                        }).catch(function(err){
                            console.log(err);
                        });
                        
                     }
                    
                });
                
                
            }
            
        });
    });
}


function verListaAmigo(){
    
    consultarVotos();
    consultarVotosRonald();
    consultarVotosToth();
    
    if(table){
        table = false;
        var nodo = document.getElementById("tableAmigo");
        while(nodo.hasChildNodes()){
            nodo.removeChild(nodo.firstChild);
        }
        
       
    }
    else{
        table = true;
        
        var carnet = document.getElementById("carnet").innerText;
    
        db.collection("Estudiante").get().then(function(querySnapshot) {
        
              querySnapshot.forEach(function(doc){
            
            
                    if(doc.data().carnet == carnet){
                        db.collection("Amigo").where("fk_estudiante","==",doc.id).get().then(function(querySnapshot) {
                    
                            var i = 0;
                    
                              querySnapshot.forEach(function(documento){
                        
                                   var tr = document.createElement("tr");
                                   i += 1;
                                  
                                   document.getElementById("tableAmigo").appendChild(tr);
                                   /*
                                   var thId = document.createElement("th");
                                   thId.innerText = i.toString();
                                   tr.appendChild(thId);
                                   */
                                   var thNombre = document.createElement("th");
                                   thNombre.innerText = documento.data().nombre;
                                   tr.appendChild(thNombre);
            
                                   var thApellido = document.createElement("th");
                                   thApellido.innerText = documento.data().apellido;
                                   tr.appendChild(thApellido);
                                   
                                  /*
                                   var thCarrera = document.createElement("th");
                                   thCarrera.innerText = documento.data().carrera;
                                   tr.appendChild(thCarrera);
                                  */
                                  
                                   var thTlf = document.createElement("th");
                                   //thTlf.innerText = documento.data().telefono;
                                   var botontlf = document.createElement("a");
                                   botontlf.setAttribute("href","tel:"+documento.data().telefono);
                                   botontlf.className = "btn btn-success";
                                   botontlf.innerText = documento.data().telefono;
                                   botontlf.id = "tlf_"+i.toString(); //SE IDENTIFICA LA ETIQUETA
                                   //thTlf.id = "tlf_"+i.toString(); //SE IDENTIFICA LA ETIQUETA
                                   thTlf.appendChild(botontlf);
                                   tr.appendChild(thTlf);
            
                                   var thVoto = document.createElement("th");
                                   if(!documento.data().voto){
                                       //thVoto.innerText = "No";
                                       //var thBoton = document.createElement("th");
                                       //tr.appendChild(thBoton);
                                       var boton = document.createElement("button");
                                       boton.innerText = "No";
                                       boton.className = "btn btn-primary";
                                       boton.id = i.toString(); //SE GUARDA EL ID DEL CONTADOR
                                       
                                       //SE LE AGREGA UNA FUNCIÓN AL BOTON 
                                       boton.onclick = function(){
                                           var tlf = document.getElementById("tlf_"+boton.id).innerText;
                                           
                                           db.collection("Amigo").where("telefono","==",tlf).get()
                                           .then(function(querySnapshot) {
                                               querySnapshot.forEach(function(doc) {
                                                  
                                                   db.collection("Amigo").doc(doc.id).update({voto: true}).then(function(){
                                                       var textoNuevo = document.createElement("h5");
                                                       textoNuevo.innerText = "Votó";
                                                       textoNuevo.id = "newText";
                                                       
                                                       $("#"+boton.id).replaceWith("<h4>Votó</h4>");
                                                   });
                                                   
                                               });
                                           })
                                           
                                       }
                                       
                                       thVoto.appendChild(boton);
                                   }else{
                                       thVoto.innerText = "votó";
                                   }
                                   tr.appendChild(thVoto);
                    });
                    
                });
            }
            
        });
        
    });
    
   }
    
}







window.onload = function(){
 
  //setInterval(consultarVotos,3000);
    consultarVotos();
    consultarVotosRonald();
    consultarVotosToth();
    
}
