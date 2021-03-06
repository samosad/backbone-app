(function(_, Backbone, $) {

	APP.Template = Backbone.Model.extend({
		initialize: function(html, options){
			_.bindAll(this, 'fetch', 'parse');
			// fallback for options
			var opt = options || (options={});

			if( !_.isEmpty(html) ){
				this.set( "default", this.compile( html ) );
				this.trigger("loaded");
			}
			//if( !_.isUndefined( options.url ) && !_.isEmpty( options.url ) ){
			if( options.url ){
				this.url = options.url;
				this.fetch();
			}
		},
		compile: function( markup ){
			return _.template( markup );
		},
		fetch: function(){
			// this can be replaced with a backbone method...
			$.get(this.url, this.parse);
		},
		parse: function(data){
			var self = this;
			var scripts;
			try{
				scripts = $(data).filter("script");
			} catch( e){
				// can't parse this - probly not html...
				scripts = [];
			}
			// check if there are script tags
			if( !scripts.length ){
				// save everything in the default attr
				this.set( "default", self.compile( data ) );
			} else {
				// loop through the scripts
				scripts.each(function(){
					// filter only scripts defined as template
					var el = $(this);
					if(el.attr("type").indexOf("template") >= 0){
						// convention: the id sets the key for the tmeplate
						self.set( el.attr("id"), self.compile( el.html() ) );
					}
				});
			}
			this.trigger("loaded");
			//return data;
		}
	});


})(this._, this.Backbone, this.jQuery);
