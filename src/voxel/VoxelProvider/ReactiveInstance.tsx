import { forwardRef, MutableRefObject, useEffect, useImperativeHandle, useRef } from 'react'
import { Instance, InstanceProps } from '@react-three/drei'
import { forceRefresh, setAttribute } from './VoxelProvider'
import { deepClone } from '../utils'
import { Object3D } from 'three'

export type InstanceAPI = {
  instance: MutableRefObject<Object3D>
  updateAttribute: Function
}
export default forwardRef<InstanceAPI, InstanceProps>(function ReactiveInstance(props, outterRef) {
  const { userData, ...moreProps } = props
  
  const ref = useRef<Object3D>() as MutableRefObject<Object3D>

  const API = useRef<InstanceAPI>({
    instance: ref,
    updateAttribute: (key: string, value: any) => {
      setAttribute(key, value, API.instance.current.userData.id)
      // console.log(API.instance.current.userData.id)
    },
  }).current

  useImperativeHandle(outterRef, () => API, [])

  useEffect(() => {
    forceRefresh()
    return () => forceRefresh()
  }, [])

  return <Instance {...moreProps} userData={deepClone(userData)} ref={ref} />
})
