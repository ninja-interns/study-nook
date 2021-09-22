import { Stage, Sprite, useTick, Container } from '@inlet/react-pixi';
import { useReducer, useRef } from 'react';
import * as PIXI from "pixi.js"

// const ExamplePixi = () => {
//     const reducer: React.ReducerWithoutAction<any> = (_: any, { data }: any) => data
//     const Bunny = () => {
//       const [motion, update] = useReducer(reducer)
//       const iter = useRef(0)
//       useTick(delta => {
//         const i = (iter.current += 0.05 * delta)
//         update({
//           type: 'update',
//           data: {
//             x: Math.sin(i) * 100,
//             y: Math.sin(i / 1.5) * 100,
//             rotation: Math.sin(i) * Math.PI,
//             anchor: Math.sin(i / 2),
//           },
//         })
//       })
//       return (
//         <Sprite
//           image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
//           {...motion}
//         />
//       )
//     }
//     return (
//       <Stage width={300} height={300} options={{ backgroundAlpha: 0 }}>
//         <Container x={150} y={150}>
//           <Bunny />
//         </Container>
//       </Stage>
//     )
//   }

// export default ExamplePixi

// const ExamplePixi = () => (
//     <Stage width={350} height={200} options={{ backgroundAlpha: 0 }}>
//       <Sprite image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png" x={100} y={100} />
//     </Stage>
//   );
  
//   export default ExamplePixi


const ExamplePixi = () => {
    return (
<Stage width={350} height={200} options={{ backgroundColor: 0xeef1f5 }}>
  <Container position={[175, 100]}>
    <Sprite
      anchor={0.5}
      x={-87.5}
      y={-50}
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
    />
    <Sprite
      anchor={0.5}
      x={0}
      y={0}
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
    />
    <Sprite
      anchor={0.5}
      x={87.5}
      y={50}
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
    />
  </Container>
</Stage>
    )
}
export default ExamplePixi