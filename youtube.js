
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


  // set arrows center on image

  // Private function
  // function initYoutube () {
  //   var tag = document.createElement('script');
  //   tag.src = 'https://www.youtube.com/iframe_api';
  //   var firstScriptTag = document.getElementsByTagName('script')[0];
  //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  //   console.log('INIT YOUTUBE');
  // }

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;

      // initYoutube.call(that);

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var YT = new YT();
      var player;
      function onYouTubeIframeAPIReady() {
        console.log('API READY');
        //...
      }

      function onPlayerReady(event) {
        console.log(event);
        player.playVideo();
      }

      onYouTubeIframeAPIReady();
      var done = false;
      function onPlayerStateChange(event) {

        if (event.data === YT.PlayerState.PLAYING && !done) {
          done = true;
        }
      }


        // function stopVideo() {
        //   player.stopVideo();
        // }

        $('[data-video-id]').on('click', function() {

            $('#player').remove();

            $(this).closest('[data-plugin-youtube]').append('<div id="player" class="video-detail"></div>');

            player = YT.Player('player', {
            videoId: $(this).attr('data-video-id'),
            height: '100%',
            width: '100%',
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });
        });



      /*======================================*/

      win.on('resize.' + pluginName, function() {
          // code here
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
    videoId: '[data-video-id]',
    height: '100%',
    width: '100%',

  };

  $(function() {
    // $('[data-' + pluginName + ']')[pluginName]();


    $.getScript( 'https://www.youtube.com/iframe_api' )
      .done(function() {
        console.log('ok');
         $('[data-' + pluginName + ']')[pluginName]();
      });
  });

}(jQuery, window));
