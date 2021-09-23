import { Stage, Sprite, Container } from '@inlet/react-pixi';

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