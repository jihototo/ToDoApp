// js/collections/todos.js

var todoApp = todoApp || {};

// Todo collections

var TodoList = Backbone.Collection.extend({

	// Referencing the model of this collection
	model: todoApp.Todo,

	// Collection of todos is backed by "local Storage" instead of a remote server for now. 
	localStorage: new Backbone.LocalStorage('todos-backbone'),

	// Function that is used to get the list of completed todos.
	// Filter method looks through each value in the list, returning an array of all the values that pass a truth test (predicate).
	completed: function() {
		return this.filter(function(each_todo) {
			return each_todo.get('completed');
		});
	},

	// Function that is used to get the list of uncompleted todos.
	// this is referring to the collection.
	// apply is a method of javascript functions that allows you to set context of a method.
	// context as first parameter, then an array. 
	remaining: function() {
		return this.filter(function(each_todo) {
			return this.without.apply( this, this.completed() );
		});
	},

	// Keeping the todo items in sequential order, despite the fact that its being saved unorderly manner in the Local Storage. 
	// Generates the next order number for the new items. 
	nextOrder: function() {
		if (!this.length) {
			return 1;
		}
		return this.last().get('order') + 1;
	},
	
	comparator: function(todo) {
		return todo.get('order');
	}
});	


todoApp.Todos = new TodoList();	