/**
 * 中科方德软件有限公司<br>
 * agricultureiot:jslib.iscas_june.1.0.js
 * 日期：2015年12月8日
 */

// ////////////////////////////////////////////
// ////////////////////////////////////////////
// ///////////// 举例 ///////////////////
// ////////////////////////////////////////////
// ////////////////////////////////////////////
// 调用方法:
// 动态加载CSS
// iscas.css("../css/blue.css");
// 动态加载JS
// iscas.js("../js/moment.js", "GBK");
// iscas.js("../js/moment.js", "UTF-8");
// 调用被加载的资源文件中的方法
/////////////////////////////////////////////////////
// 调用方法：iscas.info("hello world!");
// ///////////////////////////////////////////////////
var INFO = "info", ERROR = "error", WARN = "warning", QUESTION = "question";
var GET = "get", POST = "post", JSON = "json";
var FLAG = "WANG_JUN_WEI";
iscas={
		info:function(info){
			$.messager.alert("提示",info,INFO);
		},
		error:function(info){
			$.messager.alert("错误",info,ERROR);
		},
		warning:function(info){
			$.messager.alert("警告",info,WARN);
		},
		question:function(info){
			$.messager.alert("疑问",info,QUESTION);
		},
		log:function(info){
			if(console){
				console.log(info);
			}
		},
		progress:function(title,info){
			$.messager.progress({
				title:title==''?"进度":title,
				msg:info,
				text:''
			});
		},
		progress_close:function(){
			$.messager.progress('close');
		},
		developing:function(id){
			$('#'+id).tooltip({
			    position: '',
			    content: '<span style="color:#FFF">此功能正抓紧时间研发中...</span>',
			    onShow: function(){
			        $(this).tooltip('tip').css({
			            backgroundColor: '#666',
			            borderColor: '#666'
			        });
			    }
			});
		},
		random:function(min,max){
			if(min==null||min==undefined)
				min = 0;
			if(max==null||max==undefined)
				max = 10;
			return Math.round(Math.random()*(max-min) + min);
		},
		checkImageType:function(type){
			if(type==""){
				return false;
			}else{
				if(!/\.(gif|jpg|jpeg|png|bmp|BMP|JPEG|GIF|JPG|PNG)$/.test(type)){
					return false;
				}
			}
			return true;
		},
		checkVideoType:function(type){
			if(type==""){
				return false;
			}else{
				if(!/\.(mp4|wmv|rmvb|ogg|webm|MP4|WMV|RMVB|OGG|WEBM)$/.test(type)){
					return false;
				}
			}
			return true;
		},
		checkTextType:function(type){
			if(type==""){
				return false;
			}else{
				if(!/\.(txt|TXT|log|LOG|ini|INI)$/.test(type)){
					return false;
				}
			}
			return true;
		},
		checkExcelType:function(type){
			if(type==""){
				return false;
			}else{
				if(!/\.(xls|xlsx|XLS|XLSX)$/.test(type)){
					return false;
				}
			}
			return true;
		},
		checkPDFType:function(type){
			if(type==""){
				return false;
			}else{
				if(!/\.(pdf|PDF)$/.test(type)){
					return false;
				}
			}
			return true;
		},
		css : function(path) { // 动态加载CSS
			if (!path || path.length === 0) {
				throw new Error('CSS "path" is required !');
			}
			var head = document.getElementsByTagName('head')[0];
			$(head).append("<link type='text/css' rel='stylesheet' href='" + path + "' />");
		},
		js : function(path, charset) { // 动态加载JS
			var code = charset;
			if (!path || path.length === 0) {
				throw new Error('JS "path" is required !');
			}
			var head = document.getElementsByTagName('head')[0];
			if(charset==undefined||!charset ||charset.length === 0){
				code = "UTF-8";
			}
			$(head).append("<script type='text/javascript' language='javascript' src='" + path + "' charset='" + code + "' /></script>");
		},
		dialog:function(title,url,width,height,callback){
			// 依赖zDialog.js
			var diag = new top.Dialog();
			diag.Drag=true;
			diag.Title = title;
			diag.URL = url;
			diag.Width = width || 600;
			diag.Height = height || 400;
			diag.CancelEvent = function(){
				//eval(callback);
				if (!(callback == undefined)) {
					callback();
				}
				var obj = diag.innerFrame.contentWindow.document.getElementById('zhongxin') ;
				if(obj && obj.style.display == 'none'){
					top.loading();
					setTimeout("self.location.reload()",100);
				}
				diag.close();
			};
			diag.show();
			//return diag;
		},
		time:function(){
			return new Date().getTime();
		},
};
win={
		open:function openWin(url, w, h) { 
		  var l = (screen.width - w) / 2; 
		  var t = (screen.height - h) / 2; 
		  var s = 'width=' + w + ', height=' + h + ', top=' + t + ', left=' + l; 
		  s += ', toolbar=no, scrollbars=no, menubar=no, location=no, resizable=no'; 
		  open(url, 'oWin', s); 
		},
		close:function(){
			window.close();    
		}
};
divWin = {
		win : function showDialog(divid,title,id,url){
			var html =  '<div class="modal fade" id="'+id+
				'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
						'<div class="modal-diolog"><div class="modal-content"><div class="modal-header">'+
						'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
						'<h3 id="myModalLabel">'+title+'</h3>'+
						'<div class="modal-body">aaaaa</div>'+
						'<div class="modal-footer"></div>'+
						'</div></div></div></div>';
			$("#"+divid).append(html);
			$("#"+id).modal({show : true, backdrop : 'static', keyboard : false, remote:url});
		},
		close:function(id){
			$('#'+id).modal('hide');
		}
};

/**
 * 格式化日期
 * @param dateid 日期标签的ID
 * @param bool 是否展示详细日期
 */
function $date(dateid, bool){
	var format = "yyyy-mm-dd";
	if(bool){
		format = "yyyy-mm-dd hh:ii:ss";
	}
	$('#'+dateid).datetimepicker({
		language : 'zh-CN',
		format: format,
		weekStart : 1,
		todayBtn : 1,
		autoclose : 1,
		todayHighlight : 1,
		startView : 2,
		minView : 2,
		forceParse : 0
	});
}