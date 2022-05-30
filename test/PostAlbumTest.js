const  axios = require('axios');
const chai = require('chai');
const { assert } = require('chai');

const { expect } = chai;

describe ('Test POST request', async() => {

    //Arrange
    const apiCall = axios.create({
        baseURL: "http://localhost:8080/api/users/m4DbIGm7U2OB4Bmqew4nRKoiP7p2/",
    });
    const dummy = {
        'albumName': 'Name',
        'laminasNumber':  0,
        'laminas': [],
        'userref': 'm4DbIGm7U2OB4Bmqew4nRKoiP7p2'};

    it('POST services creates a book', async() => {
        //Act
        const response = await apiCall.post('albums/',dummy);

        //Assert
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('albumid');
        assert.equal(response.data.albumName, dummy.albumName);
        assert.equal(response.laminasNumber.author, dummy.laminasNumber);

        apiCall.delete('albums/' + response.data.id);

    });

    it('POST services may not creates a empty album', async() => {
        //Act
        const response = await apiCall.post('albums/',{});

        //Assert
        expect(response.status).to.equal(400);
        apiCall.delete('albums/' + response.data.albumid);
    });

    it('POST services may not creates an album with albumName field empty', async() => {
        //Act
        const response = await apiCall.post('albums/',{
            'albumName': '',
            'laminasNumber':  0,
            'laminas': [],
            'userref': 'm4DbIGm7U2OB4Bmqew4nRKoiP7p2'});
        
        //Assert
        expect(response.status).to.equal(400);
        apiCall.delete('albums/' + response.data.albumid);
    });


    it('POST services may not creates an album with incomplete data', async() => {
        //Act
        const response = await apiCall.post('albums/',{
            'laminasNumber':  0,
            'laminas': [],
            'userref': 'm4DbIGm7U2OB4Bmqew4nRKoiP7p2'});
        
        //Assert
        expect(response.status).to.equal(400);
        apiCall.delete('albums/' + response.data.albumid);
    });


});