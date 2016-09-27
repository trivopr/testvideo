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



      el.find('[data-video-html5-control]').on('click', function() {

        var elDataPluginVideo = $(this).closest('[data-plugin-video]');
        var vidId = elDataPluginVideo.find('video').attr('id');

        elDataPluginVideo.find('[data-video-background]').fadeOut(300);
        $(this).fadeOut(300);

        playPause.call(this, vidId);
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
