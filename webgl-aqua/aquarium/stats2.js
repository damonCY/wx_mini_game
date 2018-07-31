   (function(){
	var requestAnimationFrame =  
        window.requestAnimationFrame
    var e,pe,pid,fps,last,offset,step,appendFps; 
 
    fps = 0; 
    last = Date.now(); 
    step = function(){ 
        offset = Date.now() - last; 
        fps += 1; 
        if( offset >= 20000 ){ 
        last += offset; 
        appendFps(fps); 
        fps = 0; 
        } 
        requestAnimationFrame( step ); 
    }; 
    //每隔十秒计算一次 
    appendFps = function(fps){ 
		console.log('-----------fps------', fps)
        wx.showToast({
			title: 'fps: ' + fps/20,
			icon: 'loading',
			duration: 1000
		  }) 
	} 
	
	step();
   })()
   
