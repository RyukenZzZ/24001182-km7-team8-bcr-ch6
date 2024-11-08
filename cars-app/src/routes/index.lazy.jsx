import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getCars } from "../service/car";
import { getModels } from "../service/model";
import { getManufactures } from "../service/manufacture";
import { getTypes } from "../service/type";
import CarItem from "../components/Car/carsItem";
import ModelItem from "../components/Model/ModelItem";
import ManufactureItem from "../components/Manufacture/manufacturesItem";
import TypeCard from "../components/Type/TypeCard";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { token } = useSelector((state) => state.auth);

  const [cars, setCars] = useState([]);
  const [manufactures, setManufactures] = useState([]);
  const [models, setModels] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedData, setSelectedData] = useState("cars");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      setIsLoading(true);
      setError(null);

      try {
        const [carResult, modelResult, manufactureResult, typeResult] =
          await Promise.all([
            getCars(),
            getModels(),
            getManufactures(),
            getTypes(),
          ]);

        // Handle cars
        if (carResult.success) {
          setCars(carResult.data);
        } else {
          setError(
            (prev) => prev || carResult.message || "Failed to fetch cars"
          );
        }

        // Handle models
        if (modelResult.success) {
          setModels(modelResult.data);
        } else {
          setError(
            (prev) => prev || modelResult.message || "Failed to fetch models"
          );
        }

        // Handle manufactures
        if (manufactureResult.success) {
          setManufactures(manufactureResult.data);
        } else {
          setError(
            (prev) =>
              prev ||
              manufactureResult.message ||
              "Failed to fetch manufactures"
          );
        }

        // Handle types
        if (manufactureResult.success) {
          setTypes(typeResult.data);
        } else {
          setError(
            (prev) => prev || typeResult.message || "Failed to fetch types"
          );
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching data");
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
          <h1 className="text-center">
            Please login first to get student data!
          </h1>
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
              className="btn btn-outline-success ms-2"
              onClick={() => setSelectedData("cars")}
            >
              Show Cars
            </button>
            <button
              className="btn btn-outline-secondary ms-2"
              onClick={() => setSelectedData("models")}
            >
              Show Models
            </button>
            <button
              className="btn btn-outline-secondary ms-2"
              onClick={() => setSelectedData("manufactures")}
            >
              Show Manufactures
            </button>
            <button
              className="btn btn-outline-secondary ms-2"
              onClick={() => setSelectedData("types")}
            >
              Show Types
            </button>
          </div>

          {selectedData === "cars" && (
            <div>
              <h2>Cars</h2>
              {cars.length > 0 ? (
                <Row>
                  {cars.map((car) => (
                    <Col key={car.id} md={4} className="mb-4">
                      <CarItem car={car} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <h2>No cars found</h2>
              )}
            </div>
          )}

          {selectedData === "models" && (
            <div>
              <h2>Models</h2>
              {models.length > 0 ? (
                <Row>
                  {models.map((model) => (
                    <Col key={model.id} md={4} className="mb-4">
                      <ModelItem model={model} />
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
                      <ManufactureItem manufacture={manufacture} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <h2>No manufactures found</h2>
              )}
            </div>
          )}

          {selectedData === "types" && (
            <div>
              <h2>Types</h2>
              {types.length > 0 ? (
                <Row>
                  {types.map((type) => (
                    <Col key={type.id} md={4} className="mb-4">
                      <TypeCard type={type} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <h2>No types found</h2>
              )}
            </div>
          )}
        </Col>
      )}
    </Row>
  );
}
