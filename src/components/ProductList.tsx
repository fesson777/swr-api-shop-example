import {
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import type { IProduct } from './Product'
import Product from './Product'
import useSWR from 'swr'
import { fetcher } from '../helpers/fetcher'

export default function ProductList() {
  const { data, error } = useSWR<IProduct[]>(
    'http://localhost:3004/products',
    fetcher
  )

  console.log(data)

  return (
    <Stack>
      <Heading>In stock:</Heading>
      {!data ? (
        <Spinner />
      ) : (
        <SimpleGrid columns={3} spacing={4}>
          {data.map((product) => (
            <Product {...product} key={product.id} />
          ))}
        </SimpleGrid>
      )}
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Failed to load data!</AlertTitle>
          <AlertDescription>Try later</AlertDescription>
        </Alert>
      )}
    </Stack>
  )
}
