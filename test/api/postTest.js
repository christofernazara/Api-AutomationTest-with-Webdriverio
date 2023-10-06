import assert from 'assert';
import axios from 'axios';

const apiToken = process.env.GOREST_API_TOKEN
const apiUrlLink = process.env.API_URL

let addUser;
describe('Go Rest Post Request', ()=> {

      //[2]- POST - Positive Case - Create new user 
  it('should create a new user (Positive Case)', async () =>{
    const userData = {
        name : 'John Doe98',
        email : 'johndoe98@gmail.com',
        gender : 'male',
        status : 'active',
    };
    const response = await axios.post(`${apiUrlLink}/users`, userData,{
        headers: {
            Authorization : `Bearer ${apiToken}`,
        }
    });
    // console.log('response ',response)
    // assert.strictEqual(response.status, 201, 'Response status should be 201');
    // assert.strictEqual(response.data.name, userData.name, 'Response should contain the created user')
    addUser = response.data;
    console.log('addUser',addUser);
  })
//   [2] - POST - Negative Case -  Create new user with invalid email 
  it('should failed to create new user with invalid email', async () =>{
    const invalidEmailUserData = {
      name : 'John Doe12',
      email : 'johndoe12',
      gender : 'male',
      status : 'active',
  };
  try {
    const response = await axios.post(`${apiUrlLink}/users`, invalidEmailUserData,{
      headers: {
          Authorization : `Bearer ${apiToken}`,
      }
  });
  assert.notStrictEqual(response.status, 201, 'Response status not should be 201');
  // const addUser = response.data;
  // console.log('addUser',addUser);    
  } catch (error) {
    assert.strictEqual(error.response,422,'Email invalid')
    console.log('error response',error.response.data)
  }
  })
//   [2] - POST - Negative Case - Create new user with blank field
  it('should failed to create new user with Blank data', async () =>{
    const blankData = {
      name : '',
      email : '',
      gender : '',
      status : '',
  };
  try {
    const response = await axios.post(`${apiUrlLink}/users`, blankData,{
      headers: {
          Authorization : `Bearer ${apiToken}`,
      }
  });
  assert.notStrictEqual(response.status, 201, 'Response status not should be 201');
  // const blankData = response.data;
  // console.log('blankData',blankData);    
  } catch (error) {
    assert.strictEqual(error.response,422,' cant be blank')
    console.log('error response',error.response.message)
  }
  })
//   [2] - POST - Negative Case - Create new user without token/unauthorize access
  it('should failed to create new user without token/unauthorize access', async () =>{
    const dataUserWithoutToken = {
      name : 'usup',
      email : 'usup@gmail.com',
      gender : 'male',
      status : 'active',
  };
  try {
    const response = await axios.post(`${apiUrlLink}/users`, dataUserWithoutToken,{
      headers: {
          Authorization : 'Bearer invalid-token',
      }
  });
  assert.notStrictEqual(response.status, 201, 'Response status not should be 201');
  // const invalidEmailUser = response.data;
  // console.log('invalidEmailUser',invalidEmailUser);    
  } catch (error) {
    assert.strictEqual(error.response,401,' unauthorized access')
    console.log('error response',error.response.message)
  }
  })
})
export default addUser;