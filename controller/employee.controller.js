
const { Employee, employeeList } = require('../model/employee.model');





exports.updateEmployeeById = (req, res) => {

    let getOnEmployee = employeeList.find(employee => employee.id == req.params.id)
    if(!getOnEmployee){
        res.status(404).
            json({
            message : `Sorry but the employee with id ${req.params.id} do not exist`,
            status: 404
        })
    }

    if(getOnEmployee)
    {
        employeeList[req.params.id - 1].name = req.body.name;
        employeeList[req.params.id - 1].position = req.body.position;
        employeeList[req.params.id - 1].department = req.body.department;

    }

   

    res.status(200).json({
        message: `Employee with id ${req.params.id} updated successfully`,
        data: getOnEmployee,
        status: 200
    })

}
exports.deleteEmployeeById = ( req, res) => {

    let getOnEmployee = employeeList.find(employee => employee.id == req.params.id)
    if(!getOnEmployee){
        res.status(404).
            json({
            message : `Sorry but the employee with id ${req.params.id} do not exist`,
            status: 404
        })
    }

    if(getOnEmployee){
        employeeList.splice(req.params.id - 1, 1)
        res.status(200).json({message : 'Employee deleted successfully!!'})
    }
}

exports.getAllEmployee = (req, res) => {

    return res.status(200).json({
        mesage: "Data loaded successfully",
        totalEmployees: employeeList.length,
        data : employeeList,
        
    });
  

}

exports.getEmployeeById = (req, res) => {


    try{

         let getOnEmployee = employeeList.find(employee => employee.id == req.params.id)
        if(!getOnEmployee){
            res.status(404).
                json({
                message : `Sorry but the employee with id ${req.params.id} do not exist`,
                status: 404
            })
        }
    if(getOnEmployee.id == req.params.id){

         return res.status(200).json({
            employeeId : getOnEmployee.id,
            userData : getOnEmployee,
            status: 200
         }) 
    }

    }catch(e){
        console.log(e.message )
    }
   


       
}
exports.postEmployee = (req,res) => {

    let employee = req.body;

    if(employee.id == ''.trim() || employee.name == ''.trim() || employee.position == ''.trim() || employee.department == ''.trim())
    {
         
        return res.status(404).json(
            {
                message:   `The required atributes are empty`,
                satus : 404
            }
        )
    }

    // create a new ride here
    const postEmployee = new Employee(

       employee.id = employeeList.length + 1,
       employee.name,
       employee.position,
       employee.department

    )
    
    employeeList.push(postEmployee);


    res.status(200).json(
        {
            message:`New emplyee with id was created successfully`,
            data: postEmployee,
            status: 200
        }
    )
}