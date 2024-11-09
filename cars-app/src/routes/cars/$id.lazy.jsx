import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { deleteCar, getDetailCars } from "../../service/car";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from "react-redux";

export const Route = createLazyFileRoute("/cars/$id")({
    component: CarDetail,
});

function CarDetail() {
    const { id } = Route.useParams();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const [car, setCar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);

    useEffect(() => {
        const getDetailCarsData = async (carId) => {
            setIsLoading(true);
            try {
                const result = await getDetailCars(carId);
                if (result?.success && result.data) {
                    setCar(result.data);
                    setIsNotFound(false);
                } else {
                    setIsNotFound(true);
                }
            } catch (error) {
                console.error("Error fetching car details:", error);
                setIsNotFound(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            getDetailCarsData(id);
        }
    }, [id]);

    if (isLoading) {
        return (
            <Row className="mt-5">
                <Col>
                    <h1 className="text-center">Loading...</h1>
                </Col>
            </Row>
        );
    }

    if (isNotFound) {
        return (
            <Row className="mt-5">
                <Col>
                    <h1 className="text-center">Car not found!</h1>
                </Col>
            </Row>
        );
    }

    const onDelete = async (event) => {
        event.preventDefault();
        confirmAlert({
            title: "Confirm to delete",
            message: "Are you sure to delete this car?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        const result = await deleteCar(id);
                        if (result.success) {
                            navigate({ to: "/" });
                            return;
                        }
                        toast.error(result?.message);
                    },
                },
                {
                    label: "No",
                    onClick: () => {},
                },
            ],
        })
    };

    return (
        <Row className="mt-5">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="shadow-sm">
                    <Card.Img
                        variant="top"
                        src={car?.image}
                        alt={car?.plate || "Car image"}
                        style={{ height: "300px", objectFit: "cover" }}
                    />
                    <Card.Body>
                        <Card.Title className="border-bottom pb-2 border-secondary">{car?.plate || "Unknown Plate"}</Card.Title>
                        <Card.Text>
                            <strong>Model:</strong> {car?.models?.description || "N/A"}
                        </Card.Text>
                        <Card.Text>
                            <strong>Year:</strong> {car?.year || "N/A"}
                        </Card.Text>
                        <Card.Text>
                            <strong>Description:</strong> {car?.description || "N/A"}
                        </Card.Text>
                        <Card.Text>
                            <strong>Type:</strong> {car?.types?.name || "N/A"}
                        </Card.Text>
                        <Card.Text>
                            <strong>Rent per Day:</strong> ${car?.rentPerDay || "N/A"}
                        </Card.Text>
                        <Card.Text>
                            <strong>Capacity:</strong> {car?.capacity || "N/A"}
                        </Card.Text>
                        <Card.Text>
                            <strong>Manufacture:</strong> {car?.manufactures.name || "N/A"}
                        </Card.Text>
                        <Card.Text>
                            <strong>Transmission:</strong> {car?.transmission || "N/A"}
                        </Card.Text>
                        <Card.Text>
                            <strong>Specs:</strong> {car?.specs.map(spec=>(<span key={spec} className="mx-2 px-2 py-1 bg-success rounded text-white">{spec}</span>)) || "N/A"}
                        </Card.Text>
                        <Card.Text>
                            <strong>Options:</strong> {car?.options.map(option=>(<span key={option} className="mx-2 px-2 py-1 bg-success rounded text-white">{option}</span>)) || "N/A"}
                        </Card.Text>

                        {user?.role_id === 1 && (
                            <>
                        <Card.Text>
                            <div className="d-grid gap-2">
                                <Button
                                    as={Link}
                                    href={`/cars/edit/${id}`}
                                    variant="primary"
                                    size="md"
                                >
                                    Edit Car
                                </Button>
                            </div>
                        </Card.Text>
                        <Card.Text>
                            <div className="d-grid gap-2">
                                <Button
                                    onClick={onDelete}
                                    variant="danger"
                                    size="md"
                                >
                                    Delete Car
                                </Button>
                            </div>
                        </Card.Text>
                        </>
                    )}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default CarDetail;
