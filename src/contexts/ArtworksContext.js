import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { categories } from "../data/categories";
import { useRouter } from "next/router";

export const ArtworksContext = React.createContext("");
export const useArtworks = () => useContext(ArtworksContext);

const contentCategories = [
  {
    name: "Featured",
    id: "featured",
    color: "#f5f5f5",
    background: "#f5f5f5",
    border: "#f5f5f5",
    text: "#f5f5f5",
    icon: "material-symbols:star-outline",
    active: false,
    selected: true,
  },
  {
    name: "New",
    id: "new",
    color: "#f5f5f5",
    background: "#f5f5f5",
    border: "#f5f5f5",
    text: "#f5f5f5",
    icon: "akar-icons:thunder",
    active: false,
    selected: true,
  },
  {
    name: "Free",
    id: "free",
    color: "#f5f5f5",
    background: "#f5f5f5",
    border: "#f5f5f5",
    text: "#f5f5f5",
    icon: "tabler:free-rights",
    active: false,
    selected: true,
  },
  {
    name: "Hot",
    id: "hot",
    color: "#f5f5f5",
    background: "#f5f5f5",
    border: "#f5f5f5",
    text: "#f5f5f5",
    icon: "fa6-solid:fire",
    active: false,
    selected: false,
  },
];
const mainCategories = [
  {
    name: "Functions",
    id: "featured",
    color: "#f5f5f5",
    background: "#f5f5f5",
    border: "#f5f5f5",
    text: "#f5f5f5",
    icon: "ph:function-bold",
    active: false,
    selected: true,
  },
  {
    name: "Graphics",
    id: "new",
    color: "#f5f5f5",
    background: "#f5f5f5",
    border: "#f5f5f5",
    text: "#f5f5f5",
    icon: "grommet-icons:gem",
    active: false,
    selected: true,
  },
 
];

export default function ArtworksProvider({ children }) {
  const [Artworks, setArtworks] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState("all");
  const [MainCategory, setMainCategory] = useState("new");
  const [Categories, setCategories] = useState(categories);
  const [MainCategories, setMainCategories] = useState(mainCategories);
  const [LoadedArtworks, setLoadedArtworks] = useState(0);
  const [SelectedProduct, setSelectedProduct] = useState({});
  const [cart, setCart] = useState([]);
  const [CartTotal, setCartTotal] = useState(0);
  const router = useRouter();
  const [SelectedContent, setSelectedContent] = useState("");
  const [SelectedCode, setSelectedCode] = useState("");
  const [PurchasedProducts, setPurchasedProducts] = useState([]);

  // destructuring the user from the AuthContext
  const { user } = useAuth();

  useEffect(() => {
    // create a lorem ipsum text and set it for the selected content
    // this will be used in the checkout page
    const lorem =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut semper diam. Etiam";
    setSelectedContent(lorem);

    // create a random text code and set it for the selected code
    // this will be used in the checkout page
    const code =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    setSelectedCode(code);

    return () => {};
  }, []);

  // useEffect to get the cart array from the user document usinf the onSnapshot function
  useEffect(() => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const unsub = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          if (data.cart) {
            setCart(data.cart);
          }

          if (data.purchasedProducts) {
            getProductsData(data.purchasedProducts);
          } else {
            setPurchasedProducts([]);
            console.log("no purchased products");
          }
        }
      });

      return () => unsub();
    }
  }, [user]);

  const getProductsData = async (productIds) => {
    const products = await getDocs(collection(db, "scenes"));
    // filter the products array to get only the products that are in the productIds array
    const filteredProducts = products.docs.filter((product) => {
      return productIds.includes(product.id);
    });

    // get the formatted docs
    const formattedProducts = getFormattedDocs(filteredProducts);
    console.log("formattedProducts", formattedProducts);

    // set the purchased products
    setPurchasedProducts(formattedProducts);
  };

  // useEffect to get the artworks from the firestore using the onSnapshot function

  useEffect(() => {
    const colRef = collection(db, "scenes");
    const unsub = onSnapshot(colRef, (snapshot) => {
      const formattedDocs = getFormattedDocs(snapshot.docs);

      setArtworks(formattedDocs);

      //   switch (MainCategory) {
      //     case "hot":
      //       const sortedDocs = getSortedDocs(formattedDocs);
      //       console.log("sortedDocs", sortedDocs);

      //       const filteredArtworks = getFilteredDocs(sortedDocs);
      //       console.log("filteredArtworks", filteredArtworks);

      //       // const first9docs = filteredArtworks.slice(0, 10);

      //       const mosaicArtworks = createArtworksMosaic(filteredArtworks);
      //       setArtworks(mosaicArtworks);
      //       break;

      //     case "new":
      //       const newSortedDocs = formattedDocs.sort((a, b) => {
      //         return b.timestamp - a.timestamp;
      //       });

      //       console.log("sortedDocs", sortedDocs);

      //       const newFilteredArtworks = newSortedDocs.filter((artwork) => {
      //         return artwork.tags.includes(SelectedCategory);
      //       });
      //       console.log("newfilteredArtworks", newFilteredArtworks);
      //       const newMosaicArtworks = createArtworksMosaic(newFilteredArtworks);

      //       setArtworks(newMosaicArtworks);
      //       // setLoadedArtworks(LoadedArtworks + 9);

      //       break;

      //     default:
      //       break;
      //   }
    });

    return () => {
      // clean up the listener
      unsub();
    };
  }, [SelectedCategory, MainCategory]);

  // resolve the products from the firestore using the productIds array
  const resolveProducts = (productsData, productIds) => {
    const products = productIds.map((productId) => {
      const product = productsData.find((product) => {
        return product.id === productId;
      });

      return product;
    });

    return products;
  };

  const getFilteredDocs = (docs) =>
    docs.filter((artwork) => artwork.tags.includes(SelectedCategory));

  const getSortedDocs = (docs) => {
    return docs.sort((a, b) => {
      return b.reactionPoints - a.reactionPoints;
    });
  };

  const getFormattedDocs = (docs) => {
    const formattedDocs = docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return formattedDocs;
  };

  const handleArtworkSelection = (artwork) => {
    console.log("artwork selected: ", artwork);
    // setSelectedArtwork(artwork);
    // setShowDialog(true);
    router.push(`/artwork/${artwork.id}`);
  };

  const handleCategoryHover = (id) => {
    setCategories(
      Categories.map((category) => {
        if (category.id === id) {
          category.active = true;
        } else {
          category.active = false;
        }
        return category;
      })
    );
  };

  const handleMainCategorySelection = (id, category) => {
    setMainCategory(category.id);
    setMainCategories(
      MainCategories.map((category) => {
        if (category.id === id) {
          category.selected = true;
        } else {
          category.selected = false;
        }
        return category;
      })
    );
  };

  const handleCategorySelection = (id, category) => {
    setSelectedCategory(category.id);
    setCategories(
      Categories.map((category) => {
        if (category.id === id) {
          category.selected = true;
        } else {
          category.selected = false;
        }
        return category;
      })
    );
  };

  function handleAddProduct() {
    console.log("add product");

    // add the product to the cart array on the user document
    // get the user document
    const userRef = doc(db, "users", user.uid);
    // get the user data
    getDoc(userRef).then((doc) => {
      // check if the user has a cart array
      if (doc.data().cart) {
        // if the user has a cart array, add the product to the cart array
        updateDoc(userRef, {
          cart: [...doc.data().cart, SelectedProduct],
        }).then(() => console.log("added"));
      } else {
        // if the user doesn't have a cart array, create a cart array and add the SelectedProduct to it
        updateDoc(userRef, {
          cart: [SelectedProduct],
        }).then(() => console.log("added"));
      }
    });

    // add the SelectedProduct to the cart array on the state
    setCart([...cart, SelectedProduct]);
  }

  function addPurchasedProducts(products) {
    // add the products to the cart array on the user document
    // get the user document
    const userRef = doc(db, "users", user.uid);
    // get the user data
    getDoc(userRef).then((doc) => {
      // check if the user has a cart array
      if (doc.data().purchasedProducts) {
        // if the user has a cart array, add the product to the cart array
        updateDoc(userRef, {
          purchasedProducts: [...doc.data().purchasedProducts, ...products],
        }).then(() => console.log("added"));
      } else {
        // if the user doesn't have a purchasedProducts array, create a purchasedProducts array and add the SelectedProduct to it
        updateDoc(userRef, {
          purchasedProducts: [...products],
        }).then(() => console.log("added"));
      }
    });

    console.log("products", products);
  }

  const value = {
    PurchasedProducts,
    addPurchasedProducts,
    SelectedCode,
    SelectedContent,
    cart,
    setSelectedProduct,
    handleAddProduct,
    Artworks,
    SelectedCategory,
    MainCategory,
    handleCategorySelection,
    handleMainCategorySelection,
    handleCategoryHover,
    handleArtworkSelection,
    MainCategories,
    Categories,
  };

  return (
    <ArtworksContext.Provider value={value}>
      {children}
    </ArtworksContext.Provider>
  );
}
