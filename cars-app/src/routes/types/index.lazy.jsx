import { createLazyFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getTypes } from "../../service/type";
import Row from "react-bootstrap/Row";
import TypeCard from "../../components/Type/TypeCard";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const Route = createLazyFileRoute("/types/")({
  component: Index,
});

function Index() {
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getTypesData = async () => {
      setIsLoading(true);
      const result = await getTypes();
      if (result.success) {
        setTypes(result.data);
        setIsLoading(false);
        return;
      }
      toast.error(result.message);
      setIsLoading(false);
    };
    getTypesData();
  }, []);

  if (!token) {
    return <h2>Please login first</h2>;
  }
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <Row className="mt-4">
      {types.length ? (
        types.map((type) => <TypeCard type={type} key={type.id}></TypeCard>)
      ) : (
        <h2>No types found</h2>
      )}
    </Row>
  );
}
