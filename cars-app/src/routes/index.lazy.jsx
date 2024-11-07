import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getModels } from "../service/model";
import ModelItem from "../components/Model/ModelItem";

export const Route = createLazyFileRoute("/")({
    component: Index,
});

function Index() {
    const { token } = useSelector((state) => state.auth);

    const [models, setModels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getModelData = async () => {
            setIsLoading(true);
            const result = await getModels();
            if (result.success) {
                setModels(result.data);
            }
            setIsLoading(false);
        };

        if (token) {
            getModelData();
        }
    }, [token]);

    if (!token) {
        return (
            <Row className="mt-4">
                <Col>
                    <h1 className="text-center">
                        Please login first to get student data!
                    </h1>
                </Col>
            </Row>
        );
    }

    if (isLoading) {
        return (
            <Row className="mt-4">
                <h1>Loading...</h1>
            </Row>
        );
    }

    return (
        <Row className="mt-4">
            {models.length === 0 ? (
                <h1>Model data is not found!</h1>
            ) : (
                models.map((model) => (
                    <ModelItem model={model} key={model?.id} />
                ))
            )}
        </Row>
    );
}