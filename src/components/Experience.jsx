import { Float, MeshDistortMaterial, MeshWobbleMaterial, useScroll } from "@react-three/drei";
import { Office } from "./Office";
import { motion } from "framer-motion-3d";
import { Avatar } from "./Avatar";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../Config";
import { Projects } from "./Projects";
import { Background } from "./Background";




export const Experience = (props) => {
  const { menuOpened } = props;  
  const { viewport } = useThree();
  const data = useScroll();

  const isMobile = window.innerWidth < 782;
  const responsiveRatio = viewport.width / 12;
  const officeRatio = Math.max(0.5, Math.min(0.9 * responsiveRatio, 0.9));

  const [ section, setSection ] = useState(0);
  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();
  const [ characterAnimation, setCharacterAnimation ] = useState("Typing");

  useEffect(()=>{

  
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    } );
    


  },[menuOpened]);

  const characterContainerAboutRef = useRef();
  const characterGroup = useRef();

  
  
  useEffect(()=> {

    
    
    setCharacterAnimation("Falling");
    

    setTimeout(()=>{
      setCharacterAnimation( section === 0 ? "Typing" : "Standing" );
    }, 600);
    
  }, [section]);

  // Example logging to console
  useEffect(() => {
    
    console.log("Current section:", section);
    console.log("Current character animation:", characterAnimation);
  }, [section, characterAnimation, menuOpened]); // Log changes to section and animation


  useFrame((state) => {  
  
    

    let curSection = Math.floor(data.scroll.current * data.pages);
    if(curSection > 3){
      curSection = 3;
    }
    if(curSection !== section){
      setSection(curSection);
    }
    console.log("section - "+ section);

    state.camera.position.x = cameraPositionX.get();    
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);

   
    if(section === 0){

      characterContainerAboutRef.current.getWorldPosition(
        characterGroup.current.position
      );
      


    }


    //const quaternion = new THREE.Quaternion();
    //characterContainerAboutRef.current.getWorldQuaternion(quaternion);
    //const euler = new THREE.Euler();
    //euler.setFromQuaternion(quaternion, "XYZ");
    //console.log([euler.x, euler.y, euler.z]);
 
    
  });
  return (
    <>
      <Background />
      <ambientLight intensity={1} />
      { /* ABOUT SECTION */ }
      
      {/* Avatar group */}
      <motion.group
      
      ref={characterGroup}
      rotation={[0, 0.7853981633974485, 0]}
      animate={"" + section}
      scale={[officeRatio, officeRatio, officeRatio]}
      transition={{
        duration: 0.6,
      }}
      variants={{
        0: {
          
          scaleX: officeRatio,
          scaleY: officeRatio,
          scaleZ: officeRatio,
        },
        1: {
          y: -viewport.height + 0.5,
          x: 0,
          z: 7,
          rotationX: 0,
          rotationY: isMobile ? -Math.PI / 2 : 0,
          rotationZ: 0,
          scaleX: 1,
          scaleY: 1,
          scaleZ: 1,
        },
        2: {
          y: -viewport.height * 2 + 0.5,
          x: isMobile ? -1.4 : -2,          
          z: 0,
          rotateX: 0,
          rotationY: Math.PI / 2,
          rotateZ: 0,
          scaleX: 1,
          scaleY: 1,
          scaleZ: 1,
        },
        3: {
          y: -viewport.height * 3 + 1,
          x: 0.3,
          z: 8.5,
          rotateX: 0,
          rotateY: -Math.PI / 4,
          rotateZ: 0,
          scaleX: 1,
          scaleY: 1,
          scaleZ: 1,
        },
      }}>

        <Avatar animation={characterAnimation} setCharacterAnimation={setCharacterAnimation} wireframe={section === 1} section={section}/>
      </motion.group>


      <motion.group       
     
      position={[ isMobile ? 0 : 1.5 * responsiveRatio, isMobile ? -viewport.height / 6 : 2, 3]} 
      scale={[ officeRatio, officeRatio, officeRatio]} 
      rotation-y={ Math.PI / 4 } 
      animate={{
        y: isMobile ? -viewport.height / 6 : 0, 
      }}
      transition={{
        duration: 0.8,
      }}>

      <Office section={section}/>
      <group
        ref={characterContainerAboutRef}
        name="CharacterSpot"
        position={[0, 0, 0]}
        
      ></group>
    
      </motion.group>

        {/* SKILLS SECTION */ }
      <motion.group position={[0, -1.5, -10]}
      animate={{
        z: section === 1 ? 0 : -10,
        y: section === 1 ? -viewport.height : (isMobile ? -viewport.height : -1.5 * officeRatio),
      }}>
          
        
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[1, -3, -15]} scale={section === 0 ?[0, 0, 0] : [2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial opacity={0.8} transparent distort={0.4} speed={4} color={"red"}/>
          </mesh>
        </Float>
        <Float >
          <mesh position={[3, 1, -18]} scale={section === 0 ?[0, 0, 0] : [2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial opacity={0.8} transparent distort={1} speed={5} color={"yellow"}/>
          </mesh>
        </Float>
        <Float>
        <mesh position={[-3, -1, -11]} scale={section === 0 ?[0, 0, 0] : [2, 2, 2]}>
            <boxGeometry />
            <MeshWobbleMaterial opacity={0.8} transparent factor={1} speed={5} color={"blue"}/>
          </mesh>
        </Float>
        
        </motion.group>
        <Projects />
      
      
      
    </>
  );
};
