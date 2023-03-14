import { Image } from "react-konva"
import useImage from 'use-image';

const ROBOT_SIZE=26
const MISIL_SIZE=24
const EXPLOSION_SIZE=28
const ID_SIZE=12

function Robot(props) {
  if(props.estado > 0){
    return (
      <SimObjectImg
        color="red"
        pos={props.pos}
        img="/imagenes/simulacion/robot.svg"
        size={ROBOT_SIZE}
      />
    )
  }
  else{
    return (
      <SimObjectImg
        pos={props.pos}
        img="/imagenes/simulacion/robot_dead.svg"
        size={ROBOT_SIZE}
      />
    )
  }
}

function Misil(props) {
  if(props.explotado){
    return (
      <SimObjectImg
        pos={props.pos}
        img="/imagenes/simulacion/explosion.svg"
        size={EXPLOSION_SIZE}
        orientacion={props.orientacion + 45}
      />
    )}
  else{
    return (
      <SimObjectImg
        pos={props.pos}
        img="/imagenes/simulacion/misil.svg"
        size={MISIL_SIZE}
        orientacion={props.orientacion + 45}
      />)
  }
}

function Id(props) {
  if(props.id === 1){
    return (
      <SimObjectImg pos={props.pos} img="/imagenes/simulacion/1.svg" size={ID_SIZE} />
    )
  }else if (props.id === 2){
    return (
      <SimObjectImg pos={props.pos} img="/imagenes/simulacion/2.svg" size={ID_SIZE} />
    )
  }else if (props.id === 3){
    return (
      <SimObjectImg pos={props.pos} img="/imagenes/simulacion/3.svg" size={ID_SIZE} />
    )
  }else{
    return (
      <SimObjectImg pos={props.pos} img="/imagenes/simulacion/4.svg" size={ID_SIZE} />
    )
  }
}

function SimObjectImg(props) {
  const [image] = useImage(props.img)
  return (
    <Image
       width={props.size}
       height={props.size}
       x={props.pos.x}
       y={props.pos.y}
       image={image} 
       rotation={props.orientacion}
       />
  )
}

export {
    Robot,
    Misil,
    Id
};