/**
 * Created by yjy on 2016/11/15.
 */

import {AMapLocation} from "react-native-amap";
const key = 'dadfa0897bd9c8cff9cffdf330974b55';

class Geocode {
    async getLatlonByWeb(address) {
        try {
            let response = await fetch('http://restapi.amap.com/v3/geocode/geo?address='+address+'&key='+key);
            let responseJson = await response.json();
            let location = responseJson.geocodes[0].location;
            let [ longitude, latitude ] = location.split(',');
            return { longitude, latitude };
        } catch(error) {
            return error;
        }
    }

    async getAddressByWeb(longitude, latitude) {
        let location = longitude+','+latitude;
        try {
            let response = await fetch('http://restapi.amap.com/v3/geocode/regeo?location='+location+'&key='+key);
            let responseJson = await response.json();
            return responseJson.regeocode.addressComponent;
        } catch(error) {
            return error;
        }
    }

    async getLatlonByNaitve(address, cityCode) {
        try {
            return await AMapLocation.getLatLon(address, cityCode);
        } catch(error) {
            return error;
        }
    }
}

const geocode = new Geocode();
export default geocode;