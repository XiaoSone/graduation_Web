$(function() {
 		 	
			function yansouStuBody(data) {
				for(var num=0;num<data.list.length;num++){
					var td1=$('<td>').text(data.list[num].user.userAccount);
					var td2=$('<td>').text(data.list[num].user.userName);
					var td3=$('<td>').text(data.list[num].user.userGender==1?'男':'女');
					var td4=$('<td>').text(data.list[num].user.userTel);
					var td5=$('<td>').text(data.list[num].classInfo.className);
					var td6=$('<td>').text(data.list[num].teacher.user.userName);
					var td7=$('<td>').text(data.list[num].project.projectName);
					if(data.list[num].daBian==null){
						var td8=$('<td>').append($('<input>').attr({'type':'number','min':'1','max':'70','disabled':'disabled'}));
						var div1=$('<div>').addClass('am-btn-toolbar');
						var div2=$('<div>').addClass('am-btn-group am-btn-group-xs').css('float','right');
						var btn1=$('<button>').attr({'type':'button','disabled':'disabled'}).addClass('am-btn am-btn-default am-btn-xs am-text-secondary update').append($('<span>').addClass('am-icon-pencil-square-o')).append($('<span>').text('编辑'));
						var btn2=$('<button>').attr({'type':'button','disabled':'disabled'}).addClass('am-btn am-btn-default am-btn-xs yes').append($('<span>').addClass('am-icon-check')).append($('<span>').text('提交'));
						btn2.append($('<input>').attr({'type':'hidden','name':'studentId'}).val(data.list[num].studentId));
						btn2.append($('<input>').attr({'type':'hidden','name':'dabianId'}));
					}else{
						var td8=$('<td>').append($('<input>').attr({'type':'number','min':'1','max':'70','disabled':'disabled'}).val(data.list[num].daBian.dabianScore));
						var div1=$('<div>').addClass('am-btn-toolbar');
						var div2=$('<div>').addClass('am-btn-group am-btn-group-xs').css('float','right');
						var btn1=$('<button>').attr({'type':'button','disabled':'disabled'}).addClass('am-btn am-btn-default am-btn-xs am-text-secondary update').append($('<span>').addClass('am-icon-pencil-square-o')).append($('<span>').text('编辑'));
						var btn2=$('<button>').attr({'type':'button','disabled':'disabled'}).addClass('am-btn am-btn-default am-btn-xs yes').append($('<span>').addClass('am-icon-check')).append($('<span>').text('提交'));
						btn2.append($('<input>').attr({'type':'hidden','name':'studentId'}).val(data.list[num].studentId));
						btn2.append($('<input>').attr({'type':'hidden','name':'dabianId'}).val(data.list[num].daBian.id));
					}
					div1.append(div2.append(btn1).append(btn2));
					var td9=$('<td>').append(div1);
					var tr=$('<tr>').append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7).append(td8).append(td9);
					$('#yansou_stulist').append(tr);
				}
				
				$('.update').click(function(){
					$(this).parent().parent().parent().parent().find('input[type=number]').removeAttr('disabled');
					$(this).attr('disabled','disabled');
					$(this).parent().find('.yes').removeAttr('disabled');
				});
				$('.yes').click(function(){
					
					var $btn=$(this);
					
					var dabianScore=$btn.parent().parent().parent().parent().find('input[type=number]').val();
					if(isNaN(dabianScore)||dabianScore<1||dabianScore>70){
						return;
					}
					
					 $.post('/graduation/dabianController/insertOrUpdate',{
						'studentId':$(this).find('input:hidden[name=studentId]').val(),
						'id':$(this).find('input:hidden[name=dabianId]').val(),
						'dabianScore':dabianScore
					},function(data){
						if(data){
							$btn.parent().parent().parent().parent().find('input[type=number]').attr('disabled','disabled');
							$btn.attr('disabled','disabled');
							$btn.parent().find('.update').removeAttr('disabled');
						}
					}); 
				});
			}
 		 	
 		 	
 		 	var pageNum=1;
			var pageSize=8;
			var j=1;
			showStudent(pageNum,pageSize);
			function showStudent(pageNum,pageSize) {
 				$.get('/graduation/teacherController/getYansouTeamStu',{
					pageNum:pageNum,
					pageSize:pageSize
				},function(data){
					//清除之前的数据
 					$('#yansou_stulist').empty();

					if(data.list.length!=0&&data.list[0].teacher!=null){
						yansouStuBody(data);
						$('#news-Pagination-1').css('display','');
                        
						if(j==1){
							//第一次调用
							j++;
							showPage1(data.total,pageSize);
						}
						
						//查询该教师是否为组长
						$.get('/graduation/teacherController/thisTeacherisLeader',function(data){
							if(data.isLeader==1){
								$('.update').removeAttr('disabled');
							}
						});
						
					}else{
						$('#news-Pagination-1').css('display','none');
					}
				}); 
			}
			
 				 function showPage1(total,pageSize){
 					//分页
 					$('#news-Pagination-1').pagination(total, {      //总记录数
 				        items_per_page:pageSize,          //每页显示多少条记录
 			  		    next_text:'下一页',
 			  		    prev_text:'上一页',
 			  		    num_display_entries:5,
 				        callback:handlePaginationClick
 				     });
 			  
 				  }
 				function handlePaginationClick(new_page_index, pagination_container) {
 					//清除之前的数据
 					$('#yansou_stulist').empty();
 					showStudent(new_page_index+1,pageSize);
 					return false;
 				}
 		 	
			
		});