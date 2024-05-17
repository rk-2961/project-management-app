import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState,setProjectsState]=useState({
    selectedProjectId:undefined,
    projects:[],
    tasks:[]
  });
  function handleAddTask(text){
    setProjectsState((prevState)=>{
      const taskId=Math.random();
      const newTask={
        text:text,
        
        projectId:prevState.selectedProjectId,
        id:taskId,
      };
      return{
        ...prevState,
        tasks:[...prevState.tasks,newTask]
      };}
    )
  }
  function handleDeleteTask(id){
    setProjectsState((prevState)=>{
      return{
        ...prevState,
        tasks:prevState.tasks.filter((task)=>task.id !== id),

      };
    });
    
  }
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
  function handleSelectProject(id){
    setProjectsState((prevState)=>{
      return{
        ...prevState,
        selectedProjectId:id,
      };
    });
  }
  function handleDeleteProject(){
    setProjectsState((prevState)=>{
      return{
        ...prevState,
        selectedProjectId:undefined,
        projects:prevState.projects.filter((project)=>project.id !== prevState.selectedProjectId),

      };
    });
  }
  const selectedProject=projectState.projects.find(project=>project.id===projectState.selectedProjectId);
  let content=<SelectedProject project={selectedProject} onDelete={handleDeleteProject} onDeleteTask={handleDeleteTask} onAddtask={handleAddTask} tasks={projectState.tasks}/>;
  if(projectState.selectedProjectId=== null){
    content=<NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  }
  else if(projectState.selectedProjectId=== undefined){
    content=<NoProjectSelected  onStartAddProject={handleStartAddProject}/>
  }
  else{

  }
  return (
    <main className="h-screen my-8 flex gap-8">
    <ProjectSidebar selectedProjectId={projectState.selectedProjectId}  onSelectProject={handleSelectProject} projects={projectState.projects} onStartAddProject={handleStartAddProject}/>
    {content}
    </main>
  );
}

export default App;
