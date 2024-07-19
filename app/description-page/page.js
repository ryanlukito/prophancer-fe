import Image from "next/image";
import React from "react";
import ConfusedAsset from "../../public/assets/asset1.png";
import NavBar2 from "../components/NavBar2";
import Link from "next/link";

const DescriptionPage = () => {
  return (
    <div className="bg-white">
      <NavBar2 title={"Apa Itu PROPHANCER?"} />
      <div className="flex flex-row h-[98vh] p-10 justify-center drop-shadow-lg">
        <p className="text-sm bg-white h-fit p-5 rounded-md md:w-[500px]">
          Proident consectetur culpa commodo mollit aute nulla ea cupidatat
          Lorem irure sint id. Consectetur aliqua voluptate adipisicing id
          officia officia sint cillum eiusmod. Qui laborum excepteur ad
          cupidatat. Consequat dolor magna anim ullamco nostrud ullamco. Lorem
          ea qui dolor esse aliqua veniam qui nostrud minim culpa velit
          voluptate. Incididunt voluptate amet sit consequat anim in. Sit non
          nulla ut nulla amet. Tempor adipisicing sunt laboris dolor. Sunt
          officia dolor eu occaecat duis pariatur cillum irure incididunt
          laborum. Dolor dolore enim nostrud enim est nostrud quis Lorem. Velit
          tempor labore exercitation dolor id. Do consequat laboris sint eiusmod
          pariatur enim ad non minim dolore. Commodo excepteur non culpa
          deserunt anim officia amet velit eu laboris qui proident. Exercitation
          voluptate cillum mollit laboris sit. Occaecat sunt velit id sit Lorem
          quis deserunt laborum mollit voluptate dolore. Consectetur
          reprehenderit commodo commodo consectetur duis quis commodo ipsum id
          deserunt proident.
        </p>
        <div className="flex flex-col justify-end">
          <Image src="/assets/confuse2.png"width={700} height={700} alt="image"/>
        </div>
      </div>
    </div>
  );
};

export default DescriptionPage;
