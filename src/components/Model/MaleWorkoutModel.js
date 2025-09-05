import React, { useState, useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import AdvancedWorkoutModel from "./AdvancedWorkoutModel";

export default function MaleWorkoutModel(props) {
  const { modelName, zRotationMul, scaleMul } = props;
  const [yPosition, setYPosition] = useState(-1.5);
  const [isRotated, setIsRotated] = useState(false);
  const [factor, setFactor] = useState(0.275);
  const isJumpingJacks = modelName === "jumpingjacks";

  const group = useRef();

  useGLTF.preload(`/models/male/${modelName}.glb`);
  const { nodes, materials, animations } = useGLTF(
    `/models/male/${modelName}.glb`
  );
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    if (actions) {
      const action =
        (modelName === "lunges" &&
          actions["Armature|lunge animation|Anima_Layer"]) ||
        (modelName === "bicepcurls" &&
          actions["Armature|bicep both hands|Anima_Layer"]) ||
        (modelName === "pullups" && actions["Armature|pull up|Anima_Layer"]) ||
        actions["Armature|mixamo.com|Layer0"];
      action?.play();
    }
  });

  useEffect(() => {
    switch (modelName) {
      case "burpees":
        setFactor(0.2);
        break;
      case "bicyclecrunches":
        setFactor(0.25);
        setYPosition(-3);
        break;
      case "plank":
        setFactor(1.75);
        setIsRotated(true);
        break;
      case "pushups":
        setFactor(1.52);
        setIsRotated(true);
        break;
      case "pikewalk":
        setFactor(1.75);
        setYPosition(-1);
        setIsRotated(true);
        break;
      case "situps":
        setFactor(185);
        setIsRotated(true);
        break;
      case "jumpingjacks":
        setFactor(2);
        setIsRotated(true);
        break;
      default:
        break;
    }
  }, []);

  if (
    modelName === "pullups" ||
    modelName === "lunges" ||
    modelName === "bicepcurls"
  )
    return (
      <AdvancedWorkoutModel
        modelName={modelName}
        scaleMul={scaleMul}
        zRotationMul={zRotationMul}
        nodes={nodes}
        materials={materials}
        group={group}
        props={props}
      />
    );

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Armature"
          rotation={[
            isRotated ? Math.PI / 2 : 0,
            isRotated ? 0 : Math.PI * zRotationMul,
            isRotated ? -Math.PI * zRotationMul : 0,
          ]}
          scale={scaleMul * factor}
          position={[0, yPosition, 0]}
        >
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="tshirt"
            geometry={nodes.tshirt.geometry}
            material={materials.tshirt}
            skeleton={nodes.tshirt.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          {nodes?.tshirt002 && (
            <skinnedMesh
              name="tshirt002"
              geometry={nodes.tshirt002.geometry}
              material={materials["Hair Black.001"]}
              skeleton={nodes.tshirt002.skeleton}
              rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
            />
          )}
          {nodes?.tshirt003 && (
            <skinnedMesh
              name="tshirt003"
              geometry={nodes.tshirt003.geometry}
              material={materials["Hair Black.001"]}
              skeleton={nodes.tshirt003.skeleton}
            />
          )}
          <skinnedMesh
            name="tshirt004"
            geometry={nodes.tshirt004.geometry}
            material={materials["Hair Black.001"]}
            skeleton={nodes.tshirt004.skeleton}
          />
          {nodes?.tshirt005 && (
            <skinnedMesh
              name="tshirt005"
              geometry={nodes.tshirt005.geometry}
              material={materials["Hair Black.001"]}
              skeleton={nodes.tshirt005.skeleton}
              rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
            />
          )}
          <skinnedMesh
            name="tshirt006"
            geometry={nodes.tshirt006.geometry}
            material={materials["Hair Black.001"]}
            skeleton={nodes.tshirt006.skeleton}
          />
          <skinnedMesh
            name="tshirt007"
            geometry={nodes.tshirt007.geometry}
            material={materials["Hair Black.001"]}
            skeleton={nodes.tshirt007.skeleton}
          />
          <group name="tshirt009">
            <skinnedMesh
              name="tshirtmesh008"
              geometry={
                nodes.tshirtmesh008?.geometry || nodes.tshirtmesh007.geometry
              }
              material={materials["Eye.001"]}
              skeleton={
                nodes.tshirtmesh008?.skeleton || nodes.tshirtmesh007.skeleton
              }
              rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
            />
            {nodes.tshirtmesh008_1 && (
              <skinnedMesh
                name="tshirtmesh008_1"
                geometry={nodes.tshirtmesh008_1?.geometry}
                material={materials["eye pinnk.001"]}
                skeleton={nodes.tshirtmesh008_1?.skeleton}
                rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
              />
            )}
            <skinnedMesh
              name="tshirtmesh008_2"
              geometry={
                nodes.tshirtmesh008_2?.geometry ||
                nodes.tshirtmesh007_2.geometry
              }
              material={materials["eye black.001"]}
              skeleton={
                nodes.tshirtmesh008_2?.skeleton ||
                nodes.tshirtmesh007_2.skeleton
              }
              rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
            />
          </group>
          <skinnedMesh
            name="tshirt010"
            geometry={nodes.tshirt010.geometry}
            material={materials.face}
            skeleton={nodes.tshirt010.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          <skinnedMesh
            name="tshirt011"
            geometry={nodes.tshirt011.geometry}
            material={materials.hands}
            skeleton={nodes.tshirt011.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          <skinnedMesh
            name="tshirt012"
            geometry={nodes.tshirt012.geometry}
            material={materials.hands}
            skeleton={nodes.tshirt012.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          <skinnedMesh
            name="tshirt013"
            geometry={nodes.tshirt013.geometry}
            material={materials.legs}
            skeleton={nodes.tshirt013.skeleton}
          />
          <skinnedMesh
            name="tshirt014"
            geometry={nodes.tshirt014.geometry}
            material={materials.legs}
            skeleton={nodes.tshirt014.skeleton}
          />
          <skinnedMesh
            name="tshirt015"
            geometry={nodes.tshirt015.geometry}
            material={nodes.tshirt015.material}
            skeleton={nodes.tshirt015.skeleton}
          />
          <skinnedMesh
            name="tshirt016"
            geometry={nodes.tshirt016.geometry}
            material={nodes.tshirt016.material}
            skeleton={nodes.tshirt016.skeleton}
          />
          <skinnedMesh
            name="tshirt017"
            geometry={nodes.tshirt017.geometry}
            material={materials.Jeans}
            skeleton={nodes.tshirt017.skeleton}
          />
          <skinnedMesh
            name="tshirt018"
            geometry={nodes.tshirt018.geometry}
            material={materials["ShoeLace left"]}
            skeleton={nodes.tshirt018.skeleton}
          />
          <skinnedMesh
            name="tshirt019"
            geometry={nodes.tshirt019.geometry}
            material={materials.Shoes}
            skeleton={nodes.tshirt019.skeleton}
          />
          <skinnedMesh
            name="tshirt020"
            geometry={nodes.tshirt020.geometry}
            material={materials.Shoes}
            skeleton={nodes.tshirt020.skeleton}
          />
          <skinnedMesh
            name="tshirt021"
            geometry={nodes.tshirt021.geometry}
            material={nodes.tshirt021.material}
            skeleton={nodes.tshirt021.skeleton}
          />
          <skinnedMesh
            name="tshirt022"
            geometry={nodes.tshirt022.geometry}
            material={materials.Shoes}
            skeleton={nodes.tshirt022.skeleton}
          />
          <skinnedMesh
            name="tshirt023"
            geometry={nodes.tshirt023.geometry}
            material={materials.Shoes}
            skeleton={nodes.tshirt023.skeleton}
          />
          <skinnedMesh
            name="tshirt024"
            geometry={nodes.tshirt024.geometry}
            material={nodes.tshirt024.material}
            skeleton={nodes.tshirt024.skeleton}
          />
          <skinnedMesh
            name="tshirt025"
            geometry={nodes.tshirt025.geometry}
            material={materials["Shoes feet"]}
            skeleton={nodes.tshirt025.skeleton}
          />
          <skinnedMesh
            name="tshirt026"
            geometry={nodes.tshirt026.geometry}
            material={materials["Shoes feet"]}
            skeleton={nodes.tshirt026.skeleton}
          />
          <skinnedMesh
            name="tshirt027"
            geometry={nodes.tshirt027.geometry}
            material={materials["Shoes feet"]}
            skeleton={nodes.tshirt027.skeleton}
          />
          <skinnedMesh
            name="tshirt028"
            geometry={nodes.tshirt028.geometry}
            material={materials["Shoes feet"]}
            skeleton={nodes.tshirt028.skeleton}
          />
          <skinnedMesh
            name="tshirt029"
            geometry={nodes.tshirt029.geometry}
            material={materials["ShoeLace right"]}
            skeleton={nodes.tshirt029.skeleton}
          />
          <skinnedMesh
            name="tshirt030"
            geometry={nodes.tshirt030.geometry}
            material={materials["shirt black"]}
            skeleton={nodes.tshirt030.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          {nodes?.tshirt031 && (
            <skinnedMesh
              name="tshirt031"
              geometry={nodes.tshirt031.geometry}
              material={materials["hair black"] || materials["Hair Black.001"]}
              skeleton={nodes.tshirt031.skeleton}
              rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
            />
          )}
          {nodes?.tshirt032 && (
            <skinnedMesh
              name="tshirt032"
              geometry={nodes.tshirt032.geometry}
              material={materials["hair black"] || materials["Hair Black.001"]}
              skeleton={nodes.tshirt032.skeleton}
              rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
            />
          )}
          {nodes?.tshirt033 && (
            <skinnedMesh
              name="tshirt033"
              geometry={nodes.tshirt033.geometry}
              material={materials["Hair Black.001"]}
              skeleton={nodes.tshirt033.skeleton}
              rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
            />
          )}
          <skinnedMesh
            name="tshirt034"
            geometry={nodes.tshirt034.geometry}
            material={nodes.tshirt034.material}
            skeleton={nodes.tshirt034.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          <skinnedMesh
            name="tshirt035"
            geometry={nodes.tshirt035.geometry}
            material={nodes.tshirt035.material}
            skeleton={nodes.tshirt035.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          <skinnedMesh
            name="tshirt037"
            geometry={nodes.tshirt037.geometry}
            material={nodes.tshirt037.material}
            skeleton={nodes.tshirt037.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          <skinnedMesh
            name="tshirt038"
            geometry={nodes.tshirt038.geometry}
            material={nodes.tshirt038.material}
            skeleton={nodes.tshirt038.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          <skinnedMesh
            name="tshirt040"
            geometry={nodes.tshirt040.geometry}
            material={nodes.tshirt040.material}
            skeleton={nodes.tshirt040.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          <skinnedMesh
            name="tshirt041"
            geometry={nodes.tshirt041.geometry}
            material={nodes.tshirt041.material}
            skeleton={nodes.tshirt041.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          {nodes?.tshirt042 && (
            <skinnedMesh
              name="tshirt042"
              geometry={nodes.tshirt042.geometry}
              material={nodes.tshirt042.material}
              skeleton={nodes.tshirt042.skeleton}
            />
          )}
          <skinnedMesh
            name="tshirt043"
            geometry={nodes.tshirt043.geometry}
            material={nodes.tshirt043.material}
            skeleton={nodes.tshirt043.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          <skinnedMesh
            name="tshirt044"
            geometry={nodes.tshirt044.geometry}
            material={nodes.tshirt044.material}
            skeleton={nodes.tshirt044.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          <skinnedMesh
            name="tshirt046"
            geometry={nodes.tshirt046.geometry}
            material={nodes.tshirt046.material}
            skeleton={nodes.tshirt046.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          <skinnedMesh
            name="tshirt047"
            geometry={nodes.tshirt047.geometry}
            material={nodes.tshirt047.material}
            skeleton={nodes.tshirt047.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          {nodes?.tshirt048 && (
            <skinnedMesh
              name="tshirt048"
              geometry={nodes.tshirt048.geometry}
              material={nodes.tshirt048.material}
              skeleton={nodes.tshirt048.skeleton}
            />
          )}
          <skinnedMesh
            name="tshirt049"
            geometry={nodes.tshirt049.geometry}
            material={nodes.tshirt049.material}
            skeleton={nodes.tshirt049.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          <skinnedMesh
            name="tshirt050"
            geometry={nodes.tshirt050.geometry}
            material={nodes.tshirt050.material}
            skeleton={nodes.tshirt050.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          <skinnedMesh
            name="tshirt052"
            geometry={nodes.tshirt052.geometry}
            material={nodes.tshirt052.material}
            skeleton={nodes.tshirt052.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
          <skinnedMesh
            name="tshirt053"
            geometry={nodes.tshirt053.geometry}
            material={nodes.tshirt053.material}
            skeleton={nodes.tshirt053.skeleton}
            rotation={isJumpingJacks ? [Math.PI, 0, 0] : [0, 0, 0]}
          />
        </group>
      </group>
    </group>
  );
}
