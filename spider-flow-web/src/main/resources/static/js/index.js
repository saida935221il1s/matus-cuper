var $ = layui.$;
function openTab(title,id,href){
	if($(".layui-tab[lay-filter=admin-tab]").find("[lay-id="+id+"]").length > 0){	//判断是否已打开
		var $dom =  $(".layui-tab[lay-filter=admin-tab]");
		var index = $dom.find("[lay-id="+id+"]").index();
		$dom.find(".layui-tab-content .layui-tab-item").eq(index).find("iframe").attr("src",href);
	}else{
		var html  = '<iframe src="'+href+'" width="100%" height="100%" scrolling="yes" frameborder="0"></iframe>';
		layui.element.tabAdd('admin-tab',{
			title:title,
			content:html,
			id:id,
		});
	}
	layui.element.tabChange("admin-tab",id);
}
$(function(){
	$.ajax({
		url:'spider/pluginConfigs',
		success:function(data){
			for(var i =0;i<data.length;i++){
				$(".menu-list .layui-nav-tree").append('<li class="layui-nav-item layui-nav-itemed"><a data-link="'+data[i].url+'" title="'+data[i].name+'">'+data[i].name+'</a></li>');
			}
			layui.element.init();
			initMenu();
		}
	})
});

function initMenu() {
	$("body").on('click','.menu-list li a',function(){
		$(this).parents("ul").siblings().find("li.layui-this,dd.layui-this").removeClass('layui-this')
	}).on('click','.menu-list > ul',function(){
		$(this).siblings().find('.layui-nav-itemed').removeClass('layui-nav-itemed')
	}).on('click','.menu-list a',function(){
		var href = $(this).data('link');
		if(href){
			var title = $(this).html();
			openTab(title, title, href);
			return false;
		}
	});
}