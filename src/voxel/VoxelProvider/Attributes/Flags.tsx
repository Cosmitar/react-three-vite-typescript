import { InstancedAttribute } from '../InstancedAttribute'
import { DEFAULT_FLAGS, getEncodedFlags } from './FlagsHelpers'

export default function (props: { wind?: boolean; gradient?: boolean; grayscale?: boolean }) {
  return <InstancedAttribute name='iFlags' value={getEncodedFlags({ ...DEFAULT_FLAGS, ...props })} defaultValue={0} define={'USE_FLAGS'} />
}
