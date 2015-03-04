// js/models/todo.js

var todoApp = todoApp || {};

// Basic Todo model

todoApp.Todo = Backbone.Model.extend({

	// Our default todo model should have no title, and shouldnt have been completed.
	defaults: {
		title: '',
		completed: false
	},

	// Toggling the 'completed' attribute of the model
	toggle: function() {
		this.save({
			completed: !this.get('completed')
		});
	}

});