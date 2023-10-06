import assert from 'assert';
import axios from 'axios';
import addUser from './postTest';
const apiToken = process.env.GOREST_API_TOKEN
const apiUrlLink = process.env.API_URL

describe('Go Rest Delete Request', ()=>{
    //[4] - DELETE - Positive Case - Delete User with valid ID
    it('Should delete user', async ()=>{
        if(!addUser){
          throw new Error('User not Created');
        }
        const response = await axios.delete(`${apiUrlLink}/users/${addUser.id}`,{
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