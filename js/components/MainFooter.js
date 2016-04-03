import React from 'react'
import {Flex, Box} from 'reflexbox'
import {
  Footer,
  Divider,
  Block,
  Heading,
  Space,
  NavItem
} from 'rebass'

const cols = [
  {
    heading: 'About us',
    links: [
      { href: 'http://univjobs.ca', children: 'Coming soon'}
    ]
  },
  {
    heading: 'Social Media',
      links: [
        { href: 'http://univjobs.ca', children: 'Coming soon'}
      ]
  },
  {
    heading: 'Contact us',
    links: [
      { href: 'http://univjobs.ca', children: 'Coming soon'}
    ]
  },
]

//Footer component does not contain any description of arguments being passed. Must tell developer
const MainFooter = () => (
  <Footer
    mt={4}
    color='white'
    backgroundColor='black'
    style={{marginTop: '0px'}}
  >

    <Box col={12} px={3} py={4}>
    

    <Flex wrap gutter={3}>
      {cols.map(({heading, links}, i) => (
      

      <Box key={i}
        px={3}
        sm={12 / cols.length}
      >
       
        <Heading
          level={4}
          size={3}
          alt
          children={heading} 
        />


          <Block borderTop py={2}>
          {links.map((link, i) => (


            <NavItem key={i}
              style={{
                paddingLeft: 0,
                paddingRight: 0,
              }}
              px={0}
              {...link} />
            ))}
          </Block>
      </Box>

      ))}
    </Flex>
    

    <Divider />
   
       
    <Flex>
    

      <NavItem
        small 
        px={0}
        color='secondary'
        href=''
        children='Product of UnivJobs, Inc. &copy; 2016' 
      />
      
      
        <Space auto />
            
      <NavItem
        small
        px={0}
        color='secondary'
        href='http://google.com'
        children='Made with &hearts; at Oakville City' 
      />
    </Flex>
  </Box>
</Footer>
)

export default MainFooter
