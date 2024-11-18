$(function() {
			
    //课题描述编辑器
    $('textarea').focus(function(){
      var this_textarea=$(this);
      $('#edit_model_bd').empty();
      $('#edit-modal').modal({
          'closeViaDimmer':false,
      });
      $('#edit-modal').modal('open');
      
      $('#edit_model_bd').append($('<div>').attr('id','editor'));
      var E = window.wangEditor;
          var editor = new E('#editor');
      if($(this_textarea).val()!=''){
          $('#editor').append($('<p>').text($(this_textarea).val()));
      }
      editor.create();
      $('#edit_model_btn').click(function(){
          this_textarea.html(editor.txt.text());
       });
  });
    
    //监听输入
    $('input[type=text]').bind('input propertychange',function(){
        if($(this).val()!=''){
            $(this).parent().parent().find('td:last').find('div div button').eq(1).removeAttr('disabled');
        }else{
            $(this).parent().parent().find('td:last').find('div div button').eq(1).attr('disabled','disabled');
        }
    });
    
    $.get('/graduation/projectController/getProjectByTeacherId',function(data){
        for(var i=0;i<data.length;i++){
            var tr=$('#tbody').find('tr').eq(i);
            tr.find('td').eq(1).find('input').val(data[i].projectName).attr('disabled','disabled');
            tr.find('td').eq(2).find('textarea').val(data[i].projectDescribe).attr('disabled','disabled');
            var radio=tr.find('td').eq(3).find('input[type=radio]').removeAttr('checked');
            radio.each(function(index,value){
                if($(this).val()==data[i].projectFromId){
                    $(this).attr('checked','checked');
                }
            });
            tr.append($('<input>').attr('type','hidden').val(data[i].projectId));
            tr.find('td').eq(4).find('.update').removeAttr('disabled');
            tr.find('td').eq(4).find('.yes').attr('disabled','disabled');
        }
    });
    
    $('.yes').click(function(){
        var btn=$(this);
        var tr=btn.parent().parent().parent().parent();
        var project_name=tr.find('td').eq(1).find('input').val();
        var project_describe=tr.find('td').eq(2).find('textarea').val();
        if(project_name==''){
            return false;
        }
        var project_from_id=tr.find('td').eq(3).find('input:checked').val();
        var projectId=tr.find('input[type=hidden]').val();
        $.post('/graduation/projectController/insertSelective',{
            projectName:project_name,
            projectDescribe:project_describe,
            projectFromId:project_from_id,
            projectId:projectId
        },function(data){
            btn.attr('disabled','disabled');
            btn.parent().find('.update').removeAttr('disabled');
            tr.find('td').eq(1).find('input').attr('disabled','disabled');
            tr.find('td').eq(2).find('textarea').attr('disabled','disabled');
        })
    });
    
    $('.update').click(function(){
        var btn=$(this);
        var tr=btn.parent().parent().parent().parent();
        btn.attr('disabled','disabled');
        btn.parent().find('.yes').removeAttr('disabled');
        tr.find('td').eq(1).find('input').removeAttr('disabled');
        tr.find('td').eq(2).find('textarea').removeAttr('disabled');
    });
    
});