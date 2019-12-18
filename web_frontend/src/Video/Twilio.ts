export async function getToken(identityType: string, roomName: string) {
    const jsonObject = JSON.stringify({
        "identityType": identityType,
        "roomName": roomName
    })
        return new Promise<any>(resolve => {
            httpCall('POST', "http://localhost:8080/twilio/getToken", jsonObject, (result: any) => {
                resolve(JSON.parse(result).token)
            })
        })
    }

export function httpCall(method: string, url:string, data:any, callback:(result:any)=>any) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if (callback) xhr.onload = function() { callback(this['responseText']); };
    if (data != null) {
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.send(data);
    }
    else xhr.send();
}
    