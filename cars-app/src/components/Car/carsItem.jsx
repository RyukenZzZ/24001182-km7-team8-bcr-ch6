import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";

const CarItem = ({ car }) => {
    return (
        <Col md={12} className="mb-4">
            <Card style={{ width: "100%", maxWidth: "18rem" }} className="h-100 shadow-sm">
                <Card.Img 
                    variant="top" 
                    src={car?.image} 
                    style={{ height: "200px", objectFit: "cover" }} 
                />
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-5 bold-text mb-2">
                        {car?.plate}
                    </Card.Title>
                    <Card.Text className="text-muted flex-grow-1">
                        {car?.models?.description || "No description available"}
                    </Card.Text>
                    <Button
                    as={Link}
                    href={`/cars/${car?.id}`}
                     variant="primary" className="mt-3 align-self-start">
                        Detail Car
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

CarItem.propTypes = {
    car: PropTypes.shape({
        id: PropTypes.string.isRequired,
        plate: PropTypes.string,
        image: PropTypes.string,
        models: PropTypes.shape({
            description: PropTypes.string,
        }),
    }),
};

export default CarItem;
