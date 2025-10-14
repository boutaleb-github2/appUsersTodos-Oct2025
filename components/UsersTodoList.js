import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import constants from '../constants/colors';
const colors=constants.colors;

export default function UsersTodoList({usersTodos,currentUser,toggleCurrentUser}) {
 const onPressPourAttribuerCurrentUser = (e)=>{
  
  console.log("eeeeeeeeeeeeeeeee",e);
  toggleCurrentUser(e)  
 }

  const renderItem = ({item,currentUser})=>{
    console.log("item.name dans UsersTodosListeggggggggggg",item)
    return(
      <>
      <Pressable style={styles.viewTodo} onPress={()=>onPressPourAttribuerCurrentUser({"users":[item]})}>
            <View>
             <FontAwesome5 name="dot-circle" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.title}> {item.name} </Text>
            </View>            
        </Pressable>
        {item.todos.length > 0 &&
        <View style={styles.containerTodos}> 
        
        <FlatList
          data={item.todos}
          renderItem={({item})=>{
            return(
              <View style={styles.viewTodo}>
            <View >
             <FontAwesome5 name="dot-circle" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.title}> {item.todoTitle} </Text>
            </View>            
        </View>
            )
          }}
        />
        
        </View>
        }
      </>     
    )

  }
  return (
    <View style={styles.container}>      
        
        <FlatList
          data={usersTodos.users}
          renderItem={renderItem}
          keyExtractor={(item)=>item.id}
        />
    </View>
    
  );
}

const styles=StyleSheet.create({
  container:{
    padding:20,
    backgroundColor:colors.primary,   
  },
  containerTodos:{
    padding:20,
    backgroundColor:"red",
    width:"70%", margin:"auto"  
  },
  viewTodo:{
    flexDirection:'row',
    justifyContent:'flex-start',
    marginRight:10,
    backgroundColor:colors.white,borderRadius:10,
    marginVertical:5,
    padding:20
  
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    color:colors.primary,
  }
})