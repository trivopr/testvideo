;(function($,window, undefined){

  // 'use strict';

  var pluginName = 'html5-video',
      win = $(window);

  function playPause(videoID) {
    var vid = document.getElementById(videoID);

    if(vid.paused){
      vid.play();
    } else {
      vid.pause();
    }
  }

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          el= this.element;
      var options = that.options;

      el.find(options.buttonPlayHtml5).on('click', function() {

        var elDataPluginVideo = $(this).closest(options.pluginContainer);
        var videoId = elDataPluginVideo.find('video').attr('id');

        elDataPluginVideo.find(options.thumbImageHtml5).fadeOut(300);
        $(this).fadeOut(300);

        playPause.call(this, videoId);
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
      buttonPlayHtml5: '[data-video-control]',
      thumbImageHtml5: '[data-video-background]',
      pluginContainer: '[data-plugin-video]'
  };


  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));
