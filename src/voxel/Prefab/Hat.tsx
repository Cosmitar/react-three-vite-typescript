import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import Color from '../Materials/Color'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <group name='key_model' {...props} ref={ref}>
      <Color name='crown' color={'#E5E5E5'} scale={[1 + 0.01, 0.25, 1 + 0.01]} />
      <Color name='sb_left' color={'#E5E5E5'} position={[-0.325, -0.225, 0]} scale={[0.35 + 0.01, 0.2, 1 + 0.01]} />
      <Color name='sb_right' color={'#E5E5E5'} position={[0.325, -0.225, 0]} scale={[0.35 + 0.01, 0.2, 1 + 0.01]} />
      <Color name='closure' color={'#404040'} position={[0, -0.275, 0.35]} scale={[0.35, 0.1, 0.35]} />
      <Color name='front_cover' color={'#E5E5E5'} position={[0, -0.225, -0.33]} scale={[0.3, 0.2, 0.35]} />
      <Color name='visor' color={'#1565C0'} position={[0, -0.275, -0.6]} scale={[1, 0.1, 0.25]} />
      <Color name='visor_tip' color={'#1565C0'} position={[0, -0.275, -0.775]} scale={[0.75, 0.1, 0.15]} />
      <Color name='button' color={'#1565C0'} position={[0, 0.125, 0]} scale={[0.25, 0.1, 0.25]} />
    </group>
  )
})
