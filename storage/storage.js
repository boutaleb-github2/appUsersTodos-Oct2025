import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = "@usersTodos_v1";

// upload {"users":[]}
export async function loadUsers_v1(){
  try{
    /**
    const jsonTodos = await AsyncStorage.getItem(KEY);
    if(!parsed || !Array.isArray(parsed.users)) return {"users":[]}
    return parsed;
    */
   const json = await AsyncStorage.getItem(KEY);
    if (!json) return { users: [] };

    const parsed = JSON.parse(json);
    return Array.isArray(parsed.users) ? parsed : { users: [] };
  }catch(e){
    console.warn("erreur dans loadUsers_v1",e)
    return false    
  }
}

// typeof {"users":[]}
export async function saveUsers_v1(next){
  try{
    const isObjectNext = typeof next === "object" && 
      (next !== null && next !== undefined) && 
      Array.isArray(next.users)
    console.log("isObject_v1 before save",next);
    if(!isObjectNext){
      console.log("[isObject_v1] Structure invalide:", next);
      return false
    }
    await AsyncStorage.setItem(KEY,JSON.stringify(next));
    return true;
  }catch(e){
    console.warn("erreur dans loadUsers_v1",e)
    return false  
  }
}

// save users and todos
/** 
export async function saveUsersAndTodos(usersAndTodos){
  try{
    const prev_users = await loadUsers_v1();
    const updateUsers = [...prev_users.users,usersAndTodos.users];
    await isObject_v1({"users":updateUsers});
    console.log("succes in saveUsersAndTodos")
    return true;
  }catch(e){
    console.log("erreur dans saveUsersAndTodos",e)
    return false
  }
}
*/
// clean storage
export const clearStorage = async () => {
  try {
    await AsyncStorage.removeItem(KEY);
    console.log('✅ Données supprimées !');
  } catch (e) {
    console.warn('Erreur lors de la suppression', e);
  }
};


