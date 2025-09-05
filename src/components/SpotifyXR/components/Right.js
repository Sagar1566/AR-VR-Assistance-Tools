import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { ViewGridIcon } from "@heroicons/react/solid";
import Dropdown from "./Dropdown";
import React, { Suspense, useEffect, useState, useRef, useMemo} from "react";
import { useSession } from "next-auth/react";
import RecentlyPlayed from "./RecentlyPlayed";

import { createRoot } from 'react-dom/client';
import { Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import { Sky, OrbitControls, Text } from "@react-three/drei";
import XrHitModelContainer from "../../../containers/XRHitModelContainer/XRHitModelContainer";
import { Interactive, XR, ARButton, Controllers } from '@react-three/xr';
import * as THREE from 'three';

import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../../../atoms/playerAtom";

import { RGBELoader } from 'three-stdlib'
import {
  Center,
  Text3D,
  Instance,
  Instances,
  Environment,
  Lightformer,
  RandomizedLight,
  AccumulativeShadows,
  MeshTransmissionMaterial
} from '@react-three/drei'
import { useControls, button } from 'leva'

function Image(props) {
  const { imgSrc, position, scale } = props;
  const texture = useLoader(THREE.TextureLoader, imgSrc);
  const vectorPosition = new THREE.Vector3().fromArray(position);

  return (
    <mesh position={vectorPosition} scale={scale}>
      <planeBufferGeometry attach="geometry" args={[1, 1]} />
      <meshBasicMaterial attach="material" map={texture} transparent={true} />
    </mesh>
  );
}

function Box({ color, size, scale, children, ...rest }) {
  return (
    <mesh scale={scale} {...rest}>
      <boxBufferGeometry args={size} />
      <meshPhongMaterial color={color} />
      {children}
    </mesh>
  );
}

function Scene({ margin = 0.5 }) {
  const { width, height } = useThree((state) => state.viewport)
  return (
    <>
      {/* <Center position={[0, 0, -5]}>
        <Text3D letterSpacing={-0.06} size={0.1} font="/Inter_Medium_Regular.json">
          welcome to
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center> */}
      <Center position={[0, 3, -3]} rotation={[0, 0, 0]}>
        <Text3D
          curveSegments={32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.1}
          height={0.5}
          lineHeight={1}
          letterSpacing={-0.02}
          size={1}
          font="/Inter_Medium_Regular.json">
          {`WELCOME TO \n SPOTIFY XR`}
          <meshNormalMaterial />
        </Text3D>
      </Center>
      {/* <Center position={[0, 0, -5]}>
        <Text3D letterSpacing={-0.06} size={0.1} font="/Inter_Medium_Regular.json">
          osenorth.
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center> */}
    </>
  )
}


// function Button({track, chooseTrack, ...props}) {
//   const [hover, setHover] = useState(false);
//   const [url, setUrl] = useState('/Panel_Assets/Adele_Spotify_Panel.png');
//   const [color, setColor] = useState('blue');

//   const [play, setPlay] = useRecoilState(playState);
//   const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

//   console.log(track)

//   const handlePlay = () => {
//     chooseTrack(track);

//     if (track.uri === playingTrack.uri) {
//       setPlay(!play);
//     }
//   };
//   const onSelect = () => {
//     setColor((Math.random() * 0xffffff) | 0);
//   };

//   const onImageSelect = () => {
//     setUrl('/Panel_Assets/Adele_Detail_Panel.png');
//   };

//   return (
//     <Box>
//       <Interactive onSelect={onImageSelect}>
//         <Image imgSrc={track.albumUrl} position={[0, 0, -1]} />
//       </Interactive>
//     </Box>
//   );
// }

function Right({ spotifyApi, chooseTrack }) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  
  const [hover, setHover] = useState(false);
  const [url, setUrl] = useState('/Panel_Assets/Adele_Spotify_Panel.png');
  const [color, setColor] = useState('blue');

  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const config = useMemo(
    () => ({ size: 40, height: 30, curveSegments: 32, bevelEnabled: true, bevelThickness: 6, bevelSize: 2.5, bevelOffset: 0, bevelSegments: 8 }),
    []
  )

  const initialX = -1;
  const initialY = 0;
  const initialZ = -2;

  // const handlePlay = () => {
  //   chooseTrack(track);

  //   if (track.uri === playingTrack.uri) {
  //     setPlay(!play);
  //   }
  // };
  // const onSelect = () => {
  //   setColor((Math.random() * 0xffffff) | 0);
  // };

  // const onImageSelect = () => {
  //   setUrl('/Panel_Assets/Adele_Detail_Panel.png');
  // };

  // Recently Played Tracks...
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
      setRecentlyPlayed(
        res.body.items.map(({ track }) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);

  return (
    <>
    <ARButton />
    <Canvas>
        <XR referenceSpace="local">
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Image imgSrc={'/Group_16.png'} scale={[1, 0.5, 0.5]} position={[-5, 3, -2]} />
        <Image imgSrc={'/Group_17.png'} scale={[1, 0.5, 0.5]} position={[-3, 3, -2]} />
        <Image imgSrc={'/Group_18.png'} scale={[1, 0.5, 0.5]} position={[-1, 3, -2]} />
        <Image imgSrc={'/Group_19.png'} scale={[1, 0.5, 0.5]} position={[1, 3, -2]} />
        <Image imgSrc={'/Group_20.png'} scale={[1, 0.5, 0.5]} position={[3, 3, -2]} />
        <Image imgSrc={'/Group_21.png'} scale={[1, 0.5, 0.5]} position={[5, 3, -2]} />

        <Box>
          <Interactive>
            {recentlyPlayed.map((track, index) => (
              // <RecentlyPlayed
              //   key={index}
              //   track={track}
              //   chooseTrack={chooseTrack}
              // />
              <>
              <Text color={'black'} font="/Inter_Medium_Regular.json" fontSize={0.2} position={[initialX+(2*index), initialY+1, initialZ]}>{track.title}</Text>
              <Image imgSrc={'/Transparent_Panel.png'} scale={[2,2,1]} position={[initialX+(2*index)-(0.5), initialY, initialZ-1]} />
              <Image imgSrc={track.albumUrl} scale={[1,1,1]} position={[initialX+(2*index), initialY, initialZ]} />
              <Text color={'black'} font="/Inter_Medium_Regular.json" fontSize={0.2} position={[initialX+(2*index), initialY-1, initialZ]}>{track.artist}</Text>
              </>
              ))
            }
          </Interactive>
       </Box>
        <Scene />
       {/* <Text3D font="/Inter_Medium_Regular.json">
            Spotify
            <meshNormalMaterial />
        </Text3D> */}
       <Controllers />
              </XR>
          </Canvas>
      </>
      
  );
}


// const SpotifyPanel = ({track, chooseTrack}) => {

//   console.log(track)
//   return (
//       <>
//           <div>Hello</div>
//           <ARButton />
//           <Canvas>
//               <XR referenceSpace="local">
//               <ambientLight />
//               <pointLight position={[10, 10, 10]} />
//               {/* <Button position={[0, 0.1, -0.2]} track={track} chooseTrack={chooseTrack}/> */}
//               <Controllers />
//               </XR>
//           </Canvas>
//       </>
      
//   )
// }



export default Right;
