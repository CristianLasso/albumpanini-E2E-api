const  axios = require('axios');
const chai = require('chai');
const { assert } = require('chai');

const { expect } = chai;

describe ('Test GET request', async() => {

    //Arrange
    const apiCall = axios.create({
        baseURL: "http://localhost:8080/api/users/m4DbIGm7U2OB4Bmqew4nRKoiP7p2/",
    });

    it('GET services complete the service correct', async() => {
        //Act
        const response = await apiCall.get('albums/');

        //Assert
        expect(response.status).to.equal(200);
    });

    it('GET services should not return empty information', async() => {
        //Act
        const response = await apiCall.get('albums/');

        //Assert
        expect(response.data).to.not.be.empty;
    });

    it('GET services should return all the album', async() => {
        //Act
        const responseGet1 = await apiCall.get('albums/');
        const response = await apiCall.post('albums/',{
            'albumName': 'Name',
            'laminasNumber':  0,
            'laminas': [],
            'userref': 'm4DbIGm7U2OB4Bmqew4nRKoiP7p2'});
        const responseGet2 = await apiCall.get('albums/');
    
        //Assert
        assert.isTrue(responseGet2.data.length > responseGet1.data.length);

        apiCall.delete('albums/' + response.data.id);
    });


});