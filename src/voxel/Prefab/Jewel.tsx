import { InstanceProps } from '@react-three/drei'
import { forwardRef } from 'react'
import { Vector3, Vector4 } from 'three'
import { getEncodedSkin } from '../../materials/VoxelAtlasMaterial/VoxelAtlasMaterial'
import { SHAPES } from '../../materials/UniversalMaterial/shapes'
import Color from '../Materials/Color'

export default forwardRef<any, InstanceProps>((props, ref) => {
  return (
    <group name='key_model' {...props}>
      <group name='jewel_top_side' position={[0, 0.5, 0]}>
        {/* CENTER STRIP */}
        <Color color={COLORS.jewel_shine} userData={jewelSideAttributes} position={[0, 0, -1]} rotation={[0, -Math.PI, 0]} />
        <Color color={COLORS.jewel_light} userData={defaultInstanceAttributes} />
        <Color color={COLORS.jewel} userData={jewelSideAttributes} position={[0, 0, 1]} />
        {/* BOTTOM STRIPE */}
        <Color color={COLORS.jewel} userData={jewelCornerAttributes} position={[-1, 0, 1]} />
        <Color color={COLORS.jewel_light} userData={jewelSideAttributes} position={[-1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
        <Color
          color={COLORS.jewel_shine}
          userData={jewelCornerAttributes}
          position={[-1, 0, -1]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        {/* TOP SPRITE */}
        <Color
          color={COLORS.jewel_shadow}
          userData={jewelCornerAttributes}
          position={[1, 0, 1]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Color color={COLORS.jewel} userData={jewelSideAttributes} position={[1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        <Color color={COLORS.jewel_light} userData={jewelCornerAttributes} position={[1, 0, -1]} rotation={[0, Math.PI, 0]} />
      </group>
      <group name='jewel_bottom_side' position={[0, -0.5, 0]} rotation={[-Math.PI, 0, 0]}>
        {/* CENTER STRIP */}
        <Color color={COLORS.jewel_shadow} userData={jewelSideAttributes} position={[0, 0, -1]} rotation={[0, -Math.PI, 0]} />
        <Color color={COLORS.jewel} userData={defaultInstanceAttributes} />
        <Color color={COLORS.jewel_light} userData={jewelSideAttributes} position={[0, 0, 1]} />
        {/* BOTTOM STRIPE */}
        <Color color={COLORS.jewel_light} userData={jewelCornerAttributes} position={[-1, 0, 1]} />
        <Color
          color={COLORS.jewel_shadow}
          userData={jewelSideAttributes}
          position={[-1, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <Color color={COLORS.jewel} userData={jewelCornerAttributes} position={[-1, 0, -1]} rotation={[0, -Math.PI / 2, 0]} />
        {/* TOP SPRITE */}
        <Color color={COLORS.jewel} userData={jewelCornerAttributes} position={[1, 0, 1]} rotation={[0, Math.PI / 2, 0]} />
        <Color color={COLORS.jewel_shadow} userData={jewelSideAttributes} position={[1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        <Color color={COLORS.jewel_shadow} userData={jewelCornerAttributes} position={[1, 0, -1]} rotation={[0, Math.PI, 0]} />
      </group>
    </group>
  )
})

const defaultInstanceAttributes = {
  iUniforms: {
    iSensitivity: { value: new Vector4(0, 0, 0, 0), defaultValue: new Vector4(0, 0, 0, 0) },
    iSkinCode: {
      value: getEncodedSkin({
        topFace: { x: 6, y: 4 },
        frontFace: { x: 6, y: 4 },
        backFace: { x: 6, y: 4 },
        rightFace: { x: 6, y: 4 },
        leftFace: { x: 6, y: 4 },
        bottomFace: { x: 6, y: 4 },
      }),
      defaultValue: new Vector3(100000000, 100000000, 100000000),
    },
  },
}

const jewelSideAttributes = {
  iUniforms: {
    ...defaultInstanceAttributes.iUniforms,
    iShape: {
      value: SHAPES.JEWEL_SIDE,
      defaultValue: SHAPES.CUBE,
    },
  },
}
const jewelCornerAttributes = {
  iUniforms: {
    ...defaultInstanceAttributes.iUniforms,
    iShape: {
      value: SHAPES.JEWEL_CORNER,
      defaultValue: SHAPES.CUBE,
    },
  },
}

const COLORS = {
  jewel: '#d443b3',
  jewel_light: '#de6cc3',
  jewel_shadow: '#9d2095',
  jewel_shine: '#e296d3',
}
