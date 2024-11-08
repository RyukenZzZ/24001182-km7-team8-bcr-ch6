import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";

const ManufactureItem = ({ manufacture }) => {
    return (
        <Col md={12} className="mb-4">
            <Card style={{ width: "100%", maxWidth: "18rem" }} className="h-100 shadow-sm">
                <Card.Img
                    variant="top"
                    src={manufacture?.logo}
                    style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-5 bold-text mb-2">
                        {manufacture?.name || "No name available"}
                    </Card.Title>
                    <Button
                        as={Link}
                        href={`/manufactures/${manufacture.id}`}
                        variant="primary"
                        className="mt-3 align-self-start"
                    >
                        Detail Manufacture
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};


ManufactureItem.propTypes = {
    manufacture: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
    }).isRequired,
};


export default ManufactureItem;