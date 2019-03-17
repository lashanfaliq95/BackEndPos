const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/syscopos', function(){
    console.log('mongodb connected')
})
module.exports = mongoose;