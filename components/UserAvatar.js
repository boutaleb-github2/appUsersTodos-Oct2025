import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from "react-native";
import constants from "../constants/colors";
const colors=constants.colors;

export default function UserAvatar({toggleModal,toggleDialogType,currentUser}) {
  console.log('curentuser dans userAvatar 000',currentUser);
  
 const labelUser = currentUser.users[0].name?.split(' ')
 console.log("labelUser",labelUser)
  return (
    <Pressable style={styles.container} 
    onPress={()=>{
       toggleModal(true);
       toggleDialogType("user");
    }}
    >
      <View style={styles.label}>
        <Text style={styles.title}>  {labelUser ? labelUser[0][0].toString()+labelUser[1][0].toString():"--"}</Text>
        </View>
        <View style={{ }}>
        <Text style={[styles.title,{color:colors.white,}]}> {currentUser.users[0].name!=="-- --"? currentUser.users[0].name:"cliquer user --> todos"} </Text>
        </View>
        <View style={styles.chevronDown}>
        <Feather name="chevrons-down" size={24} color={colors.white} />
        </View>     
    </Pressable>
  )  
}
const styles=StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:colors.primary,       
      
  },
  label:{
    height:60,
    width:60,
    borderRadius:30,
    backgroundColor:colors.white,
    justifyContent:'center',
    alignItems:'center',
    margin:10,
  },
  title:{
    color:colors.primary,
    fontSize:20,
    fontWeight:'bold',
   
    
        
  },
  chevronDown:{
    marginRight:15
    }, 
})


