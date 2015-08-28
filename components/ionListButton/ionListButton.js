Template.ionListButton.events({
	'click .item-delete' : function(e, template){
		e.preventDefault();
		itemContext = Template.parentData(1);
	    template.data.collection._collection.remove({
             _id: itemContext._id
        }, function(error, result) { });
	}
})

Template.ionListButton.helpers({
	classes: function(){
		
		var classes = [];

		var action = this.action || 'delete';
		var side = this.side || 'left';

		classes.push('item-' + action);
		classes.push('item-' + side + '-edit');

		classes.push('enable-pointer-events');
		
		return classes.join(' ');

	}
})