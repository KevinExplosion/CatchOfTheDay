var React = require('react');
var ReactDOM = require('react-dom');

/*
  StorePicker
  Tihs will let us make <StorePicker/>
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
    <form>
      <h2>Please Enter a Store</h2>
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
ReactDOM.render(<StorePicker/>, document.querySelector('#main'));
