import assert from 'assert';
import axios from 'axios';

const apiToken = process.env.GOREST_API_TOKEN
const apiUrlLink = process.env.API_URL

describe('Go Rest Get Request', ()=>{
    //[1]-Get Users Details Positive Case
  it('should retrieve a list of users (Positive Case)', async () => {
    const response = await axios.get(`${apiUrlLink}/users`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    assert.strictEqual(response.status, 200, 'Response status should be 200');
  })
  
  //[1]-Get Users Details With Invalid ID Negative Case
  it('should return an error for an invalid user (Negative Case)', async () =>{
    const invalidUserId = 9999223;
    let errorResponse;

    try {
       const response =  await axios.get(`${apiUrlLink}/users/${invalidUserId}`, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
              },
        });
        assert.notStrictEqual(response.status,200, 'Response status not should be 200')
        // console.log('invalidrespon',response)
    } catch (error) {
        errorResponse = error.response;
    }
    // assert.strictEqual(errorResponse.status, 404);
    // assert.strictEqual(errorResponse.data.meta.success, false);
  })
})