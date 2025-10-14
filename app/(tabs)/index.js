import { useState } from 'react';
import { Alert, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AddUserOrTodoModal from "../../components/AddUserOrTodoModal";
import BtnAddTodo from "../../components/BtnAddTodo";
import Divider from "../../components/Divider";
import Header from "../../components/Header";
import UserAvatar from "../../components/UserAvatar";
import UsersTodoList from "../../components/UsersTodoList";
import constants from "../../constants/colors";
const colors=constants.colors;
/** 
{
  "users": [
    {
      "id": "u1",
      "name": "Habib",
      "todos": [
        { "id": "t1", "text": "Acheter du pain" },
        { "id": "t2", "text": "Coder l’app" }
      ]
    },
    ...
  ]
}
 */

export default function Index() {

  // states
const [modalVisible,setModalVisible]=useState(false);
const [todoTextInput,setTodoTextInput]=useState("");
const [userTextInput,setUserTextInput]=useState("");
const [dialogType,setDialogType]=useState("todo");// "todo" or "user"
const [usersTodos,setUsersTodos]=useState({"users":[]});
const [currentUser,setCurrentUser]=useState({"users":[{ "id":'id',"name":"-- --","todos":[]}]})

// functions
const toggleModal=(e)=>{
  setModalVisible(e);
}
const toggleDialogType=(e)=>{
  setDialogType(e);
}
const toggleCurrentUser=(e)=>{
  setCurrentUser(e);
}
const toggleTodoTextInput=(e)=>{
  setTodoTextInput(e);
}
const onChangeTodo = (e) => setTodoTextInput(e); // cette fonction est pour gerer le onChangeText dans le AppDialog
const onChangeUser = (e) => setUserTextInput(e); // cette fonction est pour gerer le onChangeText dans le AppDialog

const addUser = ()=> {
  if(!userTextInput.trim() || /[,.\-0-9]/.test(userTextInput)) {
    Alert.alert("le nom ne dois pas etre vide ni contenir un caractere invalide {, .,- des chiffres}");
    console.warn("le nom ne dois pas etre vide ni contenir un caractere invalide {, .,- des chiffres}");
    return;
  }; 
  console.log("userTextInput",userTextInput)
  toggleModal(false);
    //const id=Math.floor(Math.random()*10000+1); // generation de id entre 1 et 10000
  const id = "u" + Date.now();
  const newUser = {"id":id,"name":userTextInput,"todos":[]};
  setUsersTodos({"users":[...usersTodos.users,newUser]});
  setUserTextInput("")
}
const addTodos = (userId,input)=>{
    if(!input.trim()) {
    //  Alert.alert("le nom ne dois pas etre vide ni contenir un caractere invalide {, .,- des chiffres}");
    //  console.warn("le nom ne dois pas etre vide ni contenir un caractere invalide {, .,- des chiffres}");
     return;
   }; 
   //console.log("userTextInput",input)
   toggleModal(false);
     //const id=Math.floor(Math.random()*10000+1); // generation de id entre 1 et 10000
     // la todo est de la forme:  { "idTodo": "t1", "text": "Acheter du pain" },
   const newTodo = {"idTodo":"u" + Date.now(),"todoTitle":input};
   const updateUsers = usersTodos.users.map(
     (user)=>{
      if(user.id===userId){
        return {
          ...user,
          todos:[...user.todos,newTodo]
        }
      }
       return user;
      }
   )   
   setUsersTodos({"users":updateUsers});
   setTodoTextInput("")

 } 

  return (
    <SafeAreaProvider style={styles.container}>
      <Header/>
      <Divider/>
      <UserAvatar toggleModal={toggleModal}toggleDialogType={toggleDialogType} currentUser={currentUser}/>
      <UsersTodoList usersTodos={usersTodos} currentUser={currentUser} toggleCurrentUser={toggleCurrentUser}/>
      <BtnAddTodo modalVisible={modalVisible} toggleModal={toggleModal} addTodos={addTodos} 
        dialogType={dialogType} toggleDialogType={toggleDialogType} currentUser={currentUser}
      />    
    <AddUserOrTodoModal modalVisible={modalVisible} toggleModal={toggleModal} dialogType={dialogType}
    onChangeTodo={onChangeTodo} onChangeUser={onChangeUser} todoTextInput={todoTextInput} userTextInput={userTextInput}
    addUser={addUser}addTodos={addTodos} currentUser ={currentUser} toggleTodoTextInput={toggleTodoTextInput} 
    />  
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:colors.primary,    
    flex:1,    
  },
});
