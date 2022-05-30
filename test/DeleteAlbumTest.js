const  axios = require('axios');
const chai = require('chai');
const { assert } = require('chai');

const { expect } = chai;

describe ('Test DELETE request', async() => {

    //Arrange
    const apiCall = axios.create({
        baseURL: "http://localhost:8080/api/users/m4DbIGm7U2OB4Bmqew4nRKoiP7p2/",
    });
    const dummy = {
        'albumName': 'Name',
        'laminasNumber':  0,
        'laminas': [],
        'userref': 'm4DbIGm7U2OB4Bmqew4nRKoiP7p2'};

    it('DELETE services remove the book from the store', async() => {
        //Act
        const response = await apiCall.post('albums/',dummy);
        apiCall.delete('albums/' + response.data.albumid).then( () => {
            const responseGet = apiCall.get('albums/');
            responseGet.data.map((album)=>{
                //Assert
                expect(album.albumid).to.not.equal(response.data.albumid);
            });
        });
    });

});