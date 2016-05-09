//file requirements
var React = require('react');
var ReactDOM = require('react-dom');

//react-router requirements
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route

//mixins
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;

var createBrowserHistory = require('history/lib/createBrowserHistory');

//file import
var helpers = require('./helpers');
//=========================================================

/*
App
*/
var App = React.createClass({

//creates initial state
  getInitialState: function() {
    return{
      fishes: {},
      order: {}
    }
  },

  //saves each fish to the state
  addFish: function(fish) {
    //gets unique time stamp for each fish, so they can be ordered
    var timestamp = (new Date()).getTime();

    //update state object
    this.state.fishes['fish-' + timestamp] = fish;

    //set the state
    this.setState({fishes: this.state.fishes});
  },

  render : function() {
    return (
      <div className = "catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish}/>
      </div>
    )
  }
});

/*
  Add Fish form
  <AddFishForm />
*/

var AddFishForm = React.createClass({

  createFish : function(event) {
    // 1. Stop form from submitting
    event.preventDefault();

    // 2. Take the data from the form and create object
    var fish = {
      name : this.refs.name.value,
      price : this.refs.price.value,
      status : this.refs.status.value,
      desc : this.refs.desc.value,
      image : this.refs.image.value
    }
    console.log(fish);

    // 3. Add fish to App State
    this.props.addFish(fish);
  },

  render : function() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name" />
        <input type="text" ref="price" placeholder="Fish Price" />
          <select ref="status">
            <option value="available">Fresh!</option>
            <option value="unavailable">Sold Out!</option>
          </select>
          <textarea type="text" ref="desc" placeholder="Desc"></textarea>
            <input type="text" ref="image" placeholder="URL to Image" />
            <button type="submit">+ Add Item </button>
      </form>
    )
  }
});



/*
  Header
  <Header />
*/
var Header = React.createClass({
  render : function() {
    return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
        <span className="of">of</span>
        <span className="the">the</span>
        </span>
        Day
      </h1>
      <h3 className="tagline"><span>{this.props.tagline}</span></h3>
    </header>
    )
  }
})


/*
  Inventory
  <Inventory />
*/
var Inventory = React.createClass({
  render : function() {
    return (
      <div>
        <h2>Inventory</h2>

        <AddFishForm {...this.props}/>
      </div>
    )
  }
})


/*
  Order
  <Order />
*/
var Order = React.createClass({
  render : function() {
    return (
      <p>Order</p>
    )
  }
})


/*
  Not found
*/
var NotFound = React.createClass({
  render : function() {
    return <h1>Not Found!</h1>
  }
});


/*
  StorePicker
  This will let us make <StorePicker/>
*/
var StorePicker = React.createClass({

mixins : [History],
goToStore : function(event) {
  event.preventDefault();
  //get the data from the input
  var storeId = this.refs.storeId.value;
  this.history.pushState(null, '/store/' + storeId);

  //transition from <StorePicker/> to <App/>
},

/*
render method displays HTML. Putting in on its own line between parenthesis allows
mutilple lines of HTML to be displayed
*/
  render : function() {

    /*HTML below works because JSX is transpiled by gulpBuild into traditional HTML
      You could ALSO use

      return React.createElement('p', {className: 'testing'}, 'content');

      1st, pass what element you want. 2nd, pass what attributes you want. 3rd, pass content.
      But that's more work. Hence JSX syntax below
    */
    return (
      //"class" is a taken name in React.
      //you must instead use "className"
    <form className="store-selector" onSubmit={this.goToStore}>
      <h2>Please Enter a Store</h2>

      {/* comments in JSX must be written like this*/}

      <input type="text" ref="storeId" defaultValue={helpers.getFunName()} required/>
      <input type="Submit" />
    </form>
    //you can't return sibling elements.
    //ie: <p>Hello</p><p>World</p>
    //You must have everything wrapped in a single parent
    //ie: <div><p>Hello</p><p>World</p></div>
    )
  }
});

/*
Tells React where to render elements.
In this case: under the MAIN id on the index.HTML
*/

//routes
var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />

    {/*mock 404 file path*/}
    <Route path="*" component={NotFound} />
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
