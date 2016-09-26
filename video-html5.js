;(function($,window, undefined){

  'use strict';

  var pluginName = 'html5-video',
      win = $(window);

  function playPause(){
    if(vid.paused){
      vid.play();
      playbtn.innerHTML = "Pause";
    } else {
      vid.pause();
      playbtn.innerHTML = "Play";
    }
  }

  function vidSeek(){
    var seekto = vid.duration * (seekslider.value / 100);
    vid.currentTime = seekto;
  }

  function seektimeupdate(){
    var nt = vid.currentTime * (100 / vid.duration);
    seekslider.value = nt;
    var curmins = Math.floor(vid.currentTime / 60);
    var cursecs = Math.floor(vid.currentTime - curmins * 60);
    var durmins = Math.floor(vid.duration / 60);
    var dursecs = Math.floor(vid.duration - durmins * 60);
    if(cursecs < 10){ cursecs = "0"+cursecs; }
    if(dursecs < 10){ dursecs = "0"+dursecs; }
    if(curmins < 10){ curmins = "0"+curmins; }
    if(durmins < 10){ durmins = "0"+durmins; }
    curtimetext.innerHTML = curmins+":"+cursecs;
    durtimetext.innerHTML = durmins+":"+dursecs;
  }

  function vidmute(){
    if(vid.muted){
      vid.muted = false;
      mutebtn.innerHTML = "Mute";
    } else {
      vid.muted = true;
      mutebtn.innerHTML = "Unmute";
    }
  }

  function setvolume(){
    vid.volume = volumeslider.value / 100;
  }

  function toggleFullScreen(){
    if(vid.requestFullScreen){
      vid.requestFullScreen();
    } else if(vid.webkitRequestFullScreen){
      vid.webkitRequestFullScreen();
    } else if(vid.mozRequestFullScreen){
      vid.mozRequestFullScreen();
    }
  }

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  function InitPlugin() {
    var vid, playbtn, seekslider, curtimetext, durtimetext, mutebtn, volumeslider, fullscreenbtn;
    vid = document.getElementById("my_video");
    playbtn = document.getElementById("playpausebtn");
    seekslider = document.getElementById("seekslider");
    curtimetext = document.getElementById("curtimetext");
    durtimetext = document.getElementById("durtimetext");
    mutebtn = document.getElementById("mutebtn");
    volumeslider = document.getElementById("volumeslider");
    fullscreenbtn = document.getElementById("fullscreenbtn");
    // Add event listeners
    playbtn.addEventListener("click",playPause,false);
    seekslider.addEventListener("change",vidSeek,false);
    vid.addEventListener("timeupdate",seektimeupdate,false);
    mutebtn.addEventListener("click",vidmute,false);
    volumeslider.addEventListener("change",setvolume,false);
    fullscreenbtn.addEventListener("click",toggleFullScreen,false);
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          el= this.element;


      console.log('Init el:', el);

      // InitPlugin.call(that);

      var buttonPlay = el.find('[data-video-html5-control]');

      buttonPlay.on('click', function() {
        alert(1);
      });

      win.on('resize.' + pluginName, function() {
        console.log('resize');
      });

    },

    destroy: function() {
      this.element.off('init.' + pluginName);
      win.off('resize.' + pluginName);
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {

  };


  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
