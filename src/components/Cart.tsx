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

import { DeleteIcon } from '@chakra-ui/icons'

export default function Cart() {
  const data: IProduct[] = []
  const error = null
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
