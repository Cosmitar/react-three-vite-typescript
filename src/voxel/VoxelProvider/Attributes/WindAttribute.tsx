
export const vertexShaderDef = `
`

export const vertexShaderMain = `

  // see https://jsfiddle.net/felixmariotto/hvrg721n/
  if(isWindSensitive) {
    // VERTEX POSITION
    vec4 mvPosition = instanceMatrix * vec4( pos, 1.0 );
    
    // DISPLACEMENT
    // here the displacement is made stronger on the blades tips.
    
    // fixed world level and you can stack elements that follows the wave.
    // float dispPower = 1.0 - cos( mvPosition.y + 0.1 * 3.1416 / 2.0 );
    
    // fixed (instance) base and move upwards
    float dispPower = 1.0 - cos( pos.y + 0.1 * 3.1416 * 2.0 );

    float displacement = sin( mvPosition.z + uTime * 5.0 ) * ( 0.1 * dispPower );
    mvPosition.z += displacement;

    // csm_PositionRaw = mvPosition;
    vec4 modelViewPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * modelViewPosition;
    csm_PositionRaw = gl_Position;
  }
`
export const fragmentShaderDef = `
  
`
export const fragmentShaderMain = `
  
`
