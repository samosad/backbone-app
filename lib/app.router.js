(function(_, Backbone) {
	
	Router = Backbone.Router.extend({
		initialize: function(){
			// include this in your router if using Google Analytics
			// this.bind('all', this._trackPageview);
		}, 
		// Save app state in a seperate object
		state: {
			fullscreen: false, 
			online: navigator.onLine,
			browser: function(){ 
							if( $.browser.safari && /chrome/.test(navigator.userAgent.toLowerCase()) ) return 'chrome';
							if(/(iPhone|iPod).*OS 5.*AppleWebKit.*Mobile.*Safari/.test(navigator.userAgent) ) return 'ios';
							return 'other';
						}
		}, 
		_trackPageview: function(){ 
			var url = Backbone.history.getFragment();
			if( !_.isUndefined( _gaq ) ) _gaq.push(['_trackPageview', "/#"+url]);
		}
		
	});
	
})(this._, this.Backbone);