;(function($,window, undefined){

  // 'use strict';

  var pluginName = 'html5-video',
      win = $(window);

  PluginHtml5.prototype = {
    init: function() {
      var that = this,
          el= this.element;


        console.log('el:', el);
    // $('[data-video-html5-control]').on('click', function() {
    //   $(this).closest('[data-plugin-video]').find('[data-video-background]').fadeOut(300);
    //   $(this).fadeOut(300);
    //   // playPause(this, vidId);
    // });




    // function playPause(btn,vidId) {
    //   var vid = document.getElementById(vId);
    //   if(vid.paused){
    //     vid.play();
    //     // btn.innerHTML = "Pause";
    //   } else {
    //     vid.pause();
    //     // btn.innerHTML = "Play";
    //   }
    // }

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
        $.data(this, pluginName, new PluginHtml5(this, options));
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
