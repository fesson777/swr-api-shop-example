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
import {useSWRConfig} from 'swr'
import { fetcher } from '../helpers/fetcher'

export type IProduct = {
  id: number
  title: string
  price: number
}

export default function Product({ id, price, title }: IProduct) {
  const {mutate} = useSWRConfig()

  const handleAddToCart = () => {
    mutate('http://localhost:3004/cart', fetcher("http://localhost:3004/cart" , {
     method: 'POST',
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({id, title, price})
    }))
  }
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Price: {price}</Text>
      </CardBody>
      <CardFooter>
        <Button onClick={handleAddToCart}>Add to cart</Button>
      </CardFooter>
    </Card>
  )
}
