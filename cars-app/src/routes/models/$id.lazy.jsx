import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { deleteModel, getDetailModel } from "../../service/model";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from "react-redux";

export const Route = createLazyFileRoute("/models/$id")({
  component: ModelDetail,
});

function ModelDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const getDetailModelData = async (id) => {
      setIsLoading(true);
      const result = await getDetailModel(id);
      if (result?.success) {
        setModel(result.data);
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
          <h1 className="text-center">Model is not found!</h1>
        </Col>
      </Row>
    );
  }

  const onDelete = async (event) => {
    event.preventDefault();

    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this data?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const result = await deleteModel(id);
            if (result?.success) {
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
    });
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Body>
            <Card.Title>Name: {model?.name}</Card.Title>
            <Card.Text>Description: {model?.description}</Card.Text>
            <Card.Text>Manufacture: {model?.manufactures?.name}</Card.Text>

            {user?.role_id === 1 && (
              <>
                <Card.Text>
                  <div className="d-grid gap-2">
                    <Button
                      as={Link}
                      href={`/models/edit/${id}`}
                      variant="primary"
                      size="md"
                    >
                      Edit Model
                    </Button>
                  </div>
                </Card.Text>
                <Card.Text>
                  <div className="d-grid gap-2">
                    <Button onClick={onDelete} variant="danger" size="md">
                      Delete Model
                    </Button>
                  </div>
                </Card.Text>
              </>
            )}
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
