import FontAwesome6 from '@expo/vector-icons/FontAwesome6';



export default function IconFont({icon , color ,size}){
  return <FontAwesome6 name={icon} size={size} color={color} /> ;
}