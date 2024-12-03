import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/Interface";
import { Suspense, useEffect, useState } from "react";
import { ScrollManager } from "./components/ScrollManager";
import { Menu } from "./components/Menu";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { framerMotionConfig } from "./Config";
import { LoadingScreen } from "./components/LoadingScreen";

function App() {
  const [ section, setSection ] = useState(0);
  const [ menuOpened, setMenuOpened ] = useState(false);
  const [ started, setStarted ] = useState(false);

  useEffect(()=>{
    setMenuOpened(false);
  }, [section]);

  return (
    <>
    <LoadingScreen started={started} setStarted={setStarted} />
    <MotionConfig transition={{
      ...framerMotionConfig,
    }}>
    <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
        <color attach="background" args={["#eeeeFF"]} />
        <ScrollControls pages={4} damping={0.1}>
          <ScrollManager section={section} onSectionChange={setSection} />
          <Scroll>
            <Suspense fallback={null}>
              {started && (
                <Experience section={section} menuOpened={menuOpened}/>
              )}             
            </Suspense>            
          </Scroll>

          <Scroll html>
            <Suspense>
              {started && <Interface setSection={setSection}/>}   
            </Suspense>           
          </Scroll>

        </ScrollControls>
        
      </Canvas>
      <Menu onSectionChange={setSection} menuOpened={menuOpened} setMenuOpened={setMenuOpened}/>
    </MotionConfig>
      
    <Leva hidden/>
      
    </>
    
  );
}

export default App;
