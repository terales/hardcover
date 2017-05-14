// @flow
import { m4 } from '../node_modules/twgl.js/dist/3.x/twgl-full'

export default class Node {
  children: Array<Node>
  parent: Node
  localMatrix: Float32Array
  worldMatrix: Float32Array
  drawInfo: Object

  constructor (drawInfo: ?Object) {
    this.drawInfo = drawInfo
    this.children = []
    this.localMatrix = m4.identity()
    this.worldMatrix = m4.identity()    
  }

  setParent (parent: Node): void {
    // remove us from our parent
    if (this.parent) {
      const index = this.parent.children.indexOf(this)
      if (index >= 0) {
        this.parent.children.splice(index, 1)
      }
    }

    // Add us to our new parent
    parent.children.push(this)
    this.parent = parent
  }

  updateWorldMatrix (parentWorldMatrix: Float32Array): void {
    if (parentWorldMatrix) {
      // a matrix was passed in so do the math
      m4.multiply(parentWorldMatrix, this.localMatrix, this.worldMatrix)
    } else {
      // no matrix was passed in so just copy local to world
      m4.copy(this.localMatrix, this.worldMatrix)
    }

    // now process all the children
    const worldMatrix = this.worldMatrix
    this.children.forEach(function(child) {
      child.updateWorldMatrix(worldMatrix)
    })
  }
}