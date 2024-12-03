import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';

import { useControls } from 'leva';
import * as THREE from "three";

export function Avatar(props) {
  const { animation, setCharacterAnimation, wireframe, section } = props;
  const { headFollow } = useControls({
    headFollow: false,
    wireframe: false,
    
  });

  const group = useRef();
  const { nodes, materials } = useGLTF('models/avatar/67040a441243f7cfd1236fb4.glb');
  const { animations } = useGLTF("animations/animations.glb",
     {
      interpolate: (current, target) => ({
        ...current,
        ...target,
        characterAnimation: current.characterAnimation.interpolate(target.characterAnimation),
      }),
    }
  );
  

  

  const { actions } = useAnimations(
    animations,
    group
  );

  

  useFrame((state) => {
    if (headFollow && section === 0) {
      setCharacterAnimation("Talking");
      
     
      
      group.current.getObjectByName("Head").lookAt(state.camera.position);
      
    }else if(!headFollow && section === 0){
      
        setCharacterAnimation("Typing");
      
      
    }
    
  });
  useEffect(() => {
    console.log('current actions', actions[animation]);
    actions[animation].reset().fadeIn(0.5).play();
    return () => {
      actions[animation].reset().fadeOut(0.5);
    };

  }, [animation]);

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      material.wireframe = wireframe
    });
  }, [wireframe]);

  return (
    <group {...props} ref={group} dispose={null}>
      <group>
        <primitive object={nodes.Hips} />
        <skinnedMesh geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} frustumCulled={false} />
        <skinnedMesh geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} frustumCulled={false} />
        <skinnedMesh geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} frustumCulled={false} />
        <skinnedMesh geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} frustumCulled={false} />
        <skinnedMesh geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} frustumCulled={false} />
        <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} frustumCulled={false} />
        <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} frustumCulled={false} />
        <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} frustumCulled={false} />
        <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} frustumCulled={false} />
        <skinnedMesh name="Wolf3D_Beard" geometry={nodes.Wolf3D_Beard.geometry} material={materials.Wolf3D_Beard} skeleton={nodes.Wolf3D_Beard.skeleton} morphTargetDictionary={nodes.Wolf3D_Beard.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Beard.morphTargetInfluences} frustumCulled={false} />
      </group>
    </group>
  );
}

useGLTF.preload('models/avatar/67040a441243f7cfd1236fb4.glb');
useFBX.preload("animations/animations.glb");

