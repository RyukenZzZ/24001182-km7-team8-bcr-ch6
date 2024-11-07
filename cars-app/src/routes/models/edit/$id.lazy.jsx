import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getManufactures } from "../../../service/manufacture";
import { getDetailModel, updateModel } from "../../../service/model";
import { toast } from "react-toastify";

export const Route = createLazyFileRoute("/models/edit/$id")({
    component: EditModel,
});

function EditModel() {
    const { id } = Route.useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [manufactures, setManufactures] = useState([]);
    const [manufactureId, setManufactureId] = useState(0);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getManufacturesData = async () => {
            const result = await getManufactures();
            if (result?.success) {
                setManufactures(result?.data);
            }
        };

        getManufacturesData();
    }, []);

    useEffect(() => {
        const getDetailModelData = async (id) => {
            setIsLoading(true);
            const result = await getDetailModel(id);
            if (result?.success) {
                setName(result.data?.name);
                setDescription(result.data?.description);
                setManufactureId(result.data?.manufacture_id);
                setIsNotFound(false);
            } else {
                setIsNotFound(true);
            }
            setIsLoading(false);
        };

        if (id) {
            getDetailModelData(id);
        }
    }, [id]);

    if (isNotFound) {
        navigate({ to: "/" });
        return;
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        const request = {
            name,
            description,
            manufactureId,
        };
        const result = await updateModel(id, request);
        if (result?.success) {
            navigate({ to: `/models/${id}` });
            return;
        }

        toast.error(result?.message);
    };

    return (
        <Row className="mt-5">
            <Col className="offset-md-3">
                <Card>
                    <Card.Header className="text-center">
                        Edit Model
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="name"
                            >
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
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="nick_name"
                            >
                                <Form.Label column sm={3}>
                                    Description
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="text"
                                        placeholder="Nick Name"
                                        required
                                        value={description}
                                        onChange={(event) => {
                                            setDescription(event.target.value);
                                        }}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="nick_name"
                            >
                                <Form.Label column sm={3}>
                                    Manufacture
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Select aria-label="Default select example" 
                                    onChange={(event) => {
                                        setManufactures(event.target.value)
                                    }}>
                                        <option disabled>
                                            Select Manufacture
                                        </option>
                                        {!isLoading &&
                                            manufactures.length > 0 &&
                                            manufactures.map((manufacture) => (
                                                <option
                                                    key={manufacture.id}
                                                    value={manufacture.id}
                                                    selected={
                                                        manufacture.id ==
                                                        manufactureId
                                                    }
                                                >
                                                    {manufacture.name}
                                                </option>
                                            ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button type="submit" variant="primary">
                                    Edit Model
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