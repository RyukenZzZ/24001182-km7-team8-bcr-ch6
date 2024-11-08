import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { deleteType, getTypesById } from "../../service/type";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Route = createLazyFileRoute("/types/$id")({
  component: TypeDetail,
});

function TypeDetail() {
  const { id } = Route.useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [type, setType] = useState("");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    const getTypeData = async () => {
      setIsLoading(true);
      const result = await getTypesById(id);
      if (result.success) {
        setType(result.data);
        setIsLoading(false);
        return;
      }
      toast.error(result.message);
      setIsLoading(false);
      navigate({ to: "/types" });
    };
    getTypeData();
  }, [id, navigate]);

  const onDelete = async (e) => {
    e.preventDefault();
    const deleteUserData = async () => {
      setIsDeleteLoading(true);
      const result = await deleteType(id);
      if (result.success) {
        toast.success(result.message);
        setIsDeleteLoading(false);
        navigate({ to: "/types" });
        return;
      }
      toast.error(
        result.message === "Internal Server Error"
          ? "Some cars are using this type"
          : result.message
      );
      setIsDeleteLoading(false);
    };

    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure you want to delete this type?",
      buttons: [
        {
          label: "Yes",
          onClick: deleteUserData,
        },
        {
          label: "No",
        },
      ],
    });
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Body>
            <Card.Title>{type?.name}</Card.Title>
            <Card.Text>Description : {type?.description}</Card.Text>
            {type.characteristic && (
              <Card.Text>Characteristic : {type?.characteristic}</Card.Text>
            )}
            {type.style && <Card.Text>Style : {type?.style}</Card.Text>}
            {user?.role_id == 1 && (
              <>
                <Card.Text>
                  <div className="d-grid gap-2">
                    <Button
                      as={Link}
                      href={`/types/edit/${id}`}
                      variant="primary"
                      size="md"
                    >
                      Edit Type
                    </Button>
                  </div>
                </Card.Text>
                <Card.Text>
                  <div className="d-grid gap-2">
                    <Button
                      onClick={onDelete}
                      variant="danger"
                      size="md"
                      disabled={isDeleteLoading}
                    >
                      Delete Type
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
