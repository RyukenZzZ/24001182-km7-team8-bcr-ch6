import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/esm/Image";
import { getManufactures } from "../../service/manufacture";
import { getModels } from "../../service/model";
import { getTypes } from "../../service/type";
import { createCar } from "../../service/car";
import { toast } from "react-toastify";
import Protected from "../../components/Auth/Protected";

export const Route = createLazyFileRoute("/cars/create")({
  component: () => (
    <Protected roles={[1]}>
      <CreateCar />
    </Protected>
  ),
});

function CreateCar() {
  const navigate = useNavigate();

  const [available, setAvailable] = useState(false);
  const [plate, setPlate] = useState("");
  const [models, setModels] = useState([]);
  const [modelId, setModelId] = useState(0);
  const [rentPerDay, setRentPerDay] = useState("");
  const [capacity, setCapacity] = useState("");
  const [image, setImage] = useState(undefined);
  const [currentImage, setCurrentImage] = useState(undefined);
  const [description, setDescription] = useState("");
  const [availableAt, setAvailableAt] = useState("");
  const [transmission, setTransmission] = useState("");
  const [types, setTypes] = useState([]);
  const [typeId, setTypeId] = useState(0);
  const [manufactures, setManufactures] = useState([]);
  const [manufactureId, setManufactureId] = useState(0);
  const [year, setYear] = useState("");
  const [options, setOptions] = useState([]);
  const [specs, setSpecs] = useState([]);

  useEffect(() => {
    const getManufacturesData = async () => {
      const result = await getManufactures();
      if (result?.success) {
        setManufactures(result?.data);
      }
    };

    const getModelsData = async () => {
      const result = await getModels();
      if (result?.success) {
        setModels(result?.data);
      }
    };

    const getTypesData = async () => {
      const result = await getTypes();
      if (result?.success) {
        setTypes(result?.data);
      }
    };

    getTypesData();
    getModelsData();
    getManufacturesData();
  }, []);

  const handleAddOption = () => {
    setOptions([...options, ""]); // Menambahkan opsi baru kosong
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddSpec = () => {
    setSpecs([...specs, ""]); // Menambahkan spesifikasi baru kosong
  };

  const handleSpecChange = (index, value) => {
    const newSpecs = [...specs];
    newSpecs[index] = value;
    setSpecs(newSpecs);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      plate,
      modelId,
      rentPerDay,
      capacity,
      image,
      description,
      availableAt,
      available,
      transmission,
      typeId,
      manufactureId,
      year,
      options,
      specs,
    };

    const result = await createCar(request);
    if (result?.success) {
      navigate({ to: "/" });
      return;
    }

    toast.error(result?.message);
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Create Car</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="plate">
                <Form.Label column sm={3}>
                  Plate
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Plate Number"
                    required
                    value={plate}
                    onChange={(e) => setPlate(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="manufacture_id">
                <Form.Label column sm={3}>
                  Manufacture
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(event) => setManufactureId(event.target.value)}
                  >
                    <option disabled selected>
                      Select Manufacture
                    </option>
                    {manufactures.length > 0 &&
                      manufactures.map((manufacture) => (
                        <option key={manufacture?.id} value={manufacture?.id}>
                          {manufacture?.name}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="model_id">
                <Form.Label column sm={3}>
                  Model
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(event) => setModelId(event.target.value)}
                  >
                    <option disabled selected>
                      Select Model
                    </option>
                    {models.length > 0 &&
                      models.map((model) => (
                        <option key={model?.id} value={model?.id}>
                          {model?.name}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="rentPerDay">
                <Form.Label column sm={3}>
                  Rent per Day
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="number"
                    placeholder="Rent per Day"
                    value={rentPerDay}
                    onChange={(e) => setRentPerDay(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="availableAt">
                <Form.Label column sm={3}>
                  Available At
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="date"
                    value={availableAt}
                    onChange={(e) => setAvailableAt(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="capacity">
                <Form.Label column sm={3}>
                  Capacity
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="number"
                    placeholder="Capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="description">
                <Form.Label column sm={3}>
                  Description
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="input Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="transmission">
                <Form.Label column sm={3}>
                  Transmission
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Transmission Type"
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="type_id">
                <Form.Label column sm={3}>
                  Type
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(event) => setTypeId(event.target.value)}
                  >
                    <option disabled selected>
                      Select Type
                    </option>
                    {types.length > 0 &&
                      types.map((type) => (
                        <option key={type?.id} value={type?.id}>
                          {type?.name}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="year">
                <Form.Label column sm={3}>
                  Year
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="available">
                <Form.Label column sm={3}>
                  Available
                </Form.Label>{" "}
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

              <Form.Group as={Row} className="mb-3" controlId="options">
                <Form.Label column sm={3}>
                  Options
                </Form.Label>
                <Col sm="9">
                  {options.map((option, index) => (
                    <div key={index} className="mb-2">
                      <Form.Control
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <Button variant="secondary" onClick={handleAddOption}>
                    Add Option
                  </Button>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="specs">
                <Form.Label column sm={3}>
                  Specifications
                </Form.Label>
                <Col sm="9">
                  {specs.map((spec, index) => (
                    <div key={index} className="mb-2">
                      <Form.Control
                        type="text"
                        placeholder={`Specification ${index + 1}`}
                        value={spec}
                        onChange={(e) =>
                          handleSpecChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <Button variant="secondary" onClick={handleAddSpec}>
                    Add Specification
                  </Button>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="logo">
                <Form.Label column sm={3}>
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
                <Form.Label column sm={3}></Form.Label>
                <Col sm={9}>
                  <Image src={currentImage} fluid />
                </Col>
              </Form.Group>

              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Create Car
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
