import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import UserCard from './components/UserCard';
import debounce from 'lodash.debounce'

function App() {
  const [search, setSearch] = useState({
    skills: new Set(),
    month:0
  })

  const [offset, setOffset] = useState(8)

  const [returnData, setReturnData] = useState([])

  useEffect(() => {
    console.log('fetching')
    let url = "/api/v1/users?"
    if(search.skills)
     search.skills.forEach(ele => url+=`skills=${ele}&`)
    if(search.month)
      url += `month=${search.month}`

    setOffset(0)
    setReturnData([])
    
    fetch(url)
    .then(data => data.json())
    .then(data => {
      setReturnData(data)
      console.log(returnData)
    })

    //eslint-disable-next-line  
  }, [search])

  function fetchMore() {
    setOffset(prevData => prevData + 8);
    console.log('fetching more')

    let url = "/api/v1/users?"
    if(search.skills)
     search.skills.forEach(ele => url+=`skills=${ele}&`)
    if(search.month !== 0)
      url += `month=${search.month}&`

    fetch(url+`offset=${offset}`)
    .then(data => data.json())
    .then(data => {
      setReturnData(prevState => {
        return [
          ...prevState,
          ...data
        ]
      })
      console.log(returnData)
    })
  }
  
  return (
    <Container>
      <div className="display-4">
        Skill Search
      </div>
      <Form>
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column>
          <Form.Control type="text" placeholder="Skills" onChange={ 
            debounce((e) => {
              setSearch(prevState => {return {
                ...prevState,
                skills: e.target.value.split(',')
              }})
            }, 500)
          } />
          </Form.Label>
          <Col>
            <Form.Group controlId="formBasicRange">
              <Form.Label>Months</Form.Label>
              <Form.Control type="range" min="2" max="4" onChange={
                (e) => {
                  setSearch(prevState => {return {
                    ...prevState,
                    month: e.target.value
                  }})
                  console.log(e.target.value)
                }
              }/>
            </Form.Group>
          </Col>
        </Form.Group>
      </Form>
      <Row>
        {returnData.map(ele => 
          <Col md="6" sm="12" lg="4" key={ele.id} className="my-1">
            <UserCard user={ele} />
          </Col> 
        )}
      </Row>
      <Button style={{marginTop:"5px"}} onClick={fetchMore}>Show More</Button>
    </Container>
  );
}

export default App;
