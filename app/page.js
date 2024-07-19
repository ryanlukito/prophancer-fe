import Image from "next/image";
import NavBar from './components/NavBar';
import BoxFAQ from './components/BoxFAQ';
import BoxUsirHama from './components/BoxUsirHama';
import BoxSonicBloom from './components/BoxSonicBloom';

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <div className="mb-10">
        <NavBar>PROPHANCER</NavBar>
      </div>
      <div className="flex justify-center items-center flex-col md:flex-row md:h-[80vh]">
        <BoxFAQ>Apa Itu PROPHANCER?</BoxFAQ>
        <BoxUsirHama>Usir Hama</BoxUsirHama>
        <BoxSonicBloom>Sonic Bloom</BoxSonicBloom>
      </div>
    </div>
  );
}
