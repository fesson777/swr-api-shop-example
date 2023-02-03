import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Divider,
  Button,
  Text,
} from '@chakra-ui/react'

export type IProduct = {
  id: number
  title: string
  price: number
}

export default function Product({ id, price, title }: IProduct) {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Price: {price}</Text>
      </CardBody>
      <CardFooter>
        <Button>Add to cart</Button>
      </CardFooter>
    </Card>
  )
}
