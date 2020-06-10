const mongoose = require('mongoose');


const KeywordLog = mongoose.Schema({
  
    log_name: String, 

    keywords:[String],
        
    date: {
        type: Date,
        default:Date.now() 
     },


});


module.exports = mongoose.model('Posts', KeywordLog);
