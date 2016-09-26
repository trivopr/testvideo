
/**
 *  @name Plugin Format
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';


  var pluginName = 'plugin-youtube',
      win = $(window);



  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;

      // console.log('options:', this.options.height);
      // initYoutube.call(that);

        var player;
        function onYouTubeIframeAPIReady() {
          //...
		  console.log('READY');
        }

        function onPlayerReady(event) {
          player.playVideo();
        }

        var done = false;
        function onPlayerStateChange(event) {
          if (event.data == YT.PlayerState.PLAYING && !done) {
            done = true;
          }
        }

        function stopVideo() {
          player.stopVideo();
        }


        $('[data-youtube-control]').on('click', function() {

          // console.log('options:', this.options);
            $('#player').remove();

            $(this).closest('[data-plugin-youtube]').append('<div id="player" class="video-detail"></div>');

            player = new YT.Player('player', {
            videoId: $(this).attr('data-video-id'),
            height: that.options.height + '%',
            width: that.options.width + '%',
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });
        });



      /*======================================*/

      win.on('resize.' + pluginName, function() {
          // code here
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
    height: '100',
    width: '100',
  };

  $(function() {

    $.getScript( 'https://www.youtube.com/iframe_api' )
      .done(function() {
         $('[data-' + pluginName + ']')[pluginName]();
      });
  });

}(jQuery, window));
