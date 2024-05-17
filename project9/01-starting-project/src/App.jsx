import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";

function App() {
  const [projectState,setProjectsState]=useState({
    selectedProjectId:undefined,
    projects:[]
  });
  function handleStartAddProject(){
    setProjectsState((prevState)=>{
      return {
        ...prevState,
        selectedProjectId:null,

      };
    })
  }
  function handleAddProject(projectData){
    setProjectsState((prevState)=>{
      const projId=Math.random();
      const newproject={
        ...projectData,
        id:projId
      };
      return{
        ...prevState,
        selectedProjectId:undefined,
        projects:[...prevState.projects,newproject]
      }
    })
  }
  function handleCancelAddProject(){
    setProjectsState((prevState)=>{
      return {
        ...prevState,
        selectedProjectId:undefined,

      };
    })
  }

  let content;
  if(projectState.selectedProjectId=== null){
    content=<NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  }
  else if(projectState.selectedProjectId=== undefined){
    content=<NoProjectSelected  onStartAddProject={handleStartAddProject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8">
    <ProjectSidebar projects={projectState.projects} onStartAddProject={handleStartAddProject}/>
    {content}
    </main>
  );
}

export default App;
