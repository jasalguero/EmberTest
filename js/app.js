/******************************************************/
/*				INITS					  */
/******************************************************/
var HaBlog = Em.Application.create({
	ready : function() {
		testPost = HaBlog.Post.create({
			uid : "1",
			title : "Test Title",
			headline : "headline",
			tags : [{
				tag : 'blog'
			}, {
				tag : 'write'
			}],
			author : 'pprang',
			sections : [{
				text : 'It would have been so easy -- just pick a blogging platform and\n voila one has a blog with a lot of functionality. In case you really want to own it just roll out one of the many blogging suites on your server. But **none** can boast of the pain and joy creating your own software\n        brings with it. The creativity, the decision making, the struggles to implement the vision at the micro and macro level,\n        and other nitty gritties spice up the adventure.'
			}, {
				headline : 'The need',
				text : "<p class =\"bla\">[Twitter](http://twitter.com) is too terse;\n most journals have more ads then real content;\n a private diary isn't social enough.</p><p>A good blog is about content, content and content.\n A great or unique writing style makes the difference when content is not a problem.\n        All other things equal a great design and technological schnickschnack give the blog that aura of invincibility.</p>"
			}],
			//created : moment.unix(1318781876)
			created : moment()
		});

		HaBlog.postsController.addPost(testPost);

	}
});

/******************************************************/
/*				MODEL								  */
/******************************************************/

// POST ITEM
HaBlog.Post = Em.Object.extend({
	uid : null,
	title : null,
	state : null,
	author : null,
	created : new Date(0),
	title : null,
	headline : null,
	sections : null,
	tags : null,
});

/******************************************************/
/*				CONTROLLERS							  */
/******************************************************/

// DATA CONTROLLER
HaBlog.postsController = Em.ArrayController.create({
	//container with the list of posts
	content : [],

	//add a new post to the list checking that it was not previously there and ordered by creationg date
	addPost : function(post) {
		// Check to see if there are any post in the controller with the same uid already
		var exists = this.filterProperty('uid', post.uid).length;
		if (exists === 0) {
			// If no results are returned, we insert the new item into the data controller in order of publication date
			var length = this.get('length'), idx;
			idx = this.binarySearch(Date.parse(post.get('created')), 0, length);
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
	tagName : 'article',
	template : 'post-list-view',
	// Returns the creation date
	creationDay : function() {
		var d = this.get('content').get('created');
		return moment(d).format('DD');
	}.property('HaBlog.postsController.@each.created'),
	creationMonth : function() {
		var d = this.get('content').get('created');
		return moment(d).format('MMM');
	}.property('HaBlog.postsController.@each.created'),
	creationYear : function() {
		var d = this.get('content').get('created');
		return moment(d).format('YYYY');
	}.property('HaBlog.postsController.@each.created'),
	toggleButtons : function() {
		console.log($(this))
		$(this).closest(".post").find(".fullText").fadeToggle("400", "linear", function() {
			$(this).closest(".post").find(".toggleButton").toggle();
		});
	}
});

