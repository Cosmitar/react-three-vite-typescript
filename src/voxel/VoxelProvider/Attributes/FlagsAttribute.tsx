import { InstancedAttribute } from '../InstancedAttribute'
import { DEFAULT_FLAGS, Flags, getEncodedFlags } from './FlagsHelpers'

export default function (props: Flags) {
  return <InstancedAttribute name='iFlags' value={getEncodedFlags({ ...DEFAULT_FLAGS, ...props })} defaultValue={0} define={'USE_FLAGS'} />
}
