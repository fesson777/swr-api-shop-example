import type { IProduct } from './Product'
import {
  Flex,
  Spinner,
  Stack,
  Divider,
  Text,
  IconButton,
  Box,
} from '@chakra-ui/react'
import useSWR from 'swr'
import { fetcher } from '../helpers/fetcher'
import { DeleteIcon } from '@chakra-ui/icons'

const removeFromCart = async (id: number) => fetcher('http://localhost:3004/cart/' + id,{method: 'DELETE'})

export default function Cart() {
  const { data, error, mutate } = useSWR<IProduct[]>(
    'http://localhost:3004/cart',
    fetcher, {
      revalidateOnMount: false
    }
  )  
  const totalSum = Array.isArray(data)
    ? data.reduce((total, el) => total + el.price, 0)
    : null

  return (
    <Flex direction="column" justify="space-between" h="full">
      {!data && !error && <Spinner />}
      {data && data.length > 0 ? (
        <Stack divider={<Divider />}>
          {data.map((el) => (
            <Flex key={el.id} justify="space-between">
              <Text>{el.title}</Text>
              <IconButton
                aria-label="remove-from-cart"
                icon={<DeleteIcon boxSize={2} />}
                size="xs"
                onClick={async()=>{
                   await removeFromCart(el.id) 
                   mutate(data.filter(order=> order.id !== el.id), {revalidate: false})
                  }}
              />
            </Flex>
          ))}
        </Stack>
      ) : (
        <Text>Cart is empty</Text>
      )}
      <Box>
        <Divider />
        <Text fontWeight={'bold'}>Total: {totalSum || 0} u.e.</Text>
      </Box>
    </Flex>
  )
}
