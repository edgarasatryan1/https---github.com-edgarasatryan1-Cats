import React from "react";
import { MainDiv, CatPhoto,Button } from "./styled";

export default function ({ photos, clickMore }) {
  console.log(photos);
  return (
    <div>
      <MainDiv>
        {photos.map((item, index) => {
          return (
            <div>
              <CatPhoto src={item.url} />
            </div>
          );
        })}
      </MainDiv>
      <Button onClick={clickMore}>...more</Button>
    </div>
  );
}
