export function httpCall(method: string, url:string, header: Array<[string, string]>, data:any, callback:(result:any, r:number)=>any) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  if (callback) xhr.onload = function() { callback(this['responseText'], this['status']); };
  header.forEach((ii) => {
    xhr.setRequestHeader(ii[0], ii[1])
  })
  if (data != null) {
      xhr.setRequestHeader('Content-Type', 'text/plain');
      xhr.send(data);
  }
  else xhr.send();
}