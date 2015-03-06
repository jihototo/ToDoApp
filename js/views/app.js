// js/views/app.js

var todoApp = todoApp || {};

// The Application
// Overall Appview

todoApp.Appview = Backbone.View.extend({

	// Bing to the existing skeleton of the html
	el: '#todoapp',

	// Template for the footer
	statsTemplate: _.template( $('#stats-template').html() ),

	// Events for creating new items, clearing completed ones.
	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete'
	},

	// Bind the events on the 'Todos' collection when items are added or changed
	// Start loading any preexisitng todos that might be saved in local storage. 
	initialize: function() {
		this.allCheckbox = this.$('#toggle-all')[0];
		this.$input = this.$('#new-todo');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');
		this.$list = this.$('ul#todo-list');

		// When add event is fired, addOne() is called.
		this.listenTo(todoApp.Todos, 'add', this.addOne);
		// When a reset even is fired (update the collection in bulk), addAll() is called. 
		this.listenTo(todoApp.Todos, 'reset', this.addAll);
		//
		this.listenTo(todoApp.Todos, 'change:completed', this.filterOne);
		//
		this.listenTo(todoApp.Todos, 'filter', this.filterAll);
		//
		this.listenTo(todoApp.Todos, 'all', this.render);

		todoApp.Todos.fetch();
	},

	render: function() {
		var completed = todoApp.Todos.completed().length;
		var remaining = todoApp.Todos.remaining().length;

		// if we have a list of todos, then show the main and the footer
		// if not, hide the main and the footer.
		if (todoApp.Todos.length) {
			this.$main.show();
			this.$footer.show();

			this.$footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}));

			this.$('#filters li a').removeClass('selected').filter('href="#/' + (todoApp.TodoFilter || '' ) + '"]').addClass('selected');
		} else {
			this.$main.hide();
			this.$footer.hide();
		}

		this.allCheckbox.checked = !remaining;
	},

	// Add 1 item to the list by creating a view for it, then appending its element to the <ul>.
	// Creates an instance of a view, renders it, and appends the resulting element to the Todo list. 
	addOne: function(todomodel) {
		var view = new todoApp.TodoView({ model: todomodel});
		$('#todo-list').append( view.render().el );
	},

	// Add all items in the **Todos** collection at once
	// each iterates over all of the Todos currently in the collection and fires addOne() for each item. 
	addAll: function() {
		this.$list.html('');
		todoApp.Todos.each(this.addOne, this);
	},

	filterOne: function() {
		todo.trigger('visible');
	},

	filterAll: function() {
		todoApp.Todos.each(this.filterOne, this);
	},

	// Generate attributes for a new Todo item by getting info from the input, get the next order
	newAttributes: function() {
		return {
			title: this.$input.val().trim(),
			order: app.Todos.nextOrder(),
			completed: false
		};
	},

	// Create a new model if the a user hits the return in the main input field, persist it to local Storage. 
	createOnEnter: function(event) {
		if (event.which !== ENTER_KEY || !this.$input.val().trim() ) {
			return;
		}
		todoApp.Todos.create( this.newAttributes() );
		this.$input.val('');
	},

	// Removes the items in the todo list that have been marked as completed when the user clicks the clear-completed checkbox. 
	clearCompleted: function() {
		_.invoke(todoApp.Todos.completed(), 'destroy');
		return false;
	},

	// Allows a user to mark all of the items in the todo list as completed by clicking the toggle-all checkbox. 
	toggleAllComplete: function() {
		var completed = this.allCheckbox.checked;

		todoApp.Todos.each(function(todo) {
			todo.save({
				'completed':completed
			});
		});
	}
});