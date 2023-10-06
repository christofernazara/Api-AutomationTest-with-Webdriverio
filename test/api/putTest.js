import assert from 'assert';
import axios from 'axios';
import addUser from './postTest';
const apiToken = process.env.GOREST_API_TOKEN
const apiUrlLink = process.env.API_URL

describe('Go Rest Put Request', ()=>{
    //[3] - PUT - Positive Case - Should update user details
    it('Should update user details', async () =>{
        if(!addUser){
          throw new Error("User not created");
        }
        const updateUserData = {
          name : 'Dafanih',
          email : 'Dafanih@gmail.com',
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
          name : 'test123',
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
})