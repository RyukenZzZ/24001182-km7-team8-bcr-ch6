import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import Protected from "../../components/Auth/Protected";
import { createType } from "../../service/type";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { toast } from "react-toastify";

export const Route = createLazyFileRoute("/types/create")({
  component: () => (
    <Protected roles={[1]}>
      <CreateType />
    </Protected>
  ),
});

function CreateType() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [characteristic, setCharacteristic] = useState("");
  const [style, setStyle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const request = { name, description, characteristic, style };

    const createTypeData = async () => {
      setIsLoading(true);
      const result = await createType(request);
      if (result.success) {
        toast.success(result.message);
        setIsLoading(false);
        navigate({ to: "/types" });
        return;
      }
      setIsLoading(false);
      toast.error(result.message);
    };

    createTypeData();
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Create Type</Card.Header>
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
                    placeholder="description"
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
                    placeholder="characteristic"
                    required
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
                    placeholder="style"
                    required
                    value={style}
                    onChange={(event) => {
                      setStyle(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary" disabled={isLoading}>
                  Create Type
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
