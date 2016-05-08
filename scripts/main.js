//file requirements
var React = require('react');
var ReactDOM = require('react-dom');

//react-router requirements
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory');

/*
App
*/

var App = React.createClass({

  render : function() {
    return (
      <div className = "catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory />
      </div>
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
      <p>Inventory</p>
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
  StorePicker
  This will let us make <StorePicker/>
*/

var StorePicker = React.createClass({

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
    <form className="store-selector">
      <h2>Please Enter a Store</h2>

      {/* comments in JSX must be written like this*/}

      <input type="text" ref="storeId" />
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
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
