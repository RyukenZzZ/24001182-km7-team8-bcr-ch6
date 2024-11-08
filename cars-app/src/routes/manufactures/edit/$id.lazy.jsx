import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import {
  getManufacturesById,
  updateManufacture,
} from '../../../service/manufacture'

export const Route = createLazyFileRoute('/manufactures/edit/$id')({
  component: EditManufacture,
})

function EditManufacture() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [logo, setLogo] = useState(undefined)
  const [currentLogo, setCurrentLogo] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchManufacture = async () => {
      try {
        const result = await getManufacturesById(id)
        if (result?.success && result.data) {
          setName(result.data.name)
          setCurrentLogo(result.data.logo)
        }
      } catch (error) {
        console.error('Error fetching manufacture details:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchManufacture()
    }
  }, [id])

  useEffect(() => {
    if (logo) {
      const reader = new FileReader()
      reader.onload = () => {
        setCurrentLogo(reader.result)
      }
      reader.readAsDataURL(logo)
    }
  }, [logo])

  const onSubmit = async (event) => {
    event.preventDefault()

    const request = {
      name,
      logo,
    }

    const result = await updateManufacture(id, request)
    if (result?.success) {
      navigate({ to: '/' })
      return
    }

    alert(result?.message || 'Failed to update manufacture')
  }

  if (isLoading) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Loading...</h1>
        </Col>
      </Row>
    )
  }

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Card>
          <Card.Body>
            <Card.Title>Edit Manufacture</Card.Title>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="logo">
                <Form.Label column sm={3}>
                  Logo
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="file"
                    placeholder="Choose File"
                    onChange={(event) => {
                      setLogo(event.target.files[0])
                      setCurrentLogo(URL.createObjectURL(event.target.files[0]))
                    }}
                    accept=".jpg,.png"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="currentLogo">
                <Form.Label column sm={3}></Form.Label>
                <Col sm={9}>
                  <Image src={currentLogo} fluid />
                </Col>
              </Form.Group>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default EditManufacture
