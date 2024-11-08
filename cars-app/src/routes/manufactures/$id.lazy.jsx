import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {
  deleteManufacture,
  getDetailManufactures,
} from '../../service/manufacture'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import { useSelector } from 'react-redux'

export const Route = createLazyFileRoute('/manufactures/$id')({
  component: ManufacturesDetail,
})

function ManufacturesDetail() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const [manufacture, setManufacture] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    const getDetailManufacturesData = async () => {
      if (!id) return

      setIsLoading(true)
      try {
        const result = await getDetailManufactures(id)
        if (result.success && result.data) {
          setManufacture(result.data)
          setIsNotFound(false)
        } else {
          setIsNotFound(true)
        }
      } catch (error) {
        console.error('Error fetching manufacture details:', error)
        setIsNotFound(true)
      } finally {
        setIsLoading(false)
      }
    }
    if (id) {
      getDetailManufacturesData(id)
    }
  }, [id])

  if (isLoading) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Loading...</h1>
        </Col>
      </Row>
    )
  }

  if (isNotFound) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Manufacture not found!</h1>
        </Col>
      </Row>
    )
  }

  const onDelete = async (event) => {
    event.preventDefault()

    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete this manufacture?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const result = await deleteManufacture(id)
            if (result.success) {
              navigate({ to: '/' })
              return
            }
            toast.error(result?.message)
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    })
  }

  return (
    <Row className="mt-5">
      <Col md={{ span: 6, offset: 3 }}>
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Img
              variant="top"
              src={manufacture.logo}
              alt={manufacture.name || 'Logo image'}
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <Card.Title>{manufacture.name || 'No name available'}</Card.Title>

            {user?.role_id === 1 && (
              <>
                <Card.Text>
                  <div className="d-grid gap-2">
                    <Button
                      as={Link}
                      href={`/manufactures/edit/${id}`}
                      variant="primary"
                      size="md"
                    >
                      Edit Manufacture
                    </Button>
                  </div>
                </Card.Text>
                <Card.Text>
                  <div className="d-grid gap-2">
                    <Button onClick={onDelete} variant="danger" size="md">
                      Delete Manufacture
                    </Button>
                  </div>
                </Card.Text>
              </>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default ManufacturesDetail
