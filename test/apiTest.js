import assert from 'assert';
import axios from 'axios';

const apiToken = process.env.GOREST_API_TOKEN
const apiUrlLink = process.env.API_URL

describe('API Automation Testing', () => {
  let addUser;
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

  //[2]- POST - Positive Case - Create new user 
  it('should create a new user (Positive Case)', async () =>{
    const userData = {
        name : 'John Doe10',
        email : 'johndoe10@gmail.com',
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
  //[2] - POST - Negative Case -  Create new user with invalid email 
  // it('should failed to create new user with invalid email', async () =>{
  //   const invalidEmailUserData = {
  //     name : 'John Doe1',
  //     email : 'johndoe1',
  //     gender : 'male',
  //     status : 'active',
  // };
  // try {
  //   const response = await axios.post(`${apiUrlLink}/users`, invalidEmailUserData,{
  //     headers: {
  //         Authorization : `Bearer ${apiToken}`,
  //     }
  // });
  // assert.notStrictEqual(response.status, 201, 'Response status not should be 201');
  // // const addUser = response.data;
  // // console.log('addUser',addUser);    
  // } catch (error) {
  //   assert.strictEqual(error.response,422,'Email invalid')
  //   console.log('error response',error.response.data)
  // }
  // })
  //[2] - POST - Negative Case - Create new user with blank field
  // it('should failed to create new user with Blank data', async () =>{
  //   const blankData = {
  //     name : '',
  //     email : '',
  //     gender : '',
  //     status : '',
  // };
  // try {
  //   const response = await axios.post(`${apiUrlLink}/users`, blankData,{
  //     headers: {
  //         Authorization : `Bearer ${apiToken}`,
  //     }
  // });
  // assert.notStrictEqual(response.status, 201, 'Response status not should be 201');
  // // const blankData = response.data;
  // // console.log('blankData',blankData);    
  // } catch (error) {
  //   assert.strictEqual(error.response,422,' cant be blank')
  //   console.log('error response',error.response.message)
  // }
  // })
  //[2] - POST - Negative Case - Create new user without token/unauthorize access
  // it('should failed to create new user without token/unauthorize access', async () =>{
  //   const dataUserWithoutToken = {
  //     name : 'usup',
  //     email : 'usup@gmail.com',
  //     gender : 'male',
  //     status : 'active',
  // };
  // try {
  //   const response = await axios.post(`${apiUrlLink}/users`, dataUserWithoutToken,{
  //     headers: {
  //         Authorization : 'Bearer invalid-token',
  //     }
  // });
  // assert.notStrictEqual(response.status, 201, 'Response status not should be 201');
  // // const invalidEmailUser = response.data;
  // // console.log('invalidEmailUser',invalidEmailUser);    
  // } catch (error) {
  //   assert.strictEqual(error.response,401,' unauthorized access')
  //   console.log('error response',error.response.message)
  // }
  // })
  //[3] - PUT - Positive Case - Should update user details
    it('Should update user details', async () =>{
      if(!addUser){
        throw new Error("User not created");
      }
      const updateUserData = {
        name : 'Anonymustnih',
        email : 'anonymustnih@gmail.com',
      }
      const response = await axios.put(`${apiUrlLink}/users/${addUser.data.id}`, updateUserData,{
        headers: {
            Authorization : `Bearer ${apiToken}`,
        }
    });
    assert.strictEqual(response.status, 200, 'update data success')
    const responseData = response.data;
    console.log(responseData)
    })
    //[3] - PUT - Negative Case - fail to update user details with invalidID
    it('should fail to update user details (User Not Found )', async () =>{
      const invalidUserId = '32lkndfg';

      const updateUserData  = {
        name : 'test 123',
        email : 'test123@gmail.com',
      }
      try {
        const response = await axios.put(`${apiUrlLink}/users/${invalidUserId}`, updateUserData,{
          headers : {
            Authorization : `Bearer ${apiToken}`
          }
        })
        assert.notStrictEqual(response.status,200, 'Update Failed')
        console.log('addUser',addUser)
      } catch (error) {
        assert.strictEqual(error.response,422, 'Invalid Email')
      }
    })
    //[4] - DELETE - Positive Case - Delete User with valid ID
    it('Should delete user', async ()=>{
      if(!addUser){
        throw new Error('User not Created');
      }
      const response = await axios.delete(`${apiUrlLink}/users/${addUser}`,{
        headers : {
          Authorization: `Bearer ${apiToken}`
        }
      })
      assert.strictEqual(response.status,204, 'Delete Success')
    } )
    //[4] - DELETE - Negative Case - Delete user with Invalid ID
    it('Should fail to delete user (user not found )', async ()=>{
      const invalidUserId = '41324kn13k';
      try {
        const response = await axios.delete(`${apiUrlLink}/users/${invalidUserId}`,{
          headers: {
            Authorization: `Bearer ${apiToken}`
          }
        })
        assert.notStrictEqual(response.status,204, 'Response Status Not Should be 204')
      } catch (error) {
        assert.strictEqual(error.status,404,'Response Status Should be 404')
      }
    })
})