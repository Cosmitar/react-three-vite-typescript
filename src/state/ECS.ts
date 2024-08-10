import { World } from 'miniplex'
import { createReactAPI } from 'miniplex-react'
import { Entity } from './types'

const world = new World<Entity>()

export const ECS = createReactAPI(world)