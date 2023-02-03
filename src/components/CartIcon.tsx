import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react'
import useSWR from 'swr'
import Cart from './Cart'
import { fetcher } from '../helpers/fetcher'
import { IProduct } from './Product'

export default function CartIcon() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data, error } = useSWR<IProduct[]>(
    'http://localhost:3004/cart',
    fetcher
  )
  return (
    <>
      <IconButton
        position={'absolute'}
        right="2"
        top="2"
        aria-label="open-cart"
        onClick={onOpen}
        icon={<HamburgerIcon />}
        _after={{
          content: `"${(data && data.length) || ''}"`,
          position: 'absolute',
          bottom: 0.5,
          right: 0.5,
          color: 'red.700',
        }}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart</DrawerHeader>

          <DrawerBody>
            <Cart />
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
