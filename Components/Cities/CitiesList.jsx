import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Image,
  Picker,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import {
  getCities,
  addCity,
  addCart,
  deleteCity,
  subscribe,
} from "../../db/cities/cities";
import { subscribeUser } from "../../db/cities/users";
import Pitem from "../items/Pitem";
import { editUser, getUsers } from "../../db/cities/users";
import image1 from "../../assets/loginn.png";
import EditCity from "./EditCity";
import { TouchableOpacity } from "react-native-web";

const CitiesList = ({ navigation }) => {
  // const getUsersList = async () => {
  //   const u = await getUsers();
  //   setUsers(u);
  //   let newcart = u.map((e)=>(e.cart));
  //   setCartt(newcart);
  //   console.log("users: ", u);
  // };
  const getCitiesList = async () => {
    const c = await getCities();
    setCities(c);
    console.log("products", c);
  };

  useEffect(() => {
    getCitiesList();
    //getUsersList();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      //   console.log("changes", change, snapshot, change.type);
      // if (snapshot.metadata.hasPendingWrites) {
      if (change.type === "added") {
        //console.log("New city: ", change.doc.data());
        getCitiesList();
      }
      if (change.type === "modified") {
        //console.log("Modified city: ", change.doc.data());
        getCitiesList();
      }
      if (change.type === "removed") {
        //console.log("Removed city: ", change.doc.data());
        getCitiesList();
      }
      // }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   const unsubscribeUser = subscribeUser(({ change, snapshot }) => {
  //     if (change.type === "added") {
  //       getUsersList();
  //     }
  //     if (change.type === "modified") {
  //       getUsersList();

  //     }
  //     if (change.type === "removed") {
  //       getUsersList();
  //     }
  //   });

  //   return () => {
  //     unsubscribeUser();
  //   };
  // }, []);

  const [cities, setCities] = useState([]);
  const [users, setUsers] = useState([]);
  const [cityToEdit, setCityToEdit] = useState(undefined);

  // const [cartt, setCartt] = useState([]);
  // const sasa ='sss';
  // const AddToCart = (id)=>{
  //   setCartt ((prevCart)=>{
  //       return [
  //         cities.filter(iteem => iteem.id == id),
  //         ...prevCart
  //         ];
  //     })
  //   }

  //   const showCart =()=> {
  //     return cartt ;
  //   }
  // console.log(cartt);
  const [selectedValue, setSelectedValue] = useState("All");
  const [searchItem, setsearchItem] = useState("");
  const [dataa, setDataa] = useState("");
  const [toggle, setToggle] = useState(true);
if(toggle){
  if (selectedValue == "All") {
    setDataa(cities);
    console.log(cities);
  }else{
    setDataa(cities.filter((e) => e.type == selectedValue));
  }
  setToggle(false);
}
  //const [dataa, setDataa] = useState([]);
  //setDataa = cities.filter((e)=>e.type== selectedValue);

  

  let x = [];

  //console.log(selectedValue);

  const search = (searchItem) => {
    let s = "";
    for (let i = 0; i < cities.length; i++) {
      s = cities[i].name;
      if (s.match(searchItem) != null) x[i] = s.match(searchItem).input;
    }

    let data = [];
    for (let i = 0; i < x.length; i++) {
      data[i] = cities[i];
    }
    console.log("x:", data);
    setDataa(data);
  };
  
  return cityToEdit ? (
    <EditCity city={cityToEdit} onSave={() => setCityToEdit(undefined)} />
  ) : (
    <View>
      <Button title="cart" onPress={() => navigation.navigate("cart")} />

      <View style={styles.container}>
        <TextInput
          onChangeText={setsearchItem}
          style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
        />
        <Button title="search" onPress={() => search(searchItem)} />
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue), setToggle(true)}}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="chair" value="chair" />
          <Picker.Item label="bed" value="bed" />
          <Picker.Item label="sofa" value="sofa" />
        </Picker>
      </View>

      <View
        style={{
          height: 550,
        }}
      >
        <FlatList
          data={dataa}
          keyExtractor={cities.id}
          renderItem={({ item }) => (
            <Pitem navigation={navigation} item={item} />
          )}
        />
      </View>
    </View>
  );
};

export default CitiesList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
