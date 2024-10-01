import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Row, Col } from "react-bootstrap";
import ProjectCards from "../components/ProjectCards";
import { allProjects } from "../services/allApis";

function Project() {
  const [projects, setProjects] = useState([]);
  const [logStatus, setLogStatus] = useState(false);
  const[search,setSearch]=useState("")

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      getData();
      setLogStatus(true);
    } else {
      console.log("Login First");
      setLogStatus(false);
    }
  }, [search]);
  console.log(projects);

  const getData = async () => {
    const header = {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };
    const result = await allProjects(header,search);
    console.log(result);
    if (result.status == 200) {
      setProjects(result.data);
    } else {
      console.log(result.response.data);
    }
  };
  return (
    <>
      <Header status={true} />
      <div className="p-5">
        <div className="d-flex justify-content-between my-4">
          <h1>All Projects</h1>
          <input
            type="text"
            name="" onChange={(e)=>{setSearch(e.target.value)}}
            className="form-control w-25"
            placeholder="Enter languages for project search"
            id=""
          />
        </div>
        {logStatus ? (
          <Row>
            {projects.length > 0 ? (
              projects.map((item) => (
                <Col>
                  <ProjectCards project={item} />
                </Col>
              ))
            ) : (
              <h2 className="tect-center text-danger">No projects!!</h2>
            )}
          </Row>
        ) : (
          <h1 className="text-center text-warning">Please login first</h1>
        )}
      </div>
    </>
  );
}

export default Project;
