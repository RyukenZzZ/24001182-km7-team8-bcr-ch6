import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";

const ModelItem = ({ model }) => {
    return (
        <Col md={3}>
            <Card style={{ width: "18rem" }}>
                <Card.Body>
                    <Card.Title>{model?.name}</Card.Title>
                    <Card.Text>{model?.description}</Card.Text>
                    <Button
                        as={Link}
                        href={`/models/${model?.id}`}
                        variant="primary"
                    >
                        Detail model
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

ModelItem.propTypes = {
    model: PropTypes.object,
};

export default ModelItem;