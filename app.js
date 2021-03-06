var mysql=require('mysql');
var express=require('express');

var app=express();

var bodyParser=require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var server=app.listen(process.env.PORT||8000,function(err){
	if(err)throw err;
	console.log('Connected to port 8000');
});

var conn=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'rootpass',
	database:'mydb'
});

conn.connect(function(err){
	if(err)throw err;
	console.log('Connected');
});

conn.query('CREATE TABLE IF NOT EXISTS produs\
			(id INT,\
			denumire VARCHAR(20),\
			pret INT,\
			cantitate INT,\
			zi_primire VARCHAR(20),\
			zile_expirare INT)',
			function(err,res){
				if(err)throw err;
				console.log(res);
});

app.get('/produse.html', function(req, res){
	res.sendFile(__dirname+'/produse.html');
});

app.get('/stergere.html', function(req, res){
	res.sendFile(__dirname+'/stergere.html');
});

app.get('/actualizare.html', function(req, res){
	res.sendFile(__dirname+'/actualizare.html');
});

app.get('/inserare.html', function(req, res){
	res.sendFile(__dirname+'/inserare.html');
});

app.get('/proiect.html', function(req, res){
	res.sendFile(__dirname+'/proiect.html');
});
/*conn.query('INSERT INTO produs(id,denumire,pret,cantitate,zi_primire,zile_expirare)\
			VALUES(1,"lapte",5,1,"09.01.2015",2)');*/
app.get('/produse',function(req,res){
	conn.query('SELECT * FROM produs',function(err,result){
		if(err)throw err;
		res.send(result);
	});
});

app.post('/inserare',function(req,res){
	var arr=[[req.body.id,req.body.denumire,req.body.pret,req.body.cantitate,req.body.zi_primire,req.body.zile_expirare]];
	conn.query('INSERT INTO produs VALUES ?',[arr],function(err,result){
		if(err)throw err;
		console.log('Success');
	});
	res.end();
});

app.get('/preluarekant/:id',function(req,res){
	conn.query('SELECT cantitate FROM produs WHERE id=?',req.params.id,function(err,result){
		if(err)throw err;
		res.send(result);
	});
});
app.get('/update/:id',function(req,res){
	conn.query('UPDATE produs SET cantitate=cantitate-1 WHERE id=?',req.params.id,function(err,result){
		if(err)throw err;
		res.send(result);
		
	});
});
