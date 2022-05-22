import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { addCity, editCity, getCities } from "../../db/Data/products";
import { editUser, getUserById, subscribeUser } from "../../db/Data/Users";

export default function Pitem({ navigation, item }) {
  const isInCart = () => {
    getUserById(userr.uid).then((user) => {
      const user1 = user;
      const ucart = user1[0].cart;
      setCartI(false);
      for (let i = 0; i < ucart.length; i++) {
        if (ucart[i].id == item.id) {
          setCartI(true);
        }
      }
    });
  };
  const unsubLike = async () => {
    if (curLike[0] == userr.email) setFlage(false);
    else setFlage(true);
  };
  useEffect(async () => {
    await unsubLike();
    getUserById(userr.uid).then((user) => {
      const user1 = user;
      const ucart = user1[0].cart;
      setCart(ucart);
    });
  }, []);

  const auth = getAuth();

  const userr = auth.currentUser;

  const [liked, setLiked] = useState(item.liked);
  const [cart, setCart] = useState([]);
  const liked1 = [...liked];

  const [curLike, setCurLike] = useState(
    liked1.filter((e) => userr.email == e)
  );
  const [flag, setFlage] = useState();
  const [cartI, setCartI] = useState();

  if (userr !== null) {
    const email = userr.email;

    const Like = () => {
      if (flag) {
        editCity({ ...item, liked: [...liked, userr.email] });
        setFlage(false);
        getUserById(userr.uid).then((user) => {
          const user1 = user;
          const fav = user1[0].favourite;
          editUser({ ...user1[0], favourite: [...fav, item] });
        });
      } else {
        let arr = liked.filter((e) => e != userr.email);
        editCity({ ...item, liked: arr });
        setFlage(true);
        getUserById(userr.uid).then((user) => {
          const user1 = user;
          const fav = user1[0].favourite;
          let arr2 = fav.filter((e) => e.id != item.id);
          editUser({ ...user1[0], favourite: [...arr2] });
        });
      }
    };
    const addCart = async (item) => {
      getUserById(userr.uid).then((user) => {
        const user1 = user;
        const ucart = user1[0].cart;
        let flag = true;
        for (let i = 0; i < ucart.length; i++) {
          if (ucart[i].id == item.id) flag = false;
        }
        if (flag) {
          setCart([...ucart, item]);
          editUser({ ...user1[0], cart: [...ucart, item] });
        } else {
          let arr = ucart.filter((e) => e.id != item.id);
          setCart([...arr]);
          editUser({ ...user1[0], cart: [...arr] });
        }
      });
    };

    useEffect(() => {
      const unsubscribeUser = subscribeUser(({ change, snapshot }) => {
        if (change.type === "added") {
          isInCart();
        }
        if (change.type === "modified") {
          isInCart();
        }
        if (change.type === "removed") {
          isInCart();
        }
      });

      return () => {
        unsubscribeUser();
      };
    }, []);
    return (
      <View style={[styles.card, styles.shadowProp]}>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Product", {
                item: item,

              })
            }
          >
            <Image
              style={{
                height: 150,
                width: 150,
                borderRadius: 20,
                alignSelf: "center",
              }}
              source={{ uri: item.image }}
            ></Image>
            <Text style={{ fontWeight: "bold" }}> {item.name} </Text>
            {item.size ? (
              <Text style={{ fontWeight: "bold" }}>{item.size}</Text>
            ) : (
              <Text> </Text>
            )}
            <Text style={{ fontWeight: "bold" }}> $ {item.price}</Text>
          </TouchableOpacity>

          <View style={styles.button}>
            <View style={{ flexDirection: "row" }}>
              {cartI ? (
                <View style={styles.pp2}>
                  <TouchableOpacity
                    onPress={() => {
                      addCart(item), isInCart();
                    }}
                  >
                    <Image
                      source={require("../../assets/shopping-cart (2).png")}
                      style={{ width: 25, height: 25, margintop: "5%" }}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        paddingTop: "5%",
                        color: "#F9FFB7",
                      }}
                    >
                      Delet from Cart
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.pp}>
                  <TouchableOpacity
                    onPress={() => {
                      addCart(item), isInCart();
                    }}
                  >
                    <Image
                      source={require("../../assets/shopping-cart (1).png")}
                      style={{ width: 25, height: 25, margintop: "5%" }}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        paddingTop: "5%",
                        color: "#F9FFB7",
                      }}
                    >
                      Add to The Cart
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={styles.react}>
              <TouchableOpacity onPress={() => Like()}>
                {flag ? (
                  <Image
                    source={require("../../assets/heart.png")}
                    style={{ width: 30, height: 30, marginLeft: 10 }}
                  />
                ) : (
                  <Image
                    source={require("../../assets/heart (1).png")}
                    style={{ width: 30, height: 30, marginLeft: 10 }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "#000",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  button: {
    marginLeft: "5%",
    marginTop: "5%",
    // textAlign: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 10,
    //fontWeight: 600,
    textTransform: "uppercase",
  },

  heading: {
    fontSize: 18,
    //fontWeight: "600",
    marginBottom: 13,
  },
  card: {
    marginRight: 10,
    backgroundColor: "#E7E9EB",
    borderRadius: 8,
    paddingVertical: "5%",
    // paddingHorizontal: "3%",
    width: 175,
    height: 300,
    marginVertical: 10,
  },
  // button: {
  //   textAlign: "center",
  //   flexDirection: "row",
  // },
  shadowProp: {
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  shadowText: {
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  pp: {
    // marginTop: "90%",
    // marginLeft: "10%",

    width: "100%",
    borderRadius: 20,
    height: 50,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2DCCA9",
  },
  pp2: {
    width: "100%",
    borderRadius: 20,
    height: 50,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  react: {
    marginTop: "5%",
  },
});
