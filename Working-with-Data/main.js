const Card = (props) => {
	return (
  	<div style={{margin: '1em'}}>
    	<img src={props.avatar_url}
      style={{ width: '75px'}}/>
      <div style={{display: 'inline-block', marginLeft: 10}}>
      	<div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
        <div>{props.company}</div>
      </div>
    </div>
  );
}

const CardList = (props) => {
	return(
  	<div>
    	{props.cards.map(card => <Card key={card.id} {...card} />)}
      
    </div>
  );
}

class Form extends React.Component {
		state = {
    	username: ''
    }
		handleSubmit = (event) => {
    	event.preventDefault();
    	//we can use Axios library for ajax request
      axios.get('https://api.github.com/users/' + this.state.username)
      .then(resp => {
          this.props.onSubmit(resp.data);
          this.setState({
          	username: ''
          })
      });
    }
    render() {
      return(
        <form onSubmit={this.handleSubmit}>
          <input type="text"
          value={this.state.username}
          onChange={(event) => this.setState({ username: event.target.value})}
          placeholder="Github username" required />
          <button type="submit">Add Card</button>
        </form>
      );
    }
}

class App extends React.Component {
		state = {
    	cards: []
    }
    addNewCard = (cardInfo) => {
    	this.setState(prevState  => ({
      	cards: prevState.cards.concat(cardInfo)
      }));
    }
		render() {
    	return(
      	<div>
        	<Form onSubmit={this.addNewCard}/>
          <CardList cards={this.state.cards} />
        </div>
      );
    }
}

ReactDOM.render(<App />, mountNode);