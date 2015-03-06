
  // js/views/todos.js

  var todoApp = todoApp || {};

  // Todo Item View
  // In charge of individual Todo items, making sure the view updates when the todo does. 


  todoApp.TodoView = Backbone.View.extend({

    tagName: 'li',

    template: _.template( $('#item-template').html() ),

    // Event listeners.
    events: {
      'dblclick label': 'edit',
      'keypress .edit': 'updateOnEnter',
      'blur .edit': 'close'
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    // Re-renders the titles of the todo item.
    render: function() {
      this.$el.html( this.template( this.model.attributes ) );
      this.$input = this.$('.edit');
      return this;
    },

    // Switch this view into `"editing"` mode, when a user double-clicks on an existing item in the todo list.
    // Allow users to change the existing value of the item's title attribute.
    edit: function() {
      this.$el.addClass('editing');
      this.$input.focus();
    },

    // Trims the value of the current text in our input.
    // If a valid value has been provided, we save the changes to the current todo model. The disable editing mode. 
    close: function() {
      var value = this.$input.val().trim();

      if ( value ) {
        this.model.save({ title: value });
      }

      this.$el.removeClass('editing');
    },

    // If the user presses Enter Key, then update on enter and close. 
    updateOnEnter: function( e ) {
      if ( e.which === ENTER_KEY ) {
        this.close();
      }
    }
  });