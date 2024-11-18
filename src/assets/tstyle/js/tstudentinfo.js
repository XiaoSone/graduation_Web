$(function() {
    $.get('/graduation/teacherController/getStudentByTeacherId2',function(data){
       $(data).each(function(index,value){
            var td1=$('<td>').addClass('am-text-middle').text((index+1));
            var td2=$('<td>').addClass('am-text-middle').append($('<span>').text(value.user.userName));
            var userGender;
            if(value.user.userGender==1){
                userGender='男';
            }else{
                userGender='女';
            }
            var td3=$('<td>').addClass('am-text-middle').append($('<span>').text(userGender));
            var td4=$('<td>').addClass('am-text-middle').append($('<span>').text(value.classInfo.subject.subjectName));
            var td5=$('<td>').addClass('am-text-middle').append($('<span>').text(value.classInfo.grade.gradeName));
            var td6=$('<td>').addClass('am-text-middle').append($('<span>').text(value.classInfo.className));
            var td7=$('<td>').addClass('am-text-middle').append($('<span>').text(value.user.userTel));
            var td8=$('<td>').addClass('am-text-middle').append($('<span>').text(value.project.projectName));
            var goodBoy;
            if(value.goodBoy==1){
                goodBoy='是';
            }else{
                goodBoy='否';
            }
            var td9=$('<td>').addClass('am-text-middle').append($('<span>').text(goodBoy));
            $('#tstudentlist').append($('<tr>').append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7).append(td8).append(td9));
       });
   }); 
});