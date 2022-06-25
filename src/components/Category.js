import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import MainContent from "./MainContent";
import { Contenier, CategoryTitle } from "./styled";
export default function Category() {
  let [catsCategory, setCatsCategory] = useState([]);
  let [photos, setPhotos] = useState([]);
  let countRef = useRef(0);
  useEffect(() => {
    const photos = JSON.parse(sessionStorage.getItem("historyCat"));
    photos.length = 10;
    if (photos) {
      setPhotos(photos);
    }
  }, []);

  useEffect(() => {
    countRef.current++;
    if (countRef.current !== 1) {
      sessionStorage.setItem("historyCat", JSON.stringify(photos));
    }
  }, [photos]);
  useEffect(() => {
    let getCategory = async () => {
      let response = await fetch("https://api.thecatapi.com/v1/categories ");
      let result = await response.json();
      setCatsCategory(result);
      console.log(result);
    };
    getCategory();
  }, []);

  let randomPhotos = async (ev) => {
    let id = ev.target.id ? ev.target.id : photos[0].categories[0].id;
    ev.target.id && sessionStorage.removeItem("historyCat");
    let response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=10&page=1&category_ids=${id}`
    );
    let result = await response.json();

    setPhotos(ev.target.id ? result : [...photos, ...result]);
  };

  return (
    <Contenier>
      <div>
        {catsCategory.map((item, index) => {
          return (
            <Link key={"cat" + index} to={item.name}>
              <CategoryTitle onClick={randomPhotos} id={item.id}>
                {item.name}
              </CategoryTitle>
            </Link>
          );
        })}
      </div>
      {photos.length ? (
        <MainContent photos={photos} clickMore={randomPhotos} />
      ) : null}
    </Contenier>
  );
}
