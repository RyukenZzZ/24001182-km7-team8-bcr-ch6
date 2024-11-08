import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import propTypes from "prop-types";
import { Link } from "@tanstack/react-router";
const CarType = ({ type }) => {
  return (
    <Col md={4}>
      <Card>
        <Card.Body>
          <Card.Title>{type.name}</Card.Title>
          <Card.Text>{type.description}</Card.Text>
          <Button as={Link} href={`/types/${type.id}`} variant="primary">
            Detail
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};
CarType.propTypes = {
  type: propTypes.object,
  user: propTypes.object,
};
export default CarType;