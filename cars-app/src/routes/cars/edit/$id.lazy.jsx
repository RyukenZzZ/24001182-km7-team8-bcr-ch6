import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import Protected from "../../../components/Auth/Protected";
import { useEffect, useState } from "react";
import { getModels } from "../../../service/model";
import { getManufactures } from "../../../service/manufacture";
import { getTypes } from "../../../service/type";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { getCarById, updateCar } from "../../../service/car";

export const Route = createLazyFileRoute("/cars/edit/$id")({
  component: () => (
    <Protected roles={[1]}>
      <EditCar />
    </Protected>
  ),
});

function EditCar() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const [available, setAvailable] = useState(false);
  const [availableAt, setAvailableAt] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(undefined);
  const [currentImage, setCurrentImage] = useState(undefined);
  const [options, setOptions] = useState([]);
  const [plate, setPlate] = useState("");
  const [rentPerDay, setRentPerDay] = useState(0);
  const [specs, setSpecs] = useState([]);
  const [transmission, setTransmission] = useState("");
  const [year, setYear] = useState([0]);

  const [models, setModels] = useState([]);
  const [manufactures, setManufactures] = useState([]);
  const [types, setTypes] = useState([]);

  const [modelId, setModelId] = useState([0]);
  const [manufactureId, setManufactureId] = useState([0]);
  const [typeId, setTypeId] = useState([0]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [modelResult, manufactureResult, typeResult] = await Promise.all([
        getModels(),
        getManufactures(),
        getTypes(),
      ]);
      if (modelResult.success) {
        setModels(modelResult.data);
      } else toast.error(modelResult.message);

      if (manufactureResult.success) {
        setManufactures(manufactureResult.data);
      } else toast.error(manufactureResult.message);

      if (typeResult.success) {
        setTypes(typeResult.data);
      } else toast.error(typeResult.message);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getDetailCarsData = async () => {
      setIsLoading(true);
      const result = await getCarById(id);
      if (result.success) {
        setPlate(result.data.plate);
        setManufactureId(result.data.manufacture_id);
        setTypeId(result.data.type_id);
        setModelId(result.data.model_id);
        setDescription(result.data.description);
        setRentPerDay(result.data.rentPerDay);
        setCapacity(result.data.capacity);
        setAvailable(result.data.available);
        setAvailableAt(result.data.availableAt.split("T")[0]);
        setImage(result.data.image);
        setSpecs(result.data.specs);
        setOptions(result.data.options);
        setTransmission(result.data.transmission);
        setYear(result.data.year);
        setIsLoading(false);
      } else {
        toast.error(result.message);
        setIsLoading(false);
      }
    };
    getDetailCarsData();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsUpdateLoading(true);
    const request = {
      plate,
      manufactureId,
      modelId,
      typeId,
      description,
      rentPerDay,
      capacity,
      available,
      availableAt,
      image,
      specs,
      options,
      transmission,
      year,
    };
    const result = await updateCar(id, request);
    if (result.success) {
      toast.success("Car updated successfully");
      navigate({ to: `/cars/${id}` });
      setIsUpdateLoading(false);
    } else {
      toast.error(result.message);
    }
    setIsUpdateLoading(false);
  };
  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Card>
          <Card.Body>
            <Card.Title>Edit Cars</Card.Title>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="plate">
                <Form.Label>Plate</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    value={plate}
                    onChange={(event) => setPlate(event.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="manufacture">
                <Form.Label>Manufacture</Form.Label>
                <Col sm={9}>
                  <Form.Select
                    value={manufactureId}
                    onChange={(event) => setManufactureId(event.target.value)}
                  >
                    <option disabled value="">
                      Select a manufacture
                    </option>
                    {!isLoading &&
                      manufactures.length &&
                      manufactures.map((manufacture) => (
                        <option key={manufacture.id} value={manufacture.id}>
                          {manufacture.name}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="model">
                <Form.Label>Model</Form.Label>
                <Col sm={9}>
                  <Form.Select
                    value={modelId}
                    onChange={(event) => setModelId(event.target.value)}
                  >
                    <option disabled value="">
                      Select a model
                    </option>
                    {!isLoading &&
                      models.length &&
                      models.map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="rentPerDay">
                <Form.Label>Rent Per Day</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="number"
                    value={rentPerDay}
                    onChange={(event) => setRentPerDay(event.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="capacity">
                <Form.Label>Capacity</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="number"
                    value={capacity}
                    onChange={(event) => setCapacity(event.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="transmission">
                <Form.Label>Transmission</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    value={transmission}
                    onChange={(event) => setTransmission(event.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="available">
                <Form.Label>Available</Form.Label>
                <Col sm={9}>
                  <Form.Check
                    type="switch"
                    id="available-switch"
                    checked={available}
                    label="Yes"
                    onChange={(event) => setAvailable(event.target.checked)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="availableAt">
                <Form.Label>Date</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="date"
                    value={availableAt}
                    onChange={(event) => setAvailableAt(event.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="type">
                <Form.Label>Type</Form.Label>
                <Col sm={9}>
                  <Form.Select
                    value={typeId}
                    onChange={(event) => setTypeId(event.target.value)}
                  >
                    <option disabled value="">
                      Select a type
                    </option>
                    {!isLoading &&
                      types.length &&
                      types.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="option">
                <Form.Label>Option</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    value={options}
                    onChange={(event) => setOptions(event.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="spec">
                <Form.Label>Specs</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    value={specs}
                    onChange={(event) => setSpecs(event.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="year">
                <Form.Label>Year</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="number"
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="logo">
                <Form.Label column sm={9}>
                  Image
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="file"
                    placeholder="Choose File"
                    onChange={(event) => {
                      setImage(event.target.files[0]);
                      setCurrentImage(
                        URL.createObjectURL(event.target.files[0])
                      );
                    }}
                    accept=".jpg,.png"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="currentLogo">
                <Form.Label column sm={9}></Form.Label>
                <Col sm={9}>
                  <Image src={currentImage} fluid />
                </Col>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={isUpdateLoading}
              >
                Save Changes
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
