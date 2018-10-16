import React, {Component} from 'react';
import './Main.css';
import * as PIXI from 'pixi.js'
import * as Matter from 'matter-js';


class Main extends Component {
    constructor(props) {
        super(props);
        let app = new PIXI.Application({
                antialias: true,    // default: false
                transparent: false, // default: false
                resolution: 1       // default: 1
            }
        );
        this.state = {
            app
        };
    }

    initPixi(){
        let app = this.state.app;
        var graphics = new PIXI.Graphics();

        // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
        graphics.lineStyle(0);
        graphics.beginFill(0xFFFF0B, 0.5);
        graphics.drawCircle(470, 90,60);
        graphics.endFill();

        app.stage.addChild(graphics);
    }

    addCircle(y){
        let app = this.state.app;
        var graphics = new PIXI.Graphics();

        // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
        graphics.lineStyle(0);
        graphics.beginFill(0xFFFF0B, 0.5);
        graphics.drawCircle(470, y, 60);
        graphics.endFill();

        app.stage.addChild(graphics);
    }

    componentDidMount() {
        let thisRef = this;
        let container = document.querySelectorAll(".Main")[0];
        container.appendChild(this.state.app.view);
        this.initPixi();

        // module aliases
        var Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies;

// create an engine
        var engine = Engine.create();

        // create a renderer
        var render = Render.create({
            element: container,
            engine: engine
        });

        // create two boxes and a ground
        var boxA = Bodies.rectangle(400, 200, 80, 80);
        var boxB = Bodies.rectangle(450, 50, 80, 80);
        var ground = Bodies.rectangle(400, 610, 810, 60, {isStatic: true});

        // add all of the bodies to the world
        World.add(engine.world, [boxA, boxB, ground]);

        // run the engine
        Engine.run(engine);

        // run the renderer
        // Render.run(render);

        console.info('running engine', {Engine, engine, World, Render, boxA, boxB, ground});

        let update = Engine.update;
        Engine.update = (engine, delta, correction) => {
            let yA = boxA.position.y;
            let yB = boxB.position.y;

            console.info('engine update', {yA, yB, engine, delta, correction});

            thisRef.addCircle(yA);

            update(engine, delta, correction);
        }
    }

    render() {
        return (
            <div className="Main">
            </div>
        );
    }
}

export default Main;
