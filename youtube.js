
/**
 *  @name Plugin VIDEO YOUTUBE
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
      var player,
          el = that.element,
          options = that.options;

      // function onYouTubeIframeAPIReady() {
       //  console.log('READY');
      // }

      function onPlayerReady(event) {
        player.playVideo();
      }

      var done = false;
      function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING && !done) {
          done = true;
        }
      }

      function stopVideo() {
        player.stopVideo();
      }

      el.find(options.buttonPlay).on('click.' + pluginName, function() {
        var self = $(this);

          that.whenShowVideo.call(that);

          var elPluginName = self.closest('[data-' + pluginName + ']');
          elPluginName.append('<div id="player" class="video-detail"></div>');

          player = new YT.Player('player', {
          videoId: self.attr('data-video-id'),
          height: '100%',
          width: '100%',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      });

      win.on('resize.' + pluginName, function() {
          // code here
          console.log('resize');
      });
    },

    whenShowVideo: function() {
      var that = this;
      var el = that.element,
          options = that.options;

      // Remove other Video Player and Show thumbnail
      $('#player').remove();
      el.find(options.videoBackground).fadeIn(300).end().find(options.buttonPlay).fadeIn(300);
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
      buttonPlay: '[data-video-youtube-control]',
      videoBackground: '[data-video-youtube-background]'
  };

  $(function() {

    $.getScript( 'https://www.youtube.com/iframe_api' )
      .done(function() {
         $('[data-' + pluginName + ']')[pluginName]();
      });
  });

}(jQuery, window));
