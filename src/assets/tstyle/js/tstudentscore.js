$(function() {
			
    var studentId=getQueryString("studentId");
    
     $.ajax({
           url: "/graduation/studentController/getStuAndProject",
           type: 'get',
           dataType:'json',
           async:false,
           data:{
               studentId:studentId
           },
           success: function(data){
              if(!isNull(data.studentScore)){
                  //是否更新
                  $('#pinjia_btn').text('更新(上次评分为: '+data.studentScore+')');
                  $('#teacherEvaluate').text(data.teacherEvaluate);
              }
              $('#tr1').find('td').eq(1).text(data.user.userAccount);
              $('#tr1').find('td').eq(3).text(data.user.userName);
              $('#tr2').find('td').eq(1).text(data.classInfo.subject.subjectName);
              $('#tr2').find('td').eq(3).text(data.classInfo.className);
              $('#tr3').find('td').eq(1).text(data.project.projectName);
           }
         });
    
    var array=[0,0,0,0,0,0,0];
    $('.radio1').click(function() {
        var radio1=$('.radio1:checked').val();
        array[0]=radio1;
        sumScore(array);
    });
    $('.radio2').click(function() {
        var radio2=$('.radio2:checked').val();
        array[1]=radio2;
        sumScore(array);
    });
    $('.radio3').click(function() {
        var radio3=$('.radio3:checked').val();
        array[2]=radio3;
        sumScore(array);
    });
    $('.radio4').click(function() {
        var radio4=$('.radio4:checked').val();
        array[3]=radio4;
        sumScore(array);
    });
    $('.radio5').click(function() {
        var radio5=$('.radio5:checked').val();
        array[4]=radio5;
        sumScore(array);
    });
    $('.radio6').click(function() {
        var radio6=$('.radio6:checked').val();
        array[5]=radio6;
        sumScore(array);
    });
    $('.radio7').click(function() {
        var radio7=$('.radio7:checked').val();
        array[6]=radio7;
        sumScore(array);
    });
    
    function sumScore(array){
        var sum=0;
        for(var i=0;i<array.length;i++){
            sum+=Number(array[i]);
        }
        $('#score').text(sum);
    }
    
    //点击提交评价按钮
    $.get('/graduation/lunwenController/getLunwenBySid',{
        studentId:studentId
    },function(data){
        if(data.lunwenStatus!=null&&data.lunwenStatus==1){
            $('#pinjia_btn').removeClass('am-disabled').text('提交');
            $('#pinjia_btn').click(function () {
                  var $btn = $(this);
                  var score=$('#score').text();
                  if(isNull(score)){
                      return;
                  }
                  $.post('/graduation/studentController/updateScore',{
                        '_method':'put',
                        studentScore:score,
                        teacherEvaluate:$('#teacherEvaluate').val(),
                        studentId:studentId
                    },function(data){
                        if(data){
                              $btn.button('loading');
                                setTimeout(function(){
                                    disableBtn('pinjia_btn','提交完成');
                              }, 3000);
                        }
                    }); 
                    
                });
        }else{
            $('#pinjia_btn').addClass('am-disabled').text('请先审核论文');
        }
    });
    
    
});