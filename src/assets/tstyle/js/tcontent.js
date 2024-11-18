$(function(){
		
    var date=new Date();
    var thisDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    $.get('/graduation/workTimeController/getWorkTime',{
        date:thisDate
    },function(data){
        if(data.workTimeInfo!=null){
            $('#workTime').text(data.workTimeInfo);
        }
    });
    
    $.get('/graduation/projectController/thisTeacherYesProjectNum',function(data){
        if(data!=null){
            $('#num1').text(data);
        }
    });
    
    $.get('/graduation/projectController/thisTeacherUndefinedStudentNum',function(data){
        if(data!=null){
            $('#num2').text(data);
        }
    });
    
});