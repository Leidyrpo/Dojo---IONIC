var http = require("http");
var path = require("path");
var fs = require("fs");
var contentType = "text/html";

function requestEvent(req, res){
	/*res.writeHead(200,{"content.type":"text/html"});
	res.end("<H1>Fin de la peticion</H1>");	
	*/

	var recurso = req.url;
	var ext = path.extname(recurso);

	if(recurso === "/"){
		recurso = "/salida.html";
	}
	recurso = "."+recurso;

	switch(ext){
	case ".css":
		contentType = "text/css";
		break;
	case ".js":
		contentType = "text/javascript";
		break;
	} 	

   	fs.exists(recurso,function(exist){
	
	if(exist){
		fs.readFile(recurso, function(err,data){
		if(err){
			res.writeHead(500);
			res.end("Internal Error");
		
		}
		else{
			res.writeHead(200,{"content-type": contentType});
			res.end(data);
		}

		});

	}
	else
	{
		res.writeHead(404);
		res.end("Not Found")	
		
	}

	});

}	
var sever = http.createServer(requestEvent);
sever.listen(8888);
console.log("Server running...");
