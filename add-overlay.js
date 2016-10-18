
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

  var pluginName = 'nav-toggle',
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

      that.isClosed = true;
      this.idNav = el.find('[data-target]').data('target');
      /*-----------BACKGROUND OVERLAY -----------*/
      var oringinWidth = win.width(),
          detectScreen = oringinWidth < 768 ? 'isMB' : oringinWidth < 1200 ? 'isTB' : 'isDK',
          detectScreenResize;

      var btnOverlay = el.find('[data-button-toggle]');

      btnOverlay.on('click', function() {
        if (that.isClosed) {
          that.showNavMenu.call(that);
        } else {
          that.hideNavMenu.call(that);
        }
      });



      var resizeTimer;
      win.on('resize.' + pluginName, function() {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function() {
            oringinWidth = win.width();
            detectScreenResize = oringinWidth < 768 ? 'isMB' : oringinWidth < 1200 ? 'isTB' : 'isDK';

            if (detectScreen !== detectScreenResize) {
                detectScreen = detectScreenResize;
                $('.bg-overlay').remove();
            }
        }, 100);
      });
    },

    showNavMenu: function() {
      var that = this;
      var el = that.element;
      var bgOverlay = '<div class="bg-overlay"></div>';
      var idNav = this.idNav;

      that.isClosed = false;

      $(bgOverlay).appendTo('body');
      el.find(idNav).css('height', 'auto');
      el.find(idNav).addClass('in');
      $('body').css('overflowY', 'hidden');
      return false;
    },

    hideNavMenu: function() {
      var that = this;
      var idNav = that.idNav;
      var el = that.element;

      that.isClosed = true;
      el.find(idNav).removeClass('in');
      el.find(idNav).addClass('collapsing');
      $('.bg-overlay').remove();
      $('body').css('overflowY', '');
      return false;
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






