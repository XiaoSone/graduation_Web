$(function() {
		
    $.get('/graduation/teacherController/getStudentByTeacherId',function(data){
        $(data).each(function(index,value){
            var td1=$('<td>').text(index+1);
            var td2=$('<td>').text(value.project.projectName);
            var td3=$('<td>').text(value.user.userName);
            var td4=$('<td>').text(value.classInfo.className);
            var td5=$('<td>').text(value.user.userTel);
            var td6=$('<td>');
                var a1=$('<a>').addClass('am-btn am-btn-default am-btn-primary a1')
                .attr({'role':'button','href':'/graduation/ktbgController/gotoTktbg?studentId='+value.studentId}).text('开题报告');
                var a2=$('<a>').addClass('am-btn am-btn-default am-btn-primary a2')
                .attr({'role':'button','href':'/graduation/zqjcController/gotoTzqjc?studentId='+value.studentId}).text('中期检查');
                var a3=$('<a>').addClass('am-btn am-btn-default am-btn-primary a3')
                .attr({'role':'button','href':'/graduation/lunwenController/gotoTstudentlunwen?studentId='+value.studentId}).text('论文');
                var div2_div=$('<div>').addClass('am-btn-group').append(a1).append(a2).append(a3);
            td6.append(div2_div);
            var tr=$('<tr>').append(td1).append(td2).append(td3).append(td4).append(td5).append(td6);
            $('#slist').append(tr);
        });
    });
    

    });