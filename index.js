const app = require('./MVC/app')
const mongoose = require('mongoose');
const port = 5000;

mongoose.connect("mongodb://localhost:27017/Tasks", (err, res) =>{
    try{
        if(err){
            throw err;
        }else{
            
            console.log("Se ha extablecido la conexión a la base de datos");
        }
    }catch(error){
        console.error(error);
    }
});

app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`);
});
