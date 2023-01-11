import { useCallback, useMemo } from "react";
import Particles from "react-particles";
//import { tsParticles } from "tsparticles-engine";
/*import particlesOptions from "./particles.json";*/
import { loadFull } from "tsparticles";
import './FunBG.css';

// tsParticles Repo:  https://github.com/matteobruni/tsparticles
// tsParticles website:  https://particles.js.org
const FunBG = (props) => {
    const options = useMemo(() => {
        // using an empty options object will load the default options (static particles, 3px size, no interaction, opactity 100%, white)
        // all options:  https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html
        return {
            fullScreen: {
                enable: true,
                zIndex: 0
            },
            interactivity: {
                events: {
                    onClick: {
                        enable: true,  // enables click event
                        mode: "push"  // adds particles on click
                    },
                    onHover:  {
                        enable: true,
                        mode: "repulse" // make particles run away from cursor
                    },
                },
                modes: {
                    push: {
                        quantity: 7,  // number of particles to add on click
                    },
                    repulse: {
                        distance: 100,  // distance from cursor
                    }
                }
            },
            particles: {
                links: {
                    enable: true, // links particles together
                    distance: 100,  // max dist for linking particles
                },
                move: {
                    enable: true, // make particles move on canvas
                    speed: { min: 1, max: 5 }, // particles move at random speeds
                },
                number: {
                    value: 112,
                    density: {
                        enable: true,
                        value_area: 900
                    }
                },
                opacity: {
                  value: {min: 0.3, max: 0.7 }, // semi-ransparent effect
                },
                size: {
                    value: { min: 1, max: 3}, //randomize particle size
                }
            }
        };
    }, []);

    const particlesInit = useCallback((engine) => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);

        loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        //<Particles id="tsparticles" options="./particles.json" init={particlesInit} loaded={particlesLoaded} />

        // setting an ID can be useful for IDing right component - esp with multiple isntances
        <Particles id={props.id} init={particlesInit} options={options} loaded={particlesLoaded} />
    );
}

export default FunBG;
