var wx = wx || ''
var showFPS = (function (wx) {
  if(!wx){return}
  var requestAnimationFrame = window.requestAnimationFrame;

  var fps =0; var offset = 0; var last = 0;
  var last = Date.now();
 var  step = function () {
    fps += 1
    offset = Date.now() - last;
    if (offset >= 10000) {
      last += offset;
      appendFPS(fps)
      fps = 0;
    }
    requestAnimationFrame(step);
  }
  function appendFPS(fps) {
    wx.showToast({
      title: 'fps: ' + (fps/10),
      icon: 'loading',
      duration: 500
    })
  };
  return {
    step: step
  }
})(wx)
if(wx) {
  showFPS.step(wx)
}

