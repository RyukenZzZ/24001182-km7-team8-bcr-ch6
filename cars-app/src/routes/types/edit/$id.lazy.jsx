import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getTypesById, updateType } from "../../../service/type";
import { toast } from "react-toastify";
import Protected from "../../../components/Auth/Protected";

export const Route = createLazyFileRoute("/types/edit/$id")({
  component: () => (
    <Protected roles={[1]}>
      <TypeDetail />
    </Protected>
  ),
});

function TypeDetail() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isTypeLoading,setIsTypeLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [characteristic, setCharacteristic] = useState("");
  const [style, setStyle] = useState("");

  useEffect(() => {
    const getCurrentType = async () => {
      setIsTypeLoading(true);
      const result = await getTypesById(id);
      if (result.success) {
        setIsTypeLoading(false);
        setName(result.data.name);
        setDescription(result.data.description);
        setCharacteristic(result.data.characteristic);
        setStyle(result.data.style);
        return;
      }
      setIsTypeLoading(false);
      toast.error(result.message);
      navigate({ to: "/types" });
    };
    getCurrentType();
  }, [id, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const body = { name, description, characteristic, style };
    const result = await updateType(id, body);
    if (result.success) {
      toast.success(result.message);
      navigate({to:`/types/${id}`});
      setIsLoading(false);
      return;
    }
    toast.error(result.message);
    setIsLoading(false);
  };
  if(isTypeLoading){
    return (<h2>Loading...</h2>)
  }

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Edit Type</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm={3}>
                  Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="nick_name">
                <Form.Label column sm={3}>
                  Description
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    required
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="nick_name">
                <Form.Label column sm={3}>
                  Characteristic
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Characteristic"
                    value={characteristic}
                    onChange={(event) => {
                      setCharacteristic(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="nick_name">
                <Form.Label column sm={3}>
                  Style
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Style"
                    value={style}
                    onChange={(event) => {
                      setStyle(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary" disabled={isLoading}>
                  Edit Type
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
