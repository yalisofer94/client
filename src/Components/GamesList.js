import React ,{componentDidMount}from 'react';
import GamesCard from './GameCard';
import PersistentDrawerLeft from './Navbar';
import Axios from "axios";

const cardStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    maxWidth: "900px",
    margin: 'auto'
  }

class GamesListing extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
           games: []
        }

        this.onDelete = this.onDelete.bind(this);
        
    }

    componentDidMount(){
            Axios({
                method: "GET",
                withCredentials: true,
                url: "https://bite-me-app1.herokuapp.com/api/game/all",
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data[0].game)
                    let theArr = [...res.data]
                    this.setState(prevState => ({
                      games: theArr
                    }))
                }
            }).catch(err => console.log(err)); 
      }

      onDelete = (id) => {
        const { history } = this.props;
        Axios({
            method: "DELETE",
            withCredentials: true,
            url: `https://bite-me-app1.herokuapp.com/api/game/${id}`,
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data)
                const newGames = this.state.games.filter(
                    (game) => game.id !== id
                  );
                  this.setState({
                    games: newGames
                })
                history.push('/DeleteSuccess');
            }
        }).catch(err => console.log(err));
      }
    render(){
    return (
      <>
    <PersistentDrawerLeft admin={localStorage.isAdmin} username={localStorage.userName}/>
    <div className="home-content">
      {this.state.games.map((game) => (
        <GamesCard
          key={game}
          data={game}
          // onSelect={onSelect}
          onDelete={this.onDelete}
        />
      ))
      }
    </div>
    </>
  )}
};

export default GamesListing;