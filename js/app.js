/******************************************************/
/*				INITS					  */
/******************************************************/
var HaBlog = Em.Application.create({

});

/******************************************************/
/*				MODEL								  */
/******************************************************/

// POST ITEM
HaBlog.Post = Em.Object.extend({
	uid : null,
	title : null,
	state : null,
	created : null,
	title : null,
	headline : null,
	content : null,
	tags : null
});

/******************************************************/
/*				CONTROLLERS							  */
/******************************************************/

// DATA CONTROLLER
HaBlog.dataController = Em.ArrayController.create({
	//container with the list of posts
	posts : [],

	//add a new post to the list checking that it was not previously there and ordered by creationg date
	addPost : function(post) {
		// Check to see if there are any post in the controller with the same uid already
		var exists = this.filterProperty('uid', post.uid).length;
		if (exists === 0) {
			// If no results are returned, we insert the new item into the data controller in order of publication date
			var length = this.get('length'), idx;
			idx = this.binarySearch(Date.parse(post.get('created').get('time')), 0, length);
			this.insertAt(idx, post);
			return true;
		}
	},
	// Binary search implementation that finds the index where a entry
	// should be inserted when sorting by date.
	binarySearch : function(value, low, high) {
		var mid, midValue;
		if (low === high) {
			return low;
		}
		mid = low + Math.floor((high - low) / 2);
		midValue = Date.parse(this.objectAt(mid).get('created').get('time'));

		if (value < midValue) {
			return this.binarySearch(value, mid + 1, high);
		} else if (value > midValue) {
			return this.binarySearch(value, low, mid);
		}
		return mid;
	},
});

/******************************************************/
/*				VIEWS								  */
/******************************************************/
// View for the Post list
HaBlog.PostSummaryListView = Em.View.extend({
	tagName: 'article',
	classNames: ['well', 'summary']
});

