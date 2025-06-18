

const { Visitor, visitorList } = require('../model/visitor.model');

const { simpleVisitorData } =  require('../data/simpleData');

visitorList.push(simpleVisitorData);


exports.updateVisitorById = (req, res) => {

    let getOneVisitor = visitorList.find(visitor => visitor.id == req.params.id)
    if(!getOneVisitor){
        res.status(404).
            json({
            message : `Sorry but the visitor with id ${req.params.id} do not exist`,
            status: 404
        })
    }

    if(getOneVisitor)
    {
        visitorList[req.params.id - 1].name = req.body.name;
        visitorList[req.params.id - 1].age = req.body.age;
        visitorList[req.params.id - 1].height = req.body.height;
    }

   

    res.status(200).json({
        message: `Visitor with id ${req.params.id} updated successfully`,
        data: getOneVisitor,
        status: 200
    })

}
exports.deleteVisitorById = ( req, res) => {

    let getOneVisitor = visitorList.find(visitor => visitor.id == req.params.id)
    if(!getOneVisitor){
        res.status(404).
            json({
            message : `Sorry but the visitor with id ${req.params.id} do not exist`,
            status: 404
        })
    }

    if(getOneVisitor){
        visitorList.splice(req.params.id - 1, 1)
        res.status(200).json({message : 'Visitor deleted successfully!!'})
    }
}

exports.getAllVisitors = (req, res) => {

    return res.status(200).json({
        mesage: "Data loaded successfully",
        totalVisitors: visitorList.length,
        data : visitorList,
        
    });
  

}

exports.getvisitorById = (req, res) => {


    try{

    let getOneVisitor = visitorList.find(visitor => visitor.id == req.params.id)
    if(!getOneVisitor){
        res.status(404).
            json({
            message : `Sorry but the visitor with id ${req.params.id} do not exist`,
            status: 404
        })
    }

    if(getOneVisitor.id == req.params.id){

         return res.status(200).json({
            visitorId : getOneVisitor.id,
            visitorDate : getOneVisitor,
            status: 200
         }) 
    }

    }catch(e){
        console.log(e.message )
    }
   


       
}
exports.postVisitor = (req,res) => {

    let visitor = req.body;

    if(visitor.id == ''.trim() || visitor.name == ''.trim() || visitor.height == ''.trim())
    {
         
        return res.status(404).json(
            {
                message:   `The required atributes are empty `,
                satus : 404
            }
        )
    }
   
    // create a new visitor here
    const postvisitor = new Visitor(

       visitor.id = visitorList.length + 1,
       visitor.name,
       visitor.age,
       visitor.height


    )
    
    visitorList.push(postvisitor);


    res.status(200).json(
        {
            message:`New visitor wih id ${visitor.id} was created successfully`,
            data: postvisitor,
            status: 200
        }
    )
}


/* Exporting some common list object */

