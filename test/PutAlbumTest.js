const  axios = require('axios');
const chai = require('chai');
const { assert } = require('chai');

const { expect } = chai;

describe ('Test PUT request', async() => {

    //Arrange
    const apiCall = axios.create({
        baseURL: "http://localhost:8080/api/users/m4DbIGm7U2OB4Bmqew4nRKoiP7p2/",
    });
    const dummy = {
        'albumName': 'Name',
        'laminasNumber':  0,
        'laminas': [],
        'userref': 'm4DbIGm7U2OB4Bmqew4nRKoiP7p2'};

    it('PUT services update the object', async() => {
        //Act
        const response = await apiCall.post('albums/',dummy);
        const responsePut = await apiCall.put('albums/'+ response.data.albumid, {
            'albumName': 'Name',
            'laminasNumber':  0,
            'laminas': [],
            'userref': 'm4DbIGm7U2OB4Bmqew4nRKoiP7p2'});

        //Assert
        expect(response.data.name).to.not.equal(responsePut.data.name);
        expect(response.data.author).to.not.equal(responsePut.data.author);

        apiCall.delete('albums/' + response.data.albumid);
    });

    it('PUT services update the object instead of created a new object', async() => {
        //Act
        const response = await apiCall.post('albums/',dummy);
        const responsePut = await apiCall.put('albums/'+ response.data.albumid, {
            'albumName': 'Name',
            'laminasNumber':  0,
            'laminas': [],
            'userref': 'm4DbIGm7U2OB4Bmqew4nRKoiP7p2'});

        //Assert
        expect(response.data.albumid).to.equal(responsePut.data.albumid);

        apiCall.delete('albums/' + response.data.albumid);
    });

    it('PUT services update the object with empty data', async() => {
        //Act
        const response = await apiCall.post('albums/',dummy);
        const responsePut = await apiCall.put('albums/'+ response.data.albumid,{
            'albumName': '',
            'laminasNumber':  0,
            'laminas': [],
            'userref': ''});

        //Assert
        expect(responsePut.status).to.not.equal(200);
        apiCall.delete('albums/' + response.data.albumid);
    });

    it('PUT services update the object with null data', async() => {
        //Act
        const response = await apiCall.post('albums/',dummy);
        const responsePut = await apiCall.put('albums/'+ response.data.albumid, {});

        //Assert
        expect(responsePut.status).to.not.equal(200);
        apiCall.delete('albums/' + response.data.albumid);
    });

});