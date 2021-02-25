const data = require('../../db.json')

module.exports = {
    getUsers: async function(req, res, next) {
        let { skills, month, offset} = req.query;
        
        if(!offset)
            offset = 0;

        let returnData;

        if(skills && month){
            returnData = data.filter(item => (skills.includes(item.skills) && item.month == month))
        } else if(skills)
            returnData = data.filter(item => skills.includes(item.skills));
        else if(month)
            returnData = data.filter(item => item.month == month);
        else
            returnData = data
        
        returnData.sort(function(a, b) { 
            return a.id - b.id;
          })

        res.end(JSON.stringify(returnData.slice(offset, Number(offset)+8)))
    }
}
