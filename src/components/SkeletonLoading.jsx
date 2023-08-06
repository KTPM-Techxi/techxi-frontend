import { Box, Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import React from 'react'

const SkeletonLoading = () => {
    return <>
        <Box padding='6' boxShadow='lg' bg='white'>
            <Flex gap={10} flexWrap>
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
            </Flex>
            <SkeletonText mt='4' noOfLines={33} spacing='4' skeletonHeight='2' />
            <Flex gap={10} flexWrap>
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
                <SkeletonCircle size='10' />
            </Flex>
        </Box>
    </>;
}

export default SkeletonLoading