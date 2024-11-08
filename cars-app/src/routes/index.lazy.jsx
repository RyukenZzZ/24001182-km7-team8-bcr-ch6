import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getModels } from "../service/model";
import { getManufactures } from "../service/manufacture";
import ModelItem from "../components/Model/ModelItem";
import ManufactureItem from "../components/Manufacture/manufacturesItem";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { token } = useSelector((state) => state.auth);

  const [manufactures, setManufactures] = useState([]);
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedData, setSelectedData] = useState("cars");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      setIsLoading(true);
      setError(null);

      try {
        const [modelResult, manufactureResult] = await Promise.all([getModels(), getManufactures()]);

        if (modelResult.success) {
          setModels(modelResult.data);
        } else {
          setError(modelResult.message || "Failed to fetch models");
        }

        if (manufactureResult.success) {
          setManufactures(manufactureResult.data);
        } else {
          setError(manufactureResult.message || "Failed to fetch manufactures");
        }
      } catch (err) {
        err("An error occurred while fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (!token) {
    return (
      <Row className="mt-4">
        <Col>
          <h1 className="text-center">Please login first to get student data!</h1>
        </Col>
      </Row>
    );
  }

  if (isLoading) {
    return (
      <Row className="mt-4">
        <h1>Loading...</h1>
      </Row>
    );
  }

 return (
  <Row className="mt-4">
    {error ? (
      <Col>
        <h1 className="text-danger">{error}</h1>
      </Col>
    ) : (
      <Col>
        <h1 className="text-primary">Data Selection</h1>
        <div className="mb-4">
          <button 
            className="btn btn-outline-primary me-2" 
            onClick={() => setSelectedData("models")}
          >
            Show Models
          </button>
          <button 
            className="btn btn-outline-secondary" 
            onClick={() => setSelectedData("manufactures")}
          >
            Show Manufactures
          </button>
        </div>

        {selectedData === "models" && (
          <div>
            <h2>Models</h2>
            {models.length > 0 ? (
              <Row>
                {models.map((model) => (
                  <Col key={model.id} md={4} className="mb-4">
                    <div>
                      <div>
                        <ModelItem model={model} />
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            ) : (
              <h2>No models found</h2>
            )}
          </div>
        )}

        {selectedData === "manufactures" && (
          <div>
            <h2>Manufactures</h2>
            {manufactures.length > 0 ? (
              <Row>
                {manufactures.map((manufacture) => (
                  <Col key={manufacture.id} md={4} className="mb-4">
                    <div>
                      <div>
                        <ManufactureItem manufacture={manufacture} />
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            ) : (
              <h2>No manufactures found</h2>
            )}
          </div>
        )}
      </Col>
    )}
  </Row>
);
}