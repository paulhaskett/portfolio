import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";

const Section = (props) => {
    const { children, mobileTop } = props;
    return (<motion.section 
        className={`
        h-screen w-screen p-20 max-w-screen-xl mx-auto 
        flex flex-col items-start
        ${mobileTop ? "justify-start md:justify-center" : "justify-center"}`}
        initial={{
            opacity: 0,
            y: 50,
        }}
        whileInView={{
            opacity: 1,
            y: 0,
            transition:{
                duration: 1,
                delay: 0.6,
            }
        }}
        >{children}</motion.section>);
};
export const Interface = (props) =>{
    const {setSection} = props;
    return (
    <div className="flex flex-col items items-center w-screen">
        <AboutSection setSection={setSection}/>
        <SkillSection/>
        <ProjectsSection />
        <ContactSection />
    </div>
    );
};

const AboutSection = (props) => {
    const {setSection} = props;
    return (
    <Section mobileTop>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-snug mt-8 md:mt-0">
            Hi I am <br/> 
            <span className="bg-white px-1 italic">Paul Haskett </span>
        </h1>
        <motion.p 
        className="text-lg text-gray-600 mt-4"
        initial={{
            opacity: 0,
            y: 25,
        }}
        whileInView={{
            opacity:1,
            y:0,
        }}
        transition={{
            duration: 1,
            delay: 1.5,
        }}
        >
            I make websites for small businesses 
            <br/> 
            Based in Portchester Fareham UK
        </motion.p>
        <motion.button 
        className="bg-indigo-600 text-white py-4 px-8 rounded-md font-bold text-lg mt-4 md:mt-16"
        onClick={()=> setSection(3)}
        initial={{
            opacity: 0,
            y: 25,
        }}
        whileInView={{
            opacity:1,
            y:0,
        }}
        transition={{
            duration: 1,
            delay: 2,
        }}
        >
            Contact Me
        </motion.button>
    </Section>
    );
};

const skills = [
    {
        title: "Wordpress",
        level: 90,
    },
    {
      title: "Threejs / React Three Fiber",
      level: 40,
    },
    {
      title: "React / React Native",
      level: 40,
    },
    {
      title: "Nodejs",
      level: 50,
    },
    {
      title: "Javascript",
      level: 60,
    },
    {
      title: "3D Modeling",
      level: 60,
    },
];
const languages = [
    {
      title: "🇬🇧 English",
      level: 100,
    },
    {
        title: "🇫🇷 French",
        level: 10,
    },
    
];

const SkillSection = () => {

    return (
        <Section>
            <motion.div className="w-full" whileInView={"visible"}>
                <h2 className="text-3xl md:text-5xl font-bold mt-10 text-white">Skills</h2>
                <div className="mt-8 space-y-4">
                    {skills.map((skill, index) => (
                        <div className="w-full md:w-64" key={index}>
                            <motion.h3 className="text-lg font-bold text-gray-100" 
                            initial={{
                                opacity: 0,
                                
                            }}
                            variants={{
                                visible:{
                                    opacity: 1,
                                    transition:{
                                        duration: 1,
                                        delay: 1 + index * 0.2,
        
                                    }

                                }
                            }}
                            
                            >{skill.title}</motion.h3>
                            <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                                <motion.div className="h-full bg-indigo-500 rounded-full" 
                                style={{width: `${skill.level}%`}}
                                initial={{
                                    scaleX: 0,
                                    originX: 0,
                                }}
                                variants={{
                                    visible:{
                                        scaleX: 1,
                                        transition:{
                                            duration: 1,
                                            delay: 1 + index * 0.2,
                                        }
                                    }
                                }}
                                ></motion.div>
                            </div>
                        </div>
                    ))}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white">Languages</h2>
                <div className="mt-8 space-y-4">
                    {languages.map((language, index) => (
                        <div className="w-64" key={index}>
                            <motion.h3 className="text-lg font-bold text-gray-100" 
                            initial={{
                                opacity:0
                            }}
                            whileInView={{
                                opacity:1
                            }}
                            transition={{
                                duration: 1,
                                delay: 2 + index * 0.2,
                            }}
                            >{language.title}</motion.h3>
                            <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                                <motion.div className="h-full bg-indigo-500 rounded-full" 
                                style={{width: `${language.level}%`}}
                                initial={{
                                    scaleX: 0,
                                    originX: 0,
                                }}
                                whileInView={{
                                    scaleX: 1
                                }}
                                transition={{
                                    duration: 1,
                                    delay: 2 + index * 0.2,
                                }}></motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </Section>
    );
};

const ProjectsSection = () => {

    const [currentProject, setCurrentProject ] = useAtom(currentProjectAtom);
    const nextProject = () => {
        setCurrentProject((currentProject + 1) % projects.length );
    }
    const previousProject = () => {
        setCurrentProject((currentProject - 1) % projects.length );
    }
    return (
        <Section>
            <div className="flex w-full gap-8 items-center justify-center">
                <button className="hover:text-indigo-600 transition-colors" onClick={previousProject}>
                    previous
                </button>
                <h2 className="font-bold text-3xl md:text-5xl">Projects</h2>
                <button className="hover:text-indigo-600 transition-colors" onClick={nextProject}>
                    next
                </button>
            </div>
        </Section>
    );
};

const ContactSection = () => {
    return (
      <Section>
        <h2 className="text-3xl md:text-5xl font-bold">Contact me</h2>
        <div className="mt-8 p-8 rounded-md bg-white w-96 max-w-full">
          <form>
            <label htmlFor="name" className="font-medium text-gray-900 block mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <label
              htmlFor="email"
              className="font-medium text-gray-900 block mb-1 mt-8"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <label
              htmlFor="email"
              className="font-medium text-gray-900 block mb-1 mt-8"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <button className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 ">
              Submit
            </button>
          </form>
        </div>
      </Section>
    );
};