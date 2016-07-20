import React from 'react';
import keys from '../constants/keys';
import {gameTickSize} from '../constants/game'
import _ from 'lodash';
import {Layer, Rect, Stage, Group} from 'react-konva';
import MyRect from './MyRect';
import Player from './Player';
import update from 'react-addons-update';

import Grid from './Grid.jsx';

export default class Game extends React.Component {
    constructor(props){
        super(props);
        var keyMap = {}
        this.state = {
            gameTime: 0,
            position: [0, 0],
            color: 'red',
            players: { player1: {x: 150, y:200, color: 'purple', direction: 'RIGHT'}, 
                      player2: { x: 300, y:200, color: 'yellow', direction: 'LEFT'}},
            p1LastKey: keys.RIGHT
        }
    }

    componentDidMount(){
        this.handleKeyDown();

        // setInterval(()=>{
        //     this.setState({gameTime: this.state.gameTime + gameTickSize })
        // }, gameTickSize)

        setInterval(()=>{
            var position = this.state.position;
            var distance = 5;
            let tmp = this.state.player1;
            Object.keys(this.state.players).map((player) => {
                var { direction } = this.state.players[player]; 
                console.log('direction', player);
                switch (direction) {
                    case 'LEFT':
                        var updatedPlayers = update(this.state.players, {
                            player1: { x: {$apply: (xpos) => xpos - distance } }
                        });
                        this.setState({
                            players: updatedPlayers
                        })
                        break;
                    case 'RIGHT':
                    console.log('moving right');
                        var updatedPlayers1 = update(this.state.players, {
                            player1: { x: {$apply: (xpos) => xpos - distance } }
                        });
                        this.setState({
                            players: updatedPlayers1
                        })
                        break;
                    case 'DOWN':
                        var updatedPlayers2 = update(this.state.players, {
                            player1: { y: {$apply: (ypos) => ypos + distance } }
                        });
                        this.setState({
                            players: updatedPlayers2
                        })
                        break;
                    case 'UP':
                        var updatedPlayers3 = update(this.state.players, {
                            player1: { y: {$apply: (ypos) => ypos - distance } }
                        });
                        this.setState({
                            players: updatedPlayers3
                        })
                        break;
                }
                this.setState({position})
            })
        }, gameTickSize / 2)

        // setInterval(()=>{
        //     var position = this.state.position;
        //     var xMax = 500;
        //     var yMax = 500;
        //     var playerSize = 10;
        //     var distanceToWall = playerSize / 2;

        //     if (position[0] < distanceToWall || position[1] < distanceToWall 
        //         || position[0] > xMax - distanceToWall || position[1] > yMax - distanceToWall) {
        //         console.log('EDGE HIT');
        //     }
        // }, gameTickSize)



    }
    handleKeyDown(e){
        window.addEventListener('keydown', (e)=>{
            // var position = _.clone(this.state.position);
            // var p1LastKey = _.clone(this.state.p1LastKey);
            // var color = this.state.color;
            // let tmp = this.state.player1;
            switch (e.keyCode){
                case keys.LEFT:
                    var updatedPlayers = update(this.state.players, {
                        player1: { direction: {$set :'LEFT'} }
                    });
                    this.setState({
                        players: updatedPlayers
                    })
                    break;
                case keys.RIGHT:
                    var updatedPlayers1 = update(this.state.players, {
                        player1: { direction: {$set :'RIGHT'} }
                    });
                    this.setState({
                        players: updatedPlayers1
                    })
                    break;
                case keys.DOWN:
                    var updatedPlayers2 = update(this.state.players, {
                        player1: { direction: {$set :'DOWN'} }
                    });
                    this.setState({
                        players: updatedPlayers2
                    })
                    break;
                case keys.UP:
                    var updatedPlayers3 = update(this.state.players, {
                        player1: { direction: {$set :'UP'} }
                    });
                    this.setState({
                        players: updatedPlayers3
                    })
                    break;
                case keys.SPACEBAR:
                    // color = _.sample(['red', 'green', 'blue', 'yellow']);
                    break;
                case keys.ENTER:
                    break;
            }

            // if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT || e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
            //     p1LastKey = e.keyCode;
            // }
            // this.setState({position, color, p1LastKey});
        });
    }

    //  Game Over with winner.
    //  Edge Detection
    //  Path Run into detection.
    //  Second player
    
    render(){
        //console.log(this.state)
        return (
            <div>
                { this.state.gameTime }
                <Stage width={500} height={500}>
                    <MyRect position={this.state.position} />
                    <Layer>
                        {Object.keys(this.state.players).map((player) => {
                            var {x, y, color, direction} = this.state.players[player];
                            return (<Rect x={x} y={y} width={10} height={10} fill={color} />);
                        })}
                    </Layer>
                </Stage>
            </div>
        )
    }

}
/*                <Grid 
                      <Player position={this.state.position}  />
                    position={this.state.position} 
                    color={this.state.color}
                /> */
