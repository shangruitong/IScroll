function IScroll(opt) {
  var self = this;
  self.container = opt.container;
  self.ele = self.container.children[0];
  self.scrollTop = 0;
  self.end = self.start = 0;
  self.minScrollTop;
  self.rate = 0.2;
  self.init();
}

IScroll.prototype.init = function() {
  var self = this;
  setTimeout(function() {
    self.setData();
    self.initEvent();
  }, 400); // 不加setTimeout获取到的cHeight，eHeight都为0；
};


IScroll.prototype.refresh = function() {
  var self = this;
  self.setData();
};


IScroll.prototype.setData = function() {
  var self = this;
  var container = self.container;
  var ele = self.ele;
  container.style.cssText = 'overflow:hidden;';
  ele.style.cssText = 'transiton: transform 0s';
  var cHeight = container.clientHeight;
  var eHeight = ele.clientHeight;
  // console.log(cHeight , eHeight);
  self.minScrollTop = cHeight - eHeight;
};

IScroll.prototype.initEvent = function() {
  var self = this;
  var container = self.container;


  container.addEventListener('touchstart', function(e) {
    self.end = self.start = e.touches[0].clientY;
  }, false);

  container.addEventListener('touchmove', function(e) {
    // console.log(e);
    self.end = e.touches[0].clientY;
    var distance = self.end - self.start;
    self.scrollTop += distance * self.rate;
    if (self.scrollTop > 0) {
      self.scrollTop = 0;
    } else if (self.scrollTop < self.minScrollTop) {
      self.scrollTop = self.minScrollTop;
    }
    // console.log(`transform:translate(0,${self.scrollTop}px);`);
    // console.log(self.ele);
    self.ele.style.cssText = `
      transform:translate(0, ${self.scrollTop}px);
    `;
  }, false);
  container.addEventListener('touchend', function(e) {
    self.end = self.start = 0;
  }, false);
};
