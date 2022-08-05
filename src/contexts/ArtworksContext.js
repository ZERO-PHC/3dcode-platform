import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { categories } from "../categories";

export const ArtworksContext = React.createContext("");
export const useArtworks = () => useContext(ArtworksContext);

const mainCategories = [
  {
    name: "Hot",
    id: "hot",
    color: "#f5f5f5",
    background: "#f5f5f5",
    border: "#f5f5f5",
    text: "#f5f5f5",
    icon: "🎨",
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
    icon: "🎨",
    active: false,
    selected: false,
  },
];

export default function ArtworksProvider({ children }) {
  const [Artworks, setArtworks] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState("all");
  const [MainCategory, setMainCategory] = useState("hot");
  const [Categories, setCategories] = useState(categories);
  const [MainCategories, setMainCategories] = useState(mainCategories);
  const [LoadedArtworks, setLoadedArtworks] = useState(0);

  useEffect(() => {
    const colRef = collection(db, "artworks");
    const unsub = onSnapshot(colRef, (snapshot) => {
      const formattedDocs = getFormattedDocs(snapshot.docs);

      switch (MainCategory) {
        case "hot":
          const sortedDocs = getSortedDocs(formattedDocs);
          console.log("sortedDocs", sortedDocs);

          const filteredArtworks = getFilteredDocs(sortedDocs);
          console.log("filteredArtworks", filteredArtworks);

          const first9docs = filteredArtworks.slice(0, 10);

          const mosaicArtworks = createArtworksMosaic(first9docs);
          setArtworks(mosaicArtworks);
          break;

        case "new":
          const newSortedDocs = formattedDocs.sort((a, b) => {
            return b.timestamp - a.timestamp;
          });

          console.log("sortedDocs", sortedDocs);

          const newFilteredArtworks = newSortedDocs.filter((artwork) => {
            return artwork.tags.includes(SelectedCategory);
          });
          console.log("newfilteredArtworks", newFilteredArtworks);
          setArtworks(newFilteredArtworks);
          setLoadedArtworks(LoadedArtworks + 9);

          break;

        default:
          break;
      }
    });

    return () => {
      // clean up the listener
      unsub();
    };
  }, [SelectedCategory, MainCategory]);

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

  const add9Artworks = async () => {
    // filter the rendered artworks instead

    // get the artworks from the firestore using the getDocs function
    // create the artworks ref

    console.log("adding docs");

    const colRef = collection(db, "artworks");

    // get the docs from the colRef using the getDocs function
    const qSnap = await getDocs(colRef);
    // console.log("docs", qSnap.docs)
    const docs = qSnap.docs;
    const formattedDocs = getFormattedDocs(docs);
    // console.log("formattedDocs2", formattedDocs)

    // filter out the artworks that are already in the Artworks array
    const filteredDocs = formattedDocs.filter((artwork) => {
      return !Artworks.some((art) => art.id === artwork.id);
    });
    console.log("filteredDocs2", filteredDocs);

    // create the mosaic artworks
    const mosaicArtworks = createArtworksMosaic(filteredDocs);

    // add the mosaic artworks to the Artworks array
    setArtworks([...Artworks, ...mosaicArtworks]);
  };

  const createArtworksMosaic = (docs) => {
    const portraitArtworks = docs.filter((doc) => {
      return doc.AspectRatio === "portrait";
    });
    const squareArtworks = docs.filter((doc) => {
      return doc.AspectRatio === "square";
    });
    const landscapeArtworks = docs.filter((doc) => {
      return doc.AspectRatio === "landscape";
    });

    console.log("artworksAspects", portraitArtworks, squareArtworks, landscapeArtworks)

    const artworksSet = [
      { ...squareArtworks[0] },
      { ...portraitArtworks[1] },
      { ...portraitArtworks[0] },
      { ...squareArtworks[0] },
      { ...portraitArtworks[0] },
      { ...landscapeArtworks[0] },
      { ...portraitArtworks[0] },
      { ...landscapeArtworks[1] },
      { ...landscapeArtworks[1] },
    ];

    return artworksSet;
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

  const value = {
    Artworks,
    SelectedCategory,
    MainCategory,
    handleCategorySelection,
    handleMainCategorySelection,
    handleCategoryHover,
    handleArtworkSelection,
    MainCategories,
    Categories,
    add9Artworks,
  };

  return (
    <ArtworksContext.Provider value={value}>
      {" "}
      {children}{" "}
    </ArtworksContext.Provider>
  );
}
